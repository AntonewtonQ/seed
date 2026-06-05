import type { Metadata } from "next"

import { StartupMetricsPage } from "@/components/startup/startup-metrics-page"

export const metadata: Metadata = {
  title: "Métricas da startup | SEED",
  description: "Indicadores de tração e desempenho da startup.",
}

export default function StartupMetricsRoute() {
  return <StartupMetricsPage />
}
