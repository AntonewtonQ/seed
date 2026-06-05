import { SeedLogo } from "@/components/brand/seed-logo"
import { seedBrand } from "@/lib/brand"

import { navLinks } from "./landing-data"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <SeedLogo compact showTagline />
        <nav className="flex flex-wrap gap-4" aria-label="Navegação de rodapé">
          {navLinks.map((link) => (
            <a
              className="text-sm font-bold text-muted-foreground transition-colors hover:text-[color:var(--seed-petroleum)]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
          {seedBrand.domain}
        </p>
      </div>
    </footer>
  )
}
