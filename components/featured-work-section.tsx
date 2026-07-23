import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const featuredWork = [
  {
    title: "Sales Enablement and Client Conversion Improvement",
    category: "Performance Consulting & Instructional Design",
    summary:
      "Designed a performance-focused sales enablement solution to address inconsistent client conversations, weak value communication, and conversion barriers.",
    outcome:
      "Demonstrates performance analysis, stakeholder-centered solution design, sales enablement, instructional design, and evaluation planning.",
    skills: ["Performance Analysis", "Sales Enablement", "Instructional Design"],
    href: "/projects/sales-enablement",
    featured: true,
  },
  {
    title: "Automated LMS Enrollment and User Provisioning Workflow",
    category: "Automation & Digital Systems",
    summary:
      "Designed and implemented a form-driven workflow that creates WordPress learner accounts when needed, assigns purchased LearnDash courses, and delivers automated access instructions using Google Forms, Google Sheets, Apps Script, the WordPress REST API, Zapier, and LearnDash",
    outcome:
      "Reduced a repetitive multi-step LMS administration process to one authorized form submission",
    skills: ["Google Apps Script", "LearnDash", "Process Automation"],
    href: "/projects/automated-lms-enrollment",
    featured: true,
  },
  {
    title: "Scenario-Based Safety Learning Simulation",
    category: "Instructional Design",
    summary:
      "Designed a scenario-based digital learning experience using realistic workplace decisions, scoring, feedback, and branching outcomes.",
    outcome:
      "Demonstrates performance analysis, storyboarding, interaction design, and e-learning development.",
    skills: ["Articulate Storyline", "Scenario Design", "Learning Experience Design"],
    href: "",
    featured: true,
  },
  {
    title: "BOSH SO2 Training Coordination Redesign",
    category: "Process Improvement",
    summary:
      "Reviewed and helped redesign the sales-to-training coordination procedure after a missed internal handoff caused a confirmed BOSH SO2 program to be postponed.",
    outcome:
      "Clarified departmental ownership and supported smoother coordination of subsequent training sessions.",
    skills: ["SOP Development", "Root-Cause Analysis", "Cross-Functional Coordination"],
    href: "",
    featured: false,
  },
]

export function FeaturedWorkSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {featuredWork.filter((item) => item.featured).map((item) => (
        <Card key={item.title} className="h-full border-border bg-surface-inset/70 transition-colors hover:border-primary/35 hover:bg-card-hover">
          <CardContent className="flex h-full flex-col p-4 sm:p-5">
            <Badge
              variant="outline"
              className="mb-3 w-fit border-primary/35 bg-primary/10 text-xs text-primary-hover"
            >
              {item.category}
            </Badge>

            <h4 className="text-base font-semibold leading-snug text-foreground sm:text-lg">{item.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{item.summary}</p>

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-start gap-2 text-sm leading-relaxed text-foreground-secondary">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p>
                  <span className="font-medium text-foreground">Outcome: </span>
                  {item.outcome}
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`${item.title} skills`}>
              {item.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="border-border-strong bg-surface-inset/80 text-xs text-foreground-secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            {item.href ? (
              <Link
                href={item.href}
                className="mt-4 flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`View case study: ${item.title}`}
              >
                View case study
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <div className="mt-4 text-xs text-foreground-subtle">Case study in development</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
