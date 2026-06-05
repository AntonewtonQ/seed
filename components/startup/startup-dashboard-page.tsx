import Link from "next/link"
import { ArrowRight, Building2, FolderLock } from "lucide-react"

import { Button } from "@/components/ui/button"

import { StartupPageHeader } from "./startup-page-header"
import { startupProfile } from "./startup-data"
import {
  DocumentsList,
  MilestonesCard,
  NextActionsCard,
  ReadinessCard,
  StartupMetricCards,
} from "./startup-widgets"

export function StartupDashboardPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/documents">Preparar data room</Link>
          </Button>
        }
        description="Uma visão rápida do que está pronto, do que precisa de atenção e do que deve ser feito antes de apresentar a startup a investidores."
        title="Dashboard da startup"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8">
        <section className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                  <Building2 aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                    {startupProfile.status}
                  </p>
                  <h2 className="text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    {startupProfile.name}
                  </h2>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-muted-foreground">
                {startupProfile.tagline}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[startupProfile.sector, startupProfile.stage, startupProfile.fundingTarget].map(
                  (item) => (
                    <span
                      className="rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]"
                      key={item}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="rounded-lg bg-[color:var(--seed-petroleum)] p-4 text-[color:var(--seed-cream)]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-extrabold">Prontidão</p>
                <span className="text-3xl font-extrabold text-white">
                  {startupProfile.completeness}%
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-[color:var(--seed-gold)]"
                  style={{ width: `${startupProfile.completeness}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-semibold leading-5 text-[color:var(--seed-tint)]">
                Próximo passo: {startupProfile.nextStep}.
              </p>
            </div>
          </div>
        </section>

        <StartupMetricCards />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-4">
            <ReadinessCard />

            <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                    Data room
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    Documentos que exigem atenção
                  </h2>
                </div>
                <FolderLock
                  aria-hidden="true"
                  className="size-6 text-[color:var(--seed-petroleum)]"
                />
              </div>
              <div className="mt-5">
                <DocumentsList compact />
              </div>
              <Button asChild className="mt-5" variant="outline">
                <Link href="/startup/documents">
                  Ver documentos
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </article>
          </div>

          <div className="grid content-start gap-4">
            <NextActionsCard />
            <MilestonesCard />
          </div>
        </div>
      </div>
    </>
  )
}
