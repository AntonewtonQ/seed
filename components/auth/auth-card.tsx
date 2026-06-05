import Link from "next/link"

import { cn } from "@/lib/utils"

type AuthCardProps = {
  children: React.ReactNode
  description: string
  eyebrow: string
  statusMessage?: string
  switchAction: string
  switchHref: string
  switchText: string
  title: string
}

export function AuthCard({
  children,
  description,
  eyebrow,
  statusMessage,
  switchAction,
  switchHref,
  switchText,
  title,
}: AuthCardProps) {
  return (
    <section className="w-full max-w-md">
      <div className="rounded-lg border border-border bg-card p-6 shadow-[0_22px_60px_rgba(15,61,62,0.12)] sm:p-8">
        <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-normal text-[color:var(--seed-petroleum)]">
          {title}
        </h1>
        <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
          {description}
        </p>

        {statusMessage ? (
          <div
            className={cn(
              "mt-5 rounded-lg border border-[color:var(--seed-gold)]/35 bg-[color:var(--seed-cream)] px-4 py-3 text-sm font-semibold leading-6 text-[color:var(--seed-petroleum)]"
            )}
            role="status"
          >
            {statusMessage}
          </div>
        ) : null}

        <div className="mt-7">{children}</div>
      </div>

      <p className="mt-5 text-center text-sm font-semibold text-muted-foreground">
        {switchText}{" "}
        <Link
          className="font-extrabold text-[color:var(--seed-petroleum)] underline-offset-4 hover:underline"
          href={switchHref}
        >
          {switchAction}
        </Link>
      </p>
    </section>
  )
}
