import Link from "next/link"
import { ArrowLeft, FolderOpen, ShieldCheck, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { InvestorOpportunity } from "@/lib/investor-service"
import { cn } from "@/lib/utils"

import { opportunityStatusTone } from "./investor-data"
import { InvestorPageHeader } from "./investor-page-header"

type InvestorOpportunityDetailPageProps = {
  opportunity: InvestorOpportunity
}

export function InvestorOpportunityDetailPage({
  opportunity,
}: InvestorOpportunityDetailPageProps) {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href="/investor/opportunities">
              <ArrowLeft aria-hidden="true" />
              Voltar
            </Link>
          </Button>
        }
        description="Resumo de investimento, match com mandato, estado de análise e próximos passos."
        title={opportunity.name}
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-extrabold",
                    opportunityStatusTone[opportunity.status]
                  )}
                >
                  {opportunity.status}
                </span>
                <span className="rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                  {opportunity.stage}
                </span>
              </div>
              <h2 className="mt-4 text-4xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {opportunity.name}
              </h2>
              <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-foreground">
                {opportunity.summary}
              </p>
            </div>
            <div className="rounded-lg bg-[color:var(--seed-cream)] p-5 text-center">
              <p className="text-xs font-bold text-muted-foreground">
                Match com mandato
              </p>
              <strong className="mt-1 block text-5xl font-extrabold text-[color:var(--seed-petroleum)]">
                {opportunity.match}%
              </strong>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Setor", opportunity.sector],
              ["Localização", opportunity.location],
              ["Pedido", opportunity.ask],
            ].map(([label, value]) => (
              <div
                className="rounded-lg border border-border bg-background p-4"
                key={label}
              >
                <p className="text-xs font-bold text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {opportunity.metrics.map((metric) => (
              <div
                className="rounded-lg border border-border bg-background p-4"
                key={metric}
              >
                <p className="text-xs font-bold text-muted-foreground">
                  Métrica
                </p>
                <p className="mt-2 text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                  {metric}
                </p>
              </div>
            ))}
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <Target
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Próxima ação
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              {opportunity.nextAction}
            </p>
          </article>

          <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <ShieldCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-petroleum)]"
            />
            <h2 className="mt-4 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
              Due diligence
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              {opportunity.diligenceStatus}
            </p>
            <div className="mt-5 grid gap-2">
              <Button asChild>
                <Link href="/investor/diligence">
                  <ShieldCheck aria-hidden="true" />
                  Ver tarefas
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/investor/data-rooms">
                  <FolderOpen aria-hidden="true" />
                  Abrir data room
                </Link>
              </Button>
            </div>
          </article>
        </aside>
      </div>
    </>
  )
}
