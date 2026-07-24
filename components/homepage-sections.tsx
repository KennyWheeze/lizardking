import { ArrowRight, Cog, FileText, HeartPulse, Lightbulb, Network, Workflow } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent } from "@/components/ui/card"

const capabilities = [
  {
    title: "Automation & Digital Systems",
    description:
      "I design practical workflows, connect platforms, automate repetitive work, and improve the reliability of digital operations.",
    icon: Network,
  },
  {
    title: "Learning & Instructional Design",
    description:
      "I create structured, scenario-based, and technology-enabled learning experiences grounded in real performance needs.",
    icon: Lightbulb,
  },
  {
    title: "Safety & Compliance",
    description:
      "I support safer workplaces through training, risk awareness, compliance systems, and operational discipline.",
    icon: HeartPulse,
  },
  {
    title: "Operations & Process Improvement",
    description:
      "I map workflows, clarify responsibilities, reduce friction, and build systems that help teams deliver consistently.",
    icon: Workflow,
  },
]

const background = [
  {
    role: "Lead, Training Division",
    company: "Petrosphere Incorporated",
    period: "February 2026 to Present",
    description:
      "Lead training operations, team delivery, learning systems, process improvement, client proposals, service quality, and commercial performance for an occupational safety and professional training organization.",
  },
  {
    role: "HSSEQ & Training Officer",
    company: "Petrosphere Incorporated",
    period: "September 2024 to February 2026",
    description:
      "Managed end-to-end training operations while supporting LMS administration, instructional design, safety compliance, client coordination, and workflow automation.",
  },
  {
    role: "QA/QC Intern",
    company: "DESCO, Inc.",
    period: "June 2024 to August 2024",
    description:
      "Supported inspection, quality documentation, equipment verification, and industrial safety procedures in an oil-and-gas service environment.",
  },
]

export function WhatIDoSection() {
  return (
    <Card className="border-border bg-card/90 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-5 flex items-start sm:mb-6">
          <Cog aria-hidden="true" className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent-secondary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">What I Do</h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              I work across people, processes, and technology to make everyday operations clearer and more effective.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <AnimatedSection key={capability.title} animation="fade-up" delay={75 * (index + 1)}>
                <article className="h-full rounded-lg border border-border bg-surface-inset/70 p-4 transition-colors hover:border-primary/35 hover:bg-card-hover sm:p-5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-base font-semibold text-foreground sm:text-lg">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{capability.description}</p>
                </article>
              </AnimatedSection>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProfessionalBackgroundSection() {
  return (
    <div
      id="professional-background"
      className="scroll-mt-24 border-y border-border/80 px-1 py-8 sm:px-2 sm:py-10 lg:py-12"
    >
      <div className="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.45fr)] lg:gap-12 xl:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Professional Background</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            A concise view of the roles that shaped my work across training, safety, systems, and operations.
          </p>

          <a
            href="/#professional-background"
            aria-label="View résumé summary in Professional Background"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border-strong px-3.5 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FileText aria-hidden="true" className="h-4 w-4 text-primary" />
            View Résumé
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>

        <ol aria-label="Career timeline">
          {background.map((entry, index) => (
            <li
              key={`${entry.role}-${entry.period}`}
              className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 sm:gap-x-5"
            >
              <div aria-hidden="true" className="flex h-full flex-col items-center">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-background ring-4 ring-primary/10" />
                {index < background.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-border-strong/80" />
                )}
              </div>

              <article>
                <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">{entry.role}</h3>
                <div className="mt-1 flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:gap-2">
                  <p className="font-medium text-primary">{entry.company}</p>
                  <span aria-hidden="true" className="hidden text-border-strong sm:inline">
                    /
                  </span>
                  <p className="text-muted-foreground">{entry.period}</p>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
                  {entry.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function HowIWorkSection() {
  return (
    <Card className="relative overflow-hidden border-border bg-card/90 backdrop-blur-sm">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
      <CardContent className="relative p-5 sm:p-7">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">How I Work</h2>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-foreground-secondary">
          I tend to notice repeated work, unclear processes, and gaps between people and systems. My approach is to
          understand the problem first, simplify the workflow, and build something practical that people can actually
          use. I value solutions that are not only functional, but also clear, maintainable, and grounded in real
          operational needs.
        </p>
      </CardContent>
    </Card>
  )
}
