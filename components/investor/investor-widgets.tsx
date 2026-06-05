import Link from "next/link"
import {
  ArrowRight,
  FolderOpen,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  diligenceStatusTone,
  investorDataRooms,
  investorDiligenceTasks,
  investorMetrics,
  investorOpportunities,
  investorPipeline,
  investorProfile,
  opportunityStatusTone,
} from "./investor-data"

export function InvestorMetricCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {investorMetrics.map((metric) => {
        const Icon = metric.icon

        return (
          <article
            className="rounded-lg border border-border bg-card p-4 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
            key={metric.id}
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

export function InvestorMandateCard() {
  return (
    <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)] shadow-[0_18px_42px_rgba(15,61,62,0.2)]">
      <Target
        aria-hidden="true"
        className="size-6 text-[color:var(--seed-gold-soft)]"
      />
      <h2 className="mt-4 text-xl font-extrabold tracking-normal">
        Mandato de investimento
      </h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--seed-tint)]">
        {investorProfile.thesis}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {investorProfile.sectors.map((sector) => (
          <span
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold text-[color:var(--seed-cream)]"
            key={sector}
          >
            {sector}
          </span>
        ))}
      </div>
    </article>
  )
}

export function OpportunitiesList({ compact = false }: { compact?: boolean }) {
  const items = compact ? investorOpportunities.slice(0, 3) : investorOpportunities

  return (
    <div className="grid gap-3">
      {items.map((opportunity) => (
        <Link
          className="grid gap-4 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/70 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          href={`/investor/opportunities/${opportunity.id}`}
          key={opportunity.id}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-extrabold text-[color:var(--seed-petroleum)]">
                {opportunity.name}
              </h3>
              <span
                className={cn(
                  "rounded-full border px-2 py-1 text-xs font-extrabold",
                  opportunityStatusTone[opportunity.status]
                )}
              >
                {opportunity.status}
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
              {opportunity.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[opportunity.sector, opportunity.stage, opportunity.ask].map(
                (item) => (
                  <span
                    className="rounded-full bg-[color:var(--seed-tint)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]"
                    key={item}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="rounded-lg bg-[color:var(--seed-cream)] p-4 text-center">
            <p className="text-xs font-bold text-muted-foreground">Match</p>
            <strong className="mt-1 block text-3xl font-extrabold text-[color:var(--seed-petroleum)]">
              {opportunity.match}%
            </strong>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function PipelineCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Pipeline
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Deals em acompanhamento
          </h2>
        </div>
        <TrendingUp
          aria-hidden="true"
          className="size-6 text-[color:var(--seed-petroleum)]"
        />
      </div>
      <div className="mt-5 grid gap-3">
        {investorPipeline.map((deal) => (
          <Link
            className="grid gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/70 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            href={deal.href}
            key={deal.id}
          >
            <div>
              <p className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                {deal.startup}
              </p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                {deal.stage} · {deal.owner}
              </p>
            </div>
            <div className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
              {deal.value}
            </div>
          </Link>
        ))}
      </div>
      <Button asChild className="mt-5" variant="outline">
        <Link href="/investor/pipeline">
          Ver pipeline
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    </article>
  )
}

export function DiligenceTasksCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Due diligence
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Tarefas em aberto
          </h2>
        </div>
        <ShieldCheck
          aria-hidden="true"
          className="size-6 text-[color:var(--seed-petroleum)]"
        />
      </div>
      <div className="mt-5 grid gap-3">
        {investorDiligenceTasks.map((task) => (
          <Link
            className="grid gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/70 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            href={task.href}
            key={task.id}
          >
            <div>
              <p className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                {task.title}
              </p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                {task.startup} · {task.dueAt}
              </p>
            </div>
            <span
              className={cn(
                "w-fit rounded-full border px-2 py-1 text-xs font-extrabold",
                diligenceStatusTone[task.status]
              )}
            >
              {task.status}
            </span>
          </Link>
        ))}
      </div>
    </article>
  )
}

export function DataRoomsCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Data rooms
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Acessos recentes
          </h2>
        </div>
        <FolderOpen
          aria-hidden="true"
          className="size-6 text-[color:var(--seed-petroleum)]"
        />
      </div>
      <div className="mt-5 grid gap-3">
        {investorDataRooms.map((room) => (
          <Link
            className="grid gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/70 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            href={room.href}
            key={room.id}
          >
            <div>
              <p className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                {room.startup}
              </p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                {room.category} · {room.updatedAt}
              </p>
            </div>
            <span className="w-fit rounded-full bg-[color:var(--seed-tint)] px-2 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
              {room.access}
            </span>
          </Link>
        ))}
      </div>
    </article>
  )
}
