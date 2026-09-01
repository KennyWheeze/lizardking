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
} from "lucide-react"
import { AiResearchArchitectureDiagram } from "@/components/ai-research-architecture-diagram"
import { AnimatedSection } from "@/components/animated-section"
import { CaseStudySection } from "@/components/case-study-section"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { PortfolioHeader } from "@/components/portfolio-header"
import { SkillTag } from "@/components/skill-tag"
import { VisualPlaceholder } from "@/components/visual-placeholder"
import type { Project } from "@/lib/projects"

const manualProblems = [
  ["Different data formats", "RSS and GraphQL expose different field structures."],
  ["Repeated content", "Previously reviewed URLs can appear in later runs."],
  ["Limited AI quota", "Not every collected item deserves an LLM request."],
  ["Duplicate records", "Repeated writes reduce trust in the research library."],
  ["Failure recovery", "Incomplete work must remain eligible for a later retry."],
]

const designObjectives = [
  [
    "Multi-source ingestion",
    "Accept research items from fundamentally different sources without requiring separate downstream workflows.",
  ],
  ["Efficient AI usage", "Reduce unnecessary LLM requests by filtering and deduplicating before AI analysis."],
  ["Persistent state", "Remember which URLs had already reached a completed processing state across workflow executions."],
  ["Reliable storage", "Protect the final Notion research library from duplicate records."],
  ["Safe failure recovery", "Allow incomplete items to be processed again rather than incorrectly marking failed work as finished."],
]

const researchSchema = ["source", "source_type", "title", "url", "published_at", "author", "raw_excerpt"]

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

const notionFields = [
  "Title",
  "URL",
  "Source",
  "Source Type",
  "Published At",
  "Author",
  "Category",
  "Importance",
  "Summary",
  "Why It Matters",
  "Who It’s For",
]

const metrics = [
  ["2", "Live Research Sources"],
  ["2", "Duplicate Protection Layers"],
  ["3", "Tracked Terminal Outcomes"],
  ["5", "Maximum AI Evaluations per Scheduled Run"],
]

const technicalDecisions = [
  ["Normalize before shared processing", "Each source only handles source-specific transformation before entering a common pipeline."],
  ["Filter before using the LLM", "Deterministic logic handles cheap decisions before AI reasoning."],
  ["Track completed work instead of merely seen work", "Persistent state is written only after a terminal outcome."],
  ["Check the destination independently", "Processing history and destination integrity are separate safeguards."],
  ["Sort before applying the limit", "Recency determines priority across the merged source stream."],
  ["Use structured AI output", "Gemini acts as a predictable automation component instead of an uncontrolled text generator."],
]

const contributions = [
  "Multi-source ingestion architecture",
  "Product Hunt GraphQL integration and authentication",
  "RSS ingestion",
  "Source normalization",
  "AI relevance filtering and classification",
  "Structured LLM output design",
  "Persistent processing-state management",
  "Pre-AI and storage-level duplicate protection",
  "Quota-aware batching and prioritization",
  "Notion database integration",
  "Terminal-state logging",
  "Failure and retry behavior",
  "Scheduled production deployment",
  "Development and rollback workflow design",
]

const outcomes = [
  ["Ingest from multiple source types", "RSS and authenticated APIs can enter the same downstream pipeline."],
  ["Reduce repetitive research work", "New developments are collected automatically instead of requiring manual source checking."],
  ["Prioritize limited processing capacity", "Only the freshest eligible records reach the AI layer."],
  ["Produce consistent research summaries", "Every saved item follows the same structured format."],
  ["Avoid repeated AI analysis", "Completed URLs are remembered across executions."],
  ["Protect the research database", "A second duplicate check prevents repeated Notion records."],
  ["Recover from incomplete processing", "Failed items remain eligible because they are not logged prematurely."],
  ["Remain extensible", "Additional research sources can be integrated by converting them into the existing normalized schema."],
]

