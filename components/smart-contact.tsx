"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/lib/i18n"
import { buildMailto, buildWhatsAppUrl, saveLead, type Lead, type LeadLang } from "@/lib/leads"

const BUSINESS_TYPES = [
  { value: "clinic", key: "contact.smart.business.clinic" },
  { value: "retail", key: "contact.smart.business.retail" },
  { value: "telecom-energy", key: "contact.smart.business.telecomEnergy" },
  { value: "services", key: "contact.smart.business.services" },
  { value: "restaurant", key: "contact.smart.business.restaurant" },
  { value: "other", key: "contact.smart.business.other" },
] as const

type SubmitResult = {
  lead: Lead
  saved: boolean
}

export function SmartContact() {
  const { t, locale, dir } = useTranslation()
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<SubmitResult | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const trap = String(data.get("_trap") ?? "").trim()
    if (trap) return

    const business = String(data.get("business_type") ?? "").trim()
    const lead: Lead = {
      name: String(data.get("name") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      business_type: business || null,
      need: String(data.get("need") ?? "").trim(),
      lang: locale as LeadLang,
      source: "smart-contact",
      page: "/contact",
    }

    setSending(true)
    const saved = await saveLead(lead)
    setResult({ lead, saved })
    setSending(false)
  }

  return (
    <section dir={dir} className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-xl">
        <p className="mb-3 text-start text-sm font-semibold uppercase tracking-widest text-accent">
          {t("contact.smart.eyebrow")}
        </p>
        <h1 className="text-start font-mono text-4xl font-bold tracking-tight text-foreground">
          {t("contact.smart.title")}
        </h1>
        <p className="mt-4 text-start text-base leading-relaxed text-muted-foreground">
          {t("contact.smart.intro")}
        </p>
        <p className="mt-3 text-start text-sm font-medium text-foreground">
          {t("contact.smart.human")}
        </p>
        <p className="mt-1 text-start text-sm text-muted-foreground">
          {t("contact.smart.reply")}
        </p>

        {result ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-start">
            <div className="flex items-start gap-3">
              {result.saved ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              )}
              <p className="text-sm leading-relaxed text-foreground">
                {result.saved ? t("contact.smart.saved") : t("contact.smart.saveFailed")}
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("contact.smart.resultHint")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full font-semibold">
                <a
                  href={buildWhatsAppUrl(result.lead, result.lead.lang)}
                  target="_blank"
                  rel="noopener"
                >
                  <MessageCircle />
                  {t("contact.smart.whatsapp")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full font-semibold">
                <a href={buildMailto(result.lead, result.lead.lang)}>
                  <Mail />
                  {t("contact.smart.email")}
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-6 rounded-2xl border border-border bg-card p-8 text-start"
          >
            <input
              type="text"
              name="_trap"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-2">
              <Label htmlFor="lead-name">
                {t("contact.smart.name")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lead-name"
                name="name"
                autoComplete="name"
                required
                minLength={1}
                maxLength={120}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lead-contact">
                {t("contact.smart.contact")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lead-contact"
                name="contact"
                autoComplete="on"
                placeholder={t("contact.smart.contactPlaceholder")}
                required
                minLength={3}
                maxLength={160}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lead-business">{t("contact.smart.businessType")}</Label>
              <select
                id="lead-business"
                name="business_type"
                defaultValue=""
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="">{t("contact.smart.businessPlaceholder")}</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {t(type.key)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lead-need">
                {t("contact.smart.need")} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="lead-need"
                name="need"
                rows={5}
                required
                minLength={5}
                maxLength={4000}
                placeholder={t("contact.smart.needPlaceholder")}
                className="resize-y"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="rounded-full font-semibold"
            >
              {sending ? (
                <>
                  <Loader2 className="animate-spin" />
                  {t("contact.smart.sending")}
                </>
              ) : (
                t("contact.smart.submit")
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
