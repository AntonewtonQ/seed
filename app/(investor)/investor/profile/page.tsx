import type { Metadata } from "next"

import { InvestorProfilePage } from "@/components/investor/investor-profile-page"

export const metadata: Metadata = {
  title: "Perfil do investidor | SEED",
  description: "Mandato, tese e contacto principal do investidor.",
}

export default function InvestorProfileRoute() {
  return <InvestorProfilePage />
}
