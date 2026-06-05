import { saveDocumentAction } from "@/lib/startup-actions"

import {
  StartupCheckbox,
  StartupFormField,
  StartupSelectField,
  StartupTextArea,
} from "./startup-form-fields"
import { StartupWizard } from "./startup-wizard"

export function StartupDocumentNewPage() {
  return (
    <StartupWizard
      action={saveDocumentAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Data room
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            Cada documento precisa de dono, categoria, estado e regra de visibilidade.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
            Quando o backend entrar, este fluxo passa a enviar metadados e ficheiros para storage seguro.
          </p>
        </article>
      }
      cancelHref="/startup/documents"
      description="Adicione um documento ao data room com os metadados necessários para revisão e partilha controlada."
      steps={[
        { label: "Metadados", description: "Nome, categoria e responsável." },
        { label: "Revisão", description: "Estado e visibilidade." },
        { label: "Anexo", description: "Ficheiro seguro no backend." },
      ]}
      submitLabel="Adicionar documento"
      title="Novo documento"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <StartupFormField label="Nome do documento" name="name" required />
        <StartupSelectField
          label="Categoria"
          name="category"
          options={[
            "Apresentação",
            "Finanças",
            "Legal",
            "Governança",
            "Produto",
          ]}
          required
        />
        <StartupFormField label="Responsável" name="owner" required />
        <StartupSelectField
          label="Estado"
          name="status"
          options={["Em falta", "Em revisão", "Pronto"]}
          required
        />
      </div>

      <StartupTextArea
        label="Descrição"
        name="description"
        placeholder="Explique o conteúdo e o uso deste documento no processo."
      />

      <StartupCheckbox
        description="Mantém o documento visível apenas para a startup até validação."
        label="Bloquear partilha até revisão final"
        name="restricted"
        defaultChecked
      />
    </StartupWizard>
  )
}
