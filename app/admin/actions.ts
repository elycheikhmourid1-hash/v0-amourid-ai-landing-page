"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { checkPassword, createSession, destroySession, isAuthenticated } from "@/lib/auth"
import { updateLeadStatus } from "@/lib/db"

const ALLOWED_STATUSES = ["new", "contacted", "won", "lost"] as const

export async function login(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "")

  console.log("[v0] login attempt: received len", password.length, "expected len", (process.env.DASHBOARD_PASSWORD ?? "").length, "secretSet", !!process.env.DASHBOARD_SECRET)

  if (!checkPassword(password)) {
    console.log("[v0] login: password mismatch")
    return { error: "Incorrect password" }
  }

  console.log("[v0] login: success, creating session")
  await createSession()
  redirect("/admin")
}

export async function logout() {
  await destroySession()
  redirect("/admin/login")
}

export async function setLeadStatus(formData: FormData) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }

  const id = Number(formData.get("id"))
  const status = String(formData.get("status") ?? "")

  if (!Number.isInteger(id) || !ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
    return
  }

  await updateLeadStatus(id, status)
  revalidatePath("/admin")
}
