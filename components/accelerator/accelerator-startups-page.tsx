import Link from "next/link"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import { AcceleratorPageHeader } from "./accelerator-page-header"
import {
  AcceleratedStartupsList,
  AcceleratorMandateCard,
} from "./accelerator-widgets"

export function AcceleratorStartupsPage() {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href="/accelerator/pipeline">
              <SlidersHorizontal aria-hidden="true" />
              Ver pipeline
            </Link>
          </Button>
        }
        description="Startups acompanhadas pela aceleradora, com estado de prontidão, bloqueios e próximos passos."
        title="Startups aceleradas"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                Portfólio
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                Startups em acompanhamento
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/accelerator/diligence">Ver bloqueios</Link>
            </Button>
          </div>
          <div className="mt-5">
            <AcceleratedStartupsList />
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <AcceleratorMandateCard />
        </aside>
      </div>
    </>
  )
}
