import type { Metadata } from "next"

import { AcceleratorSettingsPage } from "@/components/accelerator/accelerator-settings-page"

export const metadata: Metadata = {
  title: "Definições da aceleradora | SEED",
  description: "Preferências e visibilidade da aceleradora.",
}

export default function AcceleratorSettingsRoute() {
  return <AcceleratorSettingsPage />
}
