import type { LucideIcon } from "lucide-react"
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  ClipboardList,
  Code2,
  Database,
  GitBranch,
  GitMerge,
  Globe2,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Workflow,
} from "lucide-react"

interface FlowNodeProps {
  icon: LucideIcon
  category: string
  title: string
  description: string
  emphasis?: "default" | "automation" | "output"
}

function FlowNode({ icon: Icon, category, title, description, emphasis = "default" }: FlowNodeProps) {
  const emphasisClass = {
    default: "border-border-strong/70 bg-surface/75",
    automation: "border-primary/30 bg-primary/[0.045]",
    output: "border-primary/40 bg-primary/[0.075] shadow-[0_0_18px_hsl(var(--primary)/0.06)]",
  }[emphasis]

  return (
    <article className={`min-w-0 rounded-lg border border-l-2 border-l-primary/65 p-3 ${emphasisClass}`}>
      <div className="flex min-w-0 items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary"
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase leading-4 tracking-[0.12em] text-primary">
            {category}
          </p>
          <h4 className="mt-0.5 text-sm font-semibold leading-5 text-foreground">{title}</h4>
        </div>
      </div>
      <p className="mt-2 text-[0.8rem] leading-5 text-foreground-secondary sm:text-[0.82rem]">{description}</p>
    </article>
  )
}

