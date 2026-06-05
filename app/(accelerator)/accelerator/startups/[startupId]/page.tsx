import { notFound } from "next/navigation"

import { AcceleratorStartupDetailPage } from "@/components/accelerator/accelerator-startup-detail-page"
import {
  getAcceleratedStartup,
  getAcceleratedStartups,
} from "@/lib/accelerator-service"

export async function generateStaticParams() {
  return getAcceleratedStartups().map((startup) => ({
    startupId: startup.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ startupId: string }>
}) {
  const { startupId } = await params
  const startup = getAcceleratedStartup(startupId)

  return {
    title: startup ? `${startup.name} | SEED` : "Startup acelerada | SEED",
    description: startup
      ? `Acompanhamento da startup ${startup.name} pela aceleradora.`
      : "Detalhe de startup acompanhada pela aceleradora.",
  }
}

export default async function AcceleratorStartupDetailRoute({
  params,
}: {
  params: Promise<{ startupId: string }>
}) {
  const { startupId } = await params
  const startup = getAcceleratedStartup(startupId)

  if (!startup) {
    notFound()
  }

  return <AcceleratorStartupDetailPage startup={startup} />
}
