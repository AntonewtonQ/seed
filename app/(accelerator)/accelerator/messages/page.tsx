import type { Metadata } from "next"

import { AcceleratorMessagesPage } from "@/components/accelerator/accelerator-messages-page"

export const metadata: Metadata = {
  title: "Mensagens da aceleradora | SEED",
  description: "Mensagens da aceleradora com startups, investidores e equipa SEED.",
}

export default function AcceleratorMessagesRoute() {
  return <AcceleratorMessagesPage />
}
