"use client"

import { useEffect, useRef } from "react"

export function ScrollProgressIndicator() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number | null = null

    const updateScrollProgress = () => {
      frameId = null
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0
      const progressElement = progressRef.current

      if (progressElement) {
        progressElement.style.transform = `scaleX(${progress})`
        progressElement.setAttribute("aria-valuenow", String(Math.round(progress * 100)))
      }
    }

    const scheduleUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateScrollProgress)
    }

    updateScrollProgress()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-1 bg-surface-raised">
      <div
        ref={progressRef}
        className="h-full origin-left bg-gradient-to-r from-primary to-accent will-change-transform"
        style={{ transform: "scaleX(0)" }}
        role="progressbar"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
    </div>
  )
}
