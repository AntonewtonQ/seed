import {
  PlatformWizard,
  type PlatformWizardProps,
} from "@/components/platform/platform-wizard"

import { StartupHeaderInbox } from "./startup-header-inbox"

type StartupWizardProps = Omit<PlatformWizardProps, "eyebrow" | "inbox">

export function StartupWizard(props: StartupWizardProps) {
  return (
    <PlatformWizard
      {...props}
      eyebrow="Área da startup"
      inbox={<StartupHeaderInbox />}
    />
  )
}
