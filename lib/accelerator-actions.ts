"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type AcceleratorMutation = {
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

async function commitAcceleratorMutation(
  resource: string,
  formData: FormData,
  requiredFields: string[]
) {
  requireFields(formData, requiredFields)

  const mutation: AcceleratorMutation = {
    resource,
    payload: Object.fromEntries(formData),
  }

  // Trocar por fetch/SDK do backend quando a API estiver pronta.
  void mutation
}

export async function saveAcceleratorProfileAction(formData: FormData) {
  await commitAcceleratorMutation("accelerator.profile.update", formData, [
    "name",
    "type",
    "lead",
    "cohort",
    "focus",
    "location",
  ])

  revalidatePath("/accelerator/profile")
  redirect("/accelerator/profile")
}

export async function sendAcceleratorMessageAction(formData: FormData) {
  await commitAcceleratorMutation("accelerator.messages.send", formData, [
    "subject",
    "body",
  ])

  revalidatePath("/accelerator/messages")
  redirect("/accelerator/messages")
}

export async function saveAcceleratorSettingsAction(formData: FormData) {
  await commitAcceleratorMutation("accelerator.settings.update", formData, [])

  revalidatePath("/accelerator/settings")
  redirect("/accelerator/settings")
}

export async function saveAcceleratorNotificationSettingsAction(
  formData: FormData
) {
  await commitAcceleratorMutation("accelerator.notifications.update", formData, [])

  revalidatePath("/accelerator/settings")
  redirect("/accelerator/settings")
}
