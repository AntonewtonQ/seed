import Link from "next/link"
import { BookOpenCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { acceleratorPrograms, programStatusTone } from "./accelerator-data"
import { AcceleratorPageHeader } from "./accelerator-page-header"

export function AcceleratorProgramsPage() {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/accelerator/startups">Ver startups</Link>
          </Button>
        }
        description="Programas, cohorts e marcos operacionais da aceleradora."
        title="Programas"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {acceleratorPrograms.map((program) => (
            <article
              className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
              key={program.id}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                    {program.cohort}
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    {program.name}
                  </h2>
                </div>
                <span
                  className={cn(
                    "w-fit rounded-full border px-3 py-1 text-xs font-extrabold",
                    programStatusTone[program.status]
                  )}
                >
                  {program.status}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-muted-foreground">
                {program.focus}
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-xs font-bold text-muted-foreground">
                    Startups
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
                    {program.startups}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-xs font-bold text-muted-foreground">
                    Próximo marco
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                    {program.nextMilestone}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <BookOpenCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Programas com resultado
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              Cada programa deve terminar com startups mais prontas para investidores e due diligence.
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
