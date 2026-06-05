import type { Metadata } from "next"

import { StartupDashboardPage } from "@/components/startup/startup-dashboard-page"

export const metadata: Metadata = {
  title: "Dashboard da startup | SEED",
  description:
    "Visão geral da startup com prontidão, métricas, documentos e próximas ações.",
}

export default function StartupDashboardRoute() {
  return <StartupDashboardPage />
}
