import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"

import { Button } from "@/components/ui/button"

import { investorPipeline } from "./investor-data"
import { InvestorPageHeader } from "./investor-page-header"
import { PipelineCard } from "./investor-widgets"

export function InvestorPipelinePage() {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/investor/opportunities">Adicionar oportunidade</Link>
          </Button>
        }
        description="Pipeline de investimento organizado por fase, responsável, valor e próxima ação."
        title="Pipeline de investimento"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {investorPipeline.map((deal) => (
            <Link
              className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)] transition-colors hover:bg-muted/60 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              href={deal.href}
              key={deal.id}
            >
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                  {deal.stage}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[color:var(--seed-petroleum)]">
                  {deal.startup}
                </h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  Próximo passo: {deal.nextStep}. Responsável: {deal.owner}.
                </p>
              </div>
              <strong className="text-2xl font-extrabold text-[color:var(--seed-petroleum)]">
                {deal.value}
              </strong>
            </Link>
          ))}
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <BriefcaseBusiness
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Processo claro
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              Cada deal deve ter uma fase, dono e próximo passo para evitar pipeline parado.
            </p>
          </article>
          <PipelineCard />
        </aside>
      </div>
    </>
  )
}
