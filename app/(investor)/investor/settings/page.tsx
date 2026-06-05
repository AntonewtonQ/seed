import type { Metadata } from "next"

import { InvestorSettingsPage } from "@/components/investor/investor-settings-page"

export const metadata: Metadata = {
  title: "Definições do investidor | SEED",
  description: "Preferências de matching, privacidade e notificações.",
}

export default function InvestorSettingsRoute() {
  return <InvestorSettingsPage />
}
