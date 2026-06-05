import { seedBrand } from "@/lib/brand"

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <p className="text-sm font-bold text-muted-foreground">
          Desenhada para processos de capital onde confiança, rastreabilidade e
          confidencialidade contam desde o primeiro contacto.
        </p>
        <div className="flex flex-wrap gap-2">
          {seedBrand.modules.map((module) => (
            <span
              className="rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]"
              key={module}
            >
              {module}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
