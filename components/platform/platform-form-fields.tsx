import { cn } from "@/lib/utils"

type FieldShellProps = {
  children: React.ReactNode
  className?: string
  hint?: string
  label: string
}

function FieldShell({ children, className, hint, label }: FieldShellProps) {
  return (
    <label className={cn("grid gap-2", className)}>
      <span className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="text-xs font-semibold leading-5 text-muted-foreground">
          {hint}
        </span>
      ) : null}
    </label>
  )
}

type PlatformFormFieldProps = {
  className?: string
  defaultValue?: string
  hint?: string
  label: string
  name: string
  placeholder?: string
  required?: boolean
  type?: "email" | "number" | "tel" | "text" | "url"
}

export function PlatformFormField({
  className,
  defaultValue,
  hint,
  label,
  name,
  placeholder,
  required,
  type = "text",
}: PlatformFormFieldProps) {
  return (
    <FieldShell className={className} hint={hint} label={label}>
      <input
        className="h-11 rounded-lg border border-border bg-background px-3 text-sm font-semibold outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[color:var(--seed-petroleum)]"
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </FieldShell>
  )
}

type PlatformTextAreaProps = {
  className?: string
  defaultValue?: string
  hint?: string
  label: string
  name: string
  placeholder?: string
  required?: boolean
  rows?: number
}

export function PlatformTextArea({
  className,
  defaultValue,
  hint,
  label,
  name,
  placeholder,
  required,
  rows = 5,
}: PlatformTextAreaProps) {
  return (
    <FieldShell className={className} hint={hint} label={label}>
      <textarea
        className="min-h-32 rounded-lg border border-border bg-background px-3 py-3 text-sm font-semibold leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[color:var(--seed-petroleum)]"
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </FieldShell>
  )
}

type PlatformSelectFieldProps = {
  className?: string
  defaultValue?: string
  hint?: string
  label: string
  name: string
  options: string[]
  required?: boolean
}

export function PlatformSelectField({
  className,
  defaultValue,
  hint,
  label,
  name,
  options,
  required,
}: PlatformSelectFieldProps) {
  return (
    <FieldShell className={className} hint={hint} label={label}>
      <select
        className="h-11 rounded-lg border border-border bg-background px-3 text-sm font-semibold outline-none transition-colors focus:border-[color:var(--seed-petroleum)]"
        defaultValue={defaultValue}
        name={name}
        required={required}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

type PlatformCheckboxProps = {
  defaultChecked?: boolean
  description?: string
  label: string
  name: string
}

export function PlatformCheckbox({
  defaultChecked,
  description,
  label,
  name,
}: PlatformCheckboxProps) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-lg border border-border bg-background p-4">
      <span>
        <span className="block text-sm font-extrabold text-[color:var(--seed-petroleum)]">
          {label}
        </span>
        {description ? (
          <span className="mt-1 block text-xs font-semibold leading-5 text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      <input
        className="mt-1 size-4 shrink-0 accent-[color:var(--seed-petroleum)]"
        defaultChecked={defaultChecked}
        name={name}
        type="checkbox"
      />
    </label>
  )
}
