import Link from "next/link"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import { InvestorPageHeader } from "./investor-page-header"
import { InvestorMandateCard, OpportunitiesList } from "./investor-widgets"

export function InvestorOpportunitiesPage() {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href="/investor/profile/edit">
              <SlidersHorizontal aria-hidden="true" />
              Ajustar mandato
            </Link>
          </Button>
        }
        description="Startups priorizadas pelo encaixe com tese, ticket, fase e critérios de due diligence."
        title="Oportunidades"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                Matching
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                Startups recomendadas
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/investor/pipeline">Ver pipeline</Link>
            </Button>
          </div>
          <div className="mt-5">
            <OpportunitiesList />
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <InvestorMandateCard />
        </aside>
      </div>
    </>
  )
}
