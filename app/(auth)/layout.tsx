import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Database, ShieldCheck, TrendingUp } from "lucide-react"

import { SeedLogo } from "@/components/brand/seed-logo"
import { HeroMotionLines } from "@/components/landing/hero-motion-lines"
import { seedBrand } from "@/lib/brand"

const authHighlights = [
  {
    label: "Pipeline rastreável",
    icon: TrendingUp,
  },
  {
    label: "Data rooms seguros",
    icon: Database,
  },
  {
    label: "Due diligence estruturada",
    icon: ShieldCheck,
  },
]

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,0.95fr)_minmax(31rem,0.68fr)]">
        <section className="relative isolate hidden overflow-hidden bg-[color:var(--seed-petroleum)] p-8 text-[color:var(--seed-cream)] lg:flex lg:flex-col">
          <Image
            alt="Visual abstrato da plataforma SEED"
            className="absolute inset-0 -z-20 size-full object-cover"
            fill
            priority
            sizes="60vw"
            src="/brand/seed-hero-visual.svg"
          />
          <div className="absolute inset-0 -z-10 bg-[rgba(7,31,32,0.58)]" />
          <HeroMotionLines />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <Link href="/" aria-label="Voltar para a página inicial">
              <SeedLogo tone="light" />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.08] px-3 py-2 text-sm font-extrabold text-[color:var(--seed-cream)] transition-colors hover:bg-white/[0.14]"
              href="/"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Início
            </Link>
          </div>

          <div className="relative z-10 mt-auto max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-gold-soft)]">
              Acesso SEED
            </p>
            <h2 className="mt-4 text-5xl font-extrabold leading-tight tracking-normal text-white">
              Entre no ambiente onde startups e capital avançam com contexto.
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-[color:var(--seed-tint)]">
              {seedBrand.tagline} A autenticação protege perfis, documentos e
              decisões que sustentam cada oportunidade.
            </p>

            <div className="mt-8 grid gap-3">
              {authHighlights.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-white/[0.12] bg-white/[0.08] p-3"
                    key={item.label}
                  >
                    <div className="flex size-9 items-center justify-center rounded-lg bg-[color:var(--seed-gold)] text-[color:var(--seed-petroleum)]">
                      <Icon aria-hidden="true" className="size-4" />
                    </div>
                    <span className="text-sm font-extrabold">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen flex-col px-4 py-5 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <Link href="/" aria-label="Voltar para a página inicial">
              <SeedLogo compact />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-extrabold text-[color:var(--seed-petroleum)]"
              href="/"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Início
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}
