import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CaseStudySectionProps {
  title: string
  children: ReactNode
  className?: string
}

export function CaseStudySection({ title, children, className = "" }: CaseStudySectionProps) {
  return (
    <Card className={`border-border bg-surface/80 backdrop-blur-sm ${className}`}>
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">{title}</h2>
        <div className="mt-4 text-sm leading-7 text-foreground-secondary sm:text-base">{children}</div>
      </CardContent>
    </Card>
  )
}
