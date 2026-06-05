import Link from "next/link"
import { ArrowLeft, FileCheck, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { StartupDocument } from "@/lib/startup-service"
import { cn } from "@/lib/utils"

import { statusTone } from "./startup-data"
import { StartupPageHeader } from "./startup-page-header"

type StartupDocumentDetailPageProps = {
  document: StartupDocument
}

export function StartupDocumentDetailPage({
  document,
}: StartupDocumentDetailPageProps) {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href="/startup/documents">
              <ArrowLeft aria-hidden="true" />
              Voltar
            </Link>
          </Button>
        }
        description="Detalhe do documento no data room, com estado, responsável e ação necessária."
        title={document.name}
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                {document.category}
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {document.name}
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
                {document.description}
              </p>
            </div>
            <span
              className={cn(
                "w-fit rounded-full border px-3 py-1 text-xs font-extrabold",
                statusTone[document.status]
              )}
            >
              {document.status}
            </span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ["Responsável", document.owner],
              ["Atualização", document.updatedAt],
              ["Visibilidade", document.visibility],
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
            <div className="flex items-start gap-3">
              <FileCheck
                aria-hidden="true"
                className="mt-1 size-5 text-[color:var(--seed-petroleum)]"
              />
              <div>
                <h3 className="text-lg font-extrabold text-[color:var(--seed-petroleum)]">
                  Ação necessária
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  {document.requiredAction}
                </p>
              </div>
            </div>
          </article>
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <ShieldCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Preparado para permissões
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              Esta página está pronta para receber versões, logs de acesso e permissões por investidor.
            </p>
            <Button asChild className="mt-5" variant="secondary">
              <Link href="/startup/documents/new">Adicionar nova versão</Link>
            </Button>
          </article>
        </aside>
      </div>
    </>
  )
}
