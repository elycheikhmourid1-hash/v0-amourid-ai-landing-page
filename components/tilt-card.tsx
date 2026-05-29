"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

/**
 * Premium glass card with:
 * - 3D tilt that follows the cursor (spring-smoothed, GPU transforms)
 * - A spotlight glow tracking the pointer via CSS custom props
 * Zero layout thrash: all updates go through motion values / CSS vars.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 300,
    damping: 25,
    mass: 0.4,
  })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 300,
    damping: 25,
    mass: 0.4,
  })

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set(px)
    my.set(py)
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
  }

  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`spotlight glow-ring gpu transform-gpu ${className}`}
    >
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  )
}
