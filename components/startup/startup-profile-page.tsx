import Link from "next/link"
import { Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { StartupPageHeader } from "./startup-page-header"
import { startupContacts, startupProfile } from "./startup-data"
import { ProfileVisibilityCard } from "./startup-widgets"

export function StartupProfilePage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/profile/edit">Editar perfil</Link>
          </Button>
        }
        description="Informação institucional da startup, contactos e posicionamento. Esta página deve responder rapidamente: quem é a startup, o que faz e onde está."
        title="Perfil institucional"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-4">
          <article className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[color:var(--seed-petroleum)] text-[color:var(--seed-cream)]">
                <Building2 aria-hidden="true" className="size-7" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                  {startupProfile.status}
                </p>
                <h2 className="mt-1 text-4xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                  {startupProfile.name}
                </h2>
                <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-foreground">
                  {startupProfile.tagline}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[startupProfile.sector, startupProfile.stage, `Fundada em ${startupProfile.founded}`].map(
                    (item) => (
                      <span
                        className="rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]"
                        key={item}
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
              Contactos
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
              Como a startup pode ser contactada
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {startupContacts.map((contact) => {
                const Icon = contact.icon

                return (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
                    key={contact.label}
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                      <Icon aria-hidden="true" className="size-4" />
                    </div>
                    <p className="min-w-0 truncate text-sm font-extrabold">
                      {contact.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </article>
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
              Prontidão do perfil
            </p>
            <strong className="mt-1 block text-4xl font-extrabold text-white">
              {startupProfile.completeness}%
            </strong>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[color:var(--seed-gold)]"
                style={{ width: `${startupProfile.completeness}%` }}
              />
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              {startupProfile.nextStep}.
            </p>
          </article>
          <ProfileVisibilityCard />
        </aside>
      </div>
    </>
  )
}
