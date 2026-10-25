"use client";
import Link from "next/link";
import { useWorkspace } from "./context";
import { PageHeading, ActionLink, Stat, Row, Empty, Badge, stages } from "./ui";
export function Dashboard() {
  const { data } = useWorkspace();
  const role = data.actor.kind;
  const active = data.opportunities.filter(
    (p) => !["closed", "declined"].includes(p.stage),
  );
  // Negociações sem próximo passo aparecem primeiro: são as que pedem decisão.
  const pending = active.filter((p) => !p.next_step.trim());
  const queue = [...pending, ...active.filter((p) => p.next_step.trim())];
  const open = data.rounds.filter((r) => r.status === "open");
  const shared = data.documents.filter((d) => !d.owned);
  const title =
    role === "startup"
      ? "A sua captação"
      : role === "investor"
        ? "As suas oportunidades"
        : "Startups em acompanhamento";
  const description =
    role === "startup"
      ? "Retome as negociações em curso e defina o próximo passo."
      : role === "investor"
        ? "Negociações em que a sua organização participa."
        : "Startups vinculadas à sua organização e respetivas rondas.";
  return (
    <>
      <PageHeading
        title={title}
        description={description}
        action={
          role === "startup" ? (
            <ActionLink href="/workspace/rounds/new">Abrir ronda</ActionLink>
          ) : undefined
        }
      />
      <dl className="ws-stats">
        {role === "startup" && (
          <>
            <Stat label="Rondas abertas" value={open.length} />
            <Stat label="Negociações em curso" value={active.length} />
            <Stat
              label="Sem próximo passo"
              value={pending.length}
              detail={pending.length ? "Defina o que fazer a seguir." : undefined}
            />
          </>
        )}
        {role === "investor" && (
          <>
            <Stat label="Negociações em curso" value={active.length} />
            <Stat label="Documentos partilhados consigo" value={shared.length} />
          </>
        )}
        {role === "accelerator" && (
          <>
            <Stat label="Startups acompanhadas" value={data.startups.length} />
            <Stat label="Rondas abertas" value={open.length} />
            <Stat label="Negociações em curso" value={active.length} />
          </>
        )}
      </dl>
      {role === "accelerator" ? (
        <>
          <div className="ws-section-header">
            <h2>Startups acompanhadas</h2>
            {data.startups.length > 4 && (
              <Link href="/workspace/startups" className="ws-text-link">
                Ver todas ({data.startups.length})
              </Link>
            )}
          </div>
          {data.startups.length ? (
            <ul className="ws-list">
              {data.startups.slice(0, 4).map((s) => {
                const count = data.rounds.filter(
                  (r) => r.startup_id === s.id && r.status === "open",
                ).length;
                return (
                  <Row
                    key={s.id}
                    href={"/workspace/startups/" + s.id}
                    title={s.name}
                    description={s.sector || "Sector por preencher"}
                    meta={
                      <Badge>
                        {count} {count === 1 ? "ronda aberta" : "rondas abertas"}
                      </Badge>
                    }
                  />
                );
              })}
            </ul>
          ) : (
            <Empty
              title="Ainda não há startups vinculadas"
              description="Quando uma startup for vinculada à sua organização, aparece aqui."
            />
          )}
        </>
      ) : (
        <>
          <div className="ws-section-header">
            <h2>
              {role === "startup" ? "Próximos passos" : "Em acompanhamento"}
            </h2>
            {active.length > 4 && (
              <Link className="ws-text-link" href="/workspace/opportunities">
                Ver todas ({active.length})
              </Link>
            )}
          </div>
          {queue.length ? (
            <ul className="ws-list">
              {queue.slice(0, 4).map((p) => {
                const r = data.rounds.find((r) => r.id === p.round_id);
                const startup = data.startups.find(
                  (s) => s.id === r?.startup_id,
                );
                return (
                  <Row
                    key={p.id}
                    href={"/workspace/opportunities/" + p.id}
                    title={
                      role === "investor"
                        ? (startup?.name ?? p.round_name)
                        : p.investor_name
                    }
                    description={`${p.next_step.trim() || "Próximo passo por definir"} · ${p.round_name}`}
                    meta={<Badge>{stages[p.stage]}</Badge>}
                  />
                );
              })}
            </ul>
          ) : (
            <Empty
              title={
                role === "startup"
                  ? open.length
                    ? "Associe o primeiro investidor"
                    : "Abra a primeira ronda"
                  : "Sem negociações em curso"
              }
              description={
                role === "startup"
                  ? open.length
                    ? "Cada investidor associado a uma ronda dá origem a uma negociação."
                    : "Uma ronda define a meta e a moeda. Depois, associe investidores."
                  : "Quando uma startup associar a sua organização a uma negociação, ela aparece aqui."
              }
              action={
                role === "startup" ? (
                  <ActionLink
                    href={
                      open.length
                        ? "/workspace/opportunities/new"
                        : "/workspace/rounds/new"
                    }
                  >
                    {open.length ? "Associar investidor" : "Abrir ronda"}
                  </ActionLink>
                ) : undefined
              }
            />
          )}
        </>
      )}
    </>
  );
}
