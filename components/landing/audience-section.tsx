import { audienceCards } from "./landing-data"
import { SectionHeading } from "./section-heading"

export function AudienceSection() {
  return (
    <section className="py-20" id="para-quem">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          description="Cada perfil vê apenas a informação da sua organização."
          title="Para quem"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {audienceCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                className="rounded-lg border border-border bg-card p-6"
                key={card.title}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 text-[color:var(--seed-petroleum)]"
                />
                <h3 className="mt-4 font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
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
