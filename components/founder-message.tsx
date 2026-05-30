"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"
import { Volume2, VolumeX, Play, Pause, Sparkles, ShieldCheck, Clock, Layers } from "lucide-react"

const HIGHLIGHTS = [
  { icon: Layers, label: "Scale operations without scaling headcount" },
  { icon: ShieldCheck, label: "Remove technical debt, safely" },
  { icon: Clock, label: "Deploy 24/7 autonomous AI agents" },
]

export function FounderMessage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  // Keep the video element in sync with state without causing layout shifts.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
  }, [muted])

  function toggleAudio() {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    setMuted(next)
    v.muted = next
    if (!next && v.paused) {
      v.play().catch(() => {})
      setPlaying(true)
    }
  }

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section id="founder" className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div className="absolute left-1/4 bottom-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glow-ring relative order-1 lg:order-none"
        >
          <div className="glass-strong gradient-border relative overflow-hidden rounded-2xl p-2 shadow-[0_20px_70px_-20px_rgba(168,85,247,0.45)]">
            <div className="relative overflow-hidden rounded-xl">
              <video
                ref={videoRef}
                src="/founder-message.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="mx-auto block max-h-[600px] w-full rounded-xl object-contain"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />

              {/* subtle bottom gradient for control legibility */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

              {/* custom controls */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Founder
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    aria-label={playing ? "Pause video" : "Play video"}
                    className="tactile inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                  >
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={toggleAudio}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    aria-pressed={!muted}
                    className="tactile inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Typography block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />
            Meet the Founder
          </span>

          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Driving the <span className="gradient-text">Autonomous Revolution</span>
          </h2>

          <p className="mt-3 text-pretty text-lg font-medium text-muted-foreground">
            A message from our Founder, Ely Cheikh Mourid
          </p>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            At AICore Digital, we help ambitious businesses scale their operations without scaling
            complexity. We eliminate technical debt, replace brittle manual processes, and deploy
            secure, 24/7 AI agents that work tirelessly in the background — so your team can focus on
            growth, not busywork.
          </p>

          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/5 text-fuchsia-400">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-foreground/90">{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
