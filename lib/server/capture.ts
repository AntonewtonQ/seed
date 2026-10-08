import { z } from "zod";
import type { PoolClient } from "pg";
import { transaction } from "./db";
import { AppError, type Actor } from "./auth";
const id = z.uuid();
const text = z.string().trim().min(1).max(160);
const money = z
  .string()
  .regex(/^(?:0|[1-9]\d{0,14})(?:\.\d{1,2})?$/)
  .refine((v) => Number(v) > 0);
const schemas = {
  profile: z.object({
    name: text,
    sector: text,
    description: z.string().trim().max(2000),
  }),
  round: z.object({
    name: text,
    target: money,
    currency: z.enum(["AOA", "USD", "EUR"]),
  }),
  roundStatus: z.object({ id, status: z.enum(["open", "closed"]) }),
  opportunity: z.object({
    roundId: id,
    investorId: id,
    nextStep: z.string().max(500),
  }),
  transition: z.object({
    id,
    stage: z.enum([
      "contacted",
      "meeting",
      "soft_commit",
      "term_sheet",
      "closed",
      "declined",
    ]),
    softAmount: money.nullable(),
    termStatus: z.enum(["none", "received", "review", "accepted", "rejected"]),
    nextStep: z.string().max(500),
  }),
  interaction: z.object({
    id,
    kind: z.enum(["note", "meeting", "contact"]),
    body: z.string().trim().min(1).max(4000),
    occurredAt: z.iso.datetime({ offset: true }),
  }),
  grant: z.object({ documentId: id, organizationId: id, allow: z.boolean() }),
  deleteDocument: z.object({ id }),
};
export async function startupFor(actor: Actor, db: PoolClient) {
  const { rows } = await db.query(
    "SELECT * FROM startups WHERE organization_id=$1",
    [actor.organization_id],
  );
  if (actor.kind !== "startup" || !rows[0])
    throw new AppError(403, "Operação reservada à startup proprietária.");
  return rows[0];
}
async function ownOpportunity(db: PoolClient, actor: Actor, oppId: string) {
  const { rows } = await db.query(
    `SELECT p.*,r.status round_status FROM opportunities p JOIN rounds r ON r.id=p.round_id JOIN startups s ON s.id=r.startup_id WHERE p.id=$1 AND s.organization_id=$2 FOR UPDATE OF p`,
    [oppId, actor.organization_id],
  );
  if (actor.kind !== "startup" || !rows[0])
    throw new AppError(404, "Negociação não encontrada.");
  return rows[0];
}
async function audit(
  db: PoolClient,
  actor: Actor,
  action: string,
  resource: string,
) {
  await db.query(
    "INSERT INTO audit_events(actor_id,action,resource_id) VALUES($1,$2,$3)",
    [actor.id, action, resource],
  );
}
export async function command(actor: Actor, action: string, input: unknown) {
  if (!(action in schemas)) throw new AppError(400, "Operação desconhecida.");
  return transaction(async (db) => {
    const startup = await startupFor(actor, db);
    switch (action) {
      case "profile": {
        const v = schemas.profile.parse(input);
        await db.query("UPDATE organizations SET name=$1 WHERE id=$2", [
          v.name,
          actor.organization_id,
        ]);
        await db.query(
          "UPDATE startups SET sector=$1,description=$2 WHERE id=$3",
          [v.sector, v.description, startup.id],
        );
        await audit(db, actor, action, startup.id);
        return { id: startup.id };
      }
      case "round": {
        const v = schemas.round.parse(input);
        const { rows } = await db.query(
          "INSERT INTO rounds(startup_id,name,target,currency) VALUES($1,$2,$3,$4) RETURNING id",
          [startup.id, v.name, v.target, v.currency],
        );
        await audit(db, actor, action, rows[0].id);
        return rows[0];
      }
      case "roundStatus": {
        const v = schemas.roundStatus.parse(input);
        const r = await db.query(
          "UPDATE rounds SET status=$1 WHERE id=$2 AND startup_id=$3 RETURNING id",
          [v.status, v.id, startup.id],
        );
        if (!r.rowCount) throw new AppError(404, "Ronda não encontrada.");
        await audit(db, actor, action, v.id);
        return { id: v.id };
      }
      case "opportunity": {
        const v = schemas.opportunity.parse(input);
        const round = await db.query(
          "SELECT 1 FROM rounds WHERE id=$1 AND startup_id=$2 AND status='open' FOR UPDATE",
          [v.roundId, startup.id],
        );
        const investor = await db.query(
          "SELECT 1 FROM organizations WHERE id=$1 AND kind='investor'",
          [v.investorId],
        );
        if (!round.rowCount || !investor.rowCount)
          throw new AppError(400, "Ronda aberta ou investidor inválido.");
        const { rows } = await db.query(
          "INSERT INTO opportunities(round_id,investor_id,next_step) VALUES($1,$2,$3) RETURNING id",
          [v.roundId, v.investorId, v.nextStep],
        );
        await db.query(
          "INSERT INTO transitions(opportunity_id,to_stage,actor_id) VALUES($1,'contacted',$2)",
          [rows[0].id, actor.id],
        );
        await audit(db, actor, action, rows[0].id);
        return rows[0];
      }
      case "transition": {
        const v = schemas.transition.parse(input);
        const old = await ownOpportunity(db, actor, v.id);
        if (old.round_status !== "open")
          throw new AppError(409, "Reabra a ronda para alterar a negociação.");
        if (v.stage === "soft_commit" && !v.softAmount)
          throw new AppError(400, "Registe o valor da intenção.");
        if (v.stage === "term_sheet" && v.termStatus === "none")
          throw new AppError(400, "Indique o estado do term sheet.");
        await db.query(
          `UPDATE opportunities SET stage=$1,soft_amount=$2,soft_at=CASE WHEN $2::numeric IS NULL THEN NULL ELSE COALESCE(soft_at,now()) END,term_status=$3,next_step=$4 WHERE id=$5`,
          [v.stage, v.softAmount, v.termStatus, v.nextStep, v.id],
        );
        if (old.stage !== v.stage)
          await db.query(
            "INSERT INTO transitions(opportunity_id,from_stage,to_stage,actor_id) VALUES($1,$2,$3,$4)",
            [v.id, old.stage, v.stage, actor.id],
          );
        await audit(db, actor, action, v.id);
        return { id: v.id };
      }
      case "interaction": {
        const v = schemas.interaction.parse(input);
        await ownOpportunity(db, actor, v.id);
        if (new Date(v.occurredAt).getTime() > Date.now() + 60000)
          throw new AppError(400, "A interação não pode estar no futuro.");
        const r = await db.query(
          "INSERT INTO interactions(opportunity_id,kind,body,occurred_at,actor_id) VALUES($1,$2,$3,$4,$5) RETURNING id",
          [v.id, v.kind, v.body, v.occurredAt, actor.id],
        );
        await audit(db, actor, action, r.rows[0].id);
        return r.rows[0];
      }
      case "grant": {
        const v = schemas.grant.parse(input);
        const d = await db.query(
          "SELECT 1 FROM documents WHERE id=$1 AND startup_id=$2 FOR UPDATE",
          [v.documentId, startup.id],
        );
        if (!d.rowCount) throw new AppError(404, "Documento não encontrado.");
        const related = await db.query(
          `SELECT 1 FROM opportunities p JOIN rounds r ON r.id=p.round_id WHERE r.startup_id=$1 AND p.investor_id=$2 UNION SELECT 1 WHERE $2::uuid=$3::uuid`,
          [startup.id, v.organizationId, startup.accelerator_id],
        );
        if (!related.rowCount)
          throw new AppError(
            400,
            "Autorize apenas um investidor associado ou a aceleradora vinculada.",
          );
        if (v.allow)
          await db.query(
            "INSERT INTO document_grants VALUES($1,$2) ON CONFLICT DO NOTHING",
            [v.documentId, v.organizationId],
          );
        else
          await db.query(
            "DELETE FROM document_grants WHERE document_id=$1 AND organization_id=$2",
            [v.documentId, v.organizationId],
          );
        await audit(db, actor, v.allow ? "grant" : "revoke", v.documentId);
        return { id: v.documentId };
      }
      case "deleteDocument": {
        const v = schemas.deleteDocument.parse(input);
        const r = await db.query(
          "DELETE FROM documents WHERE id=$1 AND startup_id=$2 RETURNING id",
          [v.id, startup.id],
        );
        if (!r.rowCount) throw new AppError(404, "Documento não encontrado.");
        await audit(db, actor, action, v.id);
        return { id: v.id };
      }
    }
  });
}
export async function upload(actor: Actor, file: File) {
  if (file.size < 1 || file.size > 2097152)
    throw new AppError(400, "O ficheiro deve ter entre 1 byte e 2 MiB.");
  const content = Buffer.from(await file.arrayBuffer());
  const pdf = content.subarray(0, 5).toString() === "%PDF-";
  const txt =
    file.type === "text/plain" &&
    !content.includes(0) &&
    !content.toString("utf8").includes("\ufffd");
  if (!pdf && !txt) throw new AppError(400, "Utilize PDF ou texto UTF-8.");
  const name =
    file.name.replace(/[^\p{L}\p{N} ._-]/gu, "_").slice(0, 160) || "documento";
  return transaction(async (db) => {
    const startup = await startupFor(actor, db);
    const r = await db.query(
      "INSERT INTO documents(startup_id,name,media_type,content) VALUES($1,$2,$3,$4) RETURNING id",
      [startup.id, name, pdf ? "application/pdf" : "text/plain", content],
    );
    await audit(db, actor, "upload", r.rows[0].id);
    return r.rows[0];
  });
}
export async function download(actor: Actor, documentId: string) {
  id.parse(documentId);
  return transaction(async (db) => {
    const { rows } = await db.query(
      `SELECT d.* FROM documents d JOIN startups s ON s.id=d.startup_id WHERE d.id=$1 AND (s.organization_id=$2 OR EXISTS(SELECT 1 FROM document_grants g WHERE g.document_id=d.id AND g.organization_id=$2))`,
      [documentId, actor.organization_id],
    );
    if (!rows[0]) throw new AppError(404, "Documento não encontrado.");
    await audit(db, actor, "download", documentId);
    return rows[0];
  });
}
export async function state(actor: Actor) {
  return transaction(async (db) => {
    await db.query("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY");
    // Every returned resource is filtered by membership and ownership/explicit association.
    const org = actor.organization_id;
    const startups = (
      await db.query(
        `SELECT s.id,s.sector,s.description,s.accelerator_id,o.name FROM startups s JOIN organizations o ON o.id=s.organization_id WHERE s.organization_id=$1 OR s.accelerator_id=$1 OR EXISTS(SELECT 1 FROM rounds r JOIN opportunities p ON p.round_id=r.id WHERE r.startup_id=s.id AND p.investor_id=$1)`,
        [org],
      )
    ).rows;
    const rounds = (
      await db.query(
        `SELECT r.* FROM rounds r JOIN startups s ON s.id=r.startup_id WHERE s.organization_id=$1 OR s.accelerator_id=$1 OR EXISTS(SELECT 1 FROM opportunities p WHERE p.round_id=r.id AND p.investor_id=$1) ORDER BY r.created_at DESC`,
        [org],
      )
    ).rows;
    const opportunities = (
      await db.query(
        `SELECT p.*,o.name investor_name,r.currency,r.name round_name,s.organization_id owner_id FROM opportunities p JOIN organizations o ON o.id=p.investor_id JOIN rounds r ON r.id=p.round_id JOIN startups s ON s.id=r.startup_id WHERE s.organization_id=$1 OR s.accelerator_id=$1 OR p.investor_id=$1 ORDER BY p.created_at DESC`,
        [org],
      )
    ).rows;
    const ids = opportunities.map((p) => p.id);
    const interactions = (
      await db.query(
        "SELECT id,opportunity_id,kind,body,occurred_at FROM interactions WHERE opportunity_id=ANY($1::uuid[]) ORDER BY occurred_at DESC",
        [ids],
      )
    ).rows;
    const transitions = (
      await db.query(
        "SELECT id,opportunity_id,from_stage,to_stage,created_at FROM transitions WHERE opportunity_id=ANY($1::uuid[]) ORDER BY created_at DESC",
        [ids],
      )
    ).rows;
    const documents = (
      await db.query(
        `SELECT d.id,d.name,d.startup_id,d.created_at,octet_length(d.content) size, s.organization_id=$1 owned FROM documents d JOIN startups s ON s.id=d.startup_id WHERE s.organization_id=$1 OR EXISTS(SELECT 1 FROM document_grants g WHERE g.document_id=d.id AND g.organization_id=$1) ORDER BY d.created_at DESC`,
        [org],
      )
    ).rows;
    const grants = (
      await db.query(
        `SELECT g.* FROM document_grants g JOIN documents d ON d.id=g.document_id JOIN startups s ON s.id=d.startup_id WHERE s.organization_id=$1`,
        [org],
      )
    ).rows;
    const investors =
      actor.kind === "startup"
        ? (
            await db.query(
              "SELECT id,name FROM organizations WHERE kind='investor' ORDER BY name",
            )
          ).rows
        : [];
    const accelerators =
      actor.kind === "startup"
        ? (
            await db.query(
              "SELECT id,name FROM organizations WHERE id=ANY($1::uuid[])",
              [startups.map((s) => s.accelerator_id).filter(Boolean)],
            )
          ).rows
        : [];
    // Per-round denominators prevent mixing currencies or unrelated opportunities.
    const metrics = rounds.map((r) => {
      const ops = opportunities.filter((p) => p.round_id === r.id);
      const eligible = ops.filter((p) =>
        transitions.some(
          (t) => t.opportunity_id === p.id && t.to_stage === "meeting",
        ),
      );
      const converted = eligible.filter((p) => {
        const meeting = transitions
          .filter((t) => t.opportunity_id === p.id && t.to_stage === "meeting")
          .map((t) => new Date(t.created_at).getTime());
        return transitions.some(
          (t) =>
            t.opportunity_id === p.id &&
            t.to_stage === "soft_commit" &&
            new Date(t.created_at).getTime() >= Math.min(...meeting),
        );
      });
      const events = transitions.filter(
        (t) =>
          ops.some((p) => p.id === t.opportunity_id) &&
          t.to_stage === "soft_commit",
      );
      const first = events.length
        ? Math.min(...events.map((t) => new Date(t.created_at).getTime()))
        : null;
      return {
        roundId: r.id,
        denominator: eligible.length,
        numerator: converted.length,
        conversion: eligible.length
          ? (converted.length / eligible.length) * 100
          : null,
        daysToFirstCommit:
          first === null
            ? null
            : (first - new Date(r.created_at).getTime()) / 86400000,
        opportunities: ops.length,
      };
    });
    return {
      actor,
      startups,
      rounds,
      opportunities,
      interactions,
      transitions,
      documents,
      grants,
      investors,
      accelerators,
      metrics,
    };
  });
}
export type WorkspaceState = Awaited<ReturnType<typeof state>>;
