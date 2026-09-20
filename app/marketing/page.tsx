"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, Mail, MessageCircle, Search, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoMark } from "@/components/logo"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n"

const copy = {
  en: {
    back: "Back to home",
    badge: "Marketing automation",
    title: "Stop chasing leads.",
    highlight: "Let the system work.",
    subtitle:
      "AICore Digital builds supervised marketing engines: find the right accounts, send a personal message, book the meeting, and log the result. Architecture in Virginia. About 65% of delivery in Mauritania.",
    blocks: [
      {
        title: "Outbound that sounds human",
        body: "New row in Sheets or CRM → enrich → draft in the buyer’s language → send from Gmail → update status.",
      },
      {
        title: "Follow-up without noise",
        body: "If there is no reply in 3 days, a second message goes out. If they book, outreach stops. A person approves exceptions.",
      },
      {
        title: "WhatsApp + email + calendar",
        body: "One pipeline for Africa and the Gulf: email for formal buyers, WhatsApp for local close, calendar for the call.",
      },
      {
        title: "Pilot in 30 days",
        body: "One ICP, one sequence, one dashboard. Written instruction. Client stays controller of the data.",
      },
    ],
    cta: "Request a marketing pilot",
    note: "French and Arabic sequences available. Delivery partner model: 65% executed in Mauritania.",
  },
  fr: {
    back: "Retour à l’accueil",
    badge: "Automatisation marketing",
    title: "Arrêtez de courir après les leads.",
    highlight: "Laissez le système travailler.",
    subtitle:
      "AICore Digital construit des moteurs marketing supervisés : trouver les bons comptes, envoyer un message personnel, réserver le rendez-vous, tracer le résultat. Architecture en Virginie. Environ 65 % de l’exécution en Mauritanie.",
    blocks: [
      {
        title: "Prospection qui sonne humain",
        body: "Nouvelle ligne Sheets ou CRM → enrichissement → brouillon dans la langue de l’acheteur → envoi Gmail → mise à jour du statut.",
      },
      {
        title: "Relance sans bruit",
        body: "Pas de réponse en 3 jours → second message. Rendez-vous pris → stop. Une personne valide les exceptions.",
      },
      {
        title: "WhatsApp + e-mail + agenda",
        body: "Un pipeline Afrique et Golfe : e-mail pour l’officiel, WhatsApp pour la clôture locale, agenda pour l’appel.",
      },
      {
        title: "Pilote en 30 jours",
        body: "Un profil cible, une séquence, un tableau de bord. Instruction écrite. Le client reste responsable des données.",
      },
    ],
    cta: "Demander un pilote marketing",
    note: "Séquences en français et en arabe. Modèle de livraison : 65 % exécutés en Mauritanie.",
  },
  ar: {
    back: "العودة للرئيسية",
    badge: "أتمتة التسويق",
    title: "كفى عن ملاحقة العملاء.",
    highlight: "دع النظام يعمل.",
    subtitle:
      "نبني في AICore Digital محركات تسويق بإشراف بشري: العثور على الحسابات المناسبة، رسالة شخصية، حجز الموعد، وتسجيل النتيجة. التصميم في فرجينيا. حوالي 65% من التنفيذ في موريتانيا.",
    blocks: [
      {
        title: "تواصل يبدو بشريًا",
        body: "صف جديد في الجدول أو الـ CRM ← إثراء ← مسودة بلغة العميل ← إرسال من Gmail ← تحديث الحالة.",
      },
      {
        title: "متابعة بلا إزعاج",
        body: "لا رد خلال 3 أيام ← رسالة ثانية. حُجز موعد ← يتوقف الإرسال. شخص يعتمد الاستثناءات.",
      },
      {
        title: "واتساب + بريد + تقويم",
        body: "مسار واحد لأفريقيا والخليج: البريد للرسمي، وواتساب للإغلاق المحلي، والتقويم للمكالمة.",
      },
      {
        title: "تجربة خلال 30 يومًا",
        body: "شريحة مستهدفة واحدة، سلسلة واحدة، لوحة واحدة. تعليم كتابي. العميل يبقى مسؤولًا عن بياناته.",
      },
    ],
    cta: "اطلب تجربة تسويق",
    note: "سلاسل بالعربية والفرنسية. نموذج التنفيذ: 65% في موريتانيا.",
  },
} as const

const icons = [Search, Mail, MessageCircle, Calendar]

export default function MarketingPage() {
  const { locale } = useLanguage()
  const text = copy[locale] ?? copy.en

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark box={40} />
            <span className="text-lg font-bold tracking-tighter text-foreground font-mono uppercase">
              AICore Digital
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/" className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {text.back}
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm mb-8">
              {text.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
              {text.title}{" "}
              <span className="text-primary">{text.highlight}</span>
            </h1>
            <p className="mx-auto max-w-[800px] text-lg text-muted-foreground">{text.subtitle}</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {text.blocks.map((block, i) => {
              const Icon = icons[i]
              return (
                <div key={block.title} className="rounded-3xl border border-border/50 bg-card/50 p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold mb-3">{block.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{block.body}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-20 text-center rounded-3xl border border-border/50 p-12">
            <p className="text-muted-foreground mb-6 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {text.note}
            </p>
            <LeadFormDialog>
              <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold">
                {text.cta}
              </Button>
            </LeadFormDialog>
          </div>
        </div>
      </main>
    </div>
  )
}
