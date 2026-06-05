import { ArrowRight } from "lucide-react"

import { SeedLogo } from "@/components/brand/seed-logo"
import { Button } from "@/components/ui/button"
import { seedBrand } from "@/lib/brand"

export function LandingCta() {
  return (
    <section
      className="bg-[color:var(--seed-petroleum)] px-4 py-16 text-[color:var(--seed-cream)] sm:px-6 lg:px-8"
      id="começar"
    >
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <SeedLogo compact tone="light" />
          <h2 className="mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-normal md:text-5xl">
            Prepare a próxima conversa de investimento com mais clareza.
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[color:var(--seed-tint)]">
            A SEED aproxima startups preparadas e investidores qualificados num
            processo mais seguro, organizado e fácil de acompanhar.
          </p>
        </div>
        <Button asChild size="lg" variant="secondary">
          <a href={`mailto:contacto@${seedBrand.domain}`}>
            Solicitar acesso
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  )
}
