import Link from "next/link"
import { ArrowRight, Braces, Database, Network, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/image-with-fallback"

interface ProjectCardProps {
  title: string
  category: string
  image?: string
  imageAlt?: string
  thumbnailVariant?: "image" | "pipeline"
  slug: string
}

export function ProjectCard({ title, category, image, imageAlt, thumbnailVariant = "image", slug }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View project: ${title}`}
    >
      <Card className="bg-surface-inset/80 border-border overflow-hidden group hover:border-primary/40 hover:bg-card-hover transition-all h-full">
        <div className="relative aspect-video w-full overflow-hidden">
          {thumbnailVariant === "pipeline" && image ? (
            <div
              role="img"
              aria-label={imageAlt || `${title} project architecture preview`}
              className="absolute inset-0 flex items-center justify-center bg-surface-inset p-4"
            >
              <ImageWithFallback
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                className="object-cover opacity-20 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/55 to-background/85" />
              <div className="relative mb-10 w-full max-w-sm">
                <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                  Scheduled research pipeline
                </p>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="flex min-w-14 flex-col items-center gap-1 rounded-lg border border-primary/35 bg-background-elevated/90 px-2 py-2 text-[10px] font-semibold text-foreground">
                    <Network className="h-4 w-4 text-primary" aria-hidden="true" />
                    RSS + API
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-foreground-subtle" aria-hidden="true" />
                  <span className="flex min-w-14 flex-col items-center gap-1 rounded-lg border border-border-strong bg-background-elevated/90 px-2 py-2 text-[10px] font-semibold text-foreground">
                    <Braces className="h-4 w-4 text-primary" aria-hidden="true" />
                    Normalize
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-foreground-subtle" aria-hidden="true" />
                  <span className="flex min-w-12 flex-col items-center gap-1 rounded-lg border border-accent/40 bg-accent/15 px-2 py-2 text-[10px] font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-accent-secondary" aria-hidden="true" />
                    AI
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-foreground-subtle" aria-hidden="true" />
                  <span className="flex min-w-14 flex-col items-center gap-1 rounded-lg border border-primary/35 bg-background-elevated/90 px-2 py-2 text-[10px] font-semibold text-foreground">
                    <Database className="h-4 w-4 text-primary" aria-hidden="true" />
                    Notion
                  </span>
                </div>
              </div>
            </div>
          ) : image ? (
            <ImageWithFallback
              src={image}
              alt={imageAlt || `${title} project preview`}
              fill
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              role="img"
              aria-label={imageAlt || `${title} project visual placeholder`}
              className="absolute inset-0 flex items-center justify-center bg-surface-inset p-5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--border-strong))_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              <div className="relative mb-8 flex items-center gap-2 text-primary transition-transform duration-300 group-hover:scale-105">
                <Database className="h-7 w-7" aria-hidden="true" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            <div className="text-xs text-primary mb-1">{category}</div>
            <h2 className="font-medium text-sm sm:text-base">{title}</h2>
          </div>
        </div>
      </Card>
    </Link>
  )
}
