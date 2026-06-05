import { PlatformPageHeader } from "@/components/platform/platform-page-header"

import { InvestorHeaderInbox } from "./investor-header-inbox"

type InvestorPageHeaderProps = {
  title: string
  description: string
  action?: React.ReactNode
  eyebrow?: string
}

export function InvestorPageHeader({
  action,
  description,
  eyebrow = "Área do investidor",
  title,
}: InvestorPageHeaderProps) {
  return (
    <PlatformPageHeader
      action={action}
      description={description}
      eyebrow={eyebrow}
      inbox={<InvestorHeaderInbox />}
      title={title}
    />
  )
}
