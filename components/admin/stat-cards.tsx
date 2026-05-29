import { Users, CalendarClock, Sparkles } from "lucide-react"

function Card({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Users
  label: string
  value: number
  accent: string
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/5 ${accent}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-foreground">{value}</p>
    </div>
  )
}

export function StatCards({
  total,
  thisWeek,
  newCount,
}: {
  total: number
  thisWeek: number
  newCount: number
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card icon={Users} label="Total leads" value={total} accent="text-fuchsia-400" />
      <Card icon={CalendarClock} label="This week" value={thisWeek} accent="text-cyan-400" />
      <Card icon={Sparkles} label="New (not contacted)" value={newCount} accent="text-emerald-400" />
    </div>
  )
}
