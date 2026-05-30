import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { LoginForm } from "@/components/admin/login-form"

export const metadata = {
  title: "Admin Login | AICore Digital",
  robots: { index: false, follow: false },
}

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <LoginForm />
    </main>
  )
}
