import { saveFundingRequestAction } from "@/lib/startup-actions"

import {
  StartupFormField,
  StartupSelectField,
  StartupTextArea,
} from "./startup-form-fields"
import { fundingUse, startupProfile } from "./startup-data"
import { StartupWizard } from "./startup-wizard"

export function StartupFundingRequestPage() {
  return (
    <StartupWizard
      action={saveFundingRequestAction}
      aside={
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Uso atual dos fundos
          </p>
          <div className="mt-5 grid gap-3">
            {fundingUse.map((item) => (
              <div className="grid gap-2" key={item.label}>
                <div className="flex items-center justify-between gap-3 text-sm font-extrabold">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-[color:var(--seed-gold)]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      }
      cancelHref="/startup/funding"
      description="Atualize o pedido de captação sem misturar métricas, equipa ou documentos nesta página."
      steps={[
        { label: "Pedido", description: "Valor, instrumento e runway." },
        { label: "Uso", description: "Destino previsto do capital." },
        { label: "Risco", description: "Premissas que precisam de validação." },
      ]}
      submitLabel="Guardar pedido"
      title="Pedido de captação"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <StartupFormField
          defaultValue={startupProfile.fundingTarget}
          label="Valor alvo"
          name="target"
          required
        />
        <StartupSelectField
          defaultValue={startupProfile.fundingInstrument}
          label="Instrumento"
          name="instrument"
          options={["SAFE / Equity", "Equity", "Convertible note", "Revenue share"]}
          required
        />
        <StartupFormField
          defaultValue={startupProfile.runway}
          label="Runway atual"
          name="runway"
          required
        />
      </div>

      <StartupTextArea
        defaultValue={startupProfile.nextStep}
        label="Próxima validação financeira"
        name="nextStep"
        required
      />

      <StartupTextArea
        label="Observações para investidores"
        name="investorNotes"
        placeholder="Explique premissas, riscos e uso do capital de forma objetiva."
      />
    </StartupWizard>
  )
}
