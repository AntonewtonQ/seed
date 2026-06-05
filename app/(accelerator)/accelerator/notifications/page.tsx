import type { Metadata } from "next"

import { AcceleratorNotificationsPage } from "@/components/accelerator/accelerator-notifications-page"

export const metadata: Metadata = {
  title: "Notificações da aceleradora | SEED",
  description: "Alertas operacionais da aceleradora.",
}

export default function AcceleratorNotificationsRoute() {
  return <AcceleratorNotificationsPage />
}
