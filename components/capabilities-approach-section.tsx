"use client"

import Link from "next/link"
import { useRef, useState, type KeyboardEvent } from "react"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Lightbulb,
  Network,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react"

type Capability = {
  id: string
  index: string
  title: string
  positioning: string
  contributions: string[]
  proof:
    | {
        label: string
        href: string
      }
    | {
        label: string
        href: null
      }
  tools: string[]
  icon: LucideIcon
  visual:
    | {
        kind: "linear"
        label: string
        steps: string[]
      }
    | {
        kind: "branch"
        label: string
      }
}

const capabilities: Capability[] = [
  {
    id: "automation",
    index: "01",
    title: "Automation & Digital Systems",
    positioning:
      "I design practical workflows that connect platforms, reduce repetitive work, and improve the reliability of digital operations.",
    contributions: [
      "Workflow and process mapping",
      "No-code and low-code automation",
      "API and platform integration",
      "Validation, notifications, and status tracking",
    ],
    proof: {
      label: "View Automated LMS Enrollment Workflow",
      href: "/projects/automated-lms-enrollment",
    },
    tools: ["Zapier", "Google Apps Script", "WordPress REST API", "LearnDash"],
    icon: Network,
    visual: {
      kind: "linear",
      label: "Automation workflow from form submission to confirmation",
      steps: ["Form", "Data", "Logic", "System", "Confirmation"],
    },
  },
  {
    id: "learning",
    index: "02",
    title: "Learning & Instructional Design",
    positioning:
      "I turn real performance needs into structured learning experiences that help people make better workplace decisions.",
    contributions: [
      "Performance and learner analysis",
      "Storyboarding and scenario design",
      "Interactive e-learning development",
      "LMS implementation and administration",
    ],
    proof: {
      label: "Case study in development",
      href: null,
    },
    tools: ["Articulate Storyline", "Rise 360", "LearnDash", "PowerPoint"],
    icon: Lightbulb,
    visual: {
      kind: "branch",
      label: "Learning scenario branching from a situation through choices to feedback",
    },
  },
  {
    id: "safety",
    index: "03",
    title: "Safety & Compliance",
    positioning:
      "I translate safety requirements into practical training, operating controls, and systems people can understand and follow.",
    contributions: [
      "Occupational safety training",
      "Risk and compliance communication",
      "Procedures and operational documentation",
      "Audit and quality-system support",
    ],
    proof: {
      label: "View Relevant Credentials",
      href: "/#credentials",
    },
    tools: ["ISO 9001", "BOSH", "Risk Assessment", "Safety Training"],
    icon: ShieldCheck,
    visual: {
      kind: "linear",
      label: "Safety control flow from identifying a hazard to verifying controls",
      steps: ["Hazard", "Assess", "Control", "Verify"],
    },
  },
  {
    id: "operations",
    index: "04",
    title: "Operations & Process Improvement",
    positioning:
      "I clarify workflows, responsibilities, and handoffs so teams can deliver work more consistently.",
    contributions: [
      "Process and service mapping",
      "Operational coordination",
      "Reporting and tracking systems",
      "Workflow and performance improvement",
    ],
    proof: {
      label: "View Sales Enablement Case Study",
      href: "/projects/sales-enablement",
    },
    tools: ["Excel", "Google Sheets", "Process Mapping", "Reporting"],
    icon: Workflow,
    visual: {
      kind: "linear",
      label: "Operations workflow from request to completion",
      steps: ["Request", "Owner", "Action", "Review", "Completion"],
    },
  },
]

const operatingMethod = [
  {
    index: "01",
    title: "Understand",
    description: "Clarify the problem, users, constraints, and desired result.",
  },
  {
    index: "02",
    title: "Simplify",
    description: "Remove unnecessary steps and define a clearer workflow.",
  },
  {
    index: "03",
    title: "Build",
    description: "Create a practical solution using the appropriate tools.",
  },
  {
    index: "04",
    title: "Improve",
    description: "Test, observe, document, and strengthen the system.",
  },
]

function LinearVisual({ visual }: { visual: Extract<Capability["visual"], { kind: "linear" }> }) {
  return (
    <figure
      aria-label={visual.label}
      className="rounded-lg bg-background/35 px-3 py-4 sm:px-4"
    >
      <div className="flex items-center overflow-x-auto pb-1 scrollbar-thin">
        {visual.steps.map((step, index) => (
          <div key={step} className="flex shrink-0 items-center">
            <span className="inline-flex min-h-9 items-center rounded-md border border-border-strong bg-surface-inset px-3 text-xs font-medium text-foreground-secondary sm:text-sm">
              {step}
            </span>
            {index < visual.steps.length - 1 && (
              <ArrowRight aria-hidden="true" className="mx-2 h-3.5 w-3.5 shrink-0 text-primary/80" />
            )}
          </div>
        ))}
      </div>
    </figure>
  )
}

function BranchingVisual({ label }: { label: string }) {
  return (
    <figure
      aria-label={label}
      className="grid gap-3 rounded-lg bg-background/35 px-3 py-4 sm:grid-cols-[0.8fr_auto_1.35fr_auto_0.9fr] sm:items-center sm:px-4"
    >
      <span className="inline-flex min-h-9 items-center justify-center rounded-md border border-border-strong bg-surface-inset px-3 text-sm font-medium text-foreground-secondary">
        Situation
      </span>
      <ArrowRight aria-hidden="true" className="hidden h-3.5 w-3.5 text-primary/80 sm:block" />
      <span className="grid grid-cols-2 gap-2" aria-label="Available choices">
        <span className="inline-flex min-h-9 items-center justify-center rounded-md border border-primary/25 bg-primary/5 px-2 text-xs font-medium text-foreground-secondary">
          Choice A
        </span>
        <span className="inline-flex min-h-9 items-center justify-center rounded-md border border-primary/25 bg-primary/5 px-2 text-xs font-medium text-foreground-secondary">
          Choice B
        </span>
      </span>
      <ArrowRight aria-hidden="true" className="hidden h-3.5 w-3.5 text-primary/80 sm:block" />
      <span className="inline-flex min-h-9 items-center justify-center rounded-md border border-border-strong bg-surface-inset px-3 text-sm font-medium text-foreground-secondary">
        Feedback
      </span>
    </figure>
  )
}

