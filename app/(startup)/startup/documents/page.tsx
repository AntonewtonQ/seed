import type { Metadata } from "next"

import { StartupDocumentsPage } from "@/components/startup/startup-documents-page"

export const metadata: Metadata = {
  title: "Documentos da startup | SEED",
  description: "Data room e documentos de investimento da startup.",
}

export default function StartupDocumentsRoute() {
  return <StartupDocumentsPage />
}
