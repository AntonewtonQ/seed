"use client";
import Link from "next/link";
import { useWorkspace } from "./context";
import { Collection } from "./collection";
import {
  PageHeading,
  ActionLink,
  ActionForm,
  Field,
  Select,
  Badge,
  NotAvailable,
  Row,
  Empty,
  money,
  stages,
} from "./ui";
export function RoundsScreen({
  id,
  mode,
  startupId,
}: {
  id?: string;
  mode?: string;
  startupId?: string;
}) {
  const { data, run, busy } = useWorkspace();
  const owned = data.actor.kind === "startup";
  const startup = data.startups.find((s) => s.id === startupId);
  if (id === "new") {
    if (!owned) return <NotAvailable />;
    return (
      <>
        <PageHeading
          title="Abrir ronda"
          description="Defina o objetivo desta captação."
          back={{ href: "/workspace/rounds", label: "Rondas" }}
        />
        <ActionForm
          action="round"
          to={(r) => "/workspace/rounds/" + r.id}
          cancel="/workspace/rounds"
          label="Abrir ronda"
        >
          <Field label="Nome da ronda" name="name" />
          <Field label="Meta de captação" name="target" type="number" />
          <Select label="Moeda" name="currency">
            <option>AOA</option>
            <option>USD</option>
            <option>EUR</option>
          </Select>
        </ActionForm>
      </>
    );
  }
  if (id) {
    const r = data.rounds.find((r) => r.id === id);
    if (!r || mode) return <NotAvailable />;
    const s = data.startups.find((s) => s.id === r.startup_id);
    const ops = data.opportunities.filter((p) => p.round_id === id);
    return (
      <>
        <PageHeading
          title={r.name}
          description={s?.name}
          back={{ href: "/workspace/rounds", label: "Rondas" }}
          action={
            owned && r.status === "open" ? (
              <ActionLink href={"/workspace/opportunities/new?round=" + r.id}>
                Associar investidor
              </ActionLink>
            ) : undefined
          }
        />
        <div className="ws-panel">
          <dl className="ws-record ws-record-grid">
            <div>
              <dt>Meta de captação</dt>
              <dd>{money(r.target, r.currency)}</dd>
            </div>
            <div>
              <dt>Estado da ronda</dt>
              <dd>
                <Badge>{r.status === "open" ? "Aberta" : "Encerrada"}</Badge>
              </dd>
            </div>
          </dl>
          <div className="ws-subtle-actions">
            <Link className="ws-text-link" href={"/workspace/metrics/" + id}>
              Consultar indicadores
            </Link>
            {owned && (
              <button
                className="ws-text-link"
                disabled={busy}
                onClick={() =>
                  void run("roundStatus", {
                    id,
                    status: r.status === "open" ? "closed" : "open",
                  })
                }
              >
                {r.status === "open" ? "Encerrar ronda" : "Reabrir ronda"}
              </button>
            )}
          </div>
        </div>
        <div className="ws-section-header">
          <h2>Investidores nesta ronda</h2>
        </div>
        {ops.length ? (
          <ul className="ws-list">
            {ops.map((p) => (
              <Row
                key={p.id}
                href={"/workspace/opportunities/" + p.id}
                title={p.investor_name}
                description={p.next_step || "Próximo passo por definir"}
                meta={<Badge>{stages[p.stage]}</Badge>}
              />
            ))}
          </ul>
        ) : (
          <Empty
            title="Ainda não há negociações"
            description="Associe um investidor para começar o acompanhamento."
          />
        )}
      </>
    );
  }
  return (
    <>
      <PageHeading
        title="Rondas"
        description={
          startup
            ? `Captação de ${startup.name}.`
            : "Consulte cada ronda e acompanhe os investidores associados."
        }
        back={
          startup
            ? { href: "/workspace/startups/" + startup.id, label: startup.name }
            : undefined
        }
        action={
          owned ? (
            <ActionLink href="/workspace/rounds/new">Abrir ronda</ActionLink>
          ) : undefined
        }
      />
      <Collection
        items={data.rounds
          .filter((r) => !startupId || r.startup_id === startupId)
          .map((r) => ({
            id: r.id,
            title: r.name,
            description: `${data.startups.find((s) => s.id === r.startup_id)?.name ?? ""} · ${money(r.target, r.currency)}`,
            meta: <Badge>{r.status === "open" ? "Aberta" : "Encerrada"}</Badge>,
            href: "/workspace/rounds/" + r.id,
          }))}
        empty="Ainda não existem rondas"
        description={
          owned
            ? "Defina uma meta de captação para começar."
            : "As rondas associadas à sua organização aparecerão aqui."
        }
      />
    </>
  );
}
