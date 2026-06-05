import Link from "next/link"
import { ArrowLeft, Building2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

import { startupMilestones, startupProfile } from "./startup-data"
import { StartupPageHeader } from "./startup-page-header"

export function StartupProfilePreviewPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href="/startup/profile">
              <ArrowLeft aria-hidden="true" />
              Voltar ao perfil
            </Link>
          </Button>
        }
        description="Simulação da versão partilhável do perfil da startup antes de abrir acesso a investidores."
        title="Pré-visualização do perfil"
      />

      <div className="px-4 py-6 md:px-8 md:py-8">
        <section className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
          <div className="bg-[color:var(--seed-petroleum)] p-8 text-[color:var(--seed-cream)]">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Building2 aria-hidden="true" className="size-7" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-gold-soft)]">
                  Perfil partilhável
                </p>
                <h2 className="mt-2 text-4xl font-extrabold tracking-normal text-white">
                  {startupProfile.name}
                </h2>
                <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[color:var(--seed-tint)]">
                  {startupProfile.tagline}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Setor", startupProfile.sector],
                ["Fase", startupProfile.stage],
                ["Captação", startupProfile.fundingTarget],
              ].map(([label, value]) => (
                <div
                  className="rounded-lg border border-border bg-background p-4"
                  key={label}
                >
                  <p className="text-xs font-bold text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-[color:var(--seed-petroleum)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <aside className="rounded-lg bg-[color:var(--seed-tint)] p-5">
              <ShieldCheck
                aria-hidden="true"
                className="size-6 text-[color:var(--seed-petroleum)]"
              />
              <h3 className="mt-4 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
                Acesso controlado
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
                Esta prévia simula o que um investidor qualificado verá após autorização da startup.
              </p>
            </aside>

            <div className="lg:col-span-2">
              <h3 className="text-xl font-extrabold text-[color:var(--seed-petroleum)]">
                Marcos
              </h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {startupMilestones.map((milestone) => (
                  <p
                    className="rounded-lg border border-border bg-background p-4 text-sm font-semibold leading-6 text-muted-foreground"
                    key={milestone}
                  >
                    {milestone}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
