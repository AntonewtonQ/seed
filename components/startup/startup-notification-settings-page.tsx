import { saveNotificationSettingsAction } from "@/lib/startup-actions"

import { StartupCheckbox } from "./startup-form-fields"
import { StartupWizard } from "./startup-wizard"

export function StartupNotificationSettingsPage() {
  return (
    <StartupWizard
      action={saveNotificationSettingsAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Preferências
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            Estes controlos serão mapeados para preferências por utilizador quando houver autenticação completa.
          </h2>
        </article>
      }
      cancelHref="/startup/settings"
      description="Defina como a equipa da startup quer receber alertas sobre documentos, mensagens e due diligence."
      steps={[
        { label: "Canais", description: "Email, app e atividade." },
        { label: "Prioridade", description: "Alertas críticos e rotina." },
        { label: "Equipa", description: "Preferências por utilizador." },
      ]}
      submitLabel="Guardar preferências"
      title="Preferências de notificações"
    >
      <div className="grid gap-3">
        <StartupCheckbox
          defaultChecked
          description="Receber alertas de documentos em falta, expirados ou em revisão."
          label="Alertas de data room"
          name="data-room-alerts"
        />
        <StartupCheckbox
          defaultChecked
          description="Receber mensagens de investidores qualificados e da equipa SEED."
          label="Mensagens importantes"
          name="priority-messages"
        />
        <StartupCheckbox
          defaultChecked
          description="Receber avisos quando o checklist bloquear partilha com investidores."
          label="Bloqueios de due diligence"
          name="due-diligence-blockers"
        />
        <StartupCheckbox
          description="Receber um resumo semanal sobre prontidão, métricas e documentos."
          label="Resumo semanal"
          name="weekly-summary"
        />
      </div>
    </StartupWizard>
  )
}
