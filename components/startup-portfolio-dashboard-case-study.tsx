import Link from "next/link"
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { CaseStudySection } from "@/components/case-study-section"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { PortfolioHeader } from "@/components/portfolio-header"
import { PowerBiEmbed } from "@/components/power-bi-embed"
import { SkillTag } from "@/components/skill-tag"
import type { Project } from "@/lib/projects"

const challengeItems = [
  "The raw data was difficult to interpret in spreadsheet form.",
  "Financial, workforce, runway, outcome, and quality indicators needed clear definitions.",
  "Derived categories and measures had to remain responsive to filters.",
  "Financial values already stored in USD millions could easily be misinterpreted.",
  "Dashboard totals needed to be independently checked against the raw source.",
]

const approachSteps = [
  "Inspected the raw CSV and assigned appropriate data types.",
  "Cleaned and standardized fields in Power Query.",
  "Created derived categories such as runway-risk bands and acquisition-status groupings.",
  "Built reusable DAX measures for financial, workforce, outcome, and data-quality KPIs.",
  "Designed an interactive executive dashboard with Country, Domain, and Acquisition Status filters.",
  "Recalculated and audited the results against all 25,000 raw records.",
  "Refined labels and units to make the dashboard easier to interpret.",
]

const keyFindings = [
  ["25,000", "source records analyzed"],
  ["24,999", "distinct company IDs, with one duplicated ID"],
  ["≈ $1.491T", "total reported funding"],
  ["≈ $832.52B", "total reported annual recurring revenue"],
  ["12.19 months", "average runway"],
  ["≈ 57.57%", "of records in the High or Critical runway-risk groups"],
  ["14.91%", "portfolio-level layoff rate"],
  ["≈ 17.83%", "reached an exit event"],
  ["≈ 20.33%", "flagged under the implemented data-quality rules"],
]

const auditFindings = [
  "All primary KPI totals matched the raw data.",
  "Workforce values reconciled exactly: peak headcount minus layoffs equaled current headcount.",
  "One duplicated company ID was identified.",
  "Most flagged records were closed companies that still reported current employees.",
  "Missing AI-adoption values revealed an opportunity to broaden the data-quality rules.",
  "Financial values were converted or presented in clearer units to prevent confusion.",
]

const contributions = [
  "Inspected and cleaned the raw dataset.",
  "Created Power Query transformations and derived fields.",
  "Developed DAX measures and KPI definitions.",
  "Designed the dashboard layout and interaction model.",
  "Defined and reviewed data-quality checks.",
  "Independently recalculated the dashboard results against the raw CSV.",
  "Translated technical measures into plain business language.",
]

const whatWorked = [
  "The dashboard gives executives a fast overview while retaining interactive filtering.",
  "Grouped visuals create clear financial, workforce, risk, outcome, and quality narratives.",
  "Independent validation increased confidence in the displayed results.",
]

const improvements = [
  "Broaden the data-quality rules to account for missing categorical values.",
  "Add clearer KPI definitions and risk thresholds through tooltips.",
  "Consider a separate detailed analysis page for drill-down exploration.",
  "Use a larger or real-world dataset with documented source lineage in a future version.",
]

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function NumberedSteps({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface-inset/70 p-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {index + 1}
          </span>
          <span className="pt-0.5 text-sm leading-6">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function StartupPortfolioDashboardCaseStudy({ project }: { project: Project }) {
  const dashboardUrl = project.liveUrl ?? "#"

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
                ["Status", "Completed portfolio project"],
                ["Environment", "Power BI Desktop and Power BI Service"],
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
              Converted a complex raw dataset into a decision-oriented dashboard and independently verified every
              major KPI against the source data.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <CaseStudySection title="Project Overview">
            <div className="space-y-3">
              <p>
                The raw CSV contained 25,000 startup records and multiple financial, operational, workforce, and
                company-outcome fields. The goal was to transform it into an executive dashboard that communicates
                portfolio condition, performance, and risk clearly.
              </p>
              <p>
                This is a portfolio demonstration using a sample dataset and should not be interpreted as a real-world
                investment report.
              </p>
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <CaseStudySection title="The Challenge">
            <CheckList items={challengeItems} />
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <CaseStudySection title="My Approach">
            <NumberedSteps items={approachSteps} />
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={250}>
          <CaseStudySection title="Interactive Dashboard">
            <p>
              This demonstration report uses Power BI Publish to web, which makes the report publicly accessible. It
              contains sample portfolio data only and does not expose private credentials, workspace links, or private
              data.
            </p>
            <PowerBiEmbed
              src={dashboardUrl}
              title="Interactive Power BI startup portfolio executive dashboard"
            />
            <Link
              href={dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Open interactive dashboard in a new tab
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </Link>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <CaseStudySection title="Key Findings">
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {keyFindings.map(([value, label]) => (
                <div key={label} className="rounded-lg border border-border bg-surface-inset/70 p-4">
                  <dt className="text-xl font-bold text-primary">{value}</dt>
                  <dd className="mt-2 text-sm leading-6 text-foreground-secondary">{label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 rounded-lg border border-primary/25 bg-primary/5 p-4 text-sm">
              An exit event is not automatically a successful outcome because this calculation includes acquisitions,
              fire-sale acquisitions, and IPOs.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              The source stores financial values in USD millions. For clarity, 1,490,777.46 USD M is presented as
              approximately $1.491 trillion in total funding, while 832,522.26 USD M is presented as approximately
              $832.52 billion in annual recurring revenue.
            </p>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={350}>
          <CaseStudySection title="Data Validation and Quality Audit">
            <p className="mb-4">
              The final dashboard was cross-checked against the raw CSV across all 25,000 records.
            </p>
            <CheckList items={auditFindings} />
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={400}>
          <CaseStudySection title="My Contribution">
            <CheckList items={contributions} />
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={450}>
          <CaseStudySection title="What Worked and What I Would Improve">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-semibold text-foreground">What worked</h3>
                <div className="mt-3">
                  <CheckList items={whatWorked} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">What I would improve</h3>
                <ul className="mt-3 space-y-3">
                  {improvements.map((item) => (
                    <li key={item} className="rounded-lg border border-border bg-surface-inset/70 p-4 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={500}>
          <CaseStudySection title="Reflection">
            <blockquote className="border-l-2 border-primary pl-4 italic text-foreground-secondary">
              “This project strengthened my ability to move beyond creating charts and focus on the full analytical
              process: understanding the data, defining useful measures, validating the results, and communicating what
              the numbers actually mean.”
            </blockquote>
          </CaseStudySection>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={550}>
          <CaseStudySection title="Disclaimer" className="border-border/70 bg-surface/60">
            <p className="text-sm text-muted-foreground">
              This portfolio project uses a sample dataset for demonstration and learning purposes. The figures and
              findings should not be interpreted as investment advice or as a representation of a specific real-world
              startup portfolio.
            </p>
          </CaseStudySection>
        </AnimatedSection>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
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
