import type { Metadata } from "next"

import { StartupMessagesPage } from "@/components/startup/startup-messages-page"

export const metadata: Metadata = {
  title: "Mensagens | SEED",
  description: "Mensagens da startup com investidores e equipa SEED.",
}

export default function StartupMessagesRoute() {
  return <StartupMessagesPage />
}
