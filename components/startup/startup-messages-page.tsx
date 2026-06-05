import Link from "next/link"
import { MailOpen, MessageSquareText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { sendStartupMessageAction } from "@/lib/startup-actions"

import { StartupFormField, StartupTextArea } from "./startup-form-fields"
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
        description="Mensagens recebidas de investidores, equipa SEED e parceiros da aceleradora."
        title="Mensagens"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-3">
          {startupMessages.map((message) => (
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
                  <Link href="/startup/messages#message-reply">Responder</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/startup/checklist">Ver contexto</Link>
                </Button>
              </div>
            </article>
          ))}

          <form
            action={sendStartupMessageAction}
            className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
            id="message-reply"
          >
            <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
              Resposta
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
              Nova mensagem
            </h2>
            <div className="mt-5 grid gap-5">
              <StartupFormField
                label="Assunto"
                name="subject"
                placeholder="Ex.: Re: Modelo financeiro"
                required
              />
              <StartupTextArea
                label="Mensagem"
                name="body"
                placeholder="Escreva uma resposta objetiva e ligada ao processo."
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
              Preparado para inbox real
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
              A próxima etapa é ligar esta lista a threads, participantes e estados de leitura no backend.
            </p>
          </article>
          <article className="rounded-lg border border-border bg-card p-5">
            <MailOpen
              aria-hidden="true"
              className="size-6 text-[color:var(--seed-petroleum)]"
            />
            <h2 className="mt-4 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
              Regras de resposta
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">
              Respostas futuras devem ficar associadas ao processo, documento ou investidor correspondente.
            </p>
          </article>
        </aside>
      </div>
    </>
  )
}
