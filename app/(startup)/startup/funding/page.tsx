import type { Metadata } from "next"

import { StartupFundingPage } from "@/components/startup/startup-funding-page"

export const metadata: Metadata = {
  title: "Captação da startup | SEED",
  description: "Objetivo de captação, instrumento, runway e uso dos fundos.",
}

export default function StartupFundingRoute() {
  return <StartupFundingPage />
}
