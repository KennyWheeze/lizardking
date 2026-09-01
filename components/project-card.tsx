import Link from "next/link"
import { ArrowRight, Workflow } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/image-with-fallback"

interface ProjectCardProps {
  title: string
  category: string
  image?: string
  imageAlt?: string
  slug: string
}

export function ProjectCard({ title, category, image, imageAlt, slug }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View project: ${title}`}
    >
      <Card className="bg-surface-inset/80 border-border overflow-hidden group hover:border-primary/40 hover:bg-card-hover transition-all h-full">
        <div className="relative aspect-video w-full overflow-hidden">
          {image ? (
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
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/35 bg-primary/10">
                  <Workflow className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowRight className="h-4 w-4 text-foreground-subtle" aria-hidden="true" />
                <span className="rounded-lg border border-accent/35 bg-accent/10 px-3 py-2 text-xs font-semibold text-accent-secondary">
                  AI
                </span>
                <ArrowRight className="h-4 w-4 text-foreground-subtle" aria-hidden="true" />
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/35 bg-primary/10 text-xs font-bold">
                  DB
                </span>
              </div>
              <span className="absolute right-3 top-3 rounded-full border border-border-strong bg-background-elevated/85 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-foreground-subtle">
                Visual pending
              </span>
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
