import Link from "next/link"
import { Building2, LockKeyhole, Mail, UserRound } from "lucide-react"

import { signupPreviewAction } from "@/lib/auth-actions"

import { AuthField } from "./auth-field"
import { AuthSubmitButton } from "./auth-submit-button"

const accountTypes = [
  {
    label: "Startup",
    value: "startup",
  },
  {
    label: "Investidor",
    value: "investor",
  },
  {
    label: "Aceleradora",
    value: "accelerator",
  },
]

export function SignupForm() {
  return (
    <form action={signupPreviewAction} className="grid gap-5">
      <fieldset className="grid gap-3">
        <legend className="text-sm font-extrabold text-[color:var(--seed-petroleum)]">
          Tipo de conta
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {accountTypes.map((type, index) => (
            <label
              className="flex min-h-11 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-extrabold text-foreground"
              key={type.value}
            >
              <input
                className="size-4 accent-[color:var(--seed-petroleum)]"
                defaultChecked={index === 0}
                name="role"
                type="radio"
                value={type.value}
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      <AuthField
        autoComplete="name"
        icon={UserRound}
        id="signup-name"
        label="Nome completo"
        name="name"
        placeholder="Miguel Sebastião"
        required
        type="text"
      />
      <AuthField
        autoComplete="organization"
        icon={Building2}
        id="signup-organization"
        label="Organização"
        name="organization"
        placeholder="SEED Plataforma, Lda."
        required
        type="text"
      />
      <AuthField
        autoComplete="email"
        icon={Mail}
        id="signup-email"
        label="Email profissional"
        name="email"
        placeholder="contacto@empresa.ao"
        required
        type="email"
      />
      <AuthField
        autoComplete="new-password"
        hint="Mínimo 8 caracteres"
        icon={LockKeyhole}
        id="signup-password"
        label="Palavra-passe"
        minLength={8}
        name="password"
        placeholder="Crie uma palavra-passe segura"
        required
        type="password"
      />

      <label className="flex items-start gap-3 text-sm font-semibold leading-6 text-muted-foreground">
        <input
          className="mt-1 size-4 shrink-0 accent-[color:var(--seed-petroleum)]"
          name="terms"
          required
          type="checkbox"
        />
        <span>
          Aceito ser contactado pela SEED para validação da conta e análise do
          pedido de acesso.
        </span>
      </label>

      <AuthSubmitButton>Criar conta SEED</AuthSubmitButton>

      <p className="text-xs font-semibold leading-5 text-muted-foreground">
        Ao continuar, aceita que a SEED trate os dados submetidos para fins de
        onboarding, segurança e gestão de acesso.{" "}
        <Link
          className="font-extrabold text-[color:var(--seed-petroleum)] underline-offset-4 hover:underline"
          href="/"
        >
          Saber mais
        </Link>
      </p>
    </form>
  )
}
