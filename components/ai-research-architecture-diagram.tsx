import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Braces,
  CalendarClock,
  Database,
  FileCheck2,
  Filter,
  GitMerge,
  ListOrdered,
  Network,
  Rss,
  ScrollText,
  ShieldCheck,
} from "lucide-react"

interface ArchitectureNodeProps {
  title: string
  detail?: string
  icon: LucideIcon
  emphasis?: "primary" | "accent" | "success"
}

function ArchitectureNode({ title, detail, icon: Icon, emphasis }: ArchitectureNodeProps) {
  const emphasisClasses =
    emphasis === "primary"
      ? "border-primary/40 bg-primary/10"
      : emphasis === "accent"
        ? "border-accent/40 bg-accent/10"
        : emphasis === "success"
          ? "border-success/40 bg-success/10"
          : "border-border bg-surface-inset/80"

  return (
    <div className={`rounded-lg border p-3 text-center sm:p-4 ${emphasisClasses}`}>
      <Icon className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
      <p className="mt-2 text-sm font-semibold text-foreground">{title}</p>
      {detail && <p className="mt-1 text-xs leading-5 text-foreground-subtle">{detail}</p>}
    </div>
  )
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-2 text-foreground-subtle" aria-hidden="true">
      {label && <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest">{label}</span>}
      <ArrowDown className="h-4 w-4" />
    </div>
  )
}

function ResponsiveFlowArrow() {
  return (
    <div className="flex shrink-0 items-center justify-center text-foreground-subtle" aria-hidden="true">
      <ArrowDown className="h-4 w-4 sm:hidden" />
      <ArrowRight className="hidden h-4 w-4 sm:block" />
    </div>
  )
}

function OutcomeLabel({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "muted" }) {
  return (
    <span
      className={
        tone === "primary"
          ? "mx-auto mb-2 inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-hover"
          : "mx-auto mb-2 inline-flex rounded-full border border-border-strong bg-surface-raised/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground-secondary"
      }
    >
      {children}
    </span>
  )
}

export function AiResearchArchitectureDiagram() {
  return (
    <figure aria-labelledby="ai-pipeline-diagram-title">
      <div className="overflow-hidden rounded-xl border border-border bg-background-elevated/55 p-3 sm:p-5 lg:p-7">
        <div className="mx-auto max-w-5xl">
          <p id="ai-pipeline-diagram-title" className="sr-only">
            Multi-source AI research pipeline architecture
          </p>

          <div className="mx-auto max-w-sm">
            <ArchitectureNode
              title="Scheduled Trigger"
              detail="Starts a controlled research run"
              icon={CalendarClock}
            />
          </div>
          <FlowArrow label="Starts both collectors" />

          <div className="rounded-xl border border-border bg-surface/70 p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground-secondary">
                Source-specific ingestion
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <ArchitectureNode title="TechCrunch AI" detail="RSS feed" icon={Rss} />
                <FlowArrow />
                <ArchitectureNode title="RSS Transformation" detail="Maps feed fields to the shared schema" icon={Braces} />
              </div>
              <div>
                <ArchitectureNode title="Product Hunt" detail="Authenticated GraphQL API" icon={Network} />
                <FlowArrow />
                <ArchitectureNode
                  title="AI Pre-Filter"
                  detail="Removes obviously unrelated products"
                  icon={Filter}
                  emphasis="primary"
                />
                <FlowArrow />
                <ArchitectureNode title="API Transformation" detail="Maps post fields to the shared schema" icon={Braces} />
              </div>
            </div>
          </div>

          <FlowArrow label="Shared schema" />
          <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ArchitectureNode title="Data Normalization" detail="One source-neutral research shape" icon={Braces} />
            </div>
            <ResponsiveFlowArrow />
            <div className="flex-1">
              <ArchitectureNode title="Merge Research Sources" detail="One downstream item stream" icon={GitMerge} />
            </div>
          </div>

          <FlowArrow />
          <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ArchitectureNode
                title="Persistent Processing Check"
                detail="Removes URLs with completed outcomes"
                icon={Database}
                emphasis="primary"
              />
            </div>
            <ResponsiveFlowArrow />
            <div className="flex-1">
              <ArchitectureNode title="Sort by Publication Date" detail="Newest eligible items first" icon={ListOrdered} />
            </div>
            <ResponsiveFlowArrow />
            <div className="flex-1">
              <ArchitectureNode title="Daily Processing Limit" detail="Maximum five items per run" icon={Filter} />
            </div>
          </div>

          <FlowArrow label="Fresh eligible work" />
          <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ArchitectureNode
                title="Gemini AI Analysis"
                detail="Structured relevance and research context"
                icon={Bot}
                emphasis="accent"
              />
            </div>
            <ResponsiveFlowArrow />
            <div className="flex-1">
              <ArchitectureNode
                title="Structured Research Record"
                detail="Metadata and AI output combined"
                icon={ScrollText}
              />
            </div>
          </div>

          <FlowArrow />
          <div className="mx-auto max-w-sm">
            <ArchitectureNode title="Relevant Research?" detail="Routes the terminal outcome" icon={ShieldCheck} />
          </div>
          <FlowArrow label="Outcome routing" />

          <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col rounded-xl border border-border bg-surface/70 p-3 sm:p-4">
              <OutcomeLabel tone="muted">No · Irrelevant</OutcomeLabel>
              <ArchitectureNode
                title="Processing Log"
                detail="Records the irrelevant terminal outcome"
                icon={FileCheck2}
                emphasis="success"
              />
            </div>

            <div className="rounded-xl border border-primary/25 bg-primary/5 p-3 sm:p-4">
              <OutcomeLabel>Yes · Relevant</OutcomeLabel>
              <ArchitectureNode
                title="Notion Duplicate Check"
                detail="Protects the destination independently"
                icon={ShieldCheck}
                emphasis="primary"
              />
              <FlowArrow label="Existing or new" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <OutcomeLabel tone="muted">Existing</OutcomeLabel>
                  <ArchitectureNode
                    title="Processing Log"
                    detail="Records already_in_notion"
                    icon={FileCheck2}
                    emphasis="success"
                  />
                </div>
                <div>
                  <OutcomeLabel>New</OutcomeLabel>
                  <ArchitectureNode title="Save to Notion" detail="Creates the research page" icon={Database} emphasis="accent" />
                  <FlowArrow />
                  <ArchitectureNode
                    title="Processing Log"
                    detail="Records saved_to_notion"
                    icon={FileCheck2}
                    emphasis="success"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-foreground-subtle">
        Source-specific collection is handled at the edge of the workflow. After normalization, every item follows the
        same processing, AI analysis, duplicate protection, and storage logic.
      </figcaption>
    </figure>
  )
}
