import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

const motionLines = [
  {
    top: "13%",
    left: "-18%",
    width: "42rem",
    rotate: "-9deg",
    duration: "18s",
    delay: "-3s",
  },
  {
    top: "27%",
    left: "42%",
    width: "34rem",
    rotate: "-9deg",
    duration: "22s",
    delay: "-12s",
    tone: "gold",
  },
  {
    top: "44%",
    left: "-10%",
    width: "46rem",
    rotate: "-9deg",
    duration: "20s",
    delay: "-8s",
  },
  {
    top: "61%",
    left: "38%",
    width: "38rem",
    rotate: "-9deg",
    duration: "24s",
    delay: "-16s",
  },
  {
    top: "76%",
    left: "8%",
    width: "52rem",
    rotate: "-9deg",
    duration: "26s",
    delay: "-5s",
    tone: "gold",
  },
]

export function HeroMotionLines() {
  return (
    <div
      aria-hidden="true"
      className="hero-motion-lines pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="hero-motion-lines__grid" />
      {motionLines.map((line, index) => (
        <span
          className={cn(
            "hero-motion-lines__line",
            line.tone === "gold" && "hero-motion-lines__line--gold"
          )}
          key={`${line.top}-${index}`}
          style={
            {
              "--line-delay": line.delay,
              "--line-duration": line.duration,
              "--line-left": line.left,
              "--line-rotate": line.rotate,
              "--line-top": line.top,
              "--line-width": line.width,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
