import Link from "next/link"

import { PlatformSocialMessages } from "@/components/platform/platform-social-messages"
import { Button } from "@/components/ui/button"
import { sendInvestorMessageAction } from "@/lib/investor-actions"

import { investorMessages } from "./investor-data"
import { InvestorPageHeader } from "./investor-page-header"

export function InvestorMessagesPage() {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/investor/opportunities">Ver oportunidades</Link>
          </Button>
        }
        description="Conversas com startups, equipa SEED e responsáveis pelo pipeline, organizadas como threads sociais por deal."
        title="Mensagens"
      />

      <PlatformSocialMessages
        action={sendInvestorMessageAction}
        composerId="investor-message-composer"
        contextDescription="As conversas do investidor devem ficar ligadas a oportunidades, pipeline e tarefas de due diligence."
        contextLinks={[
          { href: "/investor/opportunities", label: "Oportunidades" },
          { href: "/investor/pipeline", label: "Pipeline" },
          { href: "/investor/diligence", label: "Due diligence" },
        ]}
        contextTitle="Thread do investidor"
        currentUserLabel="Equipa do investidor"
        messages={investorMessages}
        placeholder="Responder como investidor..."
      />
    </>
  )
}
