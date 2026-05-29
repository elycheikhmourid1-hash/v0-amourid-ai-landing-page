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
            <Button size="lg" className="h-16 px-10 rounded-full text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-105">
              Transform Your Business
            </Button>
          </LeadFormDialog>
          <Button
            variant="outline"
            size="lg"
            className="h-16 px-10 rounded-full text-lg font-semibold border-white/20 hover:bg-white/5 backdrop-blur-sm"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Solutions
          </Button>
        </div>
      </div>
    </section>
  )
}
