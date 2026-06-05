import type { Metadata } from "next"

import { StartupDocumentNewPage } from "@/components/startup/startup-document-new-page"

export const metadata: Metadata = {
  title: "Novo documento | SEED",
  description: "Adicione documentos ao data room da startup.",
}

export default function StartupDocumentNewRoute() {
  return <StartupDocumentNewPage />
}
