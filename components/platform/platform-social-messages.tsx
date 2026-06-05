import Link from "next/link"
import {
  AtSign,
  Circle,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type PlatformSocialMessage = {
  id: string
  from: string
  role: string
  subject: string
  body: string
  receivedAt: string
  unread: boolean
  href: string
}

export type PlatformSocialContextLink = {
  href: string
  label: string
}

type PlatformSocialMessagesProps = {
  action: React.ComponentProps<"form">["action"]
  composerId: string
  contextDescription: string
  contextLinks: PlatformSocialContextLink[]
  contextTitle: string
  currentUserLabel: string
  messages: PlatformSocialMessage[]
  placeholder: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function PlatformSocialMessages({
  action,
  composerId,
  contextDescription,
  contextLinks,
  contextTitle,
  currentUserLabel,
  messages,
  placeholder,
}: PlatformSocialMessagesProps) {
  const activeMessage = messages.find((message) => message.unread) ?? messages[0]

  return (
    <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 2xl:grid-cols-[21rem_minmax(0,1fr)_21rem]">
      <aside className="rounded-lg border border-border bg-card shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                Inbox
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-[color:var(--seed-petroleum)]">
                Conversas
              </h2>
            </div>
            <Button aria-label="Mais opções" size="icon" type="button" variant="ghost">
              <MoreHorizontal aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-4 flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-muted-foreground">
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate text-sm font-semibold">
              Procurar conversa
            </span>
          </div>
        </div>

        <div className="grid gap-1 p-2">
          {messages.map((message) => {
            const isActive = message.id === activeMessage?.id

            return (
              <Link
                className={cn(
                  "grid grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-3 rounded-lg p-3 transition-colors",
                  isActive
                    ? "bg-[color:var(--seed-tint)]"
                    : "hover:bg-muted/70"
                )}
                href={message.href}
                key={message.id}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-[color:var(--seed-petroleum)] text-xs font-extrabold text-white">
                  {getInitials(message.from)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                      {message.from}
                    </p>
                    {message.unread ? (
                      <Circle
                        aria-hidden="true"
                        className="size-2 fill-[color:var(--seed-gold)] text-[color:var(--seed-gold)]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-1 truncate text-xs font-bold text-muted-foreground">
                    {message.subject}
                  </p>
                </div>
                <span className="text-[10px] font-extrabold text-muted-foreground">
                  {message.receivedAt}
                </span>
              </Link>
            )
          })}
        </div>
      </aside>

      <section className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--seed-petroleum)] text-sm font-extrabold text-white">
              {activeMessage ? getInitials(activeMessage.from) : "SD"}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-xl font-extrabold text-[color:var(--seed-petroleum)]">
                {activeMessage?.subject ?? "Nova conversa"}
              </h2>
              <p className="mt-1 truncate text-xs font-bold text-muted-foreground">
                {activeMessage
                  ? `${activeMessage.from} · ${activeMessage.role}`
                  : "Selecione uma conversa"}
              </p>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href={`#${composerId}`}>Responder</Link>
          </Button>
        </div>

        <div className="grid gap-5 bg-background p-4 md:p-6">
          {messages.map((message, index) => (
            <article
              className="grid gap-3"
              id={message.id}
              key={message.id}
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--seed-petroleum)] text-xs font-extrabold text-white">
                  {getInitials(message.from)}
                </div>
                <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                        {message.from}
                      </p>
                      <p className="mt-1 text-xs font-bold text-muted-foreground">
                        {message.role} · {message.receivedAt}
                      </p>
                    </div>
                    {message.unread ? (
                      <span className="w-fit rounded-full bg-[color:var(--seed-gold)] px-2 py-1 text-[10px] font-extrabold text-[color:var(--seed-petroleum)]">
                        Nova
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-[color:var(--seed-petroleum)]">
                    {message.subject}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                    {message.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`#${composerId}`}>Responder</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={message.href}>Abrir thread</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {index === 0 ? (
                <div className="ml-[3.25rem] flex items-start gap-3 pl-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--seed-cream)] text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                    SE
                  </div>
                  <div className="min-w-0 rounded-lg bg-[color:var(--seed-tint)] p-3">
                    <p className="text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                      {currentUserLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                      Esta thread fica ligada ao contexto do processo e pronta para histórico no backend.
                    </p>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <form
          action={action}
          className="border-t border-border bg-card p-4"
          id={composerId}
        >
          <input
            className="sr-only"
            defaultValue={activeMessage?.subject ?? "Nova conversa"}
            name="subject"
            readOnly
          />
          <label className="sr-only" htmlFor={`${composerId}-body`}>
            Mensagem
          </label>
          <textarea
            className="min-h-28 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[color:var(--seed-petroleum)]"
            id={`${composerId}-body`}
            name="body"
            placeholder={placeholder}
            required
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1">
              <Button aria-label="Anexar ficheiro" size="icon" type="button" variant="ghost">
                <Paperclip aria-hidden="true" />
              </Button>
              <Button aria-label="Mencionar utilizador" size="icon" type="button" variant="ghost">
                <AtSign aria-hidden="true" />
              </Button>
              <Button aria-label="Adicionar reação" size="icon" type="button" variant="ghost">
                <Smile aria-hidden="true" />
              </Button>
            </div>
            <Button type="submit">
              <Send aria-hidden="true" />
              Publicar resposta
            </Button>
          </div>
        </form>
      </section>

      <aside className="grid content-start gap-4">
        <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
          <MessageCircle
            aria-hidden="true"
            className="size-6 text-[color:var(--seed-gold-soft)]"
          />
          <h2 className="mt-4 text-xl font-extrabold tracking-normal">
            {contextTitle}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
            {contextDescription}
          </p>
        </article>

        <article className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Contexto
          </p>
          <div className="mt-4 grid gap-2">
            {contextLinks.map((link) => (
              <Button asChild className="justify-start" key={link.href} variant="outline">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </article>
      </aside>
    </div>
  )
}
