import Link from "next/link"
import { FolderOpen, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

import { investorDataRooms } from "./investor-data"
import { InvestorPageHeader } from "./investor-page-header"

export function InvestorDataRoomsPage() {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/investor/diligence">Ver tarefas</Link>
          </Button>
        }
        description="Data rooms a que o investidor tem acesso, com estado de permissão e atualização."
        title="Data rooms"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {investorDataRooms.map((room) => (
            <Link
              className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)] transition-colors hover:bg-muted/60 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              href={room.href}
              key={room.id}
            >
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                  {room.category}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[color:var(--seed-petroleum)]">
                  {room.startup}
                </h2>
                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                  {room.updatedAt}
                </p>
              </div>
              <span className="w-fit rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                {room.access}
              </span>
            </Link>
          ))}
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <FolderOpen
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Acesso controlado
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              Quando o backend entrar, esta página deve usar permissões por investidor, logs de acesso e expiração.
            </p>
          </article>
          <article className="rounded-lg border border-border bg-card p-5">
            <ShieldCheck
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-petroleum)]"
            />
            <h2 className="mt-4 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
              Auditoria futura
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Downloads, visualizações e comentários devem ficar registados por deal.
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
