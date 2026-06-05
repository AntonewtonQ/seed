"use server"

import { redirect } from "next/navigation"

export async function loginPreviewAction(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    redirect("/login?status=incomplete")
  }

  redirect("/login?status=preview")
}

export async function signupPreviewAction(formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")
  const organization = formData.get("organization")
  const role = formData.get("role")
  const terms = formData.get("terms")

  if (!name || !email || !password || !organization || !role || !terms) {
    redirect("/signup?status=incomplete")
  }

  redirect("/signup?status=preview")
}
