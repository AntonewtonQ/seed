import {
  PlatformWizard,
  type PlatformWizardProps,
} from "@/components/platform/platform-wizard"

import { AcceleratorHeaderInbox } from "./accelerator-header-inbox"

type AcceleratorWizardProps = Omit<PlatformWizardProps, "eyebrow" | "inbox">

export function AcceleratorWizard(props: AcceleratorWizardProps) {
  return (
    <PlatformWizard
      {...props}
      eyebrow="Área da aceleradora"
      inbox={<AcceleratorHeaderInbox />}
    />
  )
}
