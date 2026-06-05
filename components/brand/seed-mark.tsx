import { cn } from "@/lib/utils"

type SeedMarkProps = {
  className?: string
  title?: string
  tone?: "default" | "light"
}

export function SeedMark({
  className,
  title = "SEED",
  tone = "default",
}: SeedMarkProps) {
  const isLight = tone === "light"
  const leftStroke = isLight ? "var(--seed-tint)" : "var(--seed-petroleum)"
  const rightStroke = "var(--seed-gold)"
  const arrowFill = isLight ? "var(--seed-cream)" : "var(--seed-petroleum)"
  const dotFill = isLight ? "var(--seed-cream)" : "var(--seed-petroleum)"

  return (
    <svg
      aria-label={title}
      className={cn("block size-10", className)}
      role="img"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <circle cx="50" cy="13" fill={dotFill} r="10" />
      <path
        d="M38 24 18 36v30l20 12"
        fill="none"
        stroke={leftStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />
      <path
        d="M62 24 82 36v30L62 78"
        fill="none"
        stroke={rightStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />
      <path
        d="M50 35 31 55h11v27h16V55h11L50 35Z"
        fill={arrowFill}
      />
    </svg>
  )
}
