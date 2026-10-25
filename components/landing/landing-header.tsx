import Link from "next/link"

import { SeedLogo } from "@/components/brand/seed-logo"
import { Button } from "@/components/ui/button"

import { navLinks } from "./landing-data"

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/[0.92] backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="Ir para o início">
          <SeedLogo compact />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-6 md:flex"
        >
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

        <Button asChild>
          <Link href="/login">Entrar</Link>
        </Button>
      </div>
    </header>
  )
}
