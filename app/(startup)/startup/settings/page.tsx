import type { Metadata } from "next"

import { StartupSettingsPage } from "@/components/startup/startup-settings-page"

export const metadata: Metadata = {
  title: "Definições da startup | SEED",
  description: "Visibilidade, notificações e preferências da startup.",
}

export default function StartupSettingsRoute() {
  return <StartupSettingsPage />
}
