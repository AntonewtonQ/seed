import Link from "next/link"

type AuthCardProps = {
  children: React.ReactNode
  description: string
  eyebrow?: string
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
    <section className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        {eyebrow ? (
          <p className="text-sm text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        {statusMessage ? (
          <div
            className="mt-5 rounded-md border border-border bg-muted px-4 py-3 text-sm leading-6"
            role="status"
          >
            {statusMessage}
          </div>
        ) : null}

        <div className="mt-6">{children}</div>
      </div>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        {switchText}{" "}
        <Link
          className="font-medium text-[color:var(--seed-petroleum)] underline underline-offset-4"
          href={switchHref}
        >
          {switchAction}
        </Link>
      </p>
    </section>
  )
}
