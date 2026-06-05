import type { Metadata } from "next"

import { InvestorPipelinePage } from "@/components/investor/investor-pipeline-page"

export const metadata: Metadata = {
  title: "Pipeline do investidor | SEED",
  description: "Pipeline de investimento por fase, responsável e próxima ação.",
}

export default function InvestorPipelineRoute() {
  return <InvestorPipelinePage />
}
