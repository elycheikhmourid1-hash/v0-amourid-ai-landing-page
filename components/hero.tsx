"use client"

import { Button } from "@/components/ui/button"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { InteractiveGrid } from "@/components/interactive-grid"
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
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/agency-background.mp4" type="video/mp4" />
        </video>
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>

      {/* Interactive data network layer */}
      <div className="absolute inset-0 z-[1]">
        <InteractiveGrid className="h-full w-full" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 mx-auto px-6 text-center"
      >
        <motion.div variants={item} className="mb-8 flex justify-center">
          <div className="relative float-soft">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 blur-md opacity-80 animate-pulse" />
            <img
              src="/founder-photo.jpg"
              alt="Founder of AICore Digital"
              className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover object-top border-2 border-white/20 shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-secondary" />
          </span>
          Next-Gen Robotics &amp; AI Automation
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase"
        >
          <span className="shimmer">AICore</span>{" "}
          <span className="text-primary drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">Digital</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto max-w-[800px] text-xl md:text-2xl text-muted-foreground font-medium mb-12 text-pretty"
        >
          Bridging the gap between cutting-edge AI software and physical robotic excellence.
          Your partner in the autonomous revolution.
        </motion.p>

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
                Transform Your Business
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
              Explore Solutions
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
