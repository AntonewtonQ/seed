import {
  PlatformWizard,
  type PlatformWizardProps,
} from "@/components/platform/platform-wizard"

import { InvestorHeaderInbox } from "./investor-header-inbox"

type InvestorWizardProps = Omit<PlatformWizardProps, "eyebrow" | "inbox">

export function InvestorWizard(props: InvestorWizardProps) {
  return (
    <PlatformWizard
      {...props}
      eyebrow="Área do investidor"
      inbox={<InvestorHeaderInbox />}
    />
  )
}
