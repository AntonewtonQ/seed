import type { Metadata } from "next"

import { AcceleratorProfilePage } from "@/components/accelerator/accelerator-profile-page"

export const metadata: Metadata = {
  title: "Perfil da aceleradora | SEED",
  description: "Identidade institucional, foco e contactos da aceleradora.",
}

export default function AcceleratorProfileRoute() {
  return <AcceleratorProfilePage />
}
