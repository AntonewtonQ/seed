import { limits, securityItems } from "./landing-data"
import { SectionHeading } from "./section-heading"

export function SecuritySection() {
  return (
    <section className="py-20" id="seguranca">
      <div className="mx-auto grid max-w-6xl px-4 sm:px-6 lg:px-8 gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading title="Segurança" />
          <ul className="mt-8 grid gap-6">
            {securityItems.map((item) => {
              const Icon = item.icon

              return (
                <li className="flex gap-4" key={item.title}>
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[color:var(--seed-petroleum)]"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <SectionHeading title="O que o SEED não faz" />
          <ul className="mt-8 grid gap-3 text-sm leading-6 text-muted-foreground">
            {limits.map((item) => (
              <li className="border-b border-border pb-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
