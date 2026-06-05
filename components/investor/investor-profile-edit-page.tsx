import { PlatformFormField, PlatformSelectField, PlatformTextArea } from "@/components/platform/platform-form-fields"
import { saveInvestorProfileAction } from "@/lib/investor-actions"

import { investorProfile } from "./investor-data"
import { InvestorWizard } from "./investor-wizard"

export function InvestorProfileEditPage() {
  return (
    <InvestorWizard
      action={saveInvestorProfileAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Qualidade do matching
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            Quanto mais claro for o mandato, melhor a SEED pode priorizar startups compatíveis.
          </h2>
        </article>
      }
      cancelHref="/investor/profile"
      description="Atualize o mandato e as preferências que orientam o matching com startups."
      steps={[
        { label: "Identidade", description: "Fundo, contacto e tipo." },
        { label: "Mandato", description: "Ticket, fase e geografia." },
        { label: "Tese", description: "Critérios de encaixe." },
      ]}
      submitLabel="Guardar perfil"
      title="Editar perfil do investidor"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <PlatformFormField
          defaultValue={investorProfile.name}
          label="Nome do investidor"
          name="name"
          required
        />
        <PlatformSelectField
          defaultValue={investorProfile.type}
          label="Tipo"
          name="type"
          options={[
            "Fundo early-stage",
            "Investidor anjo",
            "Corporate venture",
            "Family office",
          ]}
          required
        />
        <PlatformFormField
          defaultValue={investorProfile.lead}
          label="Contacto principal"
          name="lead"
          required
        />
        <PlatformFormField
          defaultValue={investorProfile.ticket}
          label="Ticket"
          name="ticket"
          required
        />
        <PlatformFormField
          defaultValue={investorProfile.stage}
          label="Fase preferida"
          name="stage"
          required
        />
        <PlatformFormField
          defaultValue={investorProfile.geography}
          label="Geografia"
          name="geography"
          required
        />
      </div>

      <PlatformTextArea
        defaultValue={investorProfile.thesis}
        hint="A tese deve ajudar a filtrar oportunidades, não apenas descrever preferências genéricas."
        label="Tese de investimento"
        name="thesis"
        required
      />
    </InvestorWizard>
  )
}
