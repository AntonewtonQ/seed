import type { Metadata } from "next"

import { InvestorNotificationsPage } from "@/components/investor/investor-notifications-page"

export const metadata: Metadata = {
  title: "Notificações do investidor | SEED",
  description: "Alertas operacionais sobre pipeline, data rooms e due diligence.",
}

export default function InvestorNotificationsRoute() {
  return <InvestorNotificationsPage />
}
