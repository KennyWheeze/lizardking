import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { CaseStudySection } from "@/components/case-study-section"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { LmsArchitectureDiagram } from "@/components/lms-architecture-diagram"
import { PortfolioHeader } from "@/components/portfolio-header"
import { SkillTag } from "@/components/skill-tag"
import type { Project } from "@/lib/projects"

const manualSteps = [
  "Receive a verified enrollment",
  "Open WordPress",
  "Search for or create the learner",
  "Open the learner profile",
  "Identify the purchased course",
  "Assign LearnDash access",
  "Confirm enrollment",
  "Provide login guidance",
]

const decisions = [
  ["Email as learner identifier", "A consistent lookup key supports existing-account checks and new-user provisioning."],
  ["Course IDs in readable selections", "Recognizable course labels also contain the matching LearnDash course ID."],
  ["Formula-based ID extraction", "The response sheet extracts the course ID before passing it into enrollment."],
  ["REST API account creation", "Apps Script creates WordPress subscriber accounts when no learner exists."],
  ["Existing and new users", "The workflow supports both paths before course access is assigned."],
  ["Automated access guidance", "Emails provide login or password-setting instructions and notify administrators."],
]

const contributions = [
  "Mapped the manual process and designed the form and sheet structure.",
  "Researched and configured the integrations and course-ID transformation.",
  "Used AI assistance to draft the initial Apps Script.",
  "Configured and tested the WordPress API connection and built the Zapier workflow.",
  "Tested new-user and existing-user scenarios, configured LearnDash notifications, and maintained the live workflow.",
]

const outcomes = [
  "Transformed a repeated backend process into one authorized submission.",
  "Reduced manual WordPress and LearnDash navigation.",
  "Created a consistent learner onboarding experience.",
  "Allowed staff to initiate enrollment without performing the full backend process.",
  "Provided automatic learner and administrator confirmation.",
  "Retained a timestamped request log.",
]

const improvements = [
  "Add explicit payment-status validation and Submitted, Completed, and Failed states.",
  "Send direct error alerts and add idempotency and duplicate-run protection.",
  "Use deterministic sequencing between account creation and enrollment.",
  "Adopt safer secret storage and least-privilege API credentials.",
  "Handle exact API errors and expose actionable failure information.",
  "Use a course reference table instead of parsing IDs from labels.",
  "Replace the free-text learner name with structured name fields.",
]

function StepList({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item} className="rounded-lg border border-border bg-surface-inset/70 p-4">
          <span className="text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
          <p className="mt-2 text-sm font-medium text-foreground">{item}</p>
        </li>
      ))}
    </ol>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

interface ScreenshotFigureProps {
  src: string
  alt: string
  caption: string
}

function ScreenshotFigure({ src, alt, caption }: ScreenshotFigureProps) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface-inset/70">
      <div className="relative aspect-[4/3] w-full bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-contain"
        />
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-sm font-medium text-foreground-secondary">
        {caption}
      </figcaption>
    </figure>
  )
}

