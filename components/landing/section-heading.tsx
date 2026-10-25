import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
