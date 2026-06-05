import Link from "next/link"
import { ArrowLeft, Presentation } from "lucide-react"

import { Button } from "@/components/ui/button"

import { pitchBlocks, startupProfile } from "./startup-data"
import { StartupPageHeader } from "./startup-page-header"

export function StartupPitchDeckPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href="/startup/pitch">
              <ArrowLeft aria-hidden="true" />
              Voltar ao pitch
            </Link>
          </Button>
        }
        description="Pré-visualização do pitch deck preparada para revisão interna antes da partilha no data room."
        title="Pitch deck"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex items-start gap-4 border-b border-border pb-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-[color:var(--seed-petroleum)] text-[color:var(--seed-cream)]">
              <Presentation aria-hidden="true" className="size-6" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                Deck principal
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {startupProfile.name}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                {startupProfile.tagline}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pitchBlocks.map((block) => (
              <article
                className="min-h-40 rounded-lg border border-border bg-background p-5"
                key={block.id}
              >
                <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                  Slide
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-[color:var(--seed-petroleum)]">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
                  {block.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
              Próxima melhoria
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-normal">
              Anexar evidências das métricas e alinhar o pedido de captação.
            </h2>
            <Button asChild className="mt-5" variant="secondary">
              <Link href="/startup/pitch/wizard">Editar narrativa</Link>
            </Button>
          </article>
        </aside>
      </div>
    </>
  )
}
