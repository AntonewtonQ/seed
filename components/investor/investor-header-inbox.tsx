import { PlatformHeaderInbox } from "@/components/platform/platform-header-inbox"

import { investorMessages, investorNotifications } from "./investor-data"

export function InvestorHeaderInbox() {
  return (
    <PlatformHeaderInbox
      messages={investorMessages}
      messagesHref="/investor/messages"
      notifications={investorNotifications}
      notificationsHref="/investor/notifications"
    />
  )
}
