export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://qdevddftobdzqmibqmbg.supabase.co"

export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_I3ujtYV7YMaPT4tA-GkOGw_xvT_D34K"

export type LeadLang = "en" | "fr" | "ar"

export type Lead = {
  name: string
  contact: string
  business_type?: string | null
  need: string
  lang: LeadLang
  source?: string
  page?: string | null
}

const BUSINESS_LABELS: Record<string, string> = {
  clinic: "Clinic",
  retail: "Retail",
  "telecom-energy": "Telecom / energy",
  services: "Services",
  restaurant: "Restaurant",
  other: "Other",
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
}

function languageLabel(locale: string): string {
  return LANGUAGE_LABELS[locale] ?? locale
}

function businessLabel(value: string | null | undefined): string {
  if (!value) return "—"
  return BUSINESS_LABELS[value] ?? value
}

export function leadSummary(lead: Lead, locale: string): string {
  return [
    `Name: ${lead.name}`,
    `Contact: ${lead.contact}`,
    `Business type: ${businessLabel(lead.business_type)}`,
    `Need: ${lead.need}`,
    `Language: ${languageLabel(locale)}`,
    "Sent from aicoredigital.com",
  ].join("\n")
}

export function buildWhatsAppUrl(lead: Lead, locale: string): string {
  return `https://wa.me/18044853384?text=${encodeURIComponent(leadSummary(lead, locale))}`
}

export function buildMailto(lead: Lead, locale: string): string {
  const subject =
    locale === "fr"
      ? `Demande de contact — ${lead.name}`
      : locale === "ar"
        ? `طلب تواصل — ${lead.name}`
        : `Contact request — ${lead.name}`

  return `mailto:elycheikh@aicoredigital.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(leadSummary(lead, locale))}`
}

export async function saveLead(lead: Lead): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        contact: lead.contact,
        business_type: lead.business_type || null,
        need: lead.need,
        lang: lead.lang,
        source: lead.source ?? "smart-contact",
        page: lead.page ?? null,
      }),
      signal: controller.signal,
    })

    return response.ok
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}
