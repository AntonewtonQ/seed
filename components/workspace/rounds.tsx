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
  ReadOnlyNote,
  Row,
  Empty,
  money,
  stages,
  type Crumb,
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
  const role = data.actor.kind;
  const owned = role === "startup";
  const startup = data.startups.find((s) => s.id === startupId);
  if (id === "new") {
    if (!owned) return <NotAvailable />;
    return (
      <>
        <PageHeading
          title="Abrir ronda"
          description="Indique o nome, a meta e a moeda."
          trail={[{ href: "/workspace/rounds", label: "Rondas" }]}
        />
        <ActionForm
          action="round"
          to={(r) => "/workspace/rounds/" + r.id}
          cancel="/workspace/rounds"
          label="Abrir ronda"
          next="A ronda fica aberta. A seguir, pode associar investidores."
          success="Ronda aberta. Já pode associar investidores."
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
    const trail: Crumb[] =
      role === "accelerator" && s
        ? [
            { href: "/workspace/startups", label: "Startups" },
            { href: "/workspace/startups/" + s.id, label: s.name },
          ]
        : role === "investor"
          ? [{ href: "/workspace/opportunities", label: "Oportunidades" }]
          : [{ href: "/workspace/rounds", label: "Rondas" }];
    const isOpen = r.status === "open";
    return (
      <>
        <PageHeading
          title={r.name}
          description={s?.name}
          trail={trail}
          action={
            owned && isOpen ? (
              <ActionLink href={"/workspace/opportunities/new?round=" + r.id}>
                Associar investidor
              </ActionLink>
            ) : undefined
          }
        />
        {!owned && (
          <ReadOnlyNote>Só consulta. A ronda é gerida pela startup.</ReadOnlyNote>
        )}
        <div className="ws-panel">
          <dl className="ws-record ws-record-grid">
            <div>
              <dt>Meta de captação</dt>
              <dd>{money(r.target, r.currency)}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>
                <Badge>{isOpen ? "Aberta" : "Encerrada"}</Badge>
              </dd>
            </div>
          </dl>
          <Link className="ws-text-link" href={"/workspace/metrics/" + id}>
            Consultar indicadores
          </Link>
        </div>
        <div className="ws-section-header">
          <h2>Investidores nesta ronda ({ops.length})</h2>
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
            description={
              owned
                ? isOpen
                  ? "Associe um investidor para começar."
                  : "Reabra a ronda para associar investidores."
                : "As negociações desta ronda aparecem aqui."
            }
          />
        )}
        {owned && (
          <section className="ws-panel ws-aside" aria-labelledby="round-status">
            <h2 id="round-status">
              {isOpen ? "Encerrar ronda" : "Reabrir ronda"}
            </h2>
            <p className="ws-note">
              {isOpen
                ? "Uma ronda encerrada não aceita novos investidores nem mudanças de etapa. As interações continuam a poder ser registadas. Pode reabri-la depois."
                : "Ao reabrir, volta a poder associar investidores e atualizar etapas."}
            </p>
            <button
              className="ws-button ws-secondary"
              disabled={busy}
              onClick={() =>
                void run(
                  "roundStatus",
                  { id, status: isOpen ? "closed" : "open" },
                  undefined,
                  isOpen ? "Ronda encerrada." : "Ronda reaberta.",
                )
              }
            >
              {isOpen ? "Encerrar ronda" : "Reabrir ronda"}
            </button>
          </section>
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
            ? `Rondas de ${startup.name}.`
            : owned
              ? "As suas rondas e os investidores de cada uma."
              : "Rondas das startups que acompanha."
        }
        trail={
          startup
            ? [
                { href: "/workspace/startups", label: "Startups" },
                { href: "/workspace/startups/" + startup.id, label: startup.name },
              ]
            : []
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
          .map((r) => {
            const count = data.opportunities.filter(
              (p) => p.round_id === r.id,
            ).length;
            return {
              id: r.id,
              title: r.name,
              description: [
                startup || owned
                  ? null
                  : data.startups.find((s) => s.id === r.startup_id)?.name,
                money(r.target, r.currency),
                `${count} ${count === 1 ? "investidor" : "investidores"}`,
              ]
                .filter(Boolean)
                .join(" · "),
              meta: <Badge>{r.status === "open" ? "Aberta" : "Encerrada"}</Badge>,
              href: "/workspace/rounds/" + r.id,
            };
          })}
        empty="Ainda não existem rondas"
        description={
          owned
            ? "Abra a primeira ronda para começar."
            : "As rondas das startups vinculadas aparecem aqui."
        }
        action={
          owned ? (
            <ActionLink href="/workspace/rounds/new">Abrir ronda</ActionLink>
          ) : undefined
        }
        search="Pesquisar rondas"
      />
    </>
  );
}
