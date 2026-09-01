import Link from "next/link"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Braces,
  CheckCircle2,
  Database,
  FileCheck2,
  Filter,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { AiResearchArchitectureDiagram } from "@/components/ai-research-architecture-diagram"
import { AnimatedSection } from "@/components/animated-section"
import { CaseStudySection } from "@/components/case-study-section"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { PortfolioHeader } from "@/components/portfolio-header"
import { ProjectScreenshot } from "@/components/project-screenshot"
import { SkillTag } from "@/components/skill-tag"
import type { Project } from "@/lib/projects"

const manualProblems = [
  ["Different data formats", "RSS and GraphQL expose different field structures."],
  ["Repeated content", "Previously reviewed URLs can appear in later runs."],
  ["Limited AI quota", "Not every collected item deserves an LLM request."],
  ["Duplicate records", "Repeated writes reduce trust in the research library."],
  ["Failure recovery", "Incomplete work must remain eligible for a later retry."],
]

const designObjectives = [
  ["Multi-source", "One downstream workflow for fundamentally different sources."],
  ["Quota-aware", "Filter, deduplicate, and prioritize before Gemini."],
  ["Stateful", "Remember only URLs that reached a completed outcome."],
  ["Duplicate-safe", "Protect both AI capacity and the final Notion database."],
  ["Retry-ready", "Leave incomplete work eligible for a future run."],
]

const pipelineSteps = [
  {
    title: "Collect",
    detail:
      "A scheduled n8n run retrieves TechCrunch AI through RSS and Product Hunt posts through authenticated GraphQL requests.",
  },
  {
    title: "Pre-filter",
    detail:
      "A lightweight keyword check removes obviously unrelated Product Hunt posts before any limited AI quota is used.",
  },
  {
    title: "Normalize",
    detail:
      "Both source formats are mapped to the same source-neutral fields, so downstream nodes do not need source-specific logic.",
  },
  {
    title: "Prioritize",
    detail:
      "Completed URLs are removed, eligible records are sorted newest first, and only the first five proceed to analysis.",
  },
  {
    title: "Analyze & persist",
    detail:
      "Gemini returns structured analysis; relevant, genuinely new items reach Notion, and every completed path records a terminal outcome.",
  },
]

const sourceSchema = ["source", "source_type", "title", "url", "published_at", "author", "raw_excerpt"]

const analysisSchema = [
  ["relevant", "boolean"],
  ["summary", "string"],
  ["why_it_matters", "string"],
  ["who_its_for", "string"],
  ["category", "enum"],
  ["importance", "1–10"],
]

const categories = [
  "AI Models",
  "AI Agents & Automation",
  "AI Coding",
  "AI Productivity",
  "AI Media",
  "AI Research",
  "AI Business & Industry",
  "Other",
]

const canonicalRecord = [
  "source",
  "source_type",
  "title",
  "url",
  "published_at",
  "author",
  "relevant",
  "summary",
  "why_it_matters",
  "who_its_for",
  "category",
  "importance",
]

const metrics = [
  ["2", "Live research sources"],
  ["2", "Duplicate-protection layers"],
  ["3", "Tracked terminal outcomes"],
  ["5", "Maximum AI evaluations per run"],
]

const operationalOutcomes = [
  ["Automated daily intake", "A scheduled workflow collects new research without repeated manual source checking."],
  ["Multi-source ingestion", "RSS and authenticated API data enter the same normalized pipeline."],
  ["Focused AI usage", "Deterministic filtering and freshness ranking reserve Gemini for eligible work."],
  ["Consistent output", "Every accepted item reaches Notion with the same structured research fields."],
  ["Duplicate-safe persistence", "Processing history and a destination lookup protect two different failure points."],
  ["Operational reliability", "Terminal logging supports repeated schedules and safe retries after incomplete runs."],
]

const lessons = [
  "Treat API limits as an architectural constraint, not a late optimization.",
  "Normalize different sources before shared analysis and persistence.",
  "Track completed work rather than every item the workflow has merely seen.",
  "Keep an operational log separate from the human-facing destination database.",
  "Maintain development and rollback versions so experiments stay out of the scheduled production workflow.",
]

const nextSteps = [
  "Add run-level observability for fetched, filtered, analyzed, saved, duplicated, and failed items.",
  "Rank eligible items using source quality and predicted relevance in addition to freshness.",
  "Move the local n8n instance to persistent hosting for continuously available scheduling.",
]

const scope = [
  "RSS ingestion",
  "GraphQL integration",
  "Source normalization",
  "Structured Gemini output",
  "Persistent state",
  "Notion integration",
  "Retry behavior",
  "Production publishing",
]

