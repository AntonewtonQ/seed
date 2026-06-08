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
  collapsed?: boolean
  items: PlatformNavigationItem[]
  label: string
}

export function PlatformNavigation({
  collapsed = false,
  items,
  label,
}: PlatformNavigationProps) {
  const pathname = usePathname()

  return (
    <nav
      aria-label={label}
      className={cn("mt-8 grid gap-1.5", collapsed && "justify-items-center")}
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href ||
          (!item.href.endsWith("/dashboard") && pathname.startsWith(item.href))

        return (
          <Link
            aria-label={collapsed ? item.label : undefined}
            className={cn(
              "flex h-10 items-center rounded-lg text-sm font-semibold transition-colors",
              collapsed
                ? "w-10 justify-center px-0"
                : "w-full gap-3 px-3",
              isActive
                ? "bg-[color:var(--seed-cream)] text-[color:var(--seed-petroleum)]"
                : "text-[color:var(--seed-tint)] hover:bg-white/10 hover:text-white"
            )}
            href={item.href}
            key={item.href}
            title={collapsed ? item.label : undefined}
          >
            <Icon aria-hidden="true" className="size-4" />
            {collapsed ? null : <span className="truncate">{item.label}</span>}
          </Link>
        )
      })}
    </nav>
  )
}
