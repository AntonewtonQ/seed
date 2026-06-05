import Link from "next/link"
import { Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"

import { acceleratorPipeline } from "./accelerator-data"
import { AcceleratorPageHeader } from "./accelerator-page-header"
import { AcceleratorPipelineCard } from "./accelerator-widgets"

export function AcceleratorPipelinePage() {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/accelerator/diligence">Ver bloqueios</Link>
          </Button>
        }
        description="Pipeline das startups desde preparação até abertura para investidores."
        title="Pipeline da aceleradora"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {acceleratorPipeline.map((item) => (
            <Link
              className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)] transition-colors hover:bg-muted/60 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              href={item.href}
              key={item.id}
            >
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                  {item.stage}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[color:var(--seed-petroleum)]">
                  {item.startup}
                </h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  Próximo passo: {item.nextStep}. Responsável: {item.owner}.
                </p>
              </div>
              <strong className="text-2xl font-extrabold text-[color:var(--seed-petroleum)]">
                {item.readiness}
              </strong>
            </Link>
          ))}
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <Rocket
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Avanço por prontidão
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              A próxima etapa é calcular fases automaticamente a partir de documentos, métricas e checklist.
            </p>
          </article>
          <AcceleratorPipelineCard />
        </aside>
      </div>
    </>
  )
}
