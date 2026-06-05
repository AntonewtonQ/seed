import type { Metadata } from "next"

import { AcceleratorDataRoomsPage } from "@/components/accelerator/accelerator-data-rooms-page"

export const metadata: Metadata = {
  title: "Data rooms da aceleradora | SEED",
  description: "Estado dos data rooms das startups aceleradas.",
}

export default function AcceleratorDataRoomsRoute() {
  return <AcceleratorDataRoomsPage />
}
