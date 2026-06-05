"use client"

import { PlatformShell } from "@/components/platform/platform-shell"

import { investorNavigation, investorProfile } from "./investor-data"

type InvestorShellProps = {
  children: React.ReactNode
}

export function InvestorShell({ children }: InvestorShellProps) {
  return (
    <PlatformShell
      entity={{
        detail: `${investorProfile.ticket} · ${investorProfile.stage}`,
        eyebrow: "Investidor ativo",
        title: investorProfile.name,
      }}
      navigation={investorNavigation}
      navigationLabel="Área do investidor"
    >
      {children}
    </PlatformShell>
  )
}
