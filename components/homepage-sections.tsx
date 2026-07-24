import { ArrowRight, FileText } from "lucide-react"

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
