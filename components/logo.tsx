import { Cpu } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
}

const sizes = {
  sm: {
    icon: "h-8 w-8",
    iconInner: "h-4 w-4",
    text: "text-sm",
  },
  md: {
    icon: "h-10 w-10",
    iconInner: "h-5 w-5",
    text: "text-lg",
  },
  lg: {
    icon: "h-14 w-14",
    iconInner: "h-7 w-7",
    text: "text-2xl",
  },
  xl: {
    icon: "h-20 w-20",
    iconInner: "h-10 w-10",
    text: "text-4xl",
  },
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const s = sizes[size]

  return (
    <div className="flex items-center gap-3">
      {/* Icon with gradient border */}
      <div className={`relative ${s.icon} flex items-center justify-center`}>
        {/* Overlapping squares effect */}
        <div
          className="absolute inset-0 rotate-12 rounded-lg border-2 border-purple-500/60"
          style={{ transform: "rotate(12deg)" }}
        />
        <div
          className="absolute inset-0 -rotate-6 rounded-lg border-2 border-pink-500/40"
          style={{ transform: "rotate(-6deg)" }}
        />
        <div
          className="absolute inset-0 rotate-3 rounded-lg border-2 border-cyan-400/30"
          style={{ transform: "rotate(3deg)" }}
        />
        {/* Inner icon */}
        <div className="relative z-10 flex items-center justify-center rounded-lg bg-background/80 p-2">
          <Cpu className={`${s.iconInner} text-white`} />
        </div>
      </div>

      {showText && (
        <span className={`font-bold tracking-tight font-mono ${s.text} gradient-text`}>
          AIMOURIDAI
        </span>
      )}
    </div>
  )
}

export function LogoSimple({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center">
        <div className="absolute inset-0 rotate-6 rounded-lg border border-purple-500/50" />
        <div className="relative flex items-center justify-center">
          <Cpu className="h-5 w-5 text-purple-400" />
        </div>
      </div>
      <span className="font-bold tracking-tight font-mono gradient-text">
        AIMOURIDAI
      </span>
    </div>
  )
}
