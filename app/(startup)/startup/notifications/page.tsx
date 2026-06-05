import type { Metadata } from "next"

import { StartupNotificationsPage } from "@/components/startup/startup-notifications-page"

export const metadata: Metadata = {
  title: "Notificações | SEED",
  description: "Alertas operacionais da startup na plataforma SEED.",
}

export default function StartupNotificationsRoute() {
  return <StartupNotificationsPage />
}
