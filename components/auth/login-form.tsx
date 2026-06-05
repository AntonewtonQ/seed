import Link from "next/link"
import { LockKeyhole, Mail } from "lucide-react"

import { loginPreviewAction } from "@/lib/auth-actions"

import { AuthField } from "./auth-field"
import { AuthSubmitButton } from "./auth-submit-button"

export function LoginForm() {
  return (
    <form action={loginPreviewAction} className="grid gap-5">
      <AuthField
        autoComplete="email"
        icon={Mail}
        id="login-email"
        label="Email profissional"
        name="email"
        placeholder="miguel@empresa.ao"
        required
        type="email"
      />
      <AuthField
        autoComplete="current-password"
        icon={LockKeyhole}
        id="login-password"
        label="Palavra-passe"
        name="password"
        placeholder="Insira a sua palavra-passe"
        required
        type="password"
      />

      <div className="flex flex-col gap-3 text-sm font-semibold text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-2">
          <input
            className="size-4 accent-[color:var(--seed-petroleum)]"
            name="remember"
            type="checkbox"
          />
          Manter sessão iniciada
        </label>
        <Link
          className="font-extrabold text-[color:var(--seed-petroleum)] underline-offset-4 hover:underline"
          href="/login"
        >
          Recuperar acesso
        </Link>
      </div>

      <AuthSubmitButton>Entrar na plataforma</AuthSubmitButton>
    </form>
  )
}
