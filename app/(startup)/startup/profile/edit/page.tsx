import type { Metadata } from "next"

import { StartupProfileEditPage } from "@/components/startup/startup-profile-edit-page"

export const metadata: Metadata = {
  title: "Editar perfil | SEED",
  description: "Atualize a identidade e os contactos institucionais da startup.",
}

export default function StartupProfileEditRoute() {
  return <StartupProfileEditPage />
}
