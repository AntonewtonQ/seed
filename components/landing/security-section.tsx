import { securityItems } from "./landing-data"
import { SectionHeading } from "./section-heading"

export function SecuritySection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8" id="seguranca">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <SectionHeading
          description="A informação partilhada durante uma ronda de investimento exige controlo, contexto e rastreabilidade."
          eyebrow="Segurança"
          title="Confiança desenhada para informação sensível."
        />

        <div className="grid gap-4">
          {securityItems.map((item) => {
            const Icon = item.icon

            return (
              <article
                className="grid gap-4 rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)] sm:grid-cols-[auto_minmax(0,1fr)]"
                key={item.title}
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
