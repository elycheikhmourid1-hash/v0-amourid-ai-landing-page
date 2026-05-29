"use client"

import { useState } from "react"
import type { Lead } from "@/lib/db"
import { setStatusAction } from "./actions"
import { Mail, Phone, Building2, Search } from "lucide-react"

const STATUS_OPTIONS = ["new", "contacted", "won", "lost"]

const STATUS_STYLES: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  won: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  lost: "bg-muted text-muted-foreground",
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState("")

  const filtered = leads.filter((l) => {
    const q = query.toLowerCase()
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company ?? "").toLowerCase().includes(q) ||
      l.message.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      <div className="border-b border-border px-5 py-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads..."
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="px-5 py-16 text-center text-muted-foreground">
          {leads.length === 0 ? "No leads yet. They will appear here automatically." : "No leads match your search."}
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {filtered.map((lead) => (
            <li key={lead.id} className="px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">{lead.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.new}`}>
                      {lead.status}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {lead.source}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                      <Mail className="h-3.5 w-3.5" /> {lead.email}
                    </a>
                    {lead.phone ? (
                      <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                        <Phone className="h-3.5 w-3.5" /> {lead.phone}
                      </a>
                    ) : null}
                    {lead.company ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> {lead.company}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-pretty text-sm text-foreground/90">{lead.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(lead.created_at)}</p>
                </div>

                <form action={setStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={lead.id} />
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:border-primary"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                  >
                    Save
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
