import {
  PlatformFormField,
  PlatformSelectField,
  PlatformTextArea,
} from "@/components/platform/platform-form-fields"
import { saveAcceleratorProfileAction } from "@/lib/accelerator-actions"

import { acceleratorProfile } from "./accelerator-data"
import { AcceleratorWizard } from "./accelerator-wizard"

export function AcceleratorProfileEditPage() {
  return (
    <AcceleratorWizard
      action={saveAcceleratorProfileAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Perfil institucional
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            O foco da aceleradora orienta matching, readiness e preparação das startups.
          </h2>
        </article>
      }
      cancelHref="/accelerator/profile"
      description="Atualize a identidade institucional e os critérios de atuação da aceleradora."
      steps={[
        { label: "Identidade", description: "Nome, tipo e responsável." },
        { label: "Programa", description: "Cohort, foco e localização." },
        { label: "Tese", description: "Critérios para preparação de startups." },
      ]}
      submitLabel="Guardar perfil"
      title="Editar perfil da aceleradora"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <PlatformFormField
          defaultValue={acceleratorProfile.name}
          label="Nome da aceleradora"
          name="name"
          required
        />
        <PlatformSelectField
          defaultValue={acceleratorProfile.type}
          label="Tipo"
          name="type"
          options={[
            "Aceleradora early-stage",
            "Incubadora",
            "Venture builder",
            "Programa corporativo",
          ]}
          required
        />
        <PlatformFormField
          defaultValue={acceleratorProfile.lead}
          label="Responsável"
          name="lead"
          required
        />
        <PlatformFormField
          defaultValue={acceleratorProfile.cohort}
          label="Cohort ativa"
          name="cohort"
          required
        />
        <PlatformFormField
          defaultValue={acceleratorProfile.focus}
          label="Foco"
          name="focus"
          required
        />
        <PlatformFormField
          defaultValue={acceleratorProfile.location}
          label="Localização"
          name="location"
          required
        />
      </div>

      <PlatformTextArea
        defaultValue={acceleratorProfile.tagline}
        label="Descrição curta"
        name="tagline"
        required
      />

      <PlatformTextArea
        defaultValue={acceleratorProfile.thesis}
        label="Tese de aceleração"
        name="thesis"
        required
      />
    </AcceleratorWizard>
  )
}
