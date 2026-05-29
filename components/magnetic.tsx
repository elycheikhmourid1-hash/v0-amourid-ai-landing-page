"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/**
 * Magnetic wrapper — the child element is gently pulled toward the cursor
 * while hovered, then springs back. Pure transform, runs on the compositor.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.4,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.3 })

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
