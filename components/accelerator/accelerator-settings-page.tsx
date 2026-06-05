import Link from "next/link"

import { PlatformCheckbox } from "@/components/platform/platform-form-fields"
import { Button } from "@/components/ui/button"
import { saveAcceleratorSettingsAction } from "@/lib/accelerator-actions"

import { AcceleratorPageHeader } from "./accelerator-page-header"
import { AcceleratorMandateCard } from "./accelerator-widgets"

export function AcceleratorSettingsPage() {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/accelerator/settings/notifications">
              Ajustar alertas
            </Link>
          </Button>
        }
        description="Preferências de acompanhamento, visibilidade e notificações da aceleradora."
        title="Definições da aceleradora"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <form
          action={saveAcceleratorSettingsAction}
          className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
        >
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Preferências
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Acompanhamento e visibilidade
          </h2>
          <div className="mt-5 grid gap-3">
            <PlatformCheckbox
              defaultChecked
              description="Alertar quando startups tiverem bloqueios críticos de data room."
              label="Bloqueios críticos"
              name="critical-blockers"
            />
            <PlatformCheckbox
              defaultChecked
              description="Sugerir startups prontas para serem apresentadas a investidores."
              label="Sugestões para investidores"
              name="investor-ready-suggestions"
            />
            <PlatformCheckbox
              description="Permitir que investidores qualificados vejam o perfil institucional da aceleradora."
              label="Perfil visível para investidores"
              name="visible-profile"
            />
          </div>
          <Button className="mt-5" type="submit">
            Guardar alterações
          </Button>
        </form>

        <aside className="grid content-start gap-4">
          <AcceleratorMandateCard />
        </aside>
      </div>
    </>
  )
}
