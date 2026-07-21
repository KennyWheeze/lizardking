import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExperienceAchievement {
  label: string
  description: string
}

interface ExperienceRole {
  title: string
  period: string
  promotionLabel?: string
  summary: string
  compact?: boolean
  showTechnologies?: boolean
  achievements: ExperienceAchievement[]
  technologies: string[]
}

interface ExperienceCardProps {
  company: string
  period: string
  roles: ExperienceRole[]
  sectionLabel?: string
}

function RoleDetails({ role }: { role: ExperienceRole }) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-foreground-secondary">{role.summary}</p>

      <div className="space-y-3">
        <h5 className="text-sm font-medium text-muted-foreground">Key Achievements</h5>
        <ul className={role.compact ? "space-y-2" : "space-y-3"}>
          {role.achievements.map((achievement, index) => (
            <li key={`${achievement.label}-${index}`} className="flex text-sm leading-relaxed text-foreground-secondary">
              <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <div className="min-w-0">
                {achievement.label && (
                  <strong className="block font-medium text-foreground">{achievement.label}</strong>
                )}
                <p className={achievement.label ? "mt-0.5" : undefined}>{achievement.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {role.showTechnologies !== false && role.technologies.length > 0 && (
        <div className="border-t border-border/80 pt-4">
          <h5 className="mb-2 text-sm font-medium text-muted-foreground">Technologies &amp; Skills</h5>
          <div className="flex flex-wrap gap-2">
            {role.technologies.map((technology) => (
              <Badge key={technology} variant="outline" className="bg-surface-inset/80 text-xs hover:bg-surface-raised">
                {technology}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ExperienceCard({ company, period, roles, sectionLabel }: ExperienceCardProps) {
  const isRoleHistory = roles.length > 1

  if (!isRoleHistory) {
    const role = roles[0]

    return (
      <div
        className={`border-b border-border last:border-0 last:pb-0 ${
          role.compact ? "space-y-3 pb-5" : "space-y-4 pb-6"
        }`}
      >
        {sectionLabel && (
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
            {sectionLabel}
          </div>
        )}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <div>
            <h4 className="text-base font-medium sm:text-lg">{role.title}</h4>
            <div className="text-sm text-primary">{company}</div>
          </div>
          <div className="mt-1 self-start rounded-full bg-surface-raised/70 px-2 py-1 text-xs text-muted-foreground sm:mt-0 sm:self-auto sm:px-3 sm:py-1">
            {period}
          </div>
        </div>

        <RoleDetails role={role} />
      </div>
    )
  }

  return (
    <div className="space-y-5 border-b border-border pb-6 last:border-0 last:pb-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <h4 className="text-base font-semibold text-foreground sm:text-lg">{company}</h4>
        <div className="mt-1 self-start rounded-full bg-surface-raised/70 px-2 py-1 text-xs text-muted-foreground sm:mt-0 sm:self-auto sm:px-3 sm:py-1">
          {period}
        </div>
      </div>

      <div className="ml-2 space-y-7 border-l border-border-strong pl-5 sm:ml-3 sm:pl-6">
        {roles.map((role) => (
          <section key={`${role.title}-${role.period}`} className="relative space-y-4">
            <span
              aria-hidden="true"
              className="absolute -left-[1.68rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary sm:-left-[1.94rem]"
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h5 className="font-medium text-foreground sm:text-base">{role.title}</h5>
                  {role.promotionLabel && (
                    <Badge className="border border-primary/35 bg-primary/10 text-[0.65rem] text-primary-hover hover:bg-primary/10">
                      {role.promotionLabel}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{role.period}</p>
              </div>
            </div>

            <RoleDetails role={role} />
          </section>
        ))}
      </div>
    </div>
  )
}
