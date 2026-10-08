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
  const open = data.rounds.filter((r) => r.status === "open");
  const title =
    role === "startup"
      ? "A sua captação"
      : role === "investor"
        ? "As suas oportunidades"
        : "Startups em acompanhamento";
  const description =
    role === "startup"
      ? "Acompanhe as rondas abertas e escolha o próximo passo."
      : role === "investor"
        ? "Consulte as oportunidades associadas à sua organização."
        : "Veja as startups vinculadas e acompanhe a evolução das rondas.";
  return (
    <>
      <PageHeading
        title={title}
        description={description}
        action={
          role === "startup" ? (
            <ActionLink href="/workspace/rounds/new">Abrir ronda</ActionLink>
          ) : (
            <ActionLink
              href={
                role === "investor"
                  ? "/workspace/opportunities"
                  : "/workspace/startups"
              }
            >
              {role === "investor" ? "Ver oportunidades" : "Ver startups"}
            </ActionLink>
          )
        }
      />
      <dl className="ws-stats">
        {role === "accelerator" ? (
          <Stat label="Startups acompanhadas" value={data.startups.length} />
        ) : role === "investor" ? (
          <Stat label="Startups associadas" value={data.startups.length} />
        ) : (
          <Stat label="Rondas abertas" value={open.length} />
        )}
        <Stat label="Negociações em curso" value={active.length} />
        {role === "accelerator" ? (
          <Stat label="Rondas abertas" value={open.length} />
        ) : (
          <Stat label="Documentos disponíveis" value={data.documents.length} />
        )}
      </dl>
      {role === "accelerator" ? (
        <>
          <div className="ws-section-header">
            <h2>Startups acompanhadas</h2>
            <Link href="/workspace/startups" className="ws-text-link">
              Ver todas
            </Link>
          </div>
          {data.startups.length ? (
            <ul className="ws-list">
              {data.startups.slice(0, 4).map((s) => (
                <Row
                  key={s.id}
                  href={"/workspace/startups/" + s.id}
                  title={s.name}
                  description={s.sector}
                  meta={
                    <Badge>
                      {
                        data.rounds.filter(
                          (r) => r.startup_id === s.id && r.status === "open",
                        ).length
                      }{" "}
                      rondas abertas
                    </Badge>
                  }
                />
              ))}
            </ul>
          ) : (
            <Empty
              title="Ainda não existem startups vinculadas"
              description="As startups acompanhadas pela sua organização aparecerão aqui."
            />
          )}
        </>
      ) : (
        <>
          <div className="ws-section-header">
            <h2>
              {role === "startup" ? "Próximos passos" : "Em acompanhamento"}
            </h2>
            <Link className="ws-text-link" href="/workspace/opportunities">
              Ver todas
            </Link>
          </div>
          {active.length ? (
            <ul className="ws-list">
              {active.slice(0, 4).map((p) => {
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
                    description={`${p.round_name} · ${p.next_step || "Próximo passo por definir"}`}
                    meta={<Badge>{stages[p.stage]}</Badge>}
                  />
                );
              })}
            </ul>
          ) : (
            <Empty
              title={
                role === "startup"
                  ? "Comece uma negociação"
                  : "Sem oportunidades em acompanhamento"
              }
              description={
                role === "startup"
                  ? "Abra uma ronda e associe um potencial investidor."
                  : "As startups com uma negociação associada à sua organização aparecerão aqui."
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
