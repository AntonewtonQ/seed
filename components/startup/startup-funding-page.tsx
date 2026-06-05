import Link from "next/link"
import { CircleDollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"

import { fundingUse, startupProfile } from "./startup-data"
import { StartupPageHeader } from "./startup-page-header"

export function StartupFundingPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/funding/request">Atualizar pedido</Link>
          </Button>
        }
        description="Página dedicada à captação: objetivo, instrumento, runway e uso previsto dos fundos."
        title="Captação de investimento"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-[color:var(--seed-gold)] text-[color:var(--seed-petroleum)]">
              <CircleDollarSign aria-hidden="true" className="size-6" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                Objetivo de captação
              </p>
              <h2 className="mt-1 text-5xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {startupProfile.fundingTarget}
              </h2>
              <p className="mt-2 text-sm font-extrabold text-muted-foreground">
                {startupProfile.fundingInstrument} · runway atual de{" "}
                {startupProfile.runway}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {fundingUse.map((item) => (
              <div className="grid gap-2" key={item.label}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold">{item.label}</span>
                  <span className="text-sm font-extrabold text-muted-foreground">
                    {item.value}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[color:var(--seed-gold)]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
              Próxima validação
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-normal">
              {startupProfile.nextStep}
            </h2>
          </article>
        </aside>
      </div>
    </>
  )
}
