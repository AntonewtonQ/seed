"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type StartupMutation = {
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

async function commitStartupMutation(
  resource: string,
  formData: FormData,
  requiredFields: string[]
) {
  requireFields(formData, requiredFields)

  const mutation: StartupMutation = {
    resource,
    payload: Object.fromEntries(formData),
  }

  // Trocar por fetch/SDK do backend quando a API estiver pronta.
  void mutation
}

export async function saveStartupProfileAction(formData: FormData) {
  await commitStartupMutation("startup.profile.update", formData, [
    "name",
    "tagline",
    "sector",
    "stage",
    "location",
    "email",
  ])

  revalidatePath("/startup/profile")
  redirect("/startup/profile")
}

export async function savePitchAction(formData: FormData) {
  await commitStartupMutation("startup.pitch.update", formData, [
    "problem",
    "solution",
    "product",
    "market",
  ])

  revalidatePath("/startup/pitch")
  redirect("/startup/pitch")
}

export async function saveDocumentAction(formData: FormData) {
  await commitStartupMutation("startup.documents.create", formData, [
    "name",
    "category",
    "owner",
  ])

  revalidatePath("/startup/documents")
  redirect("/startup/documents")
}

export async function saveFundingRequestAction(formData: FormData) {
  await commitStartupMutation("startup.funding.update", formData, [
    "target",
    "instrument",
    "runway",
  ])

  revalidatePath("/startup/funding")
  redirect("/startup/funding")
}

export async function saveTeamMemberAction(formData: FormData) {
  await commitStartupMutation("startup.team.create", formData, [
    "name",
    "role",
    "detail",
  ])

  revalidatePath("/startup/team")
  redirect("/startup/team")
}

export async function saveStartupSettingsAction(formData: FormData) {
  await commitStartupMutation("startup.settings.update", formData, [])

  revalidatePath("/startup/settings")
  redirect("/startup/settings")
}

export async function saveNotificationSettingsAction(formData: FormData) {
  await commitStartupMutation("startup.notifications.update", formData, [])

  revalidatePath("/startup/settings")
  redirect("/startup/settings")
}

export async function sendStartupMessageAction(formData: FormData) {
  await commitStartupMutation("startup.messages.send", formData, [
    "subject",
    "body",
  ])

  revalidatePath("/startup/messages")
  redirect("/startup/messages")
}
