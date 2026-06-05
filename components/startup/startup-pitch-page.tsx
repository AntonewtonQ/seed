import Link from "next/link"
import { ClipboardCheck, FileCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

import { pitchBlocks } from "./startup-data"
import { StartupPageHeader } from "./startup-page-header"

export function StartupPitchPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/pitch/wizard">Atualizar pitch</Link>
          </Button>
        }
        description="Espaço dedicado apenas à narrativa de investimento: problema, solução, produto, mercado e materiais de apresentação."
        title="Pitch da startup"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-4 md:grid-cols-2">
          {pitchBlocks.map((block) => (
            <article
              className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
              key={block.title}
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                <ClipboardCheck aria-hidden="true" className="size-5" />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {block.title}
              </h2>
              <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
                {block.text}
              </p>
            </article>
          ))}
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <FileCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Pitch deck
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              A versão principal do pitch deck está pronta. O próximo passo é
              garantir que o modelo financeiro conta a mesma história.
            </p>
            <Button asChild className="mt-5" variant="secondary">
              <Link href="/startup/pitch/deck">Ver pitch deck</Link>
            </Button>
          </article>
        </aside>
      </div>
    </>
  )
}
