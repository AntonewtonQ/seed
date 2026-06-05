import { modules } from "./landing-data"
import { SectionHeading } from "./section-heading"

export function ModulesSection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          description="Cada módulo responde a uma etapa do processo de captação: preparar, avaliar, proteger e decidir."
          eyebrow="Módulos"
          title="Tudo o que sustenta uma negociação de investimento."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => {
            const Icon = module.icon

            return (
              <article
                className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
                key={module.title}
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-[color:var(--seed-gold)] text-[color:var(--seed-petroleum)]">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
                  {module.text}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
