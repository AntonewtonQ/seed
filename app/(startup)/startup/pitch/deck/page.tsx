import type { Metadata } from "next"

import { StartupPitchDeckPage } from "@/components/startup/startup-pitch-deck-page"

export const metadata: Metadata = {
  title: "Pitch deck | SEED",
  description: "Pré-visualize o pitch deck da startup antes da partilha.",
}

export default function StartupPitchDeckRoute() {
  return <StartupPitchDeckPage />
}
