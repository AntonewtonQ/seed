import { SeedLogo } from "@/components/brand/seed-logo"
import { seedBrand } from "@/lib/brand"

import { navLinks } from "./landing-data"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto flex max-w-6xl px-4 sm:px-6 lg:px-8 flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <SeedLogo compact />
        <nav className="flex flex-wrap gap-5" aria-label="Navegação de rodapé">
          {navLinks.map((link) => (
            <a
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">{seedBrand.domain}</p>
      </div>
    </footer>
  )
}