const screenshots = [
  [
    "Production Workflow",
    "Final n8n production workflow showing multi-source ingestion, shared processing, Gemini analysis, Notion validation, and terminal logging.",
  ],
  [
    "Multi-Source Ingestion",
    "TechCrunch RSS and Product Hunt GraphQL data are handled independently until both sources are converted into the same normalized research schema.",
  ],
  [
    "AI Research Library",
    "Relevant findings are stored as structured Notion records with source metadata, category, importance, summary, practical significance, and intended audience.",
  ],
  [
    "Persistent Processing State",
    "A dedicated processing log records completed URLs and their terminal status, preventing repeated AI analysis while preserving retry behavior for incomplete executions.",
  ],
]

const reflectionQuestions = [
  "When should an item be considered complete?",
  "What happens if processing fails halfway through?",
  "Where should duplicate prevention occur?",
  "How should different source formats become interchangeable?",
  "Which operations actually require AI?",
  "How should limited API capacity affect the architecture?",
]

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 rounded-lg border border-border bg-surface-inset/70 p-3 text-sm leading-6">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

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
      className={`rounded-xl border p-4 sm:p-5 ${
        tone === "success" ? "border-success/35 bg-success/5" : "border-border bg-surface-inset/55"
      }`}
    >
      <div className="flex items-center gap-2">
        {tone === "success" ? (
          <FileCheck2 className="h-5 w-5 text-success" aria-hidden="true" />
        ) : (
          <RefreshCcw className="h-5 w-5 text-primary" aria-hidden="true" />
        )}
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">{title}</h3>
      </div>
      <div className="mt-4 space-y-2">
        {steps.map((step, index) => (
          <div key={step}>
            <div className="rounded-md border border-border bg-background-elevated/65 px-3 py-2 text-center text-sm font-medium text-foreground-secondary">
              {step}
            </div>
            {index < steps.length - 1 && <ArrowDown className="mx-auto my-1.5 h-4 w-4 text-foreground-subtle" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenshotPlaceholder({ label, description }: { label: string; description: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface-inset/55">
      <VisualPlaceholder label={`${label} · Screenshot placeholder`} description={`Add the final ${label.toLowerCase()} screenshot here.`} />
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-6 text-foreground-secondary">
        {description}
      </figcaption>
    </figure>
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
              Converted a repetitive AI research process into a scheduled, stateful pipeline that continuously discovers,
              evaluates, deduplicates, and organizes relevant developments with minimal manual processing.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <CaseStudySection title="Project Overview">
            <div className="max-w-4xl space-y-3">
              <p>
                Keeping up with developments in AI means monitoring several sources, separating meaningful updates from
                noise, avoiding repeated content, and organizing anything useful for later reference.
              </p>
              <p>Doing this manually quickly becomes repetitive.</p>
              <p>
                I built a multi-source research pipeline in n8n that automatically collects new items from different
                sources, converts them into a consistent structure, prioritizes what should be evaluated, uses an LLM to
                perform structured analysis, and stores useful findings in Notion.
              </p>
              <p>
                The goal was not simply to automate content collection. I wanted the workflow to behave like a small
                reliable information system: aware of what it had already processed, conservative with limited API
                resources, resistant to duplicate records, and capable of retrying work after failures.
              </p>
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="manual-problem-title" className="rounded-xl border border-border bg-surface/65 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <h2 id="manual-problem-title" className="text-lg font-bold sm:text-xl">The Manual Problem</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>
                    A typical research session involved repeatedly checking technology sources, opening individual posts,
                    deciding whether they were actually relevant to AI, summarizing useful developments, and manually
                    transferring notes into a research database.
                  </p>
                  <p>
                    Different sources presented information in different formats. Previously reviewed items could be
                    encountered again. Not every product or technology article was actually useful. Sending everything
                    through an AI model would waste API quota. And a failed automation could result in either lost research
                    items or duplicate database entries.
                  </p>
                  <p>The system therefore needed to solve more than simple content aggregation.</p>
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
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Design Objectives">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {designObjectives.map(([title, detail], index) => (
                <article key={title} className="rounded-lg border border-border bg-surface-inset/70 p-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-foreground-subtle">{detail}</p>
                </article>
              ))}
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Solution Architecture" titleId="solution-architecture-title">
            <div className="mb-5 max-w-4xl space-y-3">
              <p>The system separates source-specific ingestion from a shared downstream research pipeline.</p>
              <p>
                TechCrunch enters through RSS, while Product Hunt is retrieved through its GraphQL API. Each source is
                normalized into the same research schema before both streams are merged.
              </p>
              <p>
                From that point onward, the workflow no longer needs to know where an item originally came from.
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
                Source-specific work happens first. Every later decision is made against the same normalized record.
              </p>
            </div>
            <ol className="divide-y divide-border">
              <li className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[8rem_1fr]">
                <div><span className="text-xs font-bold text-primary">01 — COLLECT</span></div>
                <div className="max-w-4xl space-y-2 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>A scheduled n8n workflow retrieves technology updates from two independent sources.</p>
                  <p>TechCrunch AI content is collected through RSS.</p>
                  <p>Product Hunt posts are retrieved through its GraphQL API using authenticated HTTP requests.</p>
                  <p>This allows the workflow to combine conventional feeds with API-based data sources inside the same system.</p>
                </div>
              </li>
              <li className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[8rem_1fr]">
                <div><span className="text-xs font-bold text-primary">02 — PRE-FILTER</span></div>
                <div className="max-w-4xl space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>Product Hunt contains many useful software launches, but not every product is related to AI.</p>
                  <p>
                    Before spending an LLM request, a lightweight keyword filter examines product names, taglines,
                    descriptions, and topics for signals related to AI, machine learning, agents, automation, generative
                    media, coding assistants, and similar capabilities. Obviously unrelated products are removed here.
                  </p>
                  <p className="rounded-lg border border-primary/30 bg-primary/10 p-3 font-medium text-foreground">
                    Cheap deterministic filtering happens before expensive AI reasoning.
                  </p>
                </div>
              </li>
              <li className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[8rem_1fr]">
                <div><span className="text-xs font-bold text-primary">03 — NORMALIZE</span></div>
                <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                  <div className="space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                    <p>RSS and GraphQL responses have different structures. Both are converted to one schema.</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-lg border border-border bg-surface-inset/70 p-3">
                        <p className="font-semibold text-foreground">TechCrunch AI</p>
                        <p className="mt-1 text-xs text-foreground-subtle">Source Type → RSS</p>
                      </div>
                      <div className="rounded-lg border border-border bg-surface-inset/70 p-3">
                        <p className="font-semibold text-foreground">Product Hunt</p>
                        <p className="mt-1 text-xs text-foreground-subtle">Source Type → API</p>
                      </div>
                    </div>
                    <p>This normalization boundary is what allows the rest of the workflow to remain source-independent.</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background-elevated/70 p-4 font-mono text-xs leading-6 text-accent-soft">
                    {researchSchema.map((field) => <div key={field}>{field}</div>)}
                  </div>
                </div>
              </li>
              <li className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[8rem_1fr]">
                <div><span className="text-xs font-bold text-primary">04 — PRIORITIZE</span></div>
                <div className="max-w-4xl">
                  <FlowSequence items={["Remove completed URLs", "Sort newest → oldest", "Take the first five"]} />
                </div>
              </li>
              <li className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[8rem_1fr]">
                <div><span className="text-xs font-bold text-primary">05 — ANALYZE & STORE</span></div>
                <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
                  Gemini creates structured analysis. Irrelevant items are logged, while relevant items are checked
                  against Notion and only genuinely new findings are created. Each path writes its completed terminal
                  outcome to the processing log.
                </p>
              </li>
            </ol>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Persistent State & Deduplication">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-3">
                <p>A major design problem was determining when an item should be considered processed.</p>
                <p>Simply remembering every URL the workflow had seen was not sufficient.</p>
                <p>
                  If Gemini or Notion failed after the URL was marked as seen, the research item could disappear
                  permanently without ever reaching a successful outcome.
                </p>
                <p>
                  Instead, I created a persistent n8n Data Table called the <strong className="text-foreground">AI Research Processing Log</strong>.
                  Before AI analysis, every incoming URL is checked against this table. Previously completed items are
                  removed immediately. New items continue.
                </p>
                <div className="rounded-lg border border-border bg-surface-inset/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Terminal outcomes</p>
                  <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                    {['irrelevant', 'already_in_notion', 'saved_to_notion'].map((status) => (
                      <span key={status} className="rounded border border-border-strong bg-background-elevated/70 px-2 py-1 text-accent-soft">{status}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TerminalPath title="Success" tone="success" steps={["New URL", "Gemini", "Terminal Outcome", "Write Processing Log"]} />
                <TerminalPath title="Failure" tone="failure" steps={["New URL", "Gemini / Notion Failure", "No Terminal Log Written", "Eligible for Future Retry"]} />
              </div>
            </div>
            <blockquote className="mt-6 rounded-lg border border-primary/35 bg-primary/10 p-4 text-base font-medium leading-7 text-foreground sm:p-5 sm:text-lg">
              “The workflow distinguishes between ‘I have seen this item’ and ‘I have successfully finished processing this item.’”
              <footer className="mt-2 text-sm font-normal text-foreground-secondary">That distinction prevents failed work from being silently lost.</footer>
            </blockquote>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="quota-title" className="rounded-xl border border-border bg-surface/65 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h2 id="quota-title" className="text-lg font-bold sm:text-xl">Quota-Aware AI Processing</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>The Gemini API used during development had relatively small free-tier request limits.</p>
                  <p>Rather than designing around unlimited API capacity, I treated quota as an architectural constraint.</p>
                  <p>
                    After previously completed records are removed, the remaining research items are sorted from newest to
                    oldest. Only the first five new items per run continue to Gemini.
                  </p>
                  <p>The AI node processes them individually with a delay between requests and automatic retry behavior for temporary failures.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Designed sequence</p>
                  <FlowSequence items={["Deduplicate", "Prioritize by freshness", "Limit", "AI analysis"]} />
                </div>
                <div className="rounded-lg border border-border bg-background-elevated/40 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-foreground-subtle">Wasteful sequence avoided</p>
                  <FlowSequence items={["AI analysis", "Deduplicate later"]} muted />
                </div>
                <p className="border-l-2 border-primary pl-4 text-sm font-medium leading-6 text-foreground">
                  This means scarce AI requests are reserved for the freshest unprocessed research.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <AnimatedSection animation="fade-up" className="h-full">
            <CaseStudySection title="Structured LLM Analysis" className="h-full">
              <p>Gemini does not return unrestricted prose. It produces a predictable result for downstream automation.</p>
              <div className="mt-4 rounded-lg border border-border bg-background-elevated/75 p-4 font-mono text-xs leading-6">
                <p className="text-foreground-subtle">{'{'}</p>
                {analysisSchema.map(([field, type]) => (
                  <p key={field} className="pl-4"><span className="text-accent-soft">&quot;{field}&quot;</span>: <span className="text-primary-hover">{type}</span>,</p>
                ))}
                <p className="text-foreground-subtle">{'}'}</p>
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">Allowed categories</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((category) => <span key={category} className="rounded-md border border-border-strong bg-surface-raised px-2 py-1 text-xs">{category}</span>)}
              </div>
              <p className="mt-4">The structured output makes the result usable by later automation nodes instead of leaving the workflow to interpret free-form AI text.</p>
            </CaseStudySection>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" className="h-full">
            <CaseStudySection title="Canonical Research Record" className="h-full">
              <p>
                After Gemini completes its analysis, the original research metadata and the AI response are merged. A
                dedicated transformation node creates the final source-neutral research object.
              </p>
              <div className="my-4 rounded-lg border border-primary/25 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Braces className="h-4 w-4 text-primary" aria-hidden="true" />
                  Source-neutral contract
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {canonicalRecord.map((field) => <code key={field} className="rounded bg-background-elevated/75 px-2 py-1 text-xs text-accent-soft">{field}</code>)}
                </div>
              </div>
              <p>
                This acts as a contract between the AI portion of the workflow and everything downstream. Notion and the
                logging system operate only on this standardized representation.
              </p>
            </CaseStudySection>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Two Layers of Duplicate Protection">
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-primary/35 bg-primary/5 p-4 sm:p-5">
                <div className="flex items-center gap-2"><Filter className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="font-semibold text-foreground">Layer 1 — Processing Log</h3></div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">Before Gemini</p>
                <p className="mt-1 text-base font-medium text-foreground">“Has this URL already completed?”</p>
                <p className="mt-4 text-sm"><strong className="text-foreground">Purpose:</strong> Avoid repeated AI processing.</p>
              </article>
              <article className="rounded-xl border border-accent/35 bg-accent/5 p-4 sm:p-5">
                <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-accent-secondary" aria-hidden="true" /><h3 className="font-semibold text-foreground">Layer 2 — Notion</h3></div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent-secondary">Before creating a page</p>
                <p className="mt-1 text-base font-medium text-foreground">“Does this URL already exist in the final research database?”</p>
                <p className="mt-4 text-sm"><strong className="text-foreground">Purpose:</strong> Protect destination data integrity.</p>
              </article>
            </div>
            <p className="mt-5 max-w-4xl">
              The processing log improves efficiency. The Notion lookup protects data integrity. They solve different
              problems and are intentionally kept as separate safeguards.
            </p>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="notion-title" className="rounded-xl border border-border bg-surface/70 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2"><Database className="h-5 w-5 text-primary" aria-hidden="true" /><h2 id="notion-title" className="text-lg font-bold sm:text-xl">Notion Research Library</h2></div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>Only relevant and genuinely new research reaches the final Notion database.</p>
                  <p>
                    Notion provides the human-facing layer of the system. Instead of receiving a raw list of links, I get
                    a searchable research library containing concise context on what happened, why it matters, and who may
                    benefit from it.
                  </p>
                  <p>Separate database views can surface the full research library or focus attention on high-priority findings.</p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface-inset/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Saved fields</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {notionFields.map((field) => <span key={field} className="rounded-md border border-border bg-background-elevated/60 px-2 py-2 text-xs text-foreground-secondary">{field}</span>)}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="metrics-title">
            <h2 id="metrics-title" className="px-1 text-lg font-bold sm:text-xl">Project Metrics</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map(([value, label]) => (
                <div key={label} className="rounded-xl border border-border bg-surface/75 p-5">
                  <dt className="text-3xl font-bold text-primary sm:text-4xl">{value}</dt>
                  <dd className="mt-2 text-sm leading-6 text-foreground-secondary">{label}</dd>
                </div>
              ))}
            </dl>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Key Technical Decisions">
            <div className="grid gap-3 md:grid-cols-2">
              {technicalDecisions.map(([title, detail], index) => (
                <details key={title} className="group rounded-lg border border-border bg-surface-inset/70 open:border-primary/30 open:bg-primary/5">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4 font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                    <span className="text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{title}</span>
                    <span className="text-primary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="px-4 pb-4 pl-12 text-sm leading-6 text-foreground-subtle">{detail}</p>
                </details>
              ))}
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <section aria-labelledby="production-title" className="rounded-xl border border-border bg-surface/65 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <h2 id="production-title" className="text-lg font-bold sm:text-xl">Development to Production</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                  <p>I maintained separate workflow versions while extending the system.</p>
                  <p>
                    The previous working version was retained as a rollback copy during deployment. This was intentionally
                    lightweight rather than a full CI/CD process, but it prevented experimental changes from being made
                    directly against the scheduled production workflow.
                  </p>
                </div>
              </div>
              <FlowSequence items={["Development", "Controlled Testing", "Production Candidate", "Configuration Audit", "Production"]} />
            </div>
          </section>
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedSection animation="fade-up" className="h-full">
            <CaseStudySection title="My Contribution" className="h-full">
              <p className="mb-4">I designed and implemented:</p>
              <CheckList items={contributions} />
              <p className="mt-4">The project was built iteratively, with individual components tested before being introduced into the production path.</p>
            </CaseStudySection>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" className="h-full">
            <section aria-labelledby="outcomes-title" className="h-full rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-6">
              <h2 id="outcomes-title" className="text-lg font-bold sm:text-xl">Outcome & Operational Value</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {outcomes.map(([title, detail]) => (
                  <article key={title} className="rounded-lg border border-border bg-surface/75 p-4">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-foreground-subtle">{detail}</p>
                  </article>
                ))}
              </div>
            </section>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Selected Screenshots">
            <p className="mb-5 max-w-3xl">
              The implementation evidence will be added here when the final sanitized screenshots are ready. These
              placeholders do not reference missing image files.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {screenshots.map(([label, description]) => <ScreenshotPlaceholder key={label} label={label} description={description} />)}
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <AnimatedSection animation="fade-up" className="h-full">
            <section aria-labelledby="worked-title" className="h-full rounded-xl border border-success/25 bg-success/5 p-4 sm:p-6">
              <h2 id="worked-title" className="text-lg font-bold sm:text-xl">What Worked Well</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                <p>The most successful design decision was separating source ingestion from shared processing.</p>
                <p>
                  Once both sources reach the normalized schema, downstream nodes no longer care whether an item came
                  from RSS or an API. That significantly simplifies the architecture and provides a clear path for adding future sources.
                </p>
                <p>
                  Persistent terminal-state logging also improved the workflow substantially. It solved both unnecessary
                  reprocessing and the risk of permanently skipping records after failed executions.
                </p>
                <p>Finally, treating API quota as part of the design rather than an afterthought resulted in a more deliberate processing sequence.</p>
              </div>
            </section>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" className="h-full">
            <section aria-labelledby="improve-title" className="h-full rounded-xl border border-border bg-surface/70 p-4 sm:p-6">
              <h2 id="improve-title" className="text-lg font-bold sm:text-xl">What I Would Improve</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
                <p>The current system is intentionally lightweight and still has room to evolve.</p>
                <p>A future version could introduce richer observability, including daily counts for fetched, filtered, analyzed, relevant, rejected, duplicated, and failed items.</p>
                <p>Additional source-specific filters could reduce unnecessary LLM requests further.</p>
                <p>The pipeline could also use more sophisticated ranking than publication time alone by combining freshness, predicted relevance, source quality, and historical importance.</p>
                <p>For a continuously hosted deployment, I would move the local n8n instance to persistent infrastructure so scheduled workflows are no longer dependent on the local machine being available.</p>
              </div>
            </section>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="fade-up">
          <CaseStudySection title="Reflection">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-3">
                <p>This project started as a way to automate AI research, but the more valuable learning came from designing the system around the realities of automation.</p>
                <p>Connecting an RSS feed or API to an LLM was relatively straightforward.</p>
                <p>Answering the harder questions transformed the workflow from a chain of integrations into a small stateful information pipeline.</p>
                <p>
                  The project strengthened my understanding of workflow orchestration, API integration, structured LLM
                  use, state management, error recovery, data normalization, and production-minded automation design.
                </p>
              </div>
              <blockquote className="rounded-xl border border-primary/35 bg-primary/10 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">The harder questions</p>
                <ul className="mt-4 space-y-3">
                  {reflectionQuestions.map((question) => (
                    <li key={question} className="flex gap-3 text-sm font-medium leading-6 text-foreground">
                      <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {question}
                    </li>
                  ))}
                </ul>
              </blockquote>
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