function FlowSequence({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center" aria-label={items.join(" then ")}>
      {items.map((item, index) => (
        <div key={item} className="contents">
          <div
            className={`flex min-h-12 flex-1 items-center justify-center rounded-lg border px-3 py-2 text-center text-xs font-semibold sm:text-sm ${
              muted
                ? "border-border bg-surface-inset/45 text-foreground-subtle"
                : "border-primary/30 bg-primary/10 text-foreground"
            }`}
          >
            {item}
          </div>
          {index < items.length - 1 && (
            <>
              <ArrowDown className="mx-auto h-4 w-4 text-foreground-subtle sm:hidden" aria-hidden="true" />
              <ArrowRight className="hidden h-4 w-4 shrink-0 text-foreground-subtle sm:block" aria-hidden="true" />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

function TerminalPath({
  title,
  tone,
  steps,
}: {
  title: string
  tone: "success" | "failure"
  steps: string[]
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        tone === "success" ? "border-success/35 bg-success/5" : "border-border bg-surface-inset/55"
      }`}
    >
      <div className="flex items-center gap-2">
        {tone === "success" ? (
          <FileCheck2 className="h-5 w-5 text-success" aria-hidden="true" />
        ) : (
          <RefreshCcw className="h-5 w-5 text-primary" aria-hidden="true" />
        )}
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">{title}</h3>
      </div>
      <div className="mt-3 space-y-1.5">
        {steps.map((step, index) => (
          <div key={step}>
            <div className="rounded-md border border-border bg-background-elevated/65 px-3 py-2 text-center text-xs font-medium text-foreground-secondary sm:text-sm">
              {step}
            </div>
            {index < steps.length - 1 && (
              <ArrowDown className="mx-auto my-1 h-3.5 w-3.5 text-foreground-subtle" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AiResearchPipelineCaseStudy({ project }: { project: Project }) {
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
            <h1 className="mt-3 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-5xl text-base leading-7 text-foreground-secondary sm:text-lg">
              Designed and implemented a scheduled research pipeline that collects AI developments from RSS and API
              sources, normalizes them into a shared schema, filters and deduplicates records, uses Gemini for structured
              relevance analysis, and stores useful findings in a searchable Notion research library.
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Role", project.role],
                ["Status", "Implemented · Production workflow published"],
                ["Environment", "Local n8n via Docker + Cloud APIs"],
                ["Sources", "TechCrunch AI RSS · Product Hunt GraphQL API"],
                ["AI", "Google Gemini"],
                ["Destination", "Notion"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-surface-inset/70 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-primary">{label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-foreground-secondary">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-wrap gap-2" aria-label="Project technologies">
              {project.technologies.map((technology) => (
                <SkillTag key={technology}>{technology}</SkillTag>
              ))}
            </div>

            <p className="mt-6 border-l-2 border-primary pl-4 text-base font-medium leading-7 text-foreground sm:text-lg">
              Converted repetitive AI research into a scheduled, stateful pipeline that continuously discovers,
              evaluates, deduplicates, and organizes useful developments.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <CaseStudySection title="Project Overview">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="max-w-4xl space-y-3">
                <p>
                  Keeping up with AI developments means monitoring several sources, separating useful updates from noise,
                  avoiding repeated content, and organizing findings for later reference. Doing that manually quickly
                  becomes repetitive.
                </p>
                <p>
                  I built an n8n pipeline that collects new items, converts different source formats into one structure,
                  prioritizes what should be evaluated, uses Gemini for structured analysis, and stores relevant findings
                  in Notion.
                </p>
                <p>
                  The goal was a small reliable information system: aware of completed work, conservative with API quota,
                  resistant to duplicates, and capable of retrying after external-service failures.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-inset/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Implementation scope</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {scope.map((item) => (
                    <span key={item} className="rounded-md border border-border-strong bg-background-elevated/65 px-2.5 py-1.5 text-xs text-foreground-secondary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="manual-problem-title" className="rounded-xl border border-border bg-surface/65 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <h2 id="manual-problem-title" className="text-lg font-bold sm:text-xl">The Manual Problem</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>
                    A typical research session required checking multiple sources, opening individual posts, judging AI
                    relevance, writing summaries, and transferring notes into a database.
                  </p>
                  <p>
                    The automation therefore needed to solve more than aggregation. It had to decide what deserved AI
                    processing, what had already completed, and what should happen after partial failure.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {manualProblems.map(([title, detail], index) => (
                  <article
                    key={title}
                    className={`rounded-lg border border-border bg-surface-inset/70 p-4 ${index === manualProblems.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <p className="text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-foreground-subtle">{detail}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Design priorities</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {designObjectives.map(([title, detail]) => (
                  <article key={title} className="rounded-lg border border-border bg-background-elevated/45 p-3">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-foreground-subtle">{detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Solution Architecture" titleId="solution-architecture-title">
            <div className="mb-5 max-w-4xl space-y-3">
              <p>
                Source-specific work happens at the edge: TechCrunch enters through RSS, while Product Hunt is retrieved
                through GraphQL and pre-filtered for AI signals.
              </p>
              <p>
                After both sources are normalized and merged, every item follows the same state check, prioritization, AI
                analysis, duplicate protection, persistence, and terminal logging path.
              </p>
            </div>
            <AiResearchArchitectureDiagram />
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="pipeline-steps-title" className="overflow-hidden rounded-xl border border-border bg-surface/75">
            <div className="border-b border-border p-4 sm:p-6">
              <h2 id="pipeline-steps-title" className="text-lg font-bold sm:text-xl">How the Pipeline Works</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground-secondary">
                Five stages turn mixed source data into consistent, searchable research.
              </p>
            </div>
            <ol className="divide-y divide-border">
              {pipelineSteps.map((step, index) => (
                <li key={step.title} className="grid gap-2 p-4 sm:grid-cols-[7rem_1fr] sm:gap-4 sm:p-5">
                  <div>
                    <span className="text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, "0")} — {step.title.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="max-w-4xl text-sm leading-6 text-foreground-secondary sm:text-base">{step.detail}</p>
                    {index === 1 && (
                      <p className="mt-3 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-foreground">
                        Cheap deterministic filtering happens before expensive AI reasoning.
                      </p>
                    )}
                    {index === 2 && (
                      <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                        {sourceSchema.map((field) => (
                          <code key={field} className="rounded border border-border-strong bg-background-elevated/65 px-2 py-1 text-accent-soft">{field}</code>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="System in Action">
            <p className="mb-5 max-w-3xl">
              The native diagram explains the architecture; these screenshots show the published workflow and the data it produces.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <ProjectScreenshot
                src="/images/projects/ai-research-pipeline/ai-research-workflow-full.png"
                alt="Full n8n production workflow for the Multi-Source AI Research Pipeline"
                title="Full Workflow"
                caption="The production workflow orchestrates source ingestion, normalization, AI analysis, duplicate checks, and Notion persistence inside a single scheduled n8n pipeline."
                className="md:col-span-2"
                imageClassName="aspect-[16/8] sm:aspect-[1853/511]"
                sizes="(min-width: 768px) 90vw, 100vw"
              />
              <ProjectScreenshot
                src="/images/projects/ai-research-pipeline/ai-research-workflow-ingestion.png"
                alt="n8n ingestion workflow showing TechCrunch RSS and Product Hunt API normalization before merging"
                title="Source Ingestion Detail"
                caption="The ingestion layer merges TechCrunch AI RSS content with Product Hunt API results after source-specific filtering and normalization."
                className="md:col-span-2"
                imageClassName="aspect-[16/9] sm:aspect-[1478/624]"
                sizes="(min-width: 768px) 90vw, 100vw"
              />
              <ProjectScreenshot
                src="/images/projects/ai-research-pipeline/ai-research-library.png"
                alt="Notion AI Research Library containing structured findings from TechCrunch AI and Product Hunt"
                title="AI Research Library"
                caption="Relevant items are written to Notion with category, importance, summary, practical significance, intended audience, source, and publication date."
                imageClassName="aspect-[16/9] sm:aspect-[1906/896]"
              />
              <ProjectScreenshot
                src="/images/projects/ai-research-pipeline/ai-research-processing-log.png"
                alt="n8n processing log with irrelevant, already in Notion, and saved to Notion terminal statuses"
                title="Processing Log"
                caption="A separate log captures terminal outcomes such as irrelevant, already_in_notion, and saved_to_notion, providing persistent state and safe retries."
                imageClassName="aspect-[16/9] sm:aspect-[1898/875]"
              />
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="quota-title" className="rounded-xl border border-border bg-surface/65 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <h2 id="quota-title" className="text-lg font-bold sm:text-xl">Quota-Aware AI Processing</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>
                    Development used a relatively small Gemini free-tier request allowance, so quota became part of the
                    processing design rather than an afterthought.
                  </p>
                  <p>
                    Completed records are removed first. The remaining items are sorted newest to oldest, capped at five,
                    and processed individually with a delay and automatic retries for temporary failures.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Designed sequence</p>
                  <FlowSequence items={["Deduplicate", "Prioritize by freshness", "Limit to five", "Gemini analysis"]} />
                </div>
                <div className="rounded-lg border border-border bg-background-elevated/40 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground-subtle">Wasteful sequence avoided</p>
                  <FlowSequence items={["Gemini analysis", "Deduplicate later"]} muted />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="AI Analysis & Structured Output">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold text-foreground">Predictable AI response</h3>
                </div>
                <p className="mt-3">
                  Gemini evaluates each eligible item and returns a constrained structure rather than unrestricted prose.
                  Later nodes can route and store the response without interpreting free-form text.
                </p>
                <div className="mt-4 rounded-lg border border-border bg-background-elevated/75 p-4 font-mono text-xs leading-6">
                  <p className="text-foreground-subtle">{'{'}</p>
                  {analysisSchema.map(([field, type]) => (
                    <p key={field} className="pl-4">
                      <span className="text-accent-soft">&quot;{field}&quot;</span>: <span className="text-primary-hover">{type}</span>,
                    </p>
                  ))}
                  <p className="text-foreground-subtle">{'}'}</p>
                </div>
                <p className="mt-4 text-sm font-semibold text-foreground">Allowed categories</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-md border border-border-strong bg-surface-raised px-2 py-1 text-xs">{category}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Braces className="h-4 w-4 text-primary" aria-hidden="true" />
                  Canonical research record
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                  A transformation node merges the source metadata with Gemini’s response. This source-neutral record is
                  the contract used by both Notion and the processing log.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {canonicalRecord.map((field) => (
                    <code key={field} className="rounded bg-background-elevated/75 px-2 py-1.5 text-xs text-accent-soft">{field}</code>
                  ))}
                </div>
              </div>
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="State, Retry & Duplicate Protection">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-3">
                <p>
                  The workflow distinguishes between an item it has seen and one it has successfully finished processing.
                  A URL enters the persistent processing log only after a terminal outcome.
                </p>
                <div className="rounded-lg border border-border bg-surface-inset/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Completed outcomes</p>
                  <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                    {["irrelevant", "already_in_notion", "saved_to_notion"].map((status) => (
                      <span key={status} className="rounded border border-border-strong bg-background-elevated/70 px-2 py-1 text-accent-soft">{status}</span>
                    ))}
                  </div>
                </div>
                <p>
                  Irrelevant items are still completed work. Relevant items receive a second URL check inside Notion, so
                  the final library stays clean even if processing history and destination state ever diverge.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TerminalPath title="Completed" tone="success" steps={["New URL", "Gemini / Notion", "Terminal outcome", "Write processing log"]} />
                <TerminalPath title="Incomplete" tone="failure" steps={["New URL", "Gemini / Notion failure", "No terminal log", "Eligible for retry"]} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-primary/35 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold text-foreground">Layer 1 — Processing Log</h3>
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">Before Gemini: “Has this URL already completed?”</p>
                <p className="mt-2 text-sm text-foreground-secondary">Avoids repeated AI processing across scheduled runs.</p>
              </article>
              <article className="rounded-xl border border-accent/35 bg-accent/5 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent-secondary" aria-hidden="true" />
                  <h3 className="font-semibold text-foreground">Layer 2 — Notion</h3>
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">Before storage: “Does this URL already exist?”</p>
                <p className="mt-2 text-sm text-foreground-secondary">Protects destination integrity independently.</p>
              </article>
            </div>

            <blockquote className="mt-5 rounded-lg border border-primary/35 bg-primary/10 p-4 text-base font-medium leading-7 text-foreground">
              “Seen” and “successfully finished” are different workflow states. Preserving that distinction keeps failed work recoverable.
            </blockquote>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="metrics-title" className="rounded-xl border border-border bg-surface/70 p-4 sm:p-6">
            <h2 id="metrics-title" className="text-lg font-bold sm:text-xl">Metrics & Operational Value</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map(([value, label]) => (
                <div key={label} className="rounded-xl border border-border bg-surface-inset/70 p-4">
                  <dt className="text-3xl font-bold text-primary">{value}</dt>
                  <dd className="mt-2 text-sm leading-6 text-foreground-secondary">{label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {operationalOutcomes.map(([title, detail]) => (
                <article key={title} className="rounded-lg border border-border bg-background-elevated/45 p-4">
                  <div className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                      <p className="mt-1 text-xs leading-5 text-foreground-subtle">{detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Reflection & Lessons Learned">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p>
                  Connecting feeds and APIs to an LLM was straightforward. The more valuable work was deciding when an
                  item becomes complete, how different formats become interchangeable, where duplicate protection belongs,
                  and what should happen when processing stops halfway through.
                </p>
                <ul className="mt-4 space-y-3">
                  {lessons.map((lesson) => (
                    <li key={lesson} className="flex gap-3 text-sm leading-6 text-foreground-secondary sm:text-base">
                      <SearchCheck className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {lesson}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-l-2 border-primary pl-4 font-medium text-foreground">
                  Those decisions transformed a chain of integrations into a small, resilient information pipeline.
                </p>
              </div>
              <aside className="rounded-xl border border-border bg-surface-inset/70 p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold text-foreground">Next iteration</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {nextSteps.map((item) => (
                    <li key={item} className="rounded-lg border border-border bg-background-elevated/55 p-3 text-sm leading-6 text-foreground-secondary">{item}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-sm text-sm text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
