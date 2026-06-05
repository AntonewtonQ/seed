import type { Metadata } from "next"

import { StartupNotificationSettingsPage } from "@/components/startup/startup-notification-settings-page"

export const metadata: Metadata = {
  title: "Preferências de notificações | SEED",
  description: "Configure alertas e mensagens da startup.",
}

export default function StartupNotificationSettingsRoute() {
  return <StartupNotificationSettingsPage />
}
