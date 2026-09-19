"use client"

import { Button } from "@/components/ui/button"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { InteractiveGrid } from "@/components/interactive-grid"
import { WorkflowAnimation } from "@/components/workflow-animation"
import { Magnetic } from "@/components/magnetic"
import { motion } from "motion/react"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 hero-grid" aria-hidden="true" />
      <div className="absolute inset-0 z-0 hero-glow" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/30 to-background" aria-hidden="true" />
      <div className="absolute inset-0 z-[1]">
        <InteractiveGrid className="h-full w-full" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 mx-auto px-6 text-center"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-secondary" />
          </span>
          AICore Digital LLC · Richmond, Virginia
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase"
        >
          <span className="shimmer">AI that assists.</span>{" "}
          <span className="text-primary drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">Humans that decide.</span>
        </motion.h1>

        <motion.h2
          variants={item}
          className="mx-auto max-w-[900px] text-xl md:text-3xl text-foreground font-bold mb-6 text-pretty"
        >
          Supervised automation for companies. Instruction tools for institutions.
        </motion.h2>

        <motion.p
          variants={item}
          className="mx-auto max-w-[800px] text-lg md:text-xl text-muted-foreground font-medium mb-10 text-pretty"
        >
          We build case desks, routing, and audit logs with a human in the loop. We do not train foundation models on client data. Hosting stays where the client names it.
        </motion.p>

        <motion.div variants={item} className="mx-auto mb-10 w-full max-w-5xl">
          <WorkflowAnimation />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Magnetic>
            <LeadFormDialog>
              <Button
                size="lg"
                className="tactile h-16 px-10 rounded-full text-xl font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:via-purple-500 hover:to-cyan-400 shadow-2xl shadow-purple-600/40 border-0"
              >
                Book a 30-minute call
              </Button>
            </LeadFormDialog>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Button
              variant="outline"
              size="lg"
              className="tactile h-16 px-10 rounded-full text-lg font-semibold text-white border-2 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm bg-transparent"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              How we work
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
