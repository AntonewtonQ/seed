import { processSteps } from "./landing-data"
import { SectionHeading } from "./section-heading"

export function ProcessSection() {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:px-8" id="processo">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          description="Um percurso objetivo para transformar informação dispersa em oportunidades prontas para análise."
          eyebrow="Processo"
          title="Da preparação da startup à decisão de investimento."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              className="rounded-lg border border-border bg-background p-6"
              key={step.title}
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-[color:var(--seed-petroleum)] text-sm font-extrabold text-[color:var(--seed-cream)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
