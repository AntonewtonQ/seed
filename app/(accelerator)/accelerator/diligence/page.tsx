import type { Metadata } from "next"

import { AcceleratorDiligencePage } from "@/components/accelerator/accelerator-diligence-page"

export const metadata: Metadata = {
  title: "Due diligence da aceleradora | SEED",
  description: "Tarefas de validação das startups aceleradas.",
}

export default function AcceleratorDiligenceRoute() {
  return <AcceleratorDiligencePage />
}
