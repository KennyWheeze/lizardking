import { ImageIcon } from "lucide-react"

interface VisualPlaceholderProps {
  label: string
  description: string
}

export function VisualPlaceholder({ label, description }: VisualPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${description}`}
      className="flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface-inset/70 p-6 text-center"
    >
      <ImageIcon aria-hidden="true" className="h-7 w-7 text-primary" />
      <p className="mt-3 font-semibold text-foreground">{label}</p>
      <p className="mt-2 max-w-md text-sm leading-6 text-foreground-subtle">{description}</p>
    </div>
  )
}
