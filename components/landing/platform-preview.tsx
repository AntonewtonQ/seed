import { ArrowRight, Bell, MessageSquareText, TrendingUp } from "lucide-react"

import { SeedLogo } from "@/components/brand/seed-logo"
import { SeedMark } from "@/components/brand/seed-mark"
import { Button } from "@/components/ui/button"

import {
  funnelStages,
  platformMetrics,
  recentActivities,
} from "./landing-data"
import { SectionHeading } from "./section-heading"

export function PlatformPreview() {
  return (
    <section
      className="bg-[color:var(--seed-cream)] px-4 py-20 sm:px-6 lg:px-8"
      id="plataforma"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          description="A SEED reúne indicadores, documentos e atividades num espaço único para que cada decisão tenha contexto."
          eyebrow="Plataforma"
          title="Pipeline, data room e due diligence no mesmo fluxo."
        />

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-background shadow-[0_22px_60px_rgba(15,61,62,0.14)]">
          <div className="grid lg:grid-cols-[16rem_minmax(0,1fr)]">
            <aside className="bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)]">
              <SeedLogo compact showTagline tone="light" />
              <nav
                aria-label="Preview da plataforma"
                className="mt-8 grid gap-1.5"
              >
                {["Visão Geral", "Pipeline", "Data Room", "Due Diligence"].map(
                  (item, index) => (
                    <div
                      className={
                        index === 0
                          ? "rounded-lg bg-[color:var(--seed-cream)] px-3 py-2 text-sm font-extrabold text-[color:var(--seed-petroleum)]"
                          : "rounded-lg px-3 py-2 text-sm font-bold text-[color:var(--seed-tint)]"
                      }
                      key={item}
                    >
                      {item}
                    </div>
                  )
                )}
              </nav>
              <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.08] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[color:var(--seed-gold)] text-sm font-extrabold text-[color:var(--seed-petroleum)]">
                    MS
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      Miguel Sebastião
                    </p>
                    <p className="truncate text-xs text-[color:var(--seed-tint)]">
                      Head de Parcerias
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 p-4 md:p-6">
              <header className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                    Plataforma SEED
                  </p>
                  <h3 className="mt-1 text-3xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
                    Visão Geral
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button aria-label="Mensagens" size="icon" variant="ghost">
                    <MessageSquareText aria-hidden="true" />
                  </Button>
                  <Button aria-label="Notificações" size="icon" variant="ghost">
                    <Bell aria-hidden="true" />
                  </Button>
                  <Button asChild size="lg">
                    <a href="#começar">Solicitar acesso</a>
                  </Button>
                </div>
              </header>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {platformMetrics.map((metric) => (
                  <article
                    className="rounded-lg border border-border bg-card p-4"
                    key={metric.label}
                  >
                    <p className="text-xs font-bold text-muted-foreground">
                      {metric.label}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <strong className="text-3xl font-extrabold text-[color:var(--seed-petroleum)]">
                        {metric.value}
                      </strong>
                      <span className="rounded-full bg-[color:var(--seed-tint)] px-2 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum-2)]">
                        {metric.trend}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
                <article className="rounded-lg border border-border bg-card p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                        Pipeline de investimentos
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold tracking-normal">
                        Conversão por etapa
                      </h3>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[color:var(--seed-cream)] px-3 py-1 text-xs font-extrabold text-[color:var(--seed-petroleum)]">
                      <TrendingUp aria-hidden="true" className="size-3.5" />
                      +14% no mês
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {funnelStages.map((stage) => (
                      <div
                        className="grid grid-cols-[6.75rem_minmax(0,1fr)_2.5rem] items-center gap-3"
                        key={stage.stage}
                      >
                        <span className="text-sm font-bold text-muted-foreground">
                          {stage.stage}
                        </span>
                        <div className="h-8 overflow-hidden rounded-md bg-muted">
                          <div
                            className="h-full rounded-md"
                            style={{
                              backgroundColor: stage.color,
                              width: stage.width,
                            }}
                          />
                        </div>
                        <strong className="text-right text-sm font-extrabold">
                          {stage.count}
                        </strong>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                        Atividades recentes
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold tracking-normal">
                        Movimento do dia
                      </h3>
                    </div>
                    <Button aria-label="Ver todas" size="icon" variant="ghost">
                      <ArrowRight aria-hidden="true" />
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon

                      return (
                        <div
                          className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                          key={activity.title}
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--seed-tint)] text-[color:var(--seed-petroleum)]">
                            <Icon aria-hidden="true" className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-extrabold">
                              {activity.title}
                            </p>
                            <p className="truncate text-xs font-semibold text-muted-foreground">
                              {activity.detail}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </article>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <article className="rounded-lg bg-[color:var(--seed-petroleum)] p-5 text-[color:var(--seed-cream)]">
                  <SeedMark className="size-14" tone="light" />
                  <h3 className="mt-4 text-2xl font-extrabold tracking-normal">
                    Partilha segura para documentos sensíveis.
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[color:var(--seed-tint)]">
                    Cada oportunidade mantém documentos, permissões e histórico
                    ligados ao mesmo processo de análise.
                  </p>
                </article>
                <article className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
                        Due diligence
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold tracking-normal">
                        Checklist seguro
                      </h3>
                    </div>
                    <span className="text-3xl font-extrabold text-[color:var(--seed-petroleum)]">
                      82%
                    </span>
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[82%] rounded-full bg-[color:var(--seed-gold)]" />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
