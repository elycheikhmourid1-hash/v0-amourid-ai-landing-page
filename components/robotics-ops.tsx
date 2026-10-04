"use client"

import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoMark } from "@/components/logo"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Reveal } from "@/components/reveal"
import { useLanguage, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export const ROBOTICS_3D_URL = "https://elycheikhmourid1-hash.github.io/robots/3d/"
export const ROBOTICS_2D_URL = "https://elycheikhmourid1-hash.github.io/robots/"
export const ROBOTICS_WHATSAPP_URL = "https://wa.me/18044853384"
export const ROBOTICS_BADGE = "SIMULATION / عرض تجريبي"

type RoboticsCopy = {
  eyebrow: string
  title: string
  description: string
  open3d: string
  open2d: string
  whatsapp: string
  fallback: string
  back: string
  iframeTitle: string
}

const copy: Record<Locale, RoboticsCopy> = {
  en: {
    eyebrow: "Field operations",
    title: "AICore Robotics Ops",
    description:
      "A supervised robot-fleet operations console for remote telecom and energy sites. The robot proposes, a human approves, and everything is audited. This is currently a software simulation with a few live data sources: real weather, computed satellite-dish pointing angles, and on-device camera detection. We are looking for a partner for a hardware pilot.",
    open3d: "Open the 3D demo",
    open2d: "Open the 2D console",
    whatsapp: "WhatsApp",
    fallback: "If the embedded demo does not load, open the 3D demo in a new tab.",
    back: "Back to home",
    iframeTitle: "AICore Robotics Ops 3D simulation demo",
  },
  fr: {
    eyebrow: "Opérations de terrain",
    title: "AICore Robotics Ops",
    description:
      "Console supervisée d’exploitation d’une flotte de robots pour des sites télécoms et énergétiques distants. Le robot propose, un humain approuve, et chaque action est auditée. Il s’agit aujourd’hui d’une simulation logicielle, avec quelques sources de données en direct : météo réelle, angles de pointage d’antenne satellite calculés, et détection par caméra sur l’appareil. Nous cherchons un partenaire pour un pilote matériel.",
    open3d: "Ouvrir la démo 3D",
    open2d: "Ouvrir la console 2D",
    whatsapp: "WhatsApp",
    fallback: "Si la démo intégrée ne s’affiche pas, ouvrez la démo 3D dans un nouvel onglet.",
    back: "Retour à l’accueil",
    iframeTitle: "Démo 3D de simulation AICore Robotics Ops",
  },
  ar: {
    eyebrow: "عمليات ميدانية",
    title: "AICore Robotics Ops",
    description:
      "وحدة تشغيل خاضعة للإشراف لأسطول روبوتات في مواقع اتصالات وطاقة بعيدة. الروبوت يقترح، والإنسان يعتمد، وكل إجراء يُراجع في سجل تدقيق. هذا حالياً محاكاة برمجية مع بضعة مصادر بيانات مباشرة: طقس حقيقي، وزوايا توجيه طبق الأقمار المحسوبة، وكشف بالكاميرا على الجهاز. نبحث عن شريك لتجربة عتاد.",
    open3d: "فتح العرض ثلاثي الأبعاد",
    open2d: "فتح لوحة التحكم ثنائية الأبعاد",
    whatsapp: "واتساب",
    fallback: "إذا لم تظهر المحاكاة المضمّنة، افتح العرض ثلاثي الأبعاد في تبويب جديد.",
    back: "العودة للرئيسية",
    iframeTitle: "عرض محاكاة ثلاثي الأبعاد لـ AICore Robotics Ops",
  },
}

function useRoboticsCopy() {
  const { locale } = useLanguage()
  return copy[locale]
}

export function RoboticsBadge() {
  return (
    <span
      dir="ltr"
      className="inline-flex items-center rounded-full border border-amber-400/70 bg-amber-400/15 px-4 py-1.5 text-sm font-bold tracking-wide text-amber-200 font-arabic"
    >
      {ROBOTICS_BADGE}
    </span>
  )
}

export function RoboticsActions({ align = "start" }: { align?: "start" | "center" }) {
  const text = useRoboticsCopy()

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center",
        align === "center" ? "items-center sm:justify-center" : "items-start",
      )}
    >
      <Button asChild size="lg" className="rounded-full px-6 font-semibold">
        <a href={ROBOTICS_3D_URL} target="_blank" rel="noopener">
          {text.open3d}
        </a>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full px-6 font-semibold">
        <a href={ROBOTICS_2D_URL} target="_blank" rel="noopener">
          {text.open2d}
        </a>
      </Button>
      <a
        href={ROBOTICS_WHATSAPP_URL}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        <MessageCircle className="h-4 w-4" />
        {text.whatsapp}
      </a>
    </div>
  )
}

export function RoboticsOps() {
  const text = useRoboticsCopy()

  return (
    <section id="robotics" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {text.eyebrow}
          </p>
          <div className="mb-5">
            <RoboticsBadge />
          </div>
          <h2 className="text-pretty text-3xl font-bold tracking-tight sm:text-4xl font-mono shimmer">
            {text.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{text.description}</p>
          <div className="mt-8">
            <RoboticsActions />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function RoboticsEmbed() {
  const text = useRoboticsCopy()

  return (
    <div className="mt-12">
      <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
        <iframe
          src={ROBOTICS_3D_URL}
          title={text.iframeTitle}
          allow="fullscreen; camera"
          className="h-[70vh] min-h-[420px] w-full bg-background"
        />
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <a
          href={ROBOTICS_3D_URL}
          target="_blank"
          rel="noopener"
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          {text.fallback}
        </a>
      </p>
    </div>
  )
}

export function RoboticsPage() {
  const text = useRoboticsCopy()

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
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {text.back}
            </Link>
          </div>
        </div>
      </header>

      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              {text.eyebrow}
            </p>
            <div className="mb-6">
              <RoboticsBadge />
            </div>
            <h1 className="text-pretty text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl font-mono shimmer">
              {text.title}
            </h1>
            <p className="mx-auto mt-6 text-lg leading-relaxed text-muted-foreground">{text.description}</p>
            <div className="mt-8">
              <RoboticsActions align="center" />
            </div>
          </div>
          <RoboticsEmbed />
        </div>
      </main>
    </div>
  )
}
