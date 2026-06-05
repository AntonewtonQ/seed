import { audienceCards } from "./landing-data"
import { SectionHeading } from "./section-heading"

export function AudienceSection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8" id="solucoes">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          description="A SEED cria um fluxo comum para alinhar preparação, análise e negociação sem dispersar informação crítica."
          eyebrow="Para quem"
          title="Uma ponte entre quem prepara, quem qualifica e quem investe."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {audienceCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                className="rounded-lg border border-border bg-card p-6 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
                key={card.title}
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
                  {card.text}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
