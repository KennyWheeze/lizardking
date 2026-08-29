import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/image-with-fallback"

interface ProjectCardProps {
  title: string
  category: string
  image: string
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
          <ImageWithFallback
            src={image || "/placeholder.svg"}
            alt={imageAlt || `${title} project preview`}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
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