export function LmsAutomationCaseStudy({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-[radial-gradient(hsl(var(--border-strong))_1px,transparent_1px)] [background-size:20px_20px] opacity-20"
      />
      <PortfolioHeader />

      <div className="container relative z-10 mx-auto space-y-4 p-3 pb-8 pt-20 sm:space-y-6 sm:p-4 sm:pt-24">
        <AnimatedSection animation="fade-up">
          <section className="overflow-hidden rounded-xl border border-border bg-surface/80 p-5 backdrop-blur-sm sm:p-8">
            <p className="text-sm font-medium text-primary">{project.category}</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-foreground-secondary sm:text-lg">
              {project.shortDescription}
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Role", project.role],
                ["Status", "Implemented in live operations"],
                ["Environment", "WordPress and LearnDash LMS"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-surface-inset/70 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-primary">{label}</dt>
                  <dd className="mt-2 text-sm text-foreground-secondary">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Project technologies">
              {project.technologies.map((technology) => (
                <SkillTag key={technology}>{technology}</SkillTag>
              ))}
            </div>
            <p className="mt-6 border-l-2 border-primary pl-4 text-base font-medium leading-7 text-foreground">
              Reduced a repetitive multi-step LMS administration process to one authorized form submission
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <CaseStudySection title="Project Overview">
            <p>
              I handled manual learner account creation and course assignment for clients who needed registration
              assistance. Each verified enrollment required direct work inside the LMS before the learner could begin.
            </p>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <CaseStudySection title="The Manual Process">
            <StepList items={manualSteps} />
          </CaseStudySection>
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <CaseStudySection title="The Challenge">
            <p>
              The process created repeated administrative work, slower fulfillment, dependency on LMS backend access,
              and a risk of inconsistent handoffs between payment confirmation, enrollment, and learner guidance.
            </p>
          </CaseStudySection>
          <CaseStudySection title="Design Objective">
            <p>
              I wanted a controlled staff-facing interface that reduced backend work while retaining human payment
              verification. Automation begins only after an authorized staff member confirms the enrollment.
            </p>
          </CaseStudySection>
        </div>

        <AnimatedSection animation="fade-up" delay={200}>
          <CaseStudySection title="Solution Architecture" titleId="solution-architecture-title">
            <p className="mb-5">
              A verified staff submission creates a traceable request, checks whether the learner already has an
              account, provisions one when needed, assigns the correct LearnDash course, and closes the loop with
              learner and administrator confirmations.
            </p>
            <LmsArchitectureDiagram />
          </CaseStudySection>
        </AnimatedSection>

        <CaseStudySection title="Key Technical Decisions">
          <div className="grid gap-3 md:grid-cols-2">
            {decisions.map(([title, detail]) => (
              <article key={title} className="rounded-lg border border-border bg-surface-inset/70 p-4">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground-subtle">{detail}</p>
              </article>
            ))}
          </div>
        </CaseStudySection>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <CaseStudySection title="My Contribution">
            <CheckList items={contributions} />
          </CaseStudySection>
          <CaseStudySection title="Outcome and Operational Value">
            <CheckList items={outcomes} />
          </CaseStudySection>
        </div>

        <CaseStudySection title="Selected Screenshots">
          <div className="grid gap-4 md:grid-cols-2">
            <ScreenshotFigure
              src="/images/projects/enrollmentform.png"
              alt="Sanitized eLearning enrollment form with learner, course, payment status, and notes fields"
              caption="Authorized enrollment form"
            />
            <ScreenshotFigure
              src="/images/projects/confirmationevidence.png"
              alt="Sanitized learner enrollment confirmation email with password setup and course access buttons"
              caption="Workflow and confirmation evidence"
            />
          </div>
        </CaseStudySection>

        <CaseStudySection title="What Worked and What I Would Improve">
          <h3 className="font-semibold text-foreground">What worked</h3>
          <p className="mt-2">
            A familiar form gave staff one controlled entry point, while connected systems handled account checks,
            provisioning, enrollment, logging, and communication consistently.
          </p>
          <h3 className="mt-6 font-semibold text-foreground">What I would improve</h3>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {improvements.map((item) => (
              <li key={item} className="rounded-lg border border-border bg-surface-inset/70 p-4 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Reflection">
          <blockquote className="border-l-2 border-primary pl-4 italic text-foreground-secondary">
            “This was my first end-to-end workflow automation. It showed me that the work I enjoy most is not simply
            completing administrative tasks faster, but redesigning the underlying process so systems can perform
            repetitive work consistently. It also taught me that a successful automation must be secure, observable,
            maintainable, and designed around the people using it.”
          </blockquote>
        </CaseStudySection>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Projects
        </Link>

        <footer className="py-6 text-center text-xs text-foreground-subtle">
          &copy; {new Date().getFullYear()} Ken Gilmer P. Macawili. All Rights Reserved.
        </footer>
      </div>

      <EnhancedScrollIndicator />
    </main>
  )
}
