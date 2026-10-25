import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { seedBrand } from "@/lib/brand"

export function LandingHero() {
  return (
    <section className="border-b border-border bg-card" id="inicio">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">
            Protótipo académico · Angola
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {seedBrand.tagline}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            O SEED reúne num só lugar as rondas, as negociações com
            investidores e os documentos de startups aceleradas. Organiza o
            processo; não movimenta dinheiro.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/login">
                Entrar na demonstração
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#como-funciona">Como funciona</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
