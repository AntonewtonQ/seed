import type { Metadata } from "next"

import { AcceleratorProfileEditPage } from "@/components/accelerator/accelerator-profile-edit-page"

export const metadata: Metadata = {
  title: "Editar perfil da aceleradora | SEED",
  description: "Atualize identidade, foco e tese de aceleração.",
}

export default function AcceleratorProfileEditRoute() {
  return <AcceleratorProfileEditPage />
}
