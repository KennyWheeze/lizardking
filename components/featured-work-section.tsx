import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import BorderGlow from "@/components/BorderGlow"

interface FeaturedWorkItem {
  title: string
  category: string
  summary: string
  outcome: string
  skills: string[]
  href: string
}

const featuredWork = [
  {
    title: "Sales Enablement and Client Conversion Improvement",
    category: "Performance Consulting & Instructional Design",
    summary:
      "Designed a performance-focused solution to improve client conversations, value communication, and conversion readiness.",
    outcome:
      "Shows performance analysis, stakeholder-centered solution design, sales enablement, and evaluation planning.",
    skills: ["Performance Analysis", "Sales Enablement", "Instructional Design"],
    href: "/projects/sales-enablement",
    featured: true,
  },
  {
    title: "Automated LMS Enrollment and User Provisioning Workflow",
    category: "Automation & Digital Systems",
    summary:
      "Built a form-driven workflow that provisions learner accounts, assigns LearnDash courses, and delivers access instructions automatically.",
    outcome:
      "Reduced a repetitive multi-step LMS administration process to one authorized form submission.",
    skills: ["Google Apps Script", "LearnDash", "Process Automation"],
    href: "/projects/automated-lms-enrollment",
    featured: true,
  },
  {
    title: "Scenario-Based Safety Learning Simulation",
    category: "Instructional Design",
    summary:
      "Designed an interactive safety learning experience using workplace decisions, scoring, feedback, and branching outcomes.",
    outcome:
      "Shows performance analysis, storyboarding, interaction design, and scenario-based e-learning development.",
    skills: ["Articulate Storyline", "Scenario Design", "Learning Experience Design"],
    href: "",
    featured: true,
  },
]

function FeaturedWorkCard({ item, index }: { item: FeaturedWorkItem; index: number }) {
  return (
    <BorderGlow animated introDelay={index * 900} className="featured-work-glow">
      <Card className="h-full border-0 bg-transparent shadow-none">
        <CardContent className="flex h-full flex-col p-4 sm:p-5">
          <div className="flex min-h-6 items-start">
            <Badge
              variant="outline"
              className="inline-flex min-h-6 w-fit items-center border-primary/35 bg-primary/10 px-2.5 py-1 text-xs leading-none text-primary-hover"
            >
              {item.category}
            </Badge>
          </div>

          <h3 className="mt-3 text-base font-semibold leading-snug text-foreground sm:text-lg xl:min-h-[3.25rem]">
            {item.title}
          </h3>
          <p className="mt-2.5 text-sm leading-6 text-foreground-secondary xl:min-h-[4.5rem]">{item.summary}</p>

          <div className="mt-4 border-t border-border pt-4 xl:min-h-[7.25rem]">
            <div className="flex items-start gap-2 text-sm leading-6 text-foreground-secondary">
              <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <p>
                <span className="font-medium text-foreground">Outcome: </span>
                {item.outcome}
              </p>
            </div>
          </div>

          <div
            className="mt-auto flex flex-wrap content-start gap-2 pt-4 xl:min-h-[4.75rem]"
            aria-label={`${item.title} skills`}
          >
            {item.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="h-fit whitespace-nowrap border-border-strong bg-surface-inset/80 text-xs text-foreground-secondary"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <footer className="mt-3 flex min-h-8 items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`View case study: ${item.title}`}
              >
                View case study
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span className="inline-flex min-h-7 items-center gap-2 rounded-full border border-border-strong bg-background-elevated/70 px-2.5 py-1 text-xs font-medium text-foreground-subtle">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Case study in development
              </span>
            )}
          </footer>
        </CardContent>
      </Card>
    </BorderGlow>
  )
}

export function FeaturedWorkSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {featuredWork.map((item, index) => (
        <FeaturedWorkCard key={item.title} item={item} index={index} />
      ))}
    </div>
  )
}
