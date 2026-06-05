import type { Metadata } from "next"

import { StartupProfilePage } from "@/components/startup/startup-profile-page"

export const metadata: Metadata = {
  title: "Perfil da startup | SEED",
  description:
    "Área da startup para preparar perfil, pitch, métricas, equipa, captação, documentos e due diligence.",
}

export default function StartupProfileRoute() {
  return <StartupProfilePage />
}
