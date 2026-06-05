import { ArrowRight } from "lucide-react"

import { SeedLogo } from "@/components/brand/seed-logo"
import { Button } from "@/components/ui/button"

import { navLinks } from "./landing-data"

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/[0.9] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="Ir para o início">
          <SeedLogo compact />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-6 md:flex"
        >
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

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" variant="ghost">
            <a href="#plataforma">Entrar</a>
          </Button>
          <Button asChild size="lg">
            <a href="#começar">
              Solicitar acesso
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
