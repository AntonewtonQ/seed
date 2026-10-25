"use client";
import Link from "next/link";
import { useState } from "react";
import { useWorkspace } from "./context";
import { Collection } from "./collection";
import {
  PageHeading,
  ActionLink,
  ActionForm,
  Field,
  Select,
  Textarea,
  NotAvailable,
  ReadOnlyNote,
  Empty,
  Badge,
  RecordTabs,
  stamp,
  money,
  stages,
  terms,
} from "./ui";
const stageHelp: [string, string][] = [
  ["Contactado", "Primeiro contacto feito; ainda sem reunião."],
  ["Reunião", "Já houve pelo menos uma reunião com o investidor."],
  [
    "Soft commit",
    "O investidor manifestou intenção de investir um valor. Não é dinheiro recebido nem compromisso legal.",
  ],
  [
    "Term sheet",
    "Existe uma proposta de condições. O SEED regista apenas o estado, sem assinatura eletrónica.",
  ],
  ["Encerrada", "A negociação terminou."],
  ["Recusada", "O investidor ou a startup decidiu não avançar."],
];
function NewOpportunity({ roundId }: { roundId?: string }) {
  const { data } = useWorkspace();
  const rounds = data.rounds.filter((r) => r.status === "open");
  const initial = rounds.find((r) => r.id === roundId);
  const [round, setRound] = useState(initial?.id ?? rounds[0]?.id ?? "");
  const back = initial
    ? "/workspace/rounds/" + initial.id
    : "/workspace/opportunities";
  const trail = initial
    ? [
        { href: "/workspace/rounds", label: "Rondas" },
        { href: back, label: initial.name },
      ]
    : [{ href: "/workspace/opportunities", label: "Negociações" }];
  // A base de dados aceita uma única negociação por ronda e investidor.
  const taken = data.opportunities
    .filter((p) => p.round_id === round)
    .map((p) => p.investor_id);
  const available = data.investors.filter((i) => !taken.includes(i.id));
  return (
    <>
      <PageHeading
        title="Associar investidor"
        description="Escolha a ronda e o investidor."
        trail={trail}
      />
      {!rounds.length ? (
        <Empty
          title="Abra uma ronda primeiro"
          description="Só pode associar investidores a rondas abertas."
          action={<ActionLink href="/workspace/rounds/new">Abrir ronda</ActionLink>}
        />
      ) : (
        <ActionForm
          action="opportunity"
          to={(r) => "/workspace/opportunities/" + r.id}
          cancel={back}
          label="Associar investidor"
          next="A negociação começa na etapa Contactado."
          success="Investidor associado. A negociação está na etapa Contactado."
        >
          <label className="ws-field">
            Ronda aberta
            <select
              name="roundId"
              value={round}
              onChange={(e) => setRound(e.target.value)}
              required
            >
              {rounds.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
          {available.length ? (
            <Select label="Potencial investidor" name="investorId">
              {available.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
          ) : (
            <p className="ws-field-error" role="status">
              Todos os investidores já estão associados a esta ronda. Escolha
              outra ronda.
            </p>
          )}
          <Textarea
            label="Próximo passo"
            name="nextStep"
            required={false}
            maxLength={500}
          />
        </ActionForm>
      )}
    </>
  );
}
export function OpportunitiesScreen({
  id,
  mode,
  roundId,
}: {
  id?: string;
  mode?: string;
  roundId?: string;
}) {
  const { data } = useWorkspace();
  const role = data.actor.kind;
  const owned = role === "startup";
  const listTitle = role === "investor" ? "Oportunidades" : "Negociações";
  const listCrumb = { href: "/workspace/opportunities", label: listTitle };
  if (id === "new") {
    if (!owned) return <NotAvailable />;
    return <NewOpportunity roundId={roundId} />;
  }
  if (!id)
    return (
      <>
        <PageHeading
          title={listTitle}
          description={
            owned
              ? "Uma negociação por investidor e ronda."
              : "Negociações em que a sua organização participa."
          }
          action={
            owned ? (
              <ActionLink href="/workspace/opportunities/new">
                Associar investidor
              </ActionLink>
            ) : undefined
          }
        />
        <Collection
          items={data.opportunities.map((p) => {
            const r = data.rounds.find((r) => r.id === p.round_id);
            const s = data.startups.find((s) => s.id === r?.startup_id);
            return {
              id: p.id,
              title: role === "investor" ? (s?.name ?? p.round_name) : p.investor_name,
              description:
                (p.next_step || "Próximo passo por definir") +
                " · " +
                p.round_name +
                (role === "accelerator" && s ? " · " + s.name : ""),
              href: "/workspace/opportunities/" + p.id,
              meta: <Badge>{stages[p.stage]}</Badge>,
            };
          })}
          empty="Ainda não há negociações"
          description={
            owned
              ? "Associe um investidor a uma ronda aberta."
              : "As negociações da sua organização aparecem aqui."
          }
          action={
            owned ? (
              <ActionLink href="/workspace/opportunities/new">
                Associar investidor
              </ActionLink>
            ) : undefined
          }
          search="Pesquisar por investidor, startup, ronda ou próximo passo"
        />
      </>
    );
  const p = data.opportunities.find((p) => p.id === id);
  if (!p) return <NotAvailable />;
  const round = data.rounds.find((r) => r.id === p.round_id);
  const startup = data.startups.find((s) => s.id === round?.startup_id);
  const title = role === "investor" ? (startup?.name ?? p.round_name) : p.investor_name;
  const base = "/workspace/opportunities/" + id;
  const recordCrumb = { href: base, label: title };
  const context = (
    <>
      {role === "accelerator" && startup && <>{startup.name} · </>}
      Ronda{" "}
      <Link className="ws-text-link" href={"/workspace/rounds/" + p.round_id}>
        {p.round_name}
      </Link>
      {round?.status === "closed" && " (encerrada)"}
    </>
  );
  if (mode === "edit") {
    if (!owned) return <NotAvailable />;
    return (
      <>
        <PageHeading
          title="Atualizar negociação"
          description={`${title} · ${p.round_name}`}
          trail={[listCrumb, recordCrumb]}
        />
        {round?.status === "closed" ? (
          <Empty
            title="Esta ronda está encerrada"
            description="Reabra a ronda para atualizar a negociação."
            action={
              <ActionLink href={"/workspace/rounds/" + round.id}>
                Ver ronda
              </ActionLink>
            }
          />
        ) : (
          <ActionForm
            action="transition"
            extra={{ id }}
            to={base}
            cancel={base}
            label="Guardar negociação"
            next="Se mudar a etapa, a mudança fica no histórico."
            success="Negociação atualizada."
            transform={(v) => ({ ...v, softAmount: v.softAmount || null })}
          >
            <Select label="Etapa" name="stage" value={p.stage}>
              {Object.entries(stages).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
            <details className="ws-help">
              <summary>O que significa cada etapa?</summary>
              <dl>
                {stageHelp.map(([term, text]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <Field
              label={`Valor da intenção (${p.currency})`}
              name="softAmount"
              type="number"
              required={false}
              value={p.soft_amount ?? ""}
              hint="Obrigatório na etapa Soft commit. Deixe vazio se não houver intenção."
            />
            <Select
              label="Estado do term sheet"
              name="termStatus"
              value={p.term_status}
              hint="Obrigatório na etapa Term sheet."
            >
              {Object.entries(terms).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
            <Textarea
              label="Próximo passo"
              name="nextStep"
              value={p.next_step}
              required={false}
              maxLength={500}
            />
          </ActionForm>
        )}
      </>
    );
  }
  if (mode === "new-interaction") {
    if (!owned) return <NotAvailable />;
    return (
      <>
        <PageHeading
          title="Registar interação"
          description={`${title} · ${p.round_name}`}
          trail={[
            listCrumb,
            recordCrumb,
            { href: base + "/interactions", label: "Interações" },
          ]}
        />
        <ActionForm
          action="interaction"
          extra={{ id }}
          transform={(v) => ({
            ...v,
            occurredAt: new Date(String(v.occurredAt)).toISOString(),
          })}
          to={base + "/interactions"}
          cancel={base + "/interactions"}
          label="Registar interação"
          next="A interação fica na lista desta negociação. A etapa não muda."
          success="Interação registada."
        >
          <Select label="Tipo de interação" name="kind">
            <option value="meeting">Reunião</option>
            <option value="contact">Contacto</option>
            <option value="note">Nota</option>
          </Select>
          <Field
            label="Data e hora"
            name="occurredAt"
            type="datetime-local"
            hint="Hora do fuso deste dispositivo. Não pode ser uma data futura."
          />
          <Textarea label="Descrição" name="body" maxLength={4000} />
        </ActionForm>
      </>
    );
  }
  if (mode && !["interactions", "history"].includes(mode))
    return <NotAvailable />;
  const current = mode ? base + "/" + mode : base;
  const interactions = data.interactions.filter((i) => i.opportunity_id === id);
  return (
    <>
      <PageHeading
        title={title}
        description={context}
        trail={[listCrumb]}
        action={
          owned ? (
            <ActionLink
              href={
                mode === "interactions"
                  ? base + "/new-interaction"
                  : base + "/edit"
              }
            >
              {mode === "interactions"
                ? "Registar interação"
                : "Atualizar negociação"}
            </ActionLink>
          ) : undefined
        }
      />
      {!owned && (
        <ReadOnlyNote>
          Só consulta. A negociação é atualizada pela startup.
        </ReadOnlyNote>
      )}
      <RecordTabs
        active={current}
        items={[
          { href: base, label: "Resumo" },
          { href: base + "/interactions", label: "Interações" },
          { href: base + "/history", label: "Histórico" },
        ]}
      />
      {mode === "interactions" ? (
        interactions.length ? (
          <ol className="ws-timeline">
            {interactions.map((i) => (
              <li key={i.id}>
                <time>{stamp(i.occurred_at)}</time>
                <h2>
                  {i.kind === "meeting"
                    ? "Reunião"
                    : i.kind === "contact"
                      ? "Contacto"
                      : "Nota"}
                </h2>
                <p>{i.body}</p>
              </li>
            ))}
          </ol>
        ) : (
          <Empty
            title="Sem interações registadas"
            description="Contactos, reuniões e notas aparecem aqui."
          />
        )
      ) : mode === "history" ? (
        <ol className="ws-timeline">
          {data.transitions
            .filter((t) => t.opportunity_id === id)
            .map((t) => (
              <li key={t.id}>
                <time>{stamp(t.created_at)}</time>
                <h2>
                  {t.from_stage ? stages[t.from_stage] + " → " : ""}
                  {stages[t.to_stage]}
                </h2>
              </li>
            ))}
        </ol>
      ) : (
        <div className="ws-panel">
          <dl className="ws-record ws-record-grid">
            <div>
              <dt>Etapa atual</dt>
              <dd>
                <Badge>{stages[p.stage]}</Badge>
              </dd>
            </div>
            <div>
              <dt>Próximo passo</dt>
              <dd>{p.next_step || "Por definir"}</dd>
            </div>
            <div>
              <dt>Intenção registada (soft commit)</dt>
              <dd>
                {p.soft_amount
                  ? money(p.soft_amount, p.currency)
                  : "Não registada"}
              </dd>
            </div>
            <div>
              <dt>Term sheet</dt>
              <dd>{terms[p.term_status]}</dd>
            </div>
          </dl>
          <p className="ws-note">
            Intenção e term sheet são registos manuais. Não confirmam
            assinatura nem dinheiro recebido.
          </p>
        </div>
      )}
    </>
  );
}