function StepConnector({ horizontalAtTablet = false }: { horizontalAtTablet?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center ${
        horizontalAtTablet ? "h-8 md:h-auto md:w-8 lg:h-8 lg:w-auto" : "h-8"
      }`}
    >
      <div className={horizontalAtTablet ? "flex flex-col items-center md:hidden lg:flex" : "flex flex-col items-center"}>
        <span className="h-2 w-px bg-border-strong" />
        <ArrowDown className="h-3.5 w-3.5 text-primary/80" />
        <span className="h-2 w-px bg-border-strong" />
      </div>
      {horizontalAtTablet && (
        <div className="hidden items-center md:flex lg:hidden">
          <span className="h-px w-2 bg-border-strong" />
          <ArrowRight className="h-3.5 w-3.5 text-primary/80" />
          <span className="h-px w-2 bg-border-strong" />
        </div>
      )}
    </div>
  )
}

function StageConnector({ tabletDirection }: { tabletDirection: "horizontal" | "vertical" }) {
  const horizontalAtTablet = tabletDirection === "horizontal"

  return (
    <div aria-hidden="true" className="flex min-h-8 min-w-0 items-center justify-center">
      <div
        className={`flex flex-col items-center ${
          horizontalAtTablet ? "md:hidden" : "lg:hidden"
        }`}
      >
        <span className="h-3 w-px bg-border-strong" />
        <ArrowDown className="h-4 w-4 text-primary" />
        <span className="h-3 w-px bg-border-strong" />
      </div>
      <div
        className={`hidden items-center ${
          horizontalAtTablet ? "md:flex" : "lg:flex"
        }`}
      >
        <span className="h-px w-2 bg-border-strong" />
        <ArrowRight className="h-4 w-4 text-primary" />
        <span className="h-px w-2 bg-border-strong" />
      </div>
    </div>
  )
}

function StageHeader({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <header className="mb-3 flex items-center gap-3 border-b border-border pb-3">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-xs font-bold text-primary"
      >
        {number}
      </span>
      <div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-foreground-subtle">Stage {number}</p>
        <h3 id={id} className="text-sm font-bold leading-5 text-foreground sm:text-base">
          {title}
        </h3>
      </div>
    </header>
  )
}

function BranchDiagram() {
  return (
    <>
      <div className="rounded-lg border border-primary/45 bg-primary/[0.07] p-3 text-center shadow-[0_0_20px_hsl(var(--primary)/0.05)]">
        <GitBranch aria-hidden="true" className="mx-auto h-5 w-5 text-primary" />
        <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary">Decision</p>
        <h4 className="mt-1 text-sm font-semibold leading-5 text-foreground">
          Does the learner account already exist?
        </h4>
      </div>

      <svg
        aria-hidden="true"
        className="h-7 w-full text-primary/65"
        viewBox="0 0 100 28"
        preserveAspectRatio="none"
      >
        <path
          d="M50 0 V9 H25 V28 M50 9 H75 V28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="grid min-w-0 grid-cols-2 gap-2" role="group" aria-label="Account decision paths">
        <article className="min-w-0 rounded-lg border border-border-strong/70 bg-surface/75 p-2.5 sm:p-3">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-primary">
            Yes
          </span>
          <UserCheck aria-hidden="true" className="mt-2 h-4 w-4 text-primary" />
          <h4 className="mt-1.5 break-words text-[0.8rem] font-semibold leading-5 text-foreground sm:text-sm">
            Reuse existing account
          </h4>
        </article>
        <article className="min-w-0 rounded-lg border border-primary/30 bg-primary/[0.045] p-2.5 sm:p-3">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-primary">
            No
          </span>
          <UserPlus aria-hidden="true" className="mt-2 h-4 w-4 text-primary" />
          <h4 className="mt-1.5 break-words text-[0.8rem] font-semibold leading-5 text-foreground sm:text-sm">
            Create WordPress subscriber account
          </h4>
        </article>
      </div>

      <svg
        aria-hidden="true"
        className="h-7 w-full text-primary/65"
        viewBox="0 0 100 28"
        preserveAspectRatio="none"
      >
        <path
          d="M25 0 V12 H50 M75 0 V12 H50 V28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <FlowNode
        icon={GitMerge}
        category="Converged path"
        title="Resolved learner account"
        description="Both paths continue with one learner account ready for enrollment."
        emphasis="automation"
      />
    </>
  )
}

export function LmsArchitectureDiagram() {
  return (
    <figure
      aria-labelledby="solution-architecture-title"
      className="min-w-0 overflow-hidden rounded-xl border border-border-strong/70 bg-background-elevated/45 p-3 shadow-[0_14px_40px_hsl(var(--background)/0.22)] sm:p-4"
    >
      <div className="mb-3 flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/[0.045] p-3">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs leading-5 text-foreground-secondary sm:text-sm">
          <span className="font-semibold text-foreground">Human checkpoint:</span> Payment and enrollment readiness are
          verified before submission; this workflow does not process payment.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-[minmax(0,0.85fr)_2rem_minmax(0,1.15fr)] lg:grid-cols-[minmax(0,0.9fr)_2rem_minmax(0,1.2fr)_2rem_minmax(0,0.95fr)] lg:gap-2 xl:gap-3">
        <section
          aria-labelledby="architecture-stage-intake"
          className="min-w-0 rounded-lg border border-border-strong/70 bg-surface-inset/55 p-3 md:col-start-1 md:row-start-1"
        >
          <StageHeader number="1" title="Request Intake" id="architecture-stage-intake" />
          <FlowNode
            icon={UserCheck}
            category="Human action"
            title="Authorized Staff"
            description="Confirms payment and enrollment readiness, then submits one controlled request."
          />
          <StepConnector />
          <FlowNode
            icon={ClipboardList}
            category="Data collection"
            title="Google Form"
            description="Collects the learner name, email, and selected-course information."
          />
          <StepConnector />
          <FlowNode
            icon={Database}
            category="Request record"
            title="Google Sheets"
            description="Records the timestamp and submitted fields, then supplies structured automation data."
          />
        </section>

        <div className="md:col-start-2 md:row-start-1">
          <StageConnector tabletDirection="horizontal" />
        </div>

        <section
          aria-labelledby="architecture-stage-provisioning"
          className="min-w-0 rounded-lg border border-primary/25 bg-surface-inset/65 p-3 md:col-start-3 md:row-start-1"
        >
          <StageHeader number="2" title="Account Provisioning" id="architecture-stage-provisioning" />
          <FlowNode
            icon={Code2}
            category="Automation"
            title="Apps Script"
            description="Validates the submission, extracts the LearnDash course ID, and uses email as the lookup key."
            emphasis="automation"
          />
          <StepConnector />
          <FlowNode
            icon={Globe2}
            category="Account check"
            title="WordPress REST API"
            description="Checks whether the learner email belongs to an existing WordPress account."
            emphasis="automation"
          />
          <StepConnector />
          <BranchDiagram />
        </section>

        <div className="md:col-span-3 md:col-start-1 md:row-start-2 lg:col-span-1 lg:col-start-4 lg:row-start-1">
          <StageConnector tabletDirection="vertical" />
        </div>

        <section
          aria-labelledby="architecture-stage-enrollment"
          className="min-w-0 rounded-lg border border-border-strong/70 bg-surface-inset/55 p-3 md:col-span-3 md:col-start-1 md:row-start-3 lg:col-span-1 lg:col-start-5 lg:row-start-1"
        >
          <StageHeader number="3" title="Enrollment & Confirmation" id="architecture-stage-enrollment" />
          <div className="grid min-w-0 grid-cols-1 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)] lg:grid-cols-1">
            <FlowNode
              icon={Workflow}
              category="Integration"
              title="Zapier"
              description="Continues the connected workflow with validated learner and course information."
              emphasis="automation"
            />
            <StepConnector horizontalAtTablet />
            <FlowNode
              icon={GraduationCap}
              category="Enrollment result"
              title="LearnDash"
              description="Assigns the correct course to the resolved learner account."
              emphasis="output"
            />
            <StepConnector horizontalAtTablet />
            <FlowNode
              icon={BellRing}
              category="Notification"
              title="Confirmation"
              description="Sends learner access guidance and administrator confirmation, closing the loop."
              emphasis="output"
            />
          </div>
        </section>
      </div>

      <figcaption className="mt-3 flex items-start gap-2 border-t border-border pt-3 text-xs leading-5 text-foreground-subtle">
        <LockKeyhole aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Sanitized workflow: credentials, private endpoints, authentication details, and learner information are
        intentionally excluded.
      </figcaption>
    </figure>
  )
}
