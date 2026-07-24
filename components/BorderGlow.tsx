"use client"

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react"
import "./BorderGlow.css"

interface BorderGlowProps {
  children: ReactNode
  className?: string
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  colors?: string[]
  fillOpacity?: number
}

type GlowProperties = CSSProperties & Record<`--${string}`, string | number>

function parseHsl(hslString: string) {
  const match = hslString.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 217, s: 91, l: 65 }
  return { h: Number.parseFloat(match[1]), s: Number.parseFloat(match[2]), l: Number.parseFloat(match[3]) }
}

function buildGlowVariables(glowColor: string, intensity: number): Record<string, string> {
  const { h, s, l } = parseHsl(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"]

  return Object.fromEntries(
    opacities.map((opacity, index) => [
      `--glow-color${keys[index]}`,
      `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`,
    ]),
  )
}

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"]
const gradientKeys = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
]
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVariables(colors: string[]): Record<string, string> {
  const variables: Record<string, string> = {}

  gradientKeys.forEach((key, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)]
    variables[key] = `radial-gradient(at ${gradientPositions[index]}, ${color} 0px, transparent 50%)`
  })
  variables["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`

  return variables
}

function supportsInteractiveGlow() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "217 91 65",
  backgroundColor = "hsl(var(--surface-inset) / 0.7)",
  borderRadius = 8,
  glowRadius = 32,
  glowIntensity = 0.7,
  coneSpread = 25,
  colors = ["#38bdf8", "#6366f1", "#8b5cf6"],
  fillOpacity = 0.3,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const pointerPositionRef = useRef({ x: 0, y: 0 })

  const updatePointerGlow = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    const { left, top, width, height } = card.getBoundingClientRect()
    const x = pointerPositionRef.current.x - left
    const y = pointerPositionRef.current.y - top
    const centerX = width / 2
    const centerY = height / 2
    const deltaX = x - centerX
    const deltaY = y - centerY
    const horizontalScale = deltaX === 0 ? Number.POSITIVE_INFINITY : centerX / Math.abs(deltaX)
    const verticalScale = deltaY === 0 ? Number.POSITIVE_INFINITY : centerY / Math.abs(deltaY)
    const rawEdgeProximity = Math.min(Math.max(1 / Math.min(horizontalScale, verticalScale), 0), 1)
    // Keep a visible baseline anywhere inside the card, then intensify toward its edges.
    const edgeProximity = 0.55 + rawEdgeProximity * 0.45
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360

    card.style.setProperty("--edge-proximity", `${(edgeProximity * 100).toFixed(3)}`)
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`)
    animationFrameRef.current = undefined
  }, [])

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!supportsInteractiveGlow()) return

      pointerPositionRef.current = { x: event.clientX, y: event.clientY }
      if (animationFrameRef.current === undefined) {
        animationFrameRef.current = window.requestAnimationFrame(updatePointerGlow)
      }
    },
    [updatePointerGlow],
  )

  const resetPointerGlow = useCallback(() => {
    if (animationFrameRef.current !== undefined) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = undefined
    }
    cardRef.current?.style.setProperty("--edge-proximity", "0")
  }, [])

  const showFocusGlow = useCallback((event: FocusEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--edge-proximity", "100")
    event.currentTarget.style.setProperty("--cursor-angle", "225deg")
  }, [])

  const hideFocusGlow = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return
    event.currentTarget.style.setProperty("--edge-proximity", "0")
  }, [])

  useEffect(
    () => () => {
      if (animationFrameRef.current !== undefined) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    },
    [],
  )

  const style = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...buildGlowVariables(glowColor, glowIntensity),
    ...buildGradientVariables(colors),
  } as GlowProperties

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`}
      style={style}
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerGlow}
      onFocusCapture={showFocusGlow}
      onBlurCapture={hideFocusGlow}
    >
      <span aria-hidden="true" className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
