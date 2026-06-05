import { StartupPageHeader } from "./startup-page-header"
import { ReadinessCard } from "./startup-widgets"

export function StartupChecklistPage() {
  return (
    <>
      <StartupPageHeader
        description="Página dedicada à prontidão para due diligence, com foco nos itens que a startup deve completar antes de abrir o processo a investidores."
        title="Checklist de due diligence"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <ReadinessCard />
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <p className="text-sm font-semibold text-[color:var(--seed-tint)]">
            Critério SEED
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-normal">
            Um perfil só deve ser partilhado quando os dados essenciais estiverem
            completos e coerentes.
          </h2>
        </article>
      </div>
    </>
  )
}
