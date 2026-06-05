import { savePitchAction } from "@/lib/startup-actions"

import { StartupTextArea } from "./startup-form-fields"
import { pitchBlocks } from "./startup-data"
import { StartupWizard } from "./startup-wizard"

const pitchDefaults = Object.fromEntries(
  pitchBlocks.map((block) => [block.id, block.text])
)

export function StartupPitchWizardPage() {
  return (
    <StartupWizard
      action={savePitchAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Narrativa de investimento
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            O pitch deve responder rapidamente: por que agora, por que esta equipa e por que este mercado.
          </h2>
        </article>
      }
      cancelHref="/startup/pitch"
      currentStep={1}
      description="Construa a narrativa de pitch em blocos específicos, sem misturar documentos, métricas ou equipa nesta página."
      steps={[
        { label: "Estrutura", description: "Problema, solução, produto e mercado." },
        { label: "Clareza", description: "Texto curto e verificável." },
        { label: "Deck", description: "Material pronto para partilha." },
      ]}
      submitLabel="Guardar pitch"
      title="Wizard de pitch"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <StartupTextArea
          defaultValue={String(pitchDefaults.problem)}
          label="Problema"
          name="problem"
          required
        />
        <StartupTextArea
          defaultValue={String(pitchDefaults.solution)}
          label="Solução"
          name="solution"
          required
        />
        <StartupTextArea
          defaultValue={String(pitchDefaults.product)}
          label="Produto"
          name="product"
          required
        />
        <StartupTextArea
          defaultValue={String(pitchDefaults.market)}
          label="Mercado"
          name="market"
          required
        />
      </div>
    </StartupWizard>
  )
}
