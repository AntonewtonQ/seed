import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Entrar | SEED",
  description:
    "Entrar na demonstração local do SEED.",
}

type LoginPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function getStatusMessage(status: string | string[] | undefined) {
  if (status === "incomplete") {
    return "Preencha o email e a palavra-passe para continuar."
  }

  if (status === "invalid") return "Email ou palavra-passe incorretos.";
  if (status === "limited") return "Demasiadas tentativas. Aguarde 15 minutos.";
  if (status === "unavailable") return "Serviço temporariamente indisponível. Tente novamente.";
  if (status === "provisioned") return "As contas são criadas pelo comando npm run db:seed. Consulte o README.";

  return undefined
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { status } = await searchParams

  return (
    <AuthCard
      description="Use uma das contas de demonstração."
      statusMessage={getStatusMessage(status)}
      switchAction="Onde encontrar as contas"
      switchHref="/signup"
      switchText="Não tem acesso?"
      title="Entrar"
    >
      <LoginForm />
    </AuthCard>
  )
}
