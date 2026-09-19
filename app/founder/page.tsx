"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowLeft,
  MapPin,
  Languages,
  GraduationCap,
  Shield,
  Sparkles,
  ArrowRight,
  Target,
  Cpu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoMark } from "@/components/logo"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { LanguageSwitcher } from "@/components/language-switcher"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <LogoMark box={28} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              AICore Digital LLC
            </span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
          <motion.section variants={item} className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Founder
            </div>

            <h1 className="mb-4 text-5xl font-black tracking-tight md:text-7xl">
              <span className="shimmer">Ely Cheikh Mourid</span>
            </h1>
            <p className="mb-2 text-xl font-semibold text-foreground md:text-2xl">
              Founder and CEO, AICore Digital LLC
            </p>
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              Information systems and transmissions officer, Mauritanian armed forces.
              Graduate, École militaire des transmissions, Rennes, France.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-muted-foreground">Richmond, Virginia, USA</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm">
                <Languages className="h-4 w-4 text-purple-400" />
                <span className="text-muted-foreground">Arabic, French, English</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                <span className="text-muted-foreground">Transmissions school, Rennes</span>
              </div>
            </div>
          </motion.section>

          <motion.section variants={item} className="space-y-8">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">Background</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <motion.div variants={item} className="rounded-2xl border border-border/50 bg-gradient-to-b from-secondary/80 to-secondary/40 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  Served as an officer of the Mauritanian armed forces, including the 1st Parachute Commando Battalion, with a specialty in information systems and transmissions. That work was communications and coordination, not a product line.
                </p>
              </motion.div>

              <motion.div variants={item} className="rounded-2xl border border-border/50 bg-gradient-to-b from-secondary/80 to-secondary/40 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Cpu className="h-6 w-6" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  Trained at the École militaire des transmissions in Rennes. The company exists to apply that discipline to supervised software: routing, case instruction, and audit logs — with a person on the decision.
                </p>
              </motion.div>

              <motion.div variants={item} className="rounded-2xl border border-border/50 bg-gradient-to-b from-secondary/80 to-secondary/40 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Target className="h-6 w-6" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  AICore Digital LLC is registered in Virginia. The practice is founder-led. We do not publish invented clients, and we do not train foundation models on a client’s files.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section variants={item} className="space-y-8">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">Practice</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/50 bg-secondary/30 p-6 text-center">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 text-purple-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <p className="font-mono text-sm font-medium text-foreground">Supervised automation</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-secondary/30 p-6 text-center">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                    <Cpu className="h-5 w-5" />
                  </div>
                </div>
                <p className="font-mono text-sm font-medium text-foreground">Institutional instruction desks</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-secondary/30 p-6 text-center">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400">
                    <Target className="h-5 w-5" />
                  </div>
                </div>
                <p className="font-mono text-sm font-medium text-foreground">Human-in-the-loop</p>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={item}
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 p-8 text-center md:p-12"
          >
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Request a 30-minute call</h2>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <LeadFormDialog>
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 px-8 text-lg font-bold text-white shadow-xl shadow-purple-500/25"
                  >
                    Book a call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </LeadFormDialog>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 rounded-full border-2 border-border/50 bg-transparent px-8 text-lg font-semibold"
                  >
                    Services
                  </Button>
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  )
}
