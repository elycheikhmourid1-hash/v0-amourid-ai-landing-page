"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { SiGooglesheets, SiN8N, SiOpenai, SiSlack, SiGmail, SiZapier } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa6"
import { Sparkles } from "lucide-react"
import type { IconType } from "react-icons"

/* ------------------------------------------------------------------
   Design space — everything is authored in a fixed 1000x540 canvas
   and scaled to fit the container. This keeps the SVG paths, the
   node tiles, and the offset-path packets in one shared coordinate
   system so they line up pixel-perfectly at any screen size.
------------------------------------------------------------------ */
const DESIGN_W = 1000
const DESIGN_H = 540
const CYCLE = 7 // seconds — the full automation loop period

type NodeDef = {
  id: string
  x: number
  y: number
  label: string
  color: string
  Icon?: IconType
  custom?: "relevance"
  /** time in the cycle (s) when this node "activates" */
  active: number
}

const NODES: NodeDef[] = [
  { id: "sheets", x: 70, y: 270, label: "Google Sheets", color: "#22c55e", Icon: SiGooglesheets, active: 0 },
  { id: "chatgpt", x: 178, y: 96, label: "ChatGPT", color: "#10a37f", Icon: SiOpenai, active: 0.1 },
  { id: "n8n", x: 340, y: 270, label: "n8n", color: "#ea4b71", Icon: SiN8N, active: 1.0 },
  { id: "relevance", x: 540, y: 110, label: "Relevance AI", color: "#8b7cf6", custom: "relevance", active: 2.1 },
  { id: "zapier", x: 540, y: 430, label: "Zapier", color: "#ff4f00", Icon: SiZapier, active: 2.1 },
  { id: "slack", x: 705, y: 270, label: "Slack", color: "#36c5f0", Icon: SiSlack, active: 3.25 },
  { id: "gmail", x: 905, y: 135, label: "Gmail", color: "#ea4335", Icon: SiGmail, active: 4.4 },
  { id: "linkedin", x: 905, y: 405, label: "LinkedIn", color: "#0a66c2", Icon: FaLinkedin, active: 4.4 },
]

type EdgeDef = { d: string; color: string; start: number }

/** cubic path with horizontal control handles for a clean circuit look */
function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(40, Math.abs(x2 - x1) * 0.45)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

const N = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, NodeDef>

const EDGES: EdgeDef[] = [
  { d: curve(N.sheets.x, N.sheets.y, N.n8n.x, N.n8n.y), color: "#22c55e", start: 0 },
  { d: curve(N.chatgpt.x, N.chatgpt.y, N.n8n.x, N.n8n.y), color: "#10a37f", start: 0.15 },
  { d: curve(N.n8n.x, N.n8n.y, N.relevance.x, N.relevance.y), color: "#8b7cf6", start: 1.15 },
  { d: curve(N.n8n.x, N.n8n.y, N.zapier.x, N.zapier.y), color: "#ff4f00", start: 1.15 },
  { d: curve(N.relevance.x, N.relevance.y, N.slack.x, N.slack.y), color: "#36c5f0", start: 2.3 },
  { d: curve(N.zapier.x, N.zapier.y, N.slack.x, N.slack.y), color: "#36c5f0", start: 2.3 },
  { d: curve(N.slack.x, N.slack.y, N.gmail.x, N.gmail.y), color: "#ea4335", start: 3.45 },
  { d: curve(N.slack.x, N.slack.y, N.linkedin.x, N.linkedin.y), color: "#0a66c2", start: 3.45 },
]

const PACKET_DUR = 0.95

function useStageScale() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / DESIGN_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { wrapRef, scale }
}

function RelevanceMark() {
  return <Sparkles className="h-[26px] w-[26px]" strokeWidth={2.25} />
}

export function WorkflowAnimation() {
  const { wrapRef, scale } = useStageScale()

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: DESIGN_H * scale }} aria-hidden="true">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}
      >
        {/* Illuminated circuit lines */}
        <svg
          viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          {EDGES.map((e, i) => (
            <g key={i}>
              {/* base trace */}
              <path d={e.d} stroke={e.color} strokeWidth={1.5} opacity={0.18} strokeLinecap="round" />
              {/* animated flow dashes */}
              <path
                d={e.d}
                className="flow-line"
                stroke={e.color}
                strokeWidth={2}
                opacity={0.5}
                strokeLinecap="round"
                strokeDasharray="4 16"
                style={{ animationDelay: `${-i * 0.4}s` }}
              />
            </g>
          ))}
        </svg>

        {/* Energy packets traveling the journey */}
        {EDGES.map((e, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute left-0 top-0 gpu"
            style={{
              width: 16,
              height: 16,
              borderRadius: "9999px",
              background: `radial-gradient(circle, #ffffff 0%, ${e.color} 55%, transparent 75%)`,
              boxShadow: `0 0 14px 4px ${e.color}, 0 0 28px 8px ${e.color}55`,
              offsetPath: `path("${e.d}")`,
              offsetRotate: "0deg",
              offsetDistance: "0%",
            }}
            animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0.9, 0] }}
            transition={{
              offsetDistance: {
                duration: PACKET_DUR,
                ease: [0.4, 0, 0.2, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: CYCLE - PACKET_DUR,
                delay: e.start,
              },
              opacity: {
                duration: PACKET_DUR,
                times: [0, 0.12, 0.6, 0.9, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: CYCLE - PACKET_DUR,
                delay: e.start,
              },
            }}
          />
        ))}

        {/* App nodes */}
        {NODES.map((n) => (
          <div
            key={n.id}
            className="absolute flex flex-col items-center"
            style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
          >
            {/* active glow ring */}
            <motion.span
              className="absolute -top-1 left-1/2 h-16 w-16 -translate-x-1/2 rounded-2xl"
              style={{ boxShadow: `0 0 0 1px ${n.color}, 0 0 24px 4px ${n.color}` }}
              animate={{ opacity: [0.18, 0.95, 0.18], scale: [0.92, 1.18, 0.92] }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: CYCLE - 0.8,
                delay: n.active,
              }}
            />
            {/* tile */}
            <motion.div
              className="glass-strong relative flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ color: n.color }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: CYCLE - 0.8,
                delay: n.active,
              }}
            >
              {n.custom === "relevance" ? <RelevanceMark /> : n.Icon ? <n.Icon size={28} /> : null}
            </motion.div>
            <span className="mt-2 whitespace-nowrap text-[11px] font-medium text-muted-foreground">{n.label}</span>
          </div>
        ))}

        {/* Central hub emphasis label */}
        <div
          className="pointer-events-none absolute text-center"
          style={{ left: N.n8n.x, top: N.n8n.y + 52, transform: "translate(-50%, 0)" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-secondary">
            Automation Brain
          </span>
        </div>
      </div>
    </div>
  )
}
