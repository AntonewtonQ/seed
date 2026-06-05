import Link from "next/link"

import { Button } from "@/components/ui/button"
import { saveStartupSettingsAction } from "@/lib/startup-actions"

import { StartupCheckbox } from "./startup-form-fields"
import { StartupPageHeader } from "./startup-page-header"
import { ProfileVisibilityCard } from "./startup-widgets"

export function StartupSettingsPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/settings/notifications">
              Ajustar alertas
            </Link>
          </Button>
        }
        description="Página dedicada às preferências da startup: visibilidade, notificações e preparação para partilha com investidores."
        title="Definições da startup"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <ProfileVisibilityCard />
        <form
          action={saveStartupSettingsAction}
          className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
        >
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Notificações
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Alertas da startup
          </h2>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-muted-foreground">
            <StartupCheckbox
              defaultChecked
              description="Receber alertas quando houver documentos em falta ou desatualizados."
              label="Documentos pendentes"
              name="pending-documents"
            />
            <StartupCheckbox
              defaultChecked
              description="Receber alertas quando a equipa SEED pedir revisão ou validação."
              label="Revisões de due diligence"
              name="due-diligence-review"
            />
          </div>
          <Button className="mt-5" type="submit">
            Guardar alterações
          </Button>
        </form>
      </div>
    </>
  )
}
