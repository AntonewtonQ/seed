import type { Metadata } from "next"

import { AcceleratorProgramsPage } from "@/components/accelerator/accelerator-programs-page"

export const metadata: Metadata = {
  title: "Programas da aceleradora | SEED",
  description: "Programas, cohorts e marcos da aceleradora.",
}

export default function AcceleratorProgramsRoute() {
  return <AcceleratorProgramsPage />
}
