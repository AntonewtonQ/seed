import type { Metadata } from "next"

import { AcceleratorPipelinePage } from "@/components/accelerator/accelerator-pipeline-page"

export const metadata: Metadata = {
  title: "Pipeline da aceleradora | SEED",
  description: "Pipeline das startups acompanhadas pela aceleradora.",
}

export default function AcceleratorPipelineRoute() {
  return <AcceleratorPipelinePage />
}
