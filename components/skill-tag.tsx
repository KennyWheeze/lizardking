import type { ReactNode } from "react"

interface SkillTagProps {
  children: ReactNode
}

export function SkillTag({ children }: SkillTagProps) {
  return (
    <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-surface-raised text-xs rounded-md border border-border-strong">
      {children}
    </span>
  )
}
