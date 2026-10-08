"use client";
import { useWorkspace } from "./context";
import { Collection } from "./collection";
import { PageHeading, NotAvailable, Stat, Badge, stamp } from "./ui";
export function MetricsScreen({ id }: { id?: string }) {
  const { data } = useWorkspace();
  if (!id)
    return (
      <>
        <PageHeading
          title="Indicadores"
          description="Escolha uma ronda para consultar os seus resultados de acompanhamento."
        />
        <Collection
          items={data.rounds.map((r) => ({
            id: r.id,
            title: r.name,
            description: data.startups.find((s) => s.id === r.startup_id)?.name,
            href: "/workspace/metrics/" + r.id,
            meta: <Badge>{r.currency}</Badge>,
          }))}
          empty="Ainda não há rondas para analisar"
        />
      </>
    );
  const r = data.rounds.find((r) => r.id === id),
    m = data.metrics.find((m) => m.roundId === id);
  if (!r || !m) return <NotAvailable />;
  return (
    <>
      <PageHeading
        title="Indicadores da ronda"
        description={r.name}
        back={{ href: "/workspace/metrics", label: "Indicadores" }}
      />
      <dl className="ws-stats">
        <Stat label="Negociações" value={m.opportunities} />
        <Stat
          label="Reunião → soft commit"
          value={
            m.conversion === null
              ? "Não calculável"
              : m.conversion.toFixed(1) + "%"
          }
          detail={`${m.numerator} de ${m.denominator} negociações com reunião`}
        />
        <Stat
          label="Dias até ao primeiro soft commit"
          value={
            m.daysToFirstCommit === null
              ? "Não calculável"
              : m.daysToFirstCommit.toFixed(2)
          }
        />
      </dl>
      <p className="ws-note">
        Período: {stamp(r.created_at)} até à consulta. Apenas relações
        autorizadas para a sua conta.
      </p>
      <details className="ws-panel mt-6">
        <summary className="cursor-pointer font-semibold">
          Como são calculados estes indicadores?
        </summary>
        <div className="ws-note mt-4 space-y-3">
          <p>
            <strong>Conversão:</strong> negociações com transição para soft
            commit após a primeira transição para reunião, divididas pelas
            negociações que chegaram a reunião, multiplicadas por 100. Sem
            denominador, o resultado não é calculável. Recuos posteriores não
            apagam a conversão histórica.
          </p>
          <p>
            <strong>Tempo:</strong> diferença entre o primeiro evento soft
            commit e a abertura da ronda, em dias. Sem evento, não é calculável.
            As datas provêm do histórico de etapas; notas de reunião não alteram
            a etapa.
          </p>
          <p>
            Estes indicadores acompanham o processo. Não medem dinheiro recebido
            nem eficácia da captação.
          </p>
        </div>
      </details>
    </>
  );
}
