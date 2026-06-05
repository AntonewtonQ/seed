import type { Metadata } from "next"

import { AcceleratorDashboardPage } from "@/components/accelerator/accelerator-dashboard-page"

export const metadata: Metadata = {
  title: "Dashboard da aceleradora | SEED",
  description:
    "Visão geral de programas, startups, pipeline e due diligence da aceleradora.",
}

export default function AcceleratorDashboardRoute() {
  return <AcceleratorDashboardPage />
}
