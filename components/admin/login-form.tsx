"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Lock } from "lucide-react"
import { login } from "@/app/admin/actions"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="tactile inline-flex w-full items-center justify-center rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Verifying..." : "Sign In"}
    </button>
  )
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, undefined)

  return (
    <div className="glass-strong w-full max-w-sm rounded-3xl p-8">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="text-xl font-bold text-foreground">AICore Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your password to access leads</p>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground/40"
            placeholder="••••••••"
          />
        </div>

        {state?.error ? (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}

        <SubmitButton />
      </form>
    </div>
  )
}
