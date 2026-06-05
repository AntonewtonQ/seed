import type { Metadata } from "next"

import { StartupProfilePreviewPage } from "@/components/startup/startup-profile-preview-page"

export const metadata: Metadata = {
  title: "Pré-visualização do perfil | SEED",
  description: "Veja como o perfil da startup será apresentado a investidores.",
}

export default function StartupProfilePreviewRoute() {
  return <StartupProfilePreviewPage />
}
