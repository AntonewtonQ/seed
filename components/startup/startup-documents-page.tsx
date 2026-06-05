import Link from "next/link"

import { Button } from "@/components/ui/button"

import { StartupPageHeader } from "./startup-page-header"
import { DocumentsCard } from "./startup-widgets"

export function StartupDocumentsPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/documents/new">Adicionar documento</Link>
          </Button>
        }
        description="Página dedicada ao data room da startup. Aqui entram apenas documentos, estados, categorias e preparação para partilha."
        title="Documentos e data room"
      />

      <div className="px-4 py-6 md:px-8 md:py-8">
        <DocumentsCard />
      </div>
    </>
  )
}
