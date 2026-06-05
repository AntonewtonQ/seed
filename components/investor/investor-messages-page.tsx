import Link from "next/link"
import { MessageSquareText } from "lucide-react"

import {
  PlatformFormField,
  PlatformTextArea,
} from "@/components/platform/platform-form-fields"
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
        description="Mensagens com startups, equipa SEED e responsáveis pelo pipeline."
        title="Mensagens"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {investorMessages.map((message) => (
            <article
              className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
              id={message.id}
              key={message.id}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                    {message.from} · {message.role}
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    {message.subject}
                  </h2>
                </div>
                <span className="w-fit rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                  {message.receivedAt}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-muted-foreground">
                {message.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="outline">
                  <Link href="/investor/messages#investor-message-reply">
                    Responder
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/investor/pipeline">Ver contexto</Link>
                </Button>
              </div>
            </article>
          ))}

          <form
            action={sendInvestorMessageAction}
            className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
            id="investor-message-reply"
          >
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
              Resposta
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
              Nova mensagem
            </h2>
            <div className="mt-5 grid gap-5">
              <PlatformFormField
                label="Assunto"
                name="subject"
                placeholder="Ex.: Re: Cap table atualizado"
                required
              />
              <PlatformTextArea
                label="Mensagem"
                name="body"
                placeholder="Escreva uma resposta objetiva e ligada ao deal."
                required
              />
            </div>
            <Button className="mt-5" type="submit">
              Enviar mensagem
            </Button>
          </form>
        </section>

        <aside className="grid content-start gap-4">
          <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
            <MessageSquareText
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-gold-soft)]"
            />
            <h2 className="mt-4 text-xl font-extrabold tracking-normal">
              Threads por deal
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              A próxima etapa é associar cada conversa a uma startup, processo e participantes.
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
