import type { Metadata } from "next"

import { StartupChecklistPage } from "@/components/startup/startup-checklist-page"

export const metadata: Metadata = {
  title: "Checklist da startup | SEED",
  description: "Prontidão da startup para due diligence.",
}

export default function StartupChecklistRoute() {
  return <StartupChecklistPage />
}
