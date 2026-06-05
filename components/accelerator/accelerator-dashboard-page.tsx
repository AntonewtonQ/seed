import Link from "next/link"
import { Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"

import { acceleratorProfile } from "./accelerator-data"
import { AcceleratorPageHeader } from "./accelerator-page-header"
import {
  AcceleratedStartupsList,
  AcceleratorDataRoomsCard,
  AcceleratorDiligenceCard,
  AcceleratorMandateCard,
  AcceleratorMetricCards,
  AcceleratorPipelineCard,
  ProgramsCard,
} from "./accelerator-widgets"

export function AcceleratorDashboardPage() {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/accelerator/startups">Ver startups</Link>
          </Button>
        }
        description="Visão geral dos programas, startups aceleradas, pipeline de preparação e bloqueios de due diligence."
        title="Dashboard da aceleradora"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8">
        <section className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                  <Rocket aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                    {acceleratorProfile.status}
                  </p>
                  <h2 className="text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    {acceleratorProfile.name}
                  </h2>
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-6 text-muted-foreground">
                {acceleratorProfile.tagline}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[acceleratorProfile.cohort, acceleratorProfile.focus, acceleratorProfile.location].map(
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

            <AcceleratorMandateCard />
          </div>
        </section>

        <AcceleratorMetricCards />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="grid gap-4">
            <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                    Portfólio
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    Startups que precisam de atenção
                  </h2>
                </div>
                <Button asChild variant="outline">
                  <Link href="/accelerator/startups">Ver todas</Link>
                </Button>
              </div>
              <div className="mt-5">
                <AcceleratedStartupsList compact />
              </div>
            </article>

            <AcceleratorPipelineCard />
          </div>

          <div className="grid content-start gap-4">
            <ProgramsCard />
            <AcceleratorDiligenceCard />
            <AcceleratorDataRoomsCard />
          </div>
        </div>
      </div>
    </>
  )
}