function CapabilityVisual({ capability }: { capability: Capability }) {
  return capability.visual.kind === "linear" ? (
    <LinearVisual visual={capability.visual} />
  ) : (
    <BranchingVisual label={capability.visual.label} />
  )
}

function CapabilityPanel({ capability }: { capability: Capability }) {
  const Icon = capability.icon

  return (
    <div key={capability.id} className="animate-in fade-in duration-200 motion-reduce:animate-none">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-primary">{capability.index}</span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-tight text-foreground sm:text-2xl">{capability.title}</h3>

      <p className="mt-4 max-w-4xl text-base leading-7 text-foreground-secondary sm:text-lg sm:leading-8">
        {capability.positioning}
      </p>

      <div className="mt-6">
        <CapabilityVisual capability={capability} />
      </div>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2" aria-label={`${capability.title} contributions`}>
        {capability.contributions.map((contribution) => (
          <li key={contribution} className="flex items-start gap-2.5 text-sm leading-6 text-foreground-secondary">
            <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
            <span>{contribution}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        {capability.proof.href ? (
          <Link
            href={capability.proof.href}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-primary/30 px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/55 hover:bg-primary/5 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {capability.proof.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-border-strong bg-background/35 px-3.5 py-2 text-sm font-medium text-foreground-subtle"
          >
            <CircleDot aria-hidden="true" className="h-3.5 w-3.5" />
            {capability.proof.label}
          </span>
        )}
      </div>

      <ul
        className="mt-6 flex flex-wrap gap-2"
        aria-label={`${capability.title} tools and methods`}
      >
        {capability.tools.map((tool) => (
          <li
            key={tool}
            className="inline-flex min-h-8 items-center rounded-full border border-border-strong bg-surface-inset/75 px-3 py-1 text-xs font-medium text-foreground-secondary"
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CapabilitiesApproachSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeCapability = capabilities[activeIndex]

  const selectAndFocus = (index: number) => {
    const nextIndex = (index + capabilities.length) % capabilities.length
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1
    if (event.key === "Home") nextIndex = 0
    if (event.key === "End") nextIndex = capabilities.length - 1

    if (nextIndex !== null) {
      event.preventDefault()
      selectAndFocus(nextIndex)
    }
  }

  return (
    <section
      aria-labelledby="capabilities-approach-heading"
      className="pb-14 pt-5 sm:pb-16 sm:pt-8 lg:pb-20"
    >
      <header className="max-w-4xl">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-9 bg-primary sm:w-12" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Capabilities &amp; Approach,
          </p>
        </div>
        <h2
          id="capabilities-approach-heading"
          className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl"
        >
          Different disciplines. One systems-focused way of working.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary sm:text-lg sm:leading-8">
          I tend to notice repeated work, unclear processes, and gaps between people and systems. I work across
          automation, learning, safety, and operations, but my approach remains consistent: understand the problem,
          simplify the workflow, build something practical, and improve it through use.
        </p>
      </header>

      <div className="mt-10 grid min-w-0 gap-5 xl:grid-cols-[minmax(14rem,0.28fr)_minmax(0,0.72fr)] xl:items-start xl:gap-6">
        <div
          role="tablist"
          aria-label="Select a capability"
          className="flex min-w-0 snap-x gap-2 overflow-x-auto pb-2 scrollbar-thin xl:self-start xl:flex-col xl:overflow-visible xl:pb-0"
        >
          {capabilities.map((capability, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={capability.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                id={`capability-tab-${capability.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="capability-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`group flex min-h-11 min-w-[15rem] snap-start items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-w-[17rem] xl:min-w-0 ${
                  isActive
                    ? "border-primary/35 bg-primary/5 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-surface-inset/55 hover:text-foreground-secondary"
                }`}
              >
                <span className={`text-xs font-semibold tracking-[0.14em] ${isActive ? "text-primary" : ""}`}>
                  {capability.index}
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium leading-snug">{capability.title}</span>
                <ChevronRight
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-primary transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  }`}
                />
              </button>
            )
          })}
        </div>

        <div
          id="capability-panel"
          role="tabpanel"
          aria-labelledby={`capability-tab-${activeCapability.id}`}
          tabIndex={0}
          className="min-w-0 rounded-xl border border-border bg-surface/90 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6 lg:p-7"
        >
          <CapabilityPanel capability={activeCapability} />
        </div>
      </div>

      <noscript>
        <div className="mt-8 space-y-6 rounded-xl border border-border bg-surface/90 p-5">
          {capabilities.map((capability) => (
            <article key={capability.id}>
              <h3 className="font-semibold text-foreground">
                {capability.index} {capability.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-foreground-secondary">{capability.positioning}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground-secondary">
                {capability.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </noscript>

      <div className="mt-12 rounded-xl border border-border bg-surface-inset/35 p-5 sm:mt-14 sm:p-6 lg:mt-16">
        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">My Operating Method</h3>

        <ol className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" aria-label="My operating method">
          {operatingMethod.map((stage) => (
            <li key={stage.index} className="border-t border-border-strong pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-primary">{stage.index}</span>
                <h4 className="text-base font-semibold text-foreground">{stage.title}</h4>
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground-secondary">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
