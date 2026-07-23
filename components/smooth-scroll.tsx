"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(pointer: fine)")

    if (reducedMotion.matches || !finePointer.matches) return

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      smoothWheel: true,
      syncTouch: false,
      duration: 0.85,
      easing: (value) => 1 - Math.pow(1 - value, 4),
      wheelMultiplier: 0.9,
      overscroll: true,
    })

    return () => lenis.destroy()
  }, [])

  return null
}
