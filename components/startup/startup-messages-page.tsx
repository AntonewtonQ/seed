import Link from "next/link"

import { PlatformSocialMessages } from "@/components/platform/platform-social-messages"
import { Button } from "@/components/ui/button"
import { sendStartupMessageAction } from "@/lib/startup-actions"

import { startupMessages } from "./startup-data"
import { StartupPageHeader } from "./startup-page-header"

export function StartupMessagesPage() {
  return (
    <>
      <StartupPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/startup/documents">Abrir data room</Link>
          </Button>
        }
        description="Conversas com investidores, equipa SEED e parceiros da aceleradora, organizadas em threads com contexto."
        title="Mensagens"
      />

      <PlatformSocialMessages
        action={sendStartupMessageAction}
        composerId="startup-message-composer"
        contextDescription="As conversas da startup devem ficar ligadas a documentos, checklist e processos de due diligence."
        contextLinks={[
          { href: "/startup/documents", label: "Data room" },
          { href: "/startup/checklist", label: "Checklist" },
          { href: "/startup/pitch", label: "Pitch" },
        ]}
        contextTitle="Thread da startup"
        currentUserLabel="Equipa da startup"
        messages={startupMessages}
        placeholder="Responder como startup..."
      />
    </>
  )
}
