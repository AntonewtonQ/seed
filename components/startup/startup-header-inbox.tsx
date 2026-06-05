"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, MessageSquareText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { startupMessages, startupNotifications } from "./startup-data"

type OpenPanel = "messages" | "notifications" | null

const notificationTone = {
  info: "bg-[color:var(--seed-tint)]",
  success: "bg-emerald-100",
  warning: "bg-[color:var(--seed-cream)]",
}

export function StartupHeaderInbox() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null)

  const unreadMessages = startupMessages.filter((message) => message.unread).length
  const unreadNotifications = startupNotifications.filter(
    (notification) => notification.unread
  ).length

  return (
    <div className="relative flex items-center gap-2">
      <HeaderInboxButton
        count={unreadMessages}
        isOpen={openPanel === "messages"}
        label="Mensagens"
        onClick={() =>
          setOpenPanel(openPanel === "messages" ? null : "messages")
        }
      >
        <MessageSquareText aria-hidden="true" />
      </HeaderInboxButton>

      <HeaderInboxButton
        count={unreadNotifications}
        isOpen={openPanel === "notifications"}
        label="Notificações"
        onClick={() =>
          setOpenPanel(
            openPanel === "notifications" ? null : "notifications"
          )
        }
      >
        <Bell aria-hidden="true" />
      </HeaderInboxButton>

      {openPanel === "messages" ? (
        <InboxPanel
          actionHref="/startup/messages"
          actionLabel="Ver mensagens"
          title="Mensagens"
        >
          {startupMessages.slice(0, 3).map((message) => (
            <Link
              className="block rounded-lg border border-border bg-background p-3 transition-colors hover:bg-muted"
              href={message.href}
              key={message.id}
              onClick={() => setOpenPanel(null)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                    {message.subject}
                  </p>
                  <p className="mt-1 truncate text-xs font-bold text-muted-foreground">
                    {message.from} · {message.role}
                  </p>
                </div>
                {message.unread ? <UnreadDot /> : null}
              </div>
              <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-muted-foreground">
                {message.body}
              </p>
            </Link>
          ))}
        </InboxPanel>
      ) : null}

      {openPanel === "notifications" ? (
        <InboxPanel
          actionHref="/startup/notifications"
          actionLabel="Ver notificações"
          title="Notificações"
        >
          {startupNotifications.slice(0, 3).map((notification) => (
            <Link
              className="block rounded-lg border border-border bg-background p-3 transition-colors hover:bg-muted"
              href={notification.href}
              key={notification.id}
              onClick={() => setOpenPanel(null)}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 size-3 shrink-0 rounded-full",
                    notificationTone[notification.tone]
                  )}
                />
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="truncate text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                      {notification.title}
                    </p>
                    {notification.unread ? <UnreadDot /> : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-muted-foreground">
                    {notification.body}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </InboxPanel>
      ) : null}
    </div>
  )
}

type HeaderInboxButtonProps = {
  children: React.ReactNode
  count: number
  isOpen: boolean
  label: string
  onClick: () => void
}

function HeaderInboxButton({
  children,
  count,
  isOpen,
  label,
  onClick,
}: HeaderInboxButtonProps) {
  return (
    <Button
      aria-expanded={isOpen}
      aria-label={label}
      className="relative"
      onClick={onClick}
      size="icon"
      type="button"
      variant="ghost"
    >
      {children}
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-[color:var(--seed-gold)] px-1 text-[10px] font-extrabold leading-4 text-[color:var(--seed-petroleum)]">
          {count}
        </span>
      ) : null}
    </Button>
  )
}

type InboxPanelProps = {
  actionHref: string
  actionLabel: string
  children: React.ReactNode
  title: string
}

function InboxPanel({ actionHref, actionLabel, children, title }: InboxPanelProps) {
  return (
    <div className="absolute right-0 top-11 z-30 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border bg-card p-3 shadow-[0_24px_70px_rgba(15,61,62,0.2)]">
      <div className="flex items-center justify-between gap-3 px-1 pb-3">
        <p className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
          {title}
        </p>
        <Link
          className="text-xs font-extrabold text-[color:var(--seed-petroleum-2)] hover:underline"
          href={actionHref}
        >
          {actionLabel}
        </Link>
      </div>
      <div className="grid gap-2">{children}</div>
    </div>
  )
}

function UnreadDot() {
  return (
    <span className="mt-1 size-2 shrink-0 rounded-full bg-[color:var(--seed-gold)]" />
  )
}
