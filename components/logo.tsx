interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
}

const sizes = {
  sm: { box: 32, text: "text-sm" },
  md: { box: 40, text: "text-lg" },
  lg: { box: 56, text: "text-2xl" },
  xl: { box: 88, text: "text-4xl" },
}

/**
 * AICore "Neural Core" mark.
 * A hexagonal core with counter-rotating orbital rings, an orbiting node,
 * and a pulsing energy center. Rendered as scalable SVG with unique gradients.
 */
export function LogoMark({ box = 40 }: { box?: number }) {
  // Unique gradient ids so multiple instances never collide
  const uid = `aic-${box}`
  return (
    <svg
      width={box}
      height={box}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AICore Digital logo"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer rotating hexagon */}
      <g className="logo-ring-outer" filter={`url(#${uid}-glow)`}>
        <polygon
          points="50,8 86,29 86,71 50,92 14,71 14,29"
          stroke={`url(#${uid}-stroke)`}
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
      </g>

      {/* Mid counter-rotating ring with animated dashes */}
      <g className="logo-ring-mid">
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke={`url(#${uid}-stroke)`}
          strokeWidth="2"
          fill="none"
          className="logo-trace"
          opacity="0.75"
        />
      </g>

      {/* Orbiting node */}
      <g className="logo-orbit">
        <circle cx="50" cy="14" r="4" fill="#22d3ee" filter={`url(#${uid}-glow)`} />
      </g>

      {/* Pulsing energy core */}
      <g className="logo-core">
        <circle cx="50" cy="50" r="13" fill={`url(#${uid}-core)`} filter={`url(#${uid}-glow)`} />
        {/* core circuit notches */}
        <path
          d="M50 41 L50 35 M50 59 L50 65 M41 50 L35 50 M59 50 L65 50"
          stroke="#e9d5ff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>
    </svg>
  )
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const s = sizes[size]
  return (
    <div className="flex items-center gap-3">
      <LogoMark box={s.box} />
      {showText && (
        <span className={`font-bold tracking-tight font-mono ${s.text} gradient-text`}>
          AICORE DIGITAL
        </span>
      )}
    </div>
  )
}

export function LogoSimple({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark box={36} />
      <span className="font-bold tracking-tight font-mono gradient-text">
        AICORE DIGITAL
      </span>
    </div>
  )
}
