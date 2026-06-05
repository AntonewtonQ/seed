import { TrendingUp } from "lucide-react"

import { StartupPageHeader } from "./startup-page-header"
import { StartupMetricCards } from "./startup-widgets"

const tractionSignals = [
  { label: "Cooperativas ativas", value: "3", detail: "pilotos em operação" },
  { label: "Produtores registados", value: "1.280", detail: "+212 no mês" },
  { label: "Transações processadas", value: "4.820", detail: "últimos 30 dias" },
  { label: "Ticket médio", value: "USD 18", detail: "por transação" },
]

export function StartupMetricsPage() {
  return (
    <>
      <StartupPageHeader
        description="Página dedicada aos indicadores de tração que ajudam a startup a demonstrar progresso, qualidade do produto e potencial de crescimento."
        title="Métricas de tração"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8">
        <StartupMetricCards />

        <section className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                Tração operacional
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                Sinais que sustentam a narrativa
              </h2>
            </div>
            <TrendingUp
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-petroleum)]"
            />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tractionSignals.map((signal) => (
              <div
                className="rounded-lg border border-border bg-background p-4"
                key={signal.label}
              >
                <p className="text-xs font-bold text-muted-foreground">
                  {signal.label}
                </p>
                <strong className="mt-3 block text-3xl font-extrabold text-[color:var(--seed-petroleum)]">
                  {signal.value}
                </strong>
                <p className="mt-1 text-xs font-extrabold text-[color:var(--seed-petroleum-2)]">
                  {signal.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
