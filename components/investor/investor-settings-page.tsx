import Link from "next/link"

import { PlatformCheckbox } from "@/components/platform/platform-form-fields"
import { Button } from "@/components/ui/button"
import { saveInvestorSettingsAction } from "@/lib/investor-actions"

import { InvestorMandateCard } from "./investor-widgets"
import { InvestorPageHeader } from "./investor-page-header"

export function InvestorSettingsPage() {
  return (
    <>
      <InvestorPageHeader
        action={
          <Button asChild size="lg">
            <Link href="/investor/settings/notifications">
              Ajustar alertas
            </Link>
          </Button>
        }
        description="Preferências de matching, notificações e partilha do perfil do investidor."
        title="Definições do investidor"
      />

      <div className="grid gap-4 px-4 py-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <form
          action={saveInvestorSettingsAction}
          className="rounded-lg border border-border bg-card p-5 shadow-[0_14px_34px_rgba(15,61,62,0.07)]"
        >
          <p className="text-xs font-extrabold uppercase tracking-normal text-[color:var(--seed-petroleum-2)]">
            Preferências
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-normal text-[color:var(--seed-petroleum)]">
            Matching e privacidade
          </h2>
          <div className="mt-5 grid gap-3">
            <PlatformCheckbox
              defaultChecked
              description="Priorizar startups com encaixe de tese acima de 80%."
              label="Matching forte"
              name="strong-match"
            />
            <PlatformCheckbox
              defaultChecked
              description="Receber alertas quando um data room for atualizado."
              label="Atualizações de data room"
              name="data-room-updates"
            />
            <PlatformCheckbox
              description="Permitir que startups qualificadas vejam o mandato do investidor."
              label="Mandato visível para startups"
              name="visible-mandate"
            />
          </div>
          <Button className="mt-5" type="submit">
            Guardar alterações
          </Button>
        </form>

        <aside className="grid content-start gap-4">
          <InvestorMandateCard />
        </aside>
      </div>
    </>
  )
}
