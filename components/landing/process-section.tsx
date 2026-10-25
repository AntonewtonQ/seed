import { processSteps } from "./landing-data"
import { SectionHeading } from "./section-heading"

export function ProcessSection() {
  return (
    <section
      className="border-y border-border bg-card py-20"
      id="como-funciona"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          description="A demonstração usa contas e dados fictícios."
          title="Como funciona"
        />

        <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li className="border-t border-border pt-5" key={step.title}>
              <span className="text-sm text-muted-foreground">
                {index + 1}
              </span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
