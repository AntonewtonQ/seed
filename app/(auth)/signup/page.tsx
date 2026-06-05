import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Criar conta | SEED",
  description:
    "Solicite acesso à SEED para preparar startups, avaliar oportunidades e gerir processos de investimento.",
}

type SignupPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function getStatusMessage(status: string | string[] | undefined) {
  if (status === "incomplete") {
    return "Preencha os campos obrigatórios e confirme o pedido de contacto."
  }

  if (status === "preview") {
    return "Pedido recebido para demonstração. A criação real de contas será ligada ao backend de autenticação."
  }

  return undefined
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { status } = await searchParams

  return (
    <AuthCard
      description="Solicite acesso para preparar uma startup, avaliar oportunidades ou acompanhar um programa de aceleração."
      eyebrow="Criar acesso"
      statusMessage={getStatusMessage(status)}
      switchAction="Entrar"
      switchHref="/login"
      switchText="Já tem conta?"
      title="Crie a sua conta SEED"
    >
      <SignupForm />
    </AuthCard>
  )
}
