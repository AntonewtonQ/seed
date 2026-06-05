"use client"

import Link from "next/link"

import { SeedLogo } from "@/components/brand/seed-logo"
import { Button } from "@/components/ui/button"

import {
  PlatformNavigation,
  type PlatformNavigationItem,
} from "./platform-navigation"

type PlatformShellEntity = {
  eyebrow: string
  title: string
  detail: string
}

type PlatformShellProps = {
  children: React.ReactNode
  entity: PlatformShellEntity
  navigation: PlatformNavigationItem[]
  navigationLabel: string
}

export function PlatformShell({
  children,
  entity,
  navigation,
  navigationLabel,
}: PlatformShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="border-b border-[color:var(--sidebar-border)] bg-[color:var(--sidebar)] p-5 text-[color:var(--sidebar-foreground)] lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <Link href="/" aria-label="Voltar para a landing">
            <SeedLogo compact showTagline tone="light" />
          </Link>

          <PlatformNavigation items={navigation} label={navigationLabel} />

          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.08] p-4">
            <p className="text-xs font-bold text-[color:var(--seed-gold-soft)]">
              {entity.eyebrow}
            </p>
            <p className="mt-2 truncate text-sm font-extrabold">
              {entity.title}
            </p>
            <p className="mt-1 truncate text-xs font-semibold text-[color:var(--seed-tint)]">
              {entity.detail}
            </p>
          </div>

          <Button
            asChild
            className="mt-6 w-full border-white/20 bg-white/[0.08] text-[color:var(--seed-cream)] hover:bg-white/[0.14]"
            variant="outline"
          >
            <Link href="/login">Sair</Link>
          </Button>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </main>
  )
}
