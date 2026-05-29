import { Mail, Phone, Building2 } from "lucide-react"
import type { Lead } from "@/lib/db"
import { setLeadStatus } from "@/app/admin/actions"

const STATUS_OPTIONS: { value: string; label: string; className: string }[] = [
  { value: "new", label: "New", className: "bg-emerald-400/15 text-emerald-400" },
  { value: "contacted", label: "Contacted", className: "bg-cyan-400/15 text-cyan-400" },
  { value: "won", label: "Won", className: "bg-fuchsia-400/15 text-fuchsia-400" },
  { value: "lost", label: "Lost", className: "bg-muted text-muted-foreground" },
]

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function StatusBadge({ status }: { status: string }) {
  const opt = STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0]
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${opt.className}`}>
      {opt.label}
    </span>
  )
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">No leads yet. The first request from the site will appear here instantly.</p>
      </div>
    )
  }

  return (
    <div className="glass overflow-hidden rounded-2xl">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-4 font-medium">Lead</th>
              <th className="px-5 py-4 font-medium">Contact</th>
              <th className="px-5 py-4 font-medium">Message</th>
              <th className="px-5 py-4 font-medium">Source</th>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/50 align-top last:border-0">
                <td className="px-5 py-4">
                  <p className="font-semibold text-foreground">{lead.name}</p>
                  {lead.company ? (
                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3" /> {lead.company}
                    </span>
                  ) : null}
                </td>
                <td className="px-5 py-4">
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-foreground hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" /> {lead.email}
                  </a>
                  {lead.phone ? (
                    <a
                      href={`tel:${lead.phone}`}
                      className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground hover:underline"
                      dir="ltr"
                    >
                      <Phone className="h-3.5 w-3.5" /> {lead.phone}
                    </a>
                  ) : null}
                </td>
                <td className="max-w-xs px-5 py-4 text-sm text-muted-foreground">{lead.message}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{lead.source}</td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">
                  {formatDate(lead.created_at)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-col items-start gap-2">
                    <StatusBadge status={lead.status} />
                    <form action={setLeadStatus} className="flex items-center gap-1">
                      <input type="hidden" name="id" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-foreground/40"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="tactile rounded-lg bg-foreground px-2.5 py-1 text-xs font-medium text-background"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-border md:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-foreground">{lead.name}</p>
                {lead.company ? (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" /> {lead.company}
                  </span>
                ) : null}
              </div>
              <StatusBadge status={lead.status} />
            </div>

            <div className="mt-3 flex flex-col gap-1.5">
              <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-sm text-foreground">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" /> {lead.email}
              </a>
              {lead.phone ? (
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                  dir="ltr"
                >
                  <Phone className="h-3.5 w-3.5" /> {lead.phone}
                </a>
              ) : null}
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{lead.message}</p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{formatDate(lead.created_at)}</span>
            </div>

            <form action={setLeadStatus} className="mt-3 flex items-center gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <select
                name="status"
                defaultValue={lead.status}
                className="flex-1 rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none focus:border-foreground/40"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="tactile rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background"
              >
                Save
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
