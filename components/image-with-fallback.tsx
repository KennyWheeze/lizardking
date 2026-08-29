"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { ImageIcon } from "lucide-react"

interface ImageWithFallbackProps extends ImageProps {
  fallbackLabel?: string
}

export function ImageWithFallback({
  fallbackLabel = "Project preview unavailable",
  onError,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-inset p-4 text-center text-muted-foreground">
        <ImageIcon aria-hidden="true" className="h-7 w-7" />
        <span className="text-xs font-medium sm:text-sm">{fallbackLabel}</span>
      </div>
    )
  }

  return (
    <Image
      {...props}
      alt={alt}
      onError={(event) => {
        setFailed(true)
        onError?.(event)
      }}
    />
  )
}
