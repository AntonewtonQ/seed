import { PlatformHeaderInbox } from "@/components/platform/platform-header-inbox"

import { startupMessages, startupNotifications } from "./startup-data"

export function StartupHeaderInbox() {
  return (
    <PlatformHeaderInbox
      messages={startupMessages}
      messagesHref="/startup/messages"
      notifications={startupNotifications}
      notificationsHref="/startup/notifications"
    />
  )
}
