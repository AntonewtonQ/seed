import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  FileCheck,
  FolderLock,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  nextActions,
  readinessChecklist,
  startupDocuments,
  startupMetrics,
  startupMilestones,
  statusTone,
} from "./startup-data"

export function StartupMetricCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {startupMetrics.map((metric) => {
        const Icon = metric.icon

        return (
          <article
            className="rounded-lg border border-border bg-card p-4 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
            key={metric.label}
          >
            <Link className="block" href={metric.href}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold text-muted-foreground">
                  {metric.label}
                </p>
                <Icon
                  aria-hidden="true"
                  className="size-4 text-[color:var(--seed-petroleum)]"
                />
              </div>
              <strong className="mt-4 block text-3xl font-extrabold text-[color:var(--seed-petroleum)]">
                {metric.value}
              </strong>
              <p className="mt-1 text-xs font-extrabold text-[color:var(--seed-petroleum-2)]">
                {metric.trend}
              </p>
            </Link>
          </article>
        )
      })}
    </section>
  )
}

export function ReadinessCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Checklist
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Prontidão para due diligence
          </h2>
        </div>
        <ShieldCheck
          aria-hidden="true"
          className="size-6 text-[color:var(--seed-petroleum)]"
        />
      </div>

      <div className="mt-5 grid gap-4">
        {readinessChecklist.map((item) => (
          <Link
            className="grid gap-2 rounded-lg transition-colors hover:bg-muted/70"
            href={item.href}
            key={item.label}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-extrabold">{item.label}</span>
              <span className="text-xs font-bold text-muted-foreground">
                {item.status}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[color:var(--seed-petroleum)]"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </article>
  )
}

export function DocumentsList({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-3">
      {startupDocuments.map((document) => (
        <Link
          className="grid gap-3 rounded-lg border border-border bg-background p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
          href={`/startup/documents/${document.id}`}
          key={document.name}
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-[color:var(--seed-petroleum)]">
              {document.name}
            </p>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">
              {document.category}
              {compact ? null : ` · ${document.updatedAt}`}
            </p>
          </div>
          <span
            className={cn(
              "w-fit rounded-full border px-2 py-1 text-xs font-extrabold",
              statusTone[document.status]
            )}
          >
            {document.status}
          </span>
        </Link>
      ))}
    </div>
  )
}

export function DocumentsCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Documentos
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Data room da startup
          </h2>
        </div>
        <Button asChild>
          <Link href="/startup/documents/new">
            <FolderLock aria-hidden="true" />
            Adicionar documento
          </Link>
        </Button>
      </div>

      <div className="mt-5">
        <DocumentsList />
      </div>
    </article>
  )
}

export function NextActionsCard() {
  return (
    <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
      <Sparkles
        aria-hidden="true"
        className="size-6 text-[color:var(--seed-gold-soft)]"
      />
      <h2 className="mt-4 text-xl font-extrabold tracking-normal">
        Próximas ações
      </h2>
      <div className="mt-4 grid gap-3">
        {nextActions.map((action) => (
          <Link
            className="flex items-start gap-2 rounded-lg p-2 text-sm font-semibold leading-6 text-[color:var(--seed-tint)] transition-colors hover:bg-white/10"
            href={action.href}
            key={action.label}
          >
            <ArrowRight
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-[color:var(--seed-gold-soft)]"
            />
            <span>
              <span className="block text-[color:var(--seed-cream)]">
                {action.label}
              </span>
              <span className="block text-xs text-[color:var(--seed-tint)]">
                {action.detail}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </article>
  )
}

export function MilestonesCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
      <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
        Marcos
      </p>
      <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
        Progresso da startup
      </h2>
      <div className="mt-5 grid gap-3">
        {startupMilestones.map((milestone) => (
          <p
            className="flex items-start gap-3 text-sm font-semibold leading-6 text-muted-foreground"
            key={milestone}
          >
            <CheckCircle
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-[color:var(--seed-petroleum)]"
            />
            {milestone}
          </p>
        ))}
      </div>
    </article>
  )
}

export function ProfileVisibilityCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
      <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
        Configuração
      </p>
      <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
        Visibilidade do perfil
      </h2>
      <div className="mt-5 grid gap-3">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
            Privado até revisão final
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
            O perfil fica acessível apenas à equipa da startup até a
            documentação estar pronta para partilha.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/startup/profile/preview">
            <FileCheck aria-hidden="true" />
            Pré-visualizar perfil
          </Link>
        </Button>
      </div>
    </article>
  )
}
