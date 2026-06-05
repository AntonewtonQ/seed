"use client"

import { PlatformShell } from "@/components/platform/platform-shell"

import { acceleratorNavigation, acceleratorProfile } from "./accelerator-data"

type AcceleratorShellProps = {
  children: React.ReactNode
}

export function AcceleratorShell({ children }: AcceleratorShellProps) {
  return (
    <PlatformShell
      entity={{
        detail: `${acceleratorProfile.cohort} · ${acceleratorProfile.focus}`,
        eyebrow: "Aceleradora ativa",
        title: acceleratorProfile.name,
      }}
      navigation={acceleratorNavigation}
      navigationLabel="Área da aceleradora"
    >
      {children}
    </PlatformShell>
  )
}
