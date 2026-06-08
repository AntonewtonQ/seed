"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { SeedLogo } from "@/components/brand/seed-logo"
import { SeedMark } from "@/components/brand/seed-mark"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const ToggleIcon = isSidebarCollapsed ? PanelLeftOpen : PanelLeftClose

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div
        className={cn(
          "grid min-h-screen transition-[grid-template-columns]",
          isSidebarCollapsed
            ? "lg:grid-cols-[4.75rem_minmax(0,1fr)]"
            : "lg:grid-cols-[17rem_minmax(0,1fr)]"
        )}
      >
        <aside
          className={cn(
            "border-b border-[color:var(--sidebar-border)] bg-[color:var(--sidebar)] text-[color:var(--sidebar-foreground)] transition-all lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r",
            isSidebarCollapsed ? "p-4" : "p-5"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              isSidebarCollapsed ? "flex-col justify-center" : "justify-between"
            )}
          >
            <Link href="/" aria-label="Voltar para a landing">
              {isSidebarCollapsed ? (
                <SeedMark className="size-8" tone="light" title="SEED" />
              ) : (
                <SeedLogo compact tone="light" />
              )}
            </Link>

            <Button
              aria-expanded={!isSidebarCollapsed}
              aria-label={
                isSidebarCollapsed ? "Expandir sidebar" : "Dobrar sidebar"
              }
              className="border-white/15 bg-white/[0.08] text-[color:var(--seed-cream)] hover:bg-white/[0.14]"
              onClick={() => setIsSidebarCollapsed((current) => !current)}
              size="icon"
              title={isSidebarCollapsed ? "Expandir sidebar" : "Dobrar sidebar"}
              type="button"
              variant="outline"
            >
              <ToggleIcon aria-hidden="true" />
            </Button>
          </div>

          <PlatformNavigation
            collapsed={isSidebarCollapsed}
            items={navigation}
            label={navigationLabel}
          />

          {isSidebarCollapsed ? (
            <div
              className="mt-8 flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-xs font-extrabold text-[color:var(--seed-gold-soft)]"
              title={`${entity.eyebrow}: ${entity.title}`}
            >
              {entity.title.slice(0, 2).toUpperCase()}
            </div>
          ) : (
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
          )}

          <Button
            asChild
            className={cn(
              "mt-6 border-white/20 bg-white/[0.08] text-[color:var(--seed-cream)] hover:bg-white/[0.14]",
              isSidebarCollapsed ? "w-10 px-0" : "w-full"
            )}
            variant="outline"
          >
            <Link
              aria-label={isSidebarCollapsed ? "Sair" : undefined}
              href="/login"
              title={isSidebarCollapsed ? "Sair" : undefined}
            >
              {isSidebarCollapsed ? (
                <LogOut aria-hidden="true" />
              ) : (
                "Sair"
              )}
            </Link>
          </Button>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </main>
  )
}
