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
    title: "End-to-End OSH Training Operations",
    category: "Safety & Training Operations",
    summary:
      "Managed the complete delivery cycle of occupational safety training programs, from participant registration and trainer scheduling through facilitation, DOLE documentation, certification, and payment coordination.",
    outcome:
      "Created a controlled training workflow that addressed learner, trainer, compliance, and operational requirements.",
    skills: ["Training Operations", "DOLE Compliance", "Stakeholder Coordination"],
    href: "",
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
        <Card key={item.title} className="h-full border-zinc-800 bg-zinc-950/60">
          <CardContent className="flex h-full flex-col p-4 sm:p-5">
            <Badge
              variant="outline"
              className="mb-3 w-fit border-yellow-400/30 bg-yellow-400/5 text-xs text-yellow-300"
            >
              {item.category}
            </Badge>

            <h4 className="text-base font-semibold leading-snug text-white sm:text-lg">{item.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.summary}</p>

            <div className="mt-4 border-t border-zinc-800 pt-4">
              <div className="flex items-start gap-2 text-sm leading-relaxed text-zinc-300">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                <p>
                  <span className="font-medium text-zinc-100">Outcome: </span>
                  {item.outcome}
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`${item.title} skills`}>
              {item.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="border-zinc-700 bg-zinc-800/50 text-xs text-zinc-300">
                  {skill}
                </Badge>
              ))}
            </div>

            {item.href ? (
              <Link
                href={item.href}
                className="mt-4 flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-yellow-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                aria-label={`View case study: ${item.title}`}
              >
                View case study
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <div className="mt-4 text-xs text-zinc-500">Case study in development</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
