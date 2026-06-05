import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { StartupPageHeader } from "./startup-page-header"

type WizardStep = {
  label: string
  description: string
}

type StartupWizardProps = {
  action: React.ComponentProps<"form">["action"]
  aside?: React.ReactNode
  cancelHref: string
  children: React.ReactNode
  currentStep?: number
  description: string
  steps: WizardStep[]
  submitLabel: string
  title: string
}

export function StartupWizard({
  action,
  aside,
  cancelHref,
  children,
  currentStep = 0,
  description,
  steps,
  submitLabel,
  title,
}: StartupWizardProps) {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg" variant="outline">
            <Link href={cancelHref}>
              <ArrowLeft aria-hidden="true" />
              Voltar
            </Link>
          </Button>
        }
        description={description}
        title={title}
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <form
          action={action}
          className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => {
              const isActive = index === currentStep
              const isComplete = index < currentStep

              return (
                <div
                  className={cn(
                    "rounded-lg border p-4",
                    isActive
                      ? "border-[color:var(--seed-petroleum)] bg-[color:var(--seed-tint)]"
                      : "border-border bg-background"
                  )}
                  key={step.label}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full text-xs font-extrabold",
                        isComplete || isActive
                          ? "bg-[color:var(--seed-petroleum)] text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isComplete ? (
                        <CheckCircle2 aria-hidden="true" className="size-4" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <p className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                      {step.label}
                    </p>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-5 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 grid gap-5">{children}</div>

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <Button asChild variant="outline">
              <Link href={cancelHref}>Cancelar</Link>
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </div>
        </form>

        {aside ? <aside className="grid content-start gap-4">{aside}</aside> : null}
      </div>
    </>
  )
}
