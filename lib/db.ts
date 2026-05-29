import { Pool } from "pg"

// Single shared connection pool across hot reloads in dev
const globalForPg = globalThis as unknown as { _pgPool?: Pool }

export const pool =
  globalForPg._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30_000,
  })

if (process.env.NODE_ENV !== "production") {
  globalForPg._pgPool = pool
}

export type Lead = {
  id: number
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  source: string
  status: string
  created_at: string
}

export type NewLead = {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  message: string
  source?: string
}

export async function insertLead(lead: NewLead): Promise<Lead> {
  const { rows } = await pool.query<Lead>(
    `INSERT INTO leads (name, email, phone, company, message, source)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      lead.name,
      lead.email,
      lead.phone ?? null,
      lead.company ?? null,
      lead.message,
      lead.source ?? "contact",
    ],
  )
  return rows[0]
}

export async function getLeads(): Promise<Lead[]> {
  const { rows } = await pool.query<Lead>(
    `SELECT * FROM leads ORDER BY created_at DESC`,
  )
  return rows
}

export async function updateLeadStatus(id: number, status: string): Promise<void> {
  await pool.query(`UPDATE leads SET status = $1 WHERE id = $2`, [status, id])
}

export async function getLeadStats(): Promise<{
  total: number
  thisWeek: number
  newCount: number
}> {
  const { rows } = await pool.query<{ total: string; this_week: string; new_count: string }>(
    `SELECT
       COUNT(*) AS total,
       COUNT(*) FILTER (WHERE created_at >= now() - interval '7 days') AS this_week,
       COUNT(*) FILTER (WHERE status = 'new') AS new_count
     FROM leads`,
  )
  return {
    total: Number(rows[0]?.total ?? 0),
    thisWeek: Number(rows[0]?.this_week ?? 0),
    newCount: Number(rows[0]?.new_count ?? 0),
  }
}
