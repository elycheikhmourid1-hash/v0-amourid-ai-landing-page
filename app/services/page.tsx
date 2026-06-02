"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, Workflow, Bot, Users, Server, CheckCircle2, Sparkles } from "lucide-react"
import { SiN8N, SiOpenai, SiZapier, SiSlack, SiGmail, SiHubspot, SiVercel } from "react-icons/si"
import { Button } from "@/components/ui/button"
import { LogoMark } from "@/components/logo"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/i18n"

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

export default function ServicesPage() {
  const { t } = useTranslation()

  const services = [
    {
      icon: Workflow,
      color: "#ea4b71",
      title: t("services.workflow.title"),
      description: t("services.workflow.description"),
      tools: t("services.workflow.tools"),
      toolIcons: [SiN8N, SiZapier],
      features: [
        t("services.workflow.feature1"),
        t("services.workflow.feature2"),
        t("services.workflow.feature3"),
        t("services.workflow.feature4"),
      ],
    },
    {
      icon: Bot,
      color: "#8b7cf6",
      title: t("services.agents.title"),
      description: t("services.agents.description"),
      tools: t("services.agents.tools"),
      toolIcons: [SiOpenai, Sparkles],
      features: [
        t("services.agents.feature1"),
        t("services.agents.feature2"),
        t("services.agents.feature3"),
        t("services.agents.feature4"),
      ],
    },
    {
      icon: Users,
      color: "#22d3ee",
      title: t("services.crm.title"),
      description: t("services.crm.description"),
      tools: t("services.crm.tools"),
      toolIcons: [SiHubspot],
      features: [
        t("services.crm.feature1"),
        t("services.crm.feature2"),
        t("services.crm.feature3"),
        t("services.crm.feature4"),
      ],
    },
    {
      icon: Server,
      color: "#10b981",
      title: t("services.integration.title"),
      description: t("services.integration.description"),
      tools: t("services.integration.tools"),
      toolIcons: [SiVercel, SiSlack, SiGmail],
      features: [
        t("services.integration.feature1"),
        t("services.integration.feature2"),
        t("services.integration.feature3"),
        t("services.integration.feature4"),
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark box={40} />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tighter text-foreground font-mono uppercase">
                AICore <span className="gradient-text-purple text-[0.95em]">Digital</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("services.backToHome")}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="text-center mb-20"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-secondary" />
              </span>
              {t("services.badge")}
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase"
            >
              <span className="shimmer">{t("services.title")}</span>{" "}
              <span className="text-primary drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                {t("services.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto max-w-[800px] text-lg md:text-xl text-muted-foreground font-medium text-pretty"
            >
              {t("services.subtitle")}
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid gap-8 md:grid-cols-2"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all hover:border-border hover:bg-card/80"
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at 50% 0%, ${service.color}10, transparent 50%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${service.color}15`, color: service.color }}
                >
                  <service.icon className="h-7 w-7" />
                </div>

                {/* Title & Description */}
                <h3 className="relative text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="relative text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tools */}
                <div className="relative flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    {service.toolIcons.map((ToolIcon, i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50"
                        style={{ color: service.color }}
                      >
                        <ToolIcon className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{service.tools}</span>
                </div>

                {/* Features */}
                <ul className="relative space-y-2.5">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: service.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="relative mx-auto max-w-2xl rounded-3xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm p-12">
              {/* Background glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-fuchsia-600/5 via-purple-600/5 to-cyan-500/5" />

              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t("services.cta")}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {t("services.subtitle").split(".")[0]}.
                </p>
                <LeadFormDialog>
                  <Button
                    size="lg"
                    className="h-14 px-10 rounded-full text-lg font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:via-purple-500 hover:to-cyan-400 shadow-2xl shadow-purple-600/30 border-0 transition-transform hover:scale-105"
                  >
                    {t("services.cta")}
                  </Button>
                </LeadFormDialog>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <LogoMark box={24} />
            <span className="text-sm font-bold tracking-tight text-foreground font-mono uppercase">
              AICORE DIGITAL
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("brand.founderCeo")}
          </p>
        </div>
      </footer>
    </div>
  )
}
