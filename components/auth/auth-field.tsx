import type { InputHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
}

export function AuthField({
  className,
  hint,
  id,
  label,
  ...props
}: AuthFieldProps) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      <input
        className={cn(
          "h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-3 focus:ring-ring/20",
          className
        )}
        id={id}
        {...props}
      />
    </div>
  )
}
