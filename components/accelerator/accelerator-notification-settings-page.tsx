import { PlatformCheckbox } from "@/components/platform/platform-form-fields"
import { saveAcceleratorNotificationSettingsAction } from "@/lib/accelerator-actions"

import { AcceleratorWizard } from "./accelerator-wizard"

export function AcceleratorNotificationSettingsPage() {
  return (
    <AcceleratorWizard
      action={saveAcceleratorNotificationSettingsAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Preferências por equipa
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            Depois da autenticação completa, estes alertas devem ser configurados por membro da aceleradora.
          </h2>
        </article>
      }
      cancelHref="/accelerator/settings"
      description="Defina eventos que devem gerar alertas para a equipa da aceleradora."
      steps={[
        { label: "Startups", description: "Readiness, bloqueios e avanços." },
        { label: "Programas", description: "Cohorts, marcos e demo day." },
        { label: "Data rooms", description: "Documentos, permissões e revisão." },
      ]}
      submitLabel="Guardar preferências"
      title="Preferências de notificações"
    >
      <div className="grid gap-3">
        <PlatformCheckbox
          defaultChecked
          description="Avisar quando uma startup ultrapassar o limiar de prontidão."
          label="Startups prontas para investidores"
          name="investor-ready"
        />
        <PlatformCheckbox
          defaultChecked
          description="Avisar sobre documentos em falta, expirados ou em revisão."
          label="Bloqueios de data room"
          name="data-room-blockers"
        />
        <PlatformCheckbox
          defaultChecked
          description="Avisar quando um marco de programa estiver próximo."
          label="Marcos de programa"
          name="program-milestones"
        />
        <PlatformCheckbox
          description="Receber resumo semanal de progresso por cohort."
          label="Resumo semanal"
          name="weekly-summary"
        />
      </div>
    </AcceleratorWizard>
  )
}
