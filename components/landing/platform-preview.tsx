import Link from "next/link";
import { SeedLogo } from "@/components/brand/seed-logo";
import { SectionHeading } from "./section-heading";
const steps = [
  ["01", "Abrir ronda", "Defina uma meta e moeda para a captação."],
  [
    "02",
    "Acompanhar a negociação",
    "Associe o investidor, registe interações e atualize a etapa.",
  ],
  [
    "03",
    "Partilhar documentos",
    "Conceda acesso por documento e revogue-o quando necessário.",
  ],
  [
    "04",
    "Consultar indicadores",
    "Leia a conversão e o tempo até ao primeiro compromisso com a respetiva base de cálculo.",
  ],
];
export function PlatformPreview() {
  return (
    <section
      id="plataforma"
      className="bg-[color:var(--seed-cream)] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Plataforma"
          title="Rondas, negociações e documentos no mesmo fluxo."
          description="A demonstração utiliza contas fictícias. Não apresenta respostas de pesquisa nem investimentos reais."
        />
        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-background shadow-[0_22px_60px_rgba(15,61,62,0.14)]">
          <div className="grid lg:grid-cols-[16rem_minmax(0,1fr)]">
            <aside className="bg-[color:var(--seed-petroleum)] p-6 text-[color:var(--seed-cream)]">
              <SeedLogo compact tone="light" />
              <h3 className="mt-8 text-xl font-bold">
                Captação pós-aceleração
              </h3>
              <p className="mt-4 text-sm leading-6">
                Uma intenção não é dinheiro recebido. Um estado de term sheet é
                um registo manual, sem assinatura eletrónica integrada.
              </p>
              <Link
                className="mt-8 inline-block rounded-lg bg-[color:var(--seed-gold)] px-4 py-3 font-bold text-[color:var(--seed-petroleum)]"
                href="/login"
              >
                Entrar na demonstração
              </Link>
            </aside>
            <ol className="grid gap-5 p-6 sm:grid-cols-2">
              {steps.map(([n, title, description]) => (
                <li key={n} className="rounded-lg border p-6">
                  <p className="text-sm font-bold text-[color:var(--seed-petroleum-2)]">
                    {n}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
