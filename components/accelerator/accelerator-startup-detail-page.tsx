import Link from "next/link"
import { ArrowLeft, FolderOpen, ShieldCheck, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { AcceleratedStartup } from "@/lib/accelerator-service"
import { cn } from "@/lib/utils"

import { startupStatusTone } from "./accelerator-data"
import { AcceleratorPageHeader } from "./accelerator-page-header"

type AcceleratorStartupDetailPageProps = {
  startup: AcceleratedStartup
}

export function AcceleratorStartupDetailPage({
  startup,
}: AcceleratorStartupDetailPageProps) {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href="/accelerator/startups">
              <ArrowLeft aria-hidden="true" />
              Voltar
            </Link>
          </Button>
        }
        description="Resumo de acompanhamento da startup dentro do programa de aceleração."
        title={startup.name}
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-extrabold",
                    startupStatusTone[startup.status]
                  )}
                >
                  {startup.status}
                </span>
                <span className="rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                  {startup.stage}
                </span>
              </div>
              <h2 className="mt-4 text-4xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {startup.name}
              </h2>
              <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-foreground">
                {startup.summary}
              </p>
            </div>
            <div className="rounded-lg bg-[color:var(--seed-cream)] p-5 text-center">
              <p className="text-xs font-bold text-muted-foreground">
                Prontidão
              </p>
              <strong className="mt-1 block text-5xl font-extrabold text-[color:var(--seed-petroleum)]">
                {startup.readiness}%
              </strong>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Setor", startup.sector],
              ["Fundador", startup.founder],
              ["Pedido", startup.ask],
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

          <article className="mt-6 rounded-lg border border-border bg-background p-5">
            <h3 className="text-lg font-extrabold text-[color:var(--seed-petroleum)]">
              Bloqueios atuais
            </h3>
            <div className="mt-4 grid gap-2">
              {startup.blockers.map((blocker) => (
                <p
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
                  key={blocker}
                >
                  {blocker}
                </p>
              ))}
            </div>
          </article>
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
              {startup.nextAction}
            </p>
          </article>

          <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <ShieldCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-petroleum)]"
            />
            <h2 className="mt-4 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
              Preparação
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Acompanhe tarefas de readiness e documentos antes de abrir a startup a investidores.
            </p>
            <div className="mt-5 grid gap-2">
              <Button asChild>
                <Link href="/accelerator/diligence">
                  <ShieldCheck aria-hidden="true" />
                  Ver tarefas
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/accelerator/data-rooms">
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
