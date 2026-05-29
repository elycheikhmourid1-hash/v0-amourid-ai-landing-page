import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { LoginForm } from "./login-form"

export const metadata = {
  title: "Admin Login | AICore Digital",
}

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-lg font-bold">A</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to view your leads dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
