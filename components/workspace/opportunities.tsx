"use client";
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
  Empty,
  Badge,
  RecordTabs,
  stamp,
  money,
  stages,
  terms,
} from "./ui";
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
  const owned = data.actor.kind === "startup";
  const listTitle =
    data.actor.kind === "investor" ? "Oportunidades" : "Negociações";
  if (id === "new") {
    if (!owned) return <NotAvailable />;
    const rounds = data.rounds.filter((r) => r.status === "open");
    const selected = rounds.find((r) => r.id === roundId);
    const back = selected
      ? "/workspace/rounds/" + selected.id
      : "/workspace/opportunities";
    return (
      <>
        <PageHeading
          title="Associar investidor"
          description="Crie uma negociação para uma ronda aberta."
          back={{ href: back, label: selected?.name ?? "Negociações" }}
        />
        {!rounds.length ? (
          <Empty
            title="Abra uma ronda primeiro"
            description="Só é possível associar investidores a rondas abertas."
            action={
              <ActionLink href="/workspace/rounds/new">Abrir ronda</ActionLink>
            }
          />
        ) : (
          <ActionForm
            action="opportunity"
            to={(r) => "/workspace/opportunities/" + r.id}
            cancel={back}
            label="Associar investidor"
          >
            <Select label="Ronda aberta" name="roundId" value={selected?.id}>
              {rounds.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </Select>
            <Select label="Potencial investidor" name="investorId">
              {data.investors.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
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
  if (!id)
    return (
      <>
        <PageHeading
          title={listTitle}
          description={
            owned
              ? "Acompanhe uma relação de cada vez, desde o contacto ao term sheet."
              : "Consulte o estado e o histórico das relações disponíveis para a sua organização."
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
              title:
                data.actor.kind === "investor"
                  ? (s?.name ?? p.round_name)
                  : p.investor_name,
              description:
                p.round_name +
                " · " +
                (p.next_step || "Próximo passo por definir"),
              href: "/workspace/opportunities/" + p.id,
              meta: <Badge>{stages[p.stage]}</Badge>,
            };
          })}
          empty="Sem negociações disponíveis"
          description={
            owned
              ? "Associe um investidor a uma ronda aberta."
              : "As relações associadas à sua organização aparecerão aqui."
          }
        />
      </>
    );
  const p = data.opportunities.find((p) => p.id === id);
  if (!p) return <NotAvailable />;
  const round = data.rounds.find((r) => r.id === p.round_id);
  const startup = data.startups.find((s) => s.id === round?.startup_id);
  const title =
    data.actor.kind === "investor"
      ? (startup?.name ?? p.round_name)
      : p.investor_name;
  const base = "/workspace/opportunities/" + id;
  if (mode === "edit") {
    if (!owned) return <NotAvailable />;
    return (
      <>
        <PageHeading
          title="Atualizar negociação"
          description={`${title} · ${p.round_name}`}
          back={{ href: base, label: "Negociação" }}
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
            transform={(v) => ({ ...v, softAmount: v.softAmount || null })}
          >
            <Select label="Etapa" name="stage" value={p.stage}>
              {Object.entries(stages).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
            <Field
              label={`Valor da intenção (${p.currency})`}
              name="softAmount"
              type="number"
              required={false}
              value={p.soft_amount ?? ""}
            />
            <p className="ws-note">
              Deixe vazio se não existir intenção ativa. Um soft commit não
              representa dinheiro recebido.
            </p>
            <Select
              label="Estado do term sheet"
              name="termStatus"
              value={p.term_status}
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
          back={{ href: base + "/interactions", label: "Interações" }}
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
        >
          <Select label="Tipo de interação" name="kind">
            <option value="meeting">Reunião</option>
            <option value="contact">Contacto</option>
            <option value="note">Nota</option>
          </Select>
          <Field
            label="Data e hora (fuso do dispositivo)"
            name="occurredAt"
            type="datetime-local"
          />
          <Textarea label="Registo da interação" name="body" maxLength={4000} />
          <p className="ws-note">
            Registar uma reunião não altera a etapa da negociação. Atualize a
            etapa quando necessário.
          </p>
        </ActionForm>
      </>
    );
  }
  if (mode && !["interactions", "history"].includes(mode))
    return <NotAvailable />;
  const current = mode ? base + "/" + mode : base;
  return (
    <>
      <PageHeading
        title={title}
        description={p.round_name}
        back={{ href: "/workspace/opportunities", label: listTitle }}
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
      <RecordTabs
        active={current}
        items={[
          { href: base, label: "Resumo" },
          { href: base + "/interactions", label: "Interações" },
          { href: base + "/history", label: "Histórico de etapas" },
        ]}
      />
      {mode === "interactions" ? (
        <>
          {data.interactions.some((i) => i.opportunity_id === id) ? (
            <ol className="ws-timeline">
              {data.interactions
                .filter((i) => i.opportunity_id === id)
                .map((i) => (
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
              description="Contactos, reuniões e notas desta negociação aparecerão aqui."
            />
          )}
        </>
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
              <dt>Intenção registada</dt>
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
            A intenção e o estado do term sheet são registos de acompanhamento.
            Não confirmam assinatura ou dinheiro recebido.
          </p>
        </div>
      )}
    </>
  );
}
