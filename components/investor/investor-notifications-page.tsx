import Link from "next/link"
import { BellRing, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { investorNotifications } from "./investor-data"
import { InvestorPageHeader } from "./investor-page-header"

const notificationTone = {
  info: "bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)]",
}

export function InvestorNotificationsPage() {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/investor/settings/notifications">
              <SlidersHorizontal aria-hidden="true" />
              Preferências
            </Link>
          </Button>
        }
        description="Alertas sobre data rooms, tarefas, pipeline e novas oportunidades compatíveis."
        title="Notificações"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {investorNotifications.map((notification) => (
            <Link
              className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)] transition-colors hover:bg-muted/60"
              href={notification.href}
              key={notification.id}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-extrabold",
                      notificationTone[notification.tone]
                    )}
                  >
                    {notification.receivedAt}
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    {notification.title}
                  </h2>
                </div>
                {notification.unread ? (
                  <span className="w-fit rounded-full bg-[color:var(--seed-gold)] px-2 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                    Nova
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
                {notification.body}
              </p>
            </Link>
          ))}
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <BellRing
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Alertas de decisão
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              Cada notificação aponta para a página onde o investidor pode agir.
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
