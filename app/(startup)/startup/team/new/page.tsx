import type { Metadata } from "next"

import { StartupTeamNewPage } from "@/components/startup/startup-team-new-page"

export const metadata: Metadata = {
  title: "Novo membro | SEED",
  description: "Adicione membros e responsabilidades à equipa da startup.",
}

export default function StartupTeamNewRoute() {
  return <StartupTeamNewPage />
}
