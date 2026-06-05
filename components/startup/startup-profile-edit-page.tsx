import { saveStartupProfileAction } from "@/lib/startup-actions"

import {
  StartupFormField,
  StartupSelectField,
  StartupTextArea,
} from "./startup-form-fields"
import { startupProfile } from "./startup-data"
import { StartupWizard } from "./startup-wizard"

export function StartupProfileEditPage() {
  return (
    <StartupWizard
      action={saveStartupProfileAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Perfil de investidor
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            A página deve explicar quem é a startup sem depender de contexto externo.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
            Mantenha a proposta de valor curta, verificável e alinhada com os documentos do data room.
          </p>
        </article>
      }
      cancelHref="/startup/profile"
      description="Atualize os dados institucionais que serão usados no perfil interno e na versão partilhável com investidores."
      steps={[
        { label: "Identidade", description: "Nome, setor, fase e localização." },
        { label: "Contactos", description: "Canais oficiais da startup." },
        { label: "Narrativa", description: "Resumo que orienta o investidor." },
      ]}
      submitLabel="Guardar perfil"
      title="Editar perfil"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <StartupFormField
          defaultValue={startupProfile.name}
          label="Nome da startup"
          name="name"
          required
        />
        <StartupSelectField
          defaultValue={startupProfile.stage}
          label="Fase"
          name="stage"
          options={["Ideação", "MVP", "Pre-seed", "Seed", "Series A"]}
          required
        />
        <StartupFormField
          defaultValue={startupProfile.sector}
          label="Setor"
          name="sector"
          required
        />
        <StartupFormField
          defaultValue={startupProfile.location}
          label="Localização"
          name="location"
          required
        />
        <StartupFormField
          defaultValue={startupProfile.website}
          label="Website"
          name="website"
          type="url"
        />
        <StartupFormField
          defaultValue={startupProfile.email}
          label="Email oficial"
          name="email"
          required
          type="email"
        />
        <StartupFormField
          defaultValue={startupProfile.phone}
          label="Telefone"
          name="phone"
          type="tel"
        />
        <StartupFormField
          defaultValue={startupProfile.founded}
          label="Ano de fundação"
          name="founded"
          required
        />
      </div>

      <StartupTextArea
        defaultValue={startupProfile.tagline}
        hint="Use uma frase direta: produto, público e resultado."
        label="Proposta de valor"
        name="tagline"
        required
      />
    </StartupWizard>
  )
}
