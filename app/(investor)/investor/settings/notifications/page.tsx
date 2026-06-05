import type { Metadata } from "next"

import { InvestorNotificationSettingsPage } from "@/components/investor/investor-notification-settings-page"

export const metadata: Metadata = {
  title: "Preferências de notificações | SEED",
  description: "Configure alertas do investidor.",
}

export default function InvestorNotificationSettingsRoute() {
  return <InvestorNotificationSettingsPage />
}
