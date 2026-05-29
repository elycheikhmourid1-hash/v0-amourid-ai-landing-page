"use server"

import { redirect } from "next/navigation"
import { isValidPassword, createSession, destroySession } from "@/lib/auth"
import { updateLeadStatus } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function loginAction(
  _prevState: { error: string } | undefined,
  formData: FormData,
): Promise<{ error: string } | undefined> {
  const password = String(formData.get("password") || "")

  if (!isValidPassword(password)) {
    return { error: "Incorrect password. Please try again." }
  }

  await createSession()
  redirect("/dashboard")
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect("/dashboard/login")
}

export async function setStatusAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"))
  const status = String(formData.get("status") || "new")
  if (!Number.isNaN(id)) {
    await updateLeadStatus(id, status)
    revalidatePath("/dashboard")
  }
}
