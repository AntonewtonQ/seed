import type { Metadata } from "next"

import { InvestorProfileEditPage } from "@/components/investor/investor-profile-edit-page"

export const metadata: Metadata = {
  title: "Editar perfil do investidor | SEED",
  description: "Atualize mandato e preferências de investimento.",
}

export default function InvestorProfileEditRoute() {
  return <InvestorProfileEditPage />
}
