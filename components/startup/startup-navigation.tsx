"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { startupNavigation } from "./startup-data"

export function StartupNavigation() {
  const pathname = usePathname()

  return (
    <nav aria-label="Área da startup" className="mt-8 grid gap-1.5">
      {startupNavigation.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href ||
          (item.href !== "/startup/dashboard" && pathname.startsWith(item.href))

        return (
          <Link
            className={cn(
              "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors",
              isActive
                ? "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)]"
                : "text-[color:var(--seed-tint)] hover:bg-white/10 hover:text-white"
            )}
            href={item.href}
            key={item.href}
          >
            <Icon aria-hidden="true" className="size-4" />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
