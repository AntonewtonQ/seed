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
        compact ? "gap-2" : "gap-2.5",
        className
      )}
    >
      <SeedMark
        className={compact ? "size-6" : "size-8"}
        tone={tone}
        title="Logotipo SEED"
      />
      <div className="min-w-0">
        <div
          className={cn(
            "font-semibold leading-none tracking-tight",
            compact ? "text-lg" : "text-2xl",
            isLight ? "text-white" : "text-foreground"
          )}
        >
          SEED
        </div>
        {showTagline ? (
          <p
            className={cn(
              "mt-1 max-w-52 text-xs leading-4",
              isLight ? "text-white/80" : "text-muted-foreground"
            )}
          >
            Acompanhamento da captação pós-aceleração.
          </p>
        ) : null}
      </div>
    </div>
  )
}
