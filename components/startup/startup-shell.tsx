"use client"

import { PlatformShell } from "@/components/platform/platform-shell"

import { startupNavigation, startupProfile } from "./startup-data"

type StartupShellProps = {
  children: React.ReactNode
}

export function StartupShell({ children }: StartupShellProps) {
  return (
    <PlatformShell
      entity={{
        detail: `${startupProfile.stage} · ${startupProfile.sector}`,
        eyebrow: "Startup ativa",
        title: startupProfile.name,
      }}
      navigation={startupNavigation}
      navigationLabel="Área da startup"
    >
      {children}
    </PlatformShell>
  )
}
