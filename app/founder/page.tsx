"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowLeft,
  MapPin,
  Languages,
  GraduationCap,
  Mail,
  Phone,
  Building2,
  Radio,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoMark } from "@/components/logo"
import { LanguageSwitcher } from "@/components/language-switcher"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <LogoMark box={28} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">AICore Digital LLC</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-14">
          <motion.section variants={item}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Founder</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Ely Cheikh Mourid</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Founder and Chief Executive Officer, AICore Digital LLC, Richmond, Virginia.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Former information systems and transmissions officer in the Mauritanian armed forces.
              Graduate of the École militaire des transmissions, Rennes, France.
            </p>

            <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Office</dt>
                  <dd>Richmond, Virginia, USA</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                <Languages className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Languages</dt>
                  <dd>Arabic, French, English</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Training</dt>
                  <dd>École militaire des transmissions, Rennes</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Entity</dt>
                  <dd>AICore Digital LLC</dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full">
                <a href="mailto:elycheikh@aicoredigital.com">
                  <Mail className="mr-2 h-4 w-4" />
                  elycheikh@aicoredigital.com
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="tel:+18044853384">
                  <Phone className="mr-2 h-4 w-4" />
                  +1 (804) 485-3384
                </a>
              </Button>
            </div>
          </motion.section>

          <motion.section variants={item} className="space-y-4 border-t border-border pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Service</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Officer of the Mauritanian armed forces, including service with the 1st Parachute Commando Battalion, with a specialty in information systems and transmissions. The company is not a military contractor. That background is communications work, listed here as biography.
            </p>
          </motion.section>

          <motion.section variants={item} className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Practice</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Supervised automation for companies. Instruction desks for institutions. A named person records decisions. Client data is not used to train foundation models. Hosting is the location named in the statement of work.
            </p>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <Radio className="mt-0.5 h-4 w-4 shrink-0" />
              Founder-led. No invented testimonials.
            </p>
          </motion.section>

          <motion.section variants={item} className="flex flex-wrap gap-3 border-t border-border pt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/services">Services</Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/privacy">Privacy</Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/">Home</Link>
            </Button>
          </motion.section>
        </motion.div>
      </main>
    </div>
  )
}
