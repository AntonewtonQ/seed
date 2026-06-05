import Link from "next/link"
import { Building2, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

import { acceleratorProfile } from "./accelerator-data"
import { AcceleratorPageHeader } from "./accelerator-page-header"
import { AcceleratorMandateCard } from "./accelerator-widgets"

export function AcceleratorProfilePage() {
  const profileFacts = [
    { label: "Tipo", value: acceleratorProfile.type, icon: Building2 },
    { label: "Localização", value: acceleratorProfile.location, icon: MapPin },
    { label: "Email", value: acceleratorProfile.email, icon: Mail },
    { label: "Telefone", value: acceleratorProfile.phone, icon: Phone },
  ]

  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/accelerator/profile/edit">Editar perfil</Link>
          </Button>
        }
        description="Identidade institucional, foco programático e canais oficiais da aceleradora."
        title="Perfil da aceleradora"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-4">
          <article className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
              {acceleratorProfile.status}
            </p>
            <h2 className="mt-1 text-4xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
              {acceleratorProfile.name}
            </h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-foreground">
              {acceleratorProfile.tagline}
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {profileFacts.map((fact) => {
              const Icon = fact.icon

              return (
                <article
                  className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
                  key={fact.label}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <p className="mt-4 text-xs font-bold text-muted-foreground">
                    {fact.label}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
                    {fact.value}
                  </h3>
                </article>
              )
            })}
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <AcceleratorMandateCard />
          <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
              Responsável
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
              {acceleratorProfile.lead}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              {acceleratorProfile.cohort}
              <br />
              {acceleratorProfile.website}
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
