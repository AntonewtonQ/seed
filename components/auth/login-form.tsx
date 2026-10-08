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

      <AuthSubmitButton>Entrar na plataforma</AuthSubmitButton>
    </form>
  )
}
