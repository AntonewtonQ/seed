import { loginPreviewAction } from "@/lib/auth-actions"

import { AuthField } from "./auth-field"
import { AuthSubmitButton } from "./auth-submit-button"

export function LoginForm() {
  return (
    <form action={loginPreviewAction} className="grid gap-5">
      <AuthField
        autoComplete="email"
        id="login-email"
        label="Email"
        name="email"
        placeholder="miguel@empresa.ao"
        required
        type="email"
      />
      <AuthField
        autoComplete="current-password"
        id="login-password"
        label="Palavra-passe"
        name="password"
        required
        type="password"
      />

      <AuthSubmitButton>Entrar</AuthSubmitButton>
    </form>
  )
}
