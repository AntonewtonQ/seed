import { cn } from "@/lib/utils"

type SeedMarkProps = {
  className?: string
  title?: string
  tone?: "default" | "light"
}

// Rebento num quadrado arredondado; mesma geometria de public/brand/seed-symbol.svg.
export function SeedMark({
  className,
  title = "SEED",
  tone = "default",
}: SeedMarkProps) {
  const isLight = tone === "light"
  const surface = isLight ? "#ffffff" : "var(--brand)"
  const sprout = isLight ? "var(--brand)" : "#ffffff"

  return (
    <svg
      aria-label={title}
      className={cn("block size-8", className)}
      role="img"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <rect fill={surface} height="32" rx="8" width="32" />
      <path
        d="M16 25V15"
        fill="none"
        stroke={sprout}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path d="M16 18.5C16 13.5 12.5 11 8 11c0 4.6 3 7.5 8 7.5Z" fill={sprout} />
      <path d="M16 15.5C16 10.5 19.5 7 24 7c0 5-3 8.5-8 8.5Z" fill={sprout} />
    </svg>
  )
}
