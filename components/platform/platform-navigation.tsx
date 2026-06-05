"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type PlatformNavigationItem = {
  label: string
  icon: LucideIcon
  href: string
}

type PlatformNavigationProps = {
  items: PlatformNavigationItem[]
  label: string
}

export function PlatformNavigation({ items, label }: PlatformNavigationProps) {
  const pathname = usePathname()

  return (
    <nav aria-label={label} className="mt-8 grid gap-1.5">
      {items.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href ||
          (!item.href.endsWith("/dashboard") && pathname.startsWith(item.href))

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
