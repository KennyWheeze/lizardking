import { ExternalLink } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { cn } from "@/lib/utils"

interface ProjectScreenshotProps {
  src: string
  alt: string
  title: string
  caption: string
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
}

export function ProjectScreenshot({
  src,
  alt,
  title,
  caption,
  className,
  imageClassName = "aspect-video",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: ProjectScreenshotProps) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-border bg-surface-inset/65", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-sm text-xs font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Open full-size screenshot: ${title}`}
        >
          Full size
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative block w-full overflow-hidden bg-background-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          imageClassName,
        )}
        aria-label={`Open full-size screenshot: ${title}`}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          priority={priority}
          className="object-contain transition-transform duration-300 hover:scale-[1.01]"
          fallbackLabel={`${title} screenshot unavailable`}
        />
      </a>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-6 text-foreground-secondary">
        {caption}
      </figcaption>
    </figure>
  )
}
