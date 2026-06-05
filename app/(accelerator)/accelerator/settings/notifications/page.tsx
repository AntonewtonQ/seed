import type { Metadata } from "next"

import { AcceleratorNotificationSettingsPage } from "@/components/accelerator/accelerator-notification-settings-page"

export const metadata: Metadata = {
  title: "Preferências de notificações | SEED",
  description: "Configure alertas da aceleradora.",
}

export default function AcceleratorNotificationSettingsRoute() {
  return <AcceleratorNotificationSettingsPage />
}
