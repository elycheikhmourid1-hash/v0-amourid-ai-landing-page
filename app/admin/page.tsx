import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { getLeads, getLeadStats } from "@/lib/db"
import { logout } from "./actions"
import { StatCards } from "@/components/admin/stat-cards"
import { LeadsTable } from "@/components/admin/leads-table"

export const metadata = {
  title: "Leads Dashboard | AICore Digital",
  robots: { index: false, follow: false },
}

// Always fetch fresh data — this is an internal dashboard.
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }

  const [leads, stats] = await Promise.all([getLeads(), getLeadStats()])

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leads</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Every request from the site is saved here automatically
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="tactile rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Sign Out
            </button>
          </form>
        </header>

        <StatCards total={stats.total} thisWeek={stats.thisWeek} newCount={stats.newCount} />

        <div className="mt-8">
          <LeadsTable leads={leads} />
        </div>
      </div>
    </main>
  )
}
