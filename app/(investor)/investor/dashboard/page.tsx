import type { Metadata } from "next"

import { InvestorDashboardPage } from "@/components/investor/investor-dashboard-page"

export const metadata: Metadata = {
  title: "Dashboard do investidor | SEED",
  description:
    "Visão geral do mandato, oportunidades, pipeline e due diligence do investidor.",
}

export default function InvestorDashboardRoute() {
  return <InvestorDashboardPage />
}
