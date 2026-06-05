import { cn } from "@/lib/utils"

import { SeedMark } from "./seed-mark"

type SeedLogoProps = {
  className?: string
  compact?: boolean
  showTagline?: boolean
  tone?: "default" | "light"
}

export function SeedLogo({
  className,
  compact = false,
  showTagline = false,
  tone = "default",
}: SeedLogoProps) {
  const isLight = tone === "light"

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        compact ? "gap-2" : "gap-3",
        className
      )}
    >
      <SeedMark
        className={compact ? "size-8" : "size-11"}
        tone={tone}
        title="Logotipo SEED"
      />
      <div className="min-w-0">
        <div
          className={cn(
            "text-3xl font-extrabold leading-none tracking-normal",
            isLight
              ? "text-[color:var(--seed-cream)]"
              : "text-[color:var(--seed-petroleum)]"
          )}
        >
          SEED
        </div>
        {showTagline ? (
          <p
            className={cn(
              "mt-1 max-w-52 text-[0.68rem] font-medium leading-4",
              isLight
                ? "text-[color:var(--seed-tint)]"
                : "text-[color:var(--muted-foreground)]"
            )}
          >
            A ponte segura entre startups aceleradas e capital inteligente.
          </p>
        ) : null}
      </div>
    </div>
  )
}
