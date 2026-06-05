import type { Metadata } from "next"

import { AcceleratorStartupsPage } from "@/components/accelerator/accelerator-startups-page"

export const metadata: Metadata = {
  title: "Startups aceleradas | SEED",
  description: "Startups acompanhadas pela aceleradora.",
}

export default function AcceleratorStartupsRoute() {
  return <AcceleratorStartupsPage />
}
