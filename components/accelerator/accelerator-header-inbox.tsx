import { PlatformHeaderInbox } from "@/components/platform/platform-header-inbox"

import { acceleratorMessages, acceleratorNotifications } from "./accelerator-data"

export function AcceleratorHeaderInbox() {
  return (
    <PlatformHeaderInbox
      messages={acceleratorMessages}
      messagesHref="/accelerator/messages"
      notifications={acceleratorNotifications}
      notificationsHref="/accelerator/notifications"
    />
  )
}
