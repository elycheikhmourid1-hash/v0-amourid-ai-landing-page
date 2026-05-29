"use client"

import { useEffect, useRef } from "react"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
}

/**
 * High-performance interactive data network.
 * - Renders to a single <canvas> via requestAnimationFrame (no React re-renders).
 * - Nodes drift slowly and are gently repelled by the cursor for a "live data" feel.
 * - Caps device pixel ratio and node count for instant performance on any device.
 */
export function InteractiveGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    let raf = 0

    // Pointer tracked via ref-style locals (no state -> no re-render)
    const pointer = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Density scales with area but is capped for performance
      const target = Math.min(Math.floor((width * height) / 14000), 90)
      nodes = Array.from({ length: target }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        }
      })
    }

    const CONNECT_DIST = 130
    const REPEL_DIST = 150

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // gentle drift
        n.x += n.vx
        n.y += n.vy

        // wrap around edges
        if (n.x < 0) n.x = width
        if (n.x > width) n.x = 0
        if (n.y < 0) n.y = height
        if (n.y > height) n.y = 0

        // cursor repulsion (smooth, physics-like)
        if (pointer.active) {
          const dx = n.x - pointer.x
          const dy = n.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < REPEL_DIST && dist > 0) {
            const force = (REPEL_DIST - dist) / REPEL_DIST
            n.x += (dx / dist) * force * 2.2
            n.y += (dy / dist) * force * 2.2
          }
        }

        // draw node
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(168, 85, 247, 0.7)"
        ctx.fill()
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.5
            // tint lines toward cyan near the cursor
            const near =
              pointer.active &&
              Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) < 180
            ctx.strokeStyle = near
              ? `rgba(34, 211, 238, ${alpha})`
              : `rgba(140, 110, 220, ${alpha * 0.6})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeave)

    if (reduceMotion) {
      draw()
      cancelAnimationFrame(raf)
      raf = 0
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  )
}
