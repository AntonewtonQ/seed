import type { Metadata } from "next"

import { InvestorMessagesPage } from "@/components/investor/investor-messages-page"

export const metadata: Metadata = {
  title: "Mensagens do investidor | SEED",
  description: "Mensagens com startups e equipa SEED.",
}

export default function InvestorMessagesRoute() {
  return <InvestorMessagesPage />
}
