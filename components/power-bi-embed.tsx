"use client"

import { useEffect, useRef, useState } from "react"

const REPORT_WIDTH = 1366
const REPORT_HEIGHT = 824

interface PowerBiEmbedProps {
  src: string
  title: string
}

export function PowerBiEmbed({ src, title }: PowerBiEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [measured, setMeasured] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      setScale(container.clientWidth / REPORT_WIDTH)
      setMeasured(true)
    }
    const observer = new ResizeObserver(updateScale)

    updateScale()
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative mt-5 w-full overflow-hidden rounded-xl border border-border bg-surface-inset"
      style={{ aspectRatio: `${REPORT_WIDTH} / ${REPORT_HEIGHT}` }}
    >
      <iframe
        src={src}
        title={title}
        width={REPORT_WIDTH}
        height={REPORT_HEIGHT}
        className="power-bi-report-frame absolute left-0 top-0 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        style={{
          height: `${REPORT_HEIGHT}px`,
          width: `${REPORT_WIDTH}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: measured ? "visible" : "hidden",
        }}
        loading="lazy"
        allowFullScreen
        scrolling="no"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
