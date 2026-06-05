import type { Metadata } from "next"

import { InvestorDataRoomsPage } from "@/components/investor/investor-data-rooms-page"

export const metadata: Metadata = {
  title: "Data rooms do investidor | SEED",
  description: "Data rooms acessíveis ao investidor.",
}

export default function InvestorDataRoomsRoute() {
  return <InvestorDataRoomsPage />
}
