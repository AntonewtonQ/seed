"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type InvestorMutation = {
  resource: string
  payload: Record<string, FormDataEntryValue>
}

function requireFields(formData: FormData, fields: string[]) {
  for (const field of fields) {
    const value = formData.get(field)

    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(`Campo obrigatório em falta: ${field}`)
    }
  }
}

async function commitInvestorMutation(
  resource: string,
  formData: FormData,
  requiredFields: string[]
) {
  requireFields(formData, requiredFields)

  const mutation: InvestorMutation = {
    resource,
    payload: Object.fromEntries(formData),
  }

  // Trocar por fetch/SDK do backend quando a API estiver pronta.
  void mutation
}

export async function saveInvestorProfileAction(formData: FormData) {
  await commitInvestorMutation("investor.profile.update", formData, [
    "name",
    "type",
    "lead",
    "ticket",
    "stage",
    "geography",
  ])

  revalidatePath("/investor/profile")
  redirect("/investor/profile")
}

export async function sendInvestorMessageAction(formData: FormData) {
  await commitInvestorMutation("investor.messages.send", formData, [
    "subject",
    "body",
  ])

  revalidatePath("/investor/messages")
  redirect("/investor/messages")
}

export async function saveInvestorSettingsAction(formData: FormData) {
  await commitInvestorMutation("investor.settings.update", formData, [])

  revalidatePath("/investor/settings")
  redirect("/investor/settings")
}

export async function saveInvestorNotificationSettingsAction(
  formData: FormData
) {
  await commitInvestorMutation("investor.notifications.update", formData, [])

  revalidatePath("/investor/settings")
  redirect("/investor/settings")
}
