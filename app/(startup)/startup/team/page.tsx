import type { Metadata } from "next"

import { StartupTeamPage } from "@/components/startup/startup-team-page"

export const metadata: Metadata = {
  title: "Equipa da startup | SEED",
  description: "Fundadores, responsabilidades e experiência da equipa.",
}

export default function StartupTeamRoute() {
  return <StartupTeamPage />
}
