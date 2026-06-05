import Link from "next/link"
import { UsersRound } from "lucide-react"

import { Button } from "@/components/ui/button"

import { StartupPageHeader } from "./startup-page-header"
import { teamMembers } from "./startup-data"

export function StartupTeamPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/team/new">Adicionar membro</Link>
          </Button>
        }
        description="Página dedicada à equipa fundadora, responsabilidades e experiência operacional."
        title="Equipa da startup"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
            key={member.name}
          >
            <div className="flex size-11 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
              <UsersRound aria-hidden="true" className="size-5" />
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {member.name}
              </h2>
              <span className="rounded-full bg-[color:var(--seed-cream)] px-2 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                {member.role}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
              {member.detail}
            </p>
          </article>
        ))}
      </div>
    </>
  )
}
