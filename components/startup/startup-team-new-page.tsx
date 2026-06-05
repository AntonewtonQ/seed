import { saveTeamMemberAction } from "@/lib/startup-actions"

import {
  StartupFormField,
  StartupSelectField,
  StartupTextArea,
} from "./startup-form-fields"
import { StartupWizard } from "./startup-wizard"

export function StartupTeamNewPage() {
  return (
    <StartupWizard
      action={saveTeamMemberAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Equipa investível
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            Biografias curtas ajudam o investidor a entender execução, domínio e responsabilidades.
          </h2>
        </article>
      }
      cancelHref="/startup/team"
      description="Adicione membros ao perfil da equipa fundadora e mantenha responsabilidades claras."
      steps={[
        { label: "Pessoa", description: "Nome e cargo." },
        { label: "Responsabilidade", description: "Função operacional." },
        { label: "Prova", description: "Experiência que sustenta execução." },
      ]}
      submitLabel="Adicionar membro"
      title="Novo membro da equipa"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <StartupFormField label="Nome completo" name="name" required />
        <StartupSelectField
          label="Função"
          name="role"
          options={["CEO", "COO", "CTO", "CFO", "Head of Product", "Advisor"]}
          required
        />
      </div>

      <StartupTextArea
        label="Responsabilidades"
        name="detail"
        placeholder="Explique o que esta pessoa lidera dentro da startup."
        required
      />

      <StartupTextArea
        label="Experiência relevante"
        name="experience"
        placeholder="Inclua experiência setorial, técnica ou comercial relevante."
      />
    </StartupWizard>
  )
}
