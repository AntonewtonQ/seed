import { notFound } from "next/navigation"

import { StartupDocumentDetailPage } from "@/components/startup/startup-document-detail-page"
import {
  getStartupDocument,
  getStartupDocuments,
} from "@/lib/startup-service"

export async function generateStaticParams() {
  return getStartupDocuments().map((document) => ({
    documentId: document.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params
  const document = getStartupDocument(documentId)

  return {
    title: document ? `${document.name} | SEED` : "Documento | SEED",
    description: document
      ? `Detalhe do documento ${document.name} no data room.`
      : "Documento do data room da startup.",
  }
}

export default async function StartupDocumentDetailRoute({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params
  const document = getStartupDocument(documentId)

  if (!document) {
    notFound()
  }

  return <StartupDocumentDetailPage document={document} />
}
