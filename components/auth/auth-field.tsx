import type { InputHTMLAttributes } from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: LucideIcon
  label: string
  hint?: string
}

export function AuthField({
  className,
  hint,
  icon: Icon,
  id,
  label,
  ...props
}: AuthFieldProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <label
          className="text-sm font-extrabold text-[color:var(--seed-petroleum)]"
          htmlFor={id}
        >
          {label}
        </label>
        {hint ? (
          <span className="text-xs font-bold text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </div>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          className={cn(
            "h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm font-semibold text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[color:var(--seed-gold)] focus:ring-3 focus:ring-[color:var(--seed-gold)]/20",
            className
          )}
          id={id}
          {...props}
        />
      </div>
    </div>
  )
}
