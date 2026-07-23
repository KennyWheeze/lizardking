"use client"

import { useEffect, useRef } from "react"
import { ChevronUp } from "lucide-react"

export function EnhancedScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mobileCircleRef = useRef<SVGCircleElement>(null)
  const desktopCircleRef = useRef<SVGCircleElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number | null = null

    const updateScrollProgress = () => {
      frameId = null
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0
      const isVisible = window.scrollY > 100

      containerRef.current?.classList.toggle("scroll-indicator-visible", isVisible)
      if (mobileCircleRef.current) mobileCircleRef.current.style.strokeDashoffset = String(2 * Math.PI * 18 * (1 - progress))
      if (desktopCircleRef.current) desktopCircleRef.current.style.strokeDashoffset = String(2 * Math.PI * 20 * (1 - progress))
      if (labelRef.current) labelRef.current.textContent = `${Math.round(progress * 100)}%`
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      ref={containerRef}
      className="scroll-indicator fixed bottom-16 right-3 z-50 translate-y-10 opacity-0 transition-[opacity,transform] duration-200 sm:bottom-20 sm:right-6"
    >
      <div className="flex flex-col items-center">
        {/* Circular progress indicator */}
        <div
          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-raised/80 backdrop-blur-sm cursor-pointer hover:bg-surface-raised/80 transition-colors"
          onClick={scrollToTop}
          role="button"
          aria-label="Scroll to top"
        >
          {/* Progress circle */}
          <svg className="w-10 h-10 sm:w-12 sm:h-12 absolute top-0 left-0 -rotate-90">
            <circle cx="20" cy="20" r="18" fill="none" stroke="hsl(var(--border-strong))" strokeWidth="2" className="sm:hidden" />
            <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--border-strong))" strokeWidth="2" className="hidden sm:block" />
            <circle
              ref={mobileCircleRef}
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 18}`}
              strokeDashoffset={`${2 * Math.PI * 18}`}
              strokeLinecap="round"
              className="sm:hidden"
            />
            <circle
              ref={desktopCircleRef}
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20}`}
              strokeLinecap="round"
              className="hidden sm:block"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>

        {/* Percentage label */}
        <div ref={labelRef} className="mt-1 rounded-md bg-surface-raised px-2 py-1 text-xs font-medium text-foreground sm:mt-2">0%</div>
      </div>
    </div>
  )
}
