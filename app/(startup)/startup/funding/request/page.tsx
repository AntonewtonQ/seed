import type { Metadata } from "next"

import { StartupFundingRequestPage } from "@/components/startup/startup-funding-request-page"

export const metadata: Metadata = {
  title: "Pedido de captação | SEED",
  description: "Atualize objetivo, instrumento e uso dos fundos da startup.",
}

export default function StartupFundingRequestRoute() {
  return <StartupFundingRequestPage />
}
