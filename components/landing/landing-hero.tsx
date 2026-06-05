import Image from "next/image"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { seedBrand } from "@/lib/brand"

import { heroStats } from "./landing-data"

export function LandingHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[color:var(--seed-petroleum)] text-[color:var(--seed-cream)]"
      id="inicio"
    >
      <Image
        alt="Identidade visual da plataforma SEED"
        className="absolute inset-0 -z-20 size-full object-cover opacity-[0.28]"
        fill
        priority
        sizes="100vw"
        src="/brand/seed-identity-board.png"
      />
      <div className="absolute inset-0 -z-10 bg-[rgba(15,61,62,0.84)]" />

      <div className="mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-gold-soft)]">
            <ShieldCheck aria-hidden="true" className="size-4" />
            Capital inteligente com processos seguros
          </p>

          <h1 className="mt-7 text-6xl font-extrabold leading-none tracking-normal text-white md:text-8xl">
            {seedBrand.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[color:var(--seed-cream)] md:text-2xl md:leading-9">
            {seedBrand.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[color:var(--seed-tint)] md:text-lg">
            Organizamos o percurso entre startups, aceleradoras e investidores
            com informação estruturada, acesso controlado e due diligence
            preparada para decisões de capital.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <a href="#começar">
                Preparar startup
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              className="border-white/30 bg-white/[0.08] text-[color:var(--seed-cream)] hover:bg-white/[0.14]"
              size="lg"
              variant="outline"
            >
              <a href="#plataforma">Avaliar oportunidades</a>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid max-w-3xl grid-cols-1 gap-0 border-y border-white/18 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div
              className="border-white/18 py-4 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
              key={stat.label}
            >
              <strong className="block text-3xl font-extrabold text-white">
                {stat.value}
              </strong>
              <span className="mt-1 block text-sm font-semibold text-[color:var(--seed-tint)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
