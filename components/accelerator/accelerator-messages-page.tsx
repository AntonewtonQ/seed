import Link from "next/link"

import { PlatformSocialMessages } from "@/components/platform/platform-social-messages"
import { Button } from "@/components/ui/button"
import { sendAcceleratorMessageAction } from "@/lib/accelerator-actions"

import { acceleratorMessages } from "./accelerator-data"
import { AcceleratorPageHeader } from "./accelerator-page-header"

export function AcceleratorMessagesPage() {
  return (
    <>
      <AcceleratorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/accelerator/startups">Ver startups</Link>
          </Button>
        }
        description="Conversas com startups, investidores e equipa SEED, organizadas por contexto de programa, pipeline e data room."
        title="Mensagens"
      />

      <PlatformSocialMessages
        action={sendAcceleratorMessageAction}
        composerId="accelerator-message-composer"
        contextDescription="As conversas da aceleradora devem ficar associadas a startups, investidores, programas e bloqueios de preparação."
        contextLinks={[
          { href: "/accelerator/startups", label: "Startups" },
          { href: "/accelerator/programs", label: "Programas" },
          { href: "/accelerator/diligence", label: "Due diligence" },
        ]}
        contextTitle="Thread da aceleradora"
        currentUserLabel="Equipa da aceleradora"
        messages={acceleratorMessages}
        placeholder="Responder como aceleradora..."
      />
    </>
  )
}
