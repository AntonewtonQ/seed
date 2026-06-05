import { PlatformPageHeader } from "@/components/platform/platform-page-header"

import { AcceleratorHeaderInbox } from "./accelerator-header-inbox"

type AcceleratorPageHeaderProps = {
  title: string
  description: string
  action?: React.ReactNode
  eyebrow?: string
}

export function AcceleratorPageHeader({
  action,
  description,
  eyebrow = "Área da aceleradora",
  title,
}: AcceleratorPageHeaderProps) {
  return (
    <PlatformPageHeader
      action={action}
      description={description}
      eyebrow={eyebrow}
      inbox={<AcceleratorHeaderInbox />}
      title={title}
    />
  )
}
