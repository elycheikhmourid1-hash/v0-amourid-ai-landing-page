import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { getLeads, getLeadStats } from "@/lib/db"
import { logoutAction } from "./actions"
import { LeadsTable } from "./leads-table"
import { Users, CalendarClock, Sparkles } from "lucide-react"

export const metadata = {
  title: "Leads Dashboard | AICore Digital",
}

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  if (!(await isAuthenticated())) {
    redirect("/dashboard/login")
  }

  const [leads, stats] = await Promise.all([getLeads(), getLeadStats()])

  const cards = [
    { label: "Total Leads", value: stats.total, icon: Users },
    { label: "New (unhandled)", value: stats.newCount, icon: Sparkles },
    { label: "This Week", value: stats.thisWeek, icon: CalendarClock },
  ]

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground">Leads Dashboard</h1>
              <p className="text-xs text-muted-foreground">AICore Digital</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{c.label}</span>
                <c.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">{c.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">All Leads</h2>
            <p className="text-sm text-muted-foreground">
              Every form submission is stored here automatically.
            </p>
          </div>
          <LeadsTable leads={leads} />
        </section>
      </div>
    </main>
  )
}
