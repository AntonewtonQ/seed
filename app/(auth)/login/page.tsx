import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Entrar | SEED",
  description:
    "Entre na plataforma SEED para acompanhar pipeline, data rooms e processos de due diligence.",
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
  if (status === "provisioned") return "As contas desta demonstração são provisionadas pelo comando npm run db:seed. Consulte o README.";

  return undefined
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { status } = await searchParams

  return (
    <AuthCard
      description="Aceda à sua área para acompanhar oportunidades, documentos partilhados e decisões em curso."
      eyebrow="Bem-vindo de volta"
      statusMessage={getStatusMessage(status)}
      switchAction="Sobre as contas de demonstração"
      switchHref="/signup"
      switchText="Demonstração local."
      title="Entre na sua conta SEED"
    >
      <LoginForm />
    </AuthCard>
  )
}
