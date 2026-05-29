"use client"

import type React from "react"
import { motion } from "motion/react"

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-reveal wrapper. Animates children in once when they enter the viewport.
 * Uses transform + opacity only (compositor-friendly) for instant, lag-free motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: keyof typeof directions
}) {
  const offset = directions[direction]
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
