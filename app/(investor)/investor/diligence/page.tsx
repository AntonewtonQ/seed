import type { Metadata } from "next"

import { InvestorDiligencePage } from "@/components/investor/investor-diligence-page"

export const metadata: Metadata = {
  title: "Due diligence do investidor | SEED",
  description: "Tarefas de validação para oportunidades em análise.",
}

export default function InvestorDiligenceRoute() {
  return <InvestorDiligencePage />
}
