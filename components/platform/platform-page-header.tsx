type PlatformPageHeaderProps = {
  title: string
  description: string
  action?: React.ReactNode
  eyebrow: string
  inbox?: React.ReactNode
}

export function PlatformPageHeader({
  action,
  description,
  eyebrow,
  inbox,
  title,
}: PlatformPageHeaderProps) {
  return (
    <header className="border-b border-border bg-background/[0.9] px-4 py-5 backdrop-blur md:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)] md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {inbox}
          {action}
        </div>
      </div>
    </header>
  )
}
