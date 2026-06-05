import { notFound } from "next/navigation"

import { InvestorOpportunityDetailPage } from "@/components/investor/investor-opportunity-detail-page"
import {
  getInvestorOpportunities,
  getInvestorOpportunity,
} from "@/lib/investor-service"

export async function generateStaticParams() {
  return getInvestorOpportunities().map((opportunity) => ({
    startupId: opportunity.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ startupId: string }>
}) {
  const { startupId } = await params
  const opportunity = getInvestorOpportunity(startupId)

  return {
    title: opportunity ? `${opportunity.name} | SEED` : "Oportunidade | SEED",
    description: opportunity
      ? `Detalhe de investimento da startup ${opportunity.name}.`
      : "Detalhe de oportunidade para investidor.",
  }
}

export default async function InvestorOpportunityDetailRoute({
  params,
}: {
  params: Promise<{ startupId: string }>
}) {
  const { startupId } = await params
  const opportunity = getInvestorOpportunity(startupId)

  if (!opportunity) {
    notFound()
  }

  return <InvestorOpportunityDetailPage opportunity={opportunity} />
}
