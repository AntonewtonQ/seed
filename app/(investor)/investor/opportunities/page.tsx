import type { Metadata } from "next"

import { InvestorOpportunitiesPage } from "@/components/investor/investor-opportunities-page"

export const metadata: Metadata = {
  title: "Oportunidades | SEED",
  description: "Startups recomendadas para o mandato do investidor.",
}

export default function InvestorOpportunitiesRoute() {
  return <InvestorOpportunitiesPage />
}
