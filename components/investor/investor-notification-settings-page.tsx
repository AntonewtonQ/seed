import { PlatformCheckbox } from "@/components/platform/platform-form-fields"
import { saveInvestorNotificationSettingsAction } from "@/lib/investor-actions"

import { InvestorWizard } from "./investor-wizard"

export function InvestorNotificationSettingsPage() {
  return (
    <InvestorWizard
      action={saveInvestorNotificationSettingsAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Preferências por utilizador
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            Depois da autenticação completa, estas opções devem ser guardadas por membro da equipa do investidor.
          </h2>
        </article>
      }
      cancelHref="/investor/settings"
      description="Defina que eventos devem gerar alertas para o investidor."
      steps={[
        { label: "Pipeline", description: "Novos matches e mudança de fase." },
        { label: "Data rooms", description: "Documentos e permissões." },
        { label: "Diligence", description: "Tarefas, bloqueios e prazos." },
      ]}
      submitLabel="Guardar preferências"
      title="Preferências de notificações"
    >
      <div className="grid gap-3">
        <PlatformCheckbox
          defaultChecked
          description="Avisar quando uma startup com alto encaixe entrar no pipeline."
          label="Novas oportunidades compatíveis"
          name="new-matches"
        />
        <PlatformCheckbox
          defaultChecked
          description="Avisar sobre documentos novos, removidos ou atualizados."
          label="Atualizações de data room"
          name="data-room-events"
        />
        <PlatformCheckbox
          defaultChecked
          description="Avisar quando uma tarefa de due diligence ficar pendente."
          label="Bloqueios de due diligence"
          name="diligence-blockers"
        />
        <PlatformCheckbox
          description="Receber resumo semanal do pipeline por email."
          label="Resumo semanal"
          name="weekly-summary"
        />
      </div>
    </InvestorWizard>
  )
}
