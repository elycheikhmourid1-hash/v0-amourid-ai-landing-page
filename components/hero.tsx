"use client"

import { Button } from "@/components/ui/button"
import { LeadFormDialog } from "@/components/lead-form-dialog"

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
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/agency-background.mp4" type="video/mp4" />
        </video>
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 blur-md opacity-80 animate-pulse" />
            <img
              src="/founder-photo.jpg"
              alt="Founder of AICore Digital"
              className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover object-top border-2 border-white/20 shadow-2xl"
            />
          </div>
        </div>

        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-pulse">
          🚀 Next-Gen Robotics & AI Automation
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white/70 uppercase">
          AICore <span className="text-primary">Digital</span>
        </h1>

        <p className="mx-auto max-w-[800px] text-xl md:text-2xl text-muted-foreground font-medium mb-12">
          Bridging the gap between cutting-edge AI software and physical robotic excellence.
          Your partner in the autonomous revolution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <LeadFormDialog>
            <Button
              size="lg"
              className="h-16 px-10 rounded-full text-xl font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:via-purple-500 hover:to-cyan-400 shadow-2xl shadow-purple-600/40 transition-all hover:scale-105 border-0"
            >
              Transform Your Business
            </Button>
          </LeadFormDialog>
          <Button
            variant="outline"
            size="lg"
            className="h-16 px-10 rounded-full text-lg font-semibold text-white border-2 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm transition-all"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Solutions
          </Button>
        </div>
      </div>
    </section>
  )
}
