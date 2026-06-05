import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { diligenceStatusTone, investorDiligenceTasks } from "./investor-data"
import { InvestorPageHeader } from "./investor-page-header"

export function InvestorDiligencePage() {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/investor/data-rooms">Abrir data rooms</Link>
          </Button>
        }
        description="Tarefas de validação antes de avançar uma oportunidade para decisão de investimento."
        title="Due diligence"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Checklist do investidor
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Validações pendentes
          </h2>

          <div className="mt-5 grid gap-3">
            {investorDiligenceTasks.map((task) => (
              <Link
                className="grid gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/70 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                href={task.href}
                key={task.id}
              >
                <div>
                  <h3 className="text-lg font-extrabold text-[color:var(--seed-petroleum)]">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">
                    {task.startup} · {task.dueAt}
                  </p>
                </div>
                <span
                  className={cn(
                    "w-fit rounded-full border px-3 py-1 text-xs font-extrabold",
                    diligenceStatusTone[task.status]
                  )}
                >
                  {task.status}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <ShieldCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Decisão com evidências
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              As tarefas devem vir de documentos, métricas e perguntas levantadas no processo.
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
