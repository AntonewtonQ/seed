import Link from "next/link"
import { Building2, CircleDollarSign, MapPin, Target } from "lucide-react"

import { Button } from "@/components/ui/button"

import { investorProfile } from "./investor-data"
import { InvestorPageHeader } from "./investor-page-header"
import { InvestorMandateCard } from "./investor-widgets"

export function InvestorProfilePage() {
  const profileFacts = [
    { label: "Tipo", value: investorProfile.type, icon: Building2 },
    { label: "Ticket", value: investorProfile.ticket, icon: CircleDollarSign },
    { label: "Geografia", value: investorProfile.geography, icon: MapPin },
    { label: "Fase", value: investorProfile.stage, icon: Target },
  ]

  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/investor/profile/edit">Editar perfil</Link>
          </Button>
        }
        description="Mandato, tese, contacto principal e preferências de investimento do investidor."
        title="Perfil do investidor"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-4">
          <article className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
              {investorProfile.status}
            </p>
            <h2 className="mt-1 text-4xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
              {investorProfile.name}
            </h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-foreground">
              {investorProfile.thesis}
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
          <InvestorMandateCard />
          <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
              Contacto
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
              {investorProfile.lead}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              {investorProfile.email}
              <br />
              {investorProfile.phone}
              <br />
              {investorProfile.website}
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
