import type { Metadata } from "next"

import { StartupPitchPage } from "@/components/startup/startup-pitch-page"

export const metadata: Metadata = {
  title: "Pitch da startup | SEED",
  description: "Narrativa de investimento, problema, solução, produto e mercado.",
}

export default function StartupPitchRoute() {
  return <StartupPitchPage />
}
