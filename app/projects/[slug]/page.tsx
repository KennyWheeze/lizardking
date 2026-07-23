import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SkillTag } from "@/components/skill-tag"
import { getProjectBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { AnimatedSection } from "@/components/animated-section"
import { PortfolioHeader } from "@/components/portfolio-header"
import { LmsAutomationCaseStudy } from "@/components/lms-automation-case-study"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.title} | Ken Macawili`,
    description: project.shortDescription,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)
  const desiredPerformanceFlow = [
    "Inquiry Response",
    "Lead Qualification",
    "Service Matching",
    "Value Communication",
    "Objection Handling",
    "Proposal Support",
    "Follow-Up",
    "Closing / Lost Reason",
  ]
  const selectedArtifacts = [
    {
      title: "Diagnostic Toolkit",
      description:
        "A structured performance analysis tool used to identify whether sales conversion issues are caused by knowledge, skill, process, accountability, or market/offer gaps.",
      includes:
        "Includes: diagnostic framework, data collection plan, interview questions, observation checklist, lost inquiry review categories, gap classification, and solution mapping.",
      status: "Completed",
      links: [
        {
          label: "View Portfolio Summary",
          href: "/artifacts/sales-enablement/sales-performance-diagnostic-toolkit-summary.pdf",
          icon: "view",
        },
        {
          label: "Download Full Toolkit",
          href: "/artifacts/sales-enablement/sales-performance-diagnostic-toolkit-full.pdf",
          icon: "download",
          download: true,
        },
      ],
    },
    {
      title: "Gap Analysis Matrix",
      description:
        "A structured analysis tool used to organize interview findings, classify root causes, determine whether training alone can solve the issue, and map each gap to the appropriate solution direction.",
      includes:
        "Includes: interview-based findings, gap categories, root causes, training decision checks, priority levels, and recommended solution directions.",
      status: "Completed",
      links: [
        {
          label: "View Matrix Summary",
          href: "/artifacts/sales-enablement/gap-analysis-matrix-summary.pdf",
          icon: "view",
        },
        {
          label: "Download Full Matrix",
          href: "/artifacts/sales-enablement/gap-analysis-matrix-full.xlsx",
          icon: "download",
          download: true,
        },
      ],
    },
    {
      title: "Sales Enablement Solution Design",
      description:
        "A design plan that outlines the recommended blend of learning activities, job aids, workflow support, accountability measures, and evaluation methods.",
      status: "In development",
    },
    {
      title: "Sales Playbook / Job Aid",
      description:
        "A practical performance support tool for service comparison, client needs analysis, value messaging, objection handling, proposal support, and follow-up.",
      status: "In development",
    },
    {
      title: "Storyline Conversation Simulation",
      description:
        "A scenario-based prototype where sales or client-facing employees practice responding to client inquiries, asking diagnostic questions, handling objections, and confirming next steps.",
      status: "In development",
    },
    {
      title: "Evaluation Plan",
      description:
        "A KPI-based plan for measuring response time, follow-up completion, proposal rate, conversion rate, sales conversation quality, and lost reason documentation.",
      status: "Planned",
    },
  ]
  const executiveSummary = [
    {
      label: "Business Problem",
      value: "Potential client inquiries did not consistently progress into confirmed training engagements.",
    },
    { label: "My Role", value: "Instructional Designer and Performance Consultant" },
    { label: "Approach", value: "Performance analysis before training design" },
    { label: "Project Type", value: "Independent anonymized workplace case study" },
    { label: "Timeline", value: "10-week portfolio project" },
    { label: "Current Status", value: "Diagnostic phase completed; intervention assets in development" },
  ]
  const projectStatuses = [
    { artifact: "Diagnostic Toolkit", status: "Completed" },
    { artifact: "Gap Analysis Matrix", status: "Completed" },
    { artifact: "Sales Enablement Solution Design", status: "In development" },
    { artifact: "Sales Playbook / Job Aid", status: "In development" },
    { artifact: "Storyline Conversation Simulation", status: "In development" },
    { artifact: "Evaluation Plan", status: "Planned" },
  ]

  if (!project) {
    notFound()
  }

  if (project.slug === "automated-lms-enrollment") {
    return <LmsAutomationCaseStudy project={project} />
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(hsl(var(--border-strong))_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      {/* Header */}
      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Project Header */}
          <AnimatedSection animation="fade-up" className="lg:col-span-3">
            <Card className="bg-card/90 border-border backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 sm:h-64 md:h-80 w-full">
                <Image
                  src={project.coverImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                  <div className="text-xs sm:text-sm text-primary mb-1 sm:mb-2">{project.category}</div>
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">{project.title}</h1>
                  <p className="text-sm text-muted-foreground mt-1 sm:mt-2 max-w-2xl">{project.shortDescription}</p>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6">
                <div className="rounded-lg border border-border bg-surface-inset/80 p-3 text-sm leading-relaxed text-foreground-secondary sm:p-4">
                  This independent portfolio case study is based on a real workplace performance challenge.
                  Organizational details, internal information, and identifying data have been anonymized.
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring"
                  >
                    <a
                      href="/artifacts/sales-enablement/sales-performance-diagnostic-toolkit-summary.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      View Diagnostic Toolkit
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="border-border-strong bg-transparent text-foreground hover:bg-surface-raised hover:text-foreground">
                    <a
                      href="/artifacts/sales-enablement/gap-analysis-matrix-summary.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      View Gap Analysis Matrix
                    </a>
                  </Button>
                  <Link
                    href="/"
                    className="inline-flex w-fit items-center rounded-sm px-1 py-1 text-sm text-muted-foreground transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                    Back to Portfolio
                  </Link>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100} className="lg:col-span-3">
            <Card className="border-border bg-card/90 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-bold sm:text-xl">Executive Summary</h2>
                <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {executiveSummary.map((item) => (
                    <div key={item.label} className="rounded-lg border border-border bg-surface-inset/70 p-3 sm:p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-primary">{item.label}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-foreground-secondary">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150} className="lg:col-span-3">
            <Card className="border-border bg-card/90 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-bold sm:text-xl">What This Case Study Demonstrates</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <SkillTag key={feature}>{feature}</SkillTag>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200} className="lg:col-span-3">
            <Card className="border-border bg-card/90 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-bold sm:text-xl">Technologies Used</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <SkillTag key={technology}>{technology}</SkillTag>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={250} className="lg:col-span-3">
            <Card className="border-border bg-card/90 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-bold sm:text-xl">Project Status</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {projectStatuses.map((item) => (
                    <li key={item.artifact} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-inset/70 p-3">
                      <span className="text-sm font-medium text-foreground-secondary">{item.artifact}</span>
                      <span
                        className={
                          item.status === "Completed"
                            ? "shrink-0 rounded-full border border-success/35 bg-success/10 px-2.5 py-1 text-xs font-medium text-success"
                            : item.status === "In development"
                              ? "shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-secondary"
                              : "shrink-0 rounded-full border border-border-strong bg-surface-raised/70 px-2.5 py-1 text-xs font-medium text-foreground-secondary"
                        }
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Project Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <Card className="bg-card/90 border-border backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Context and Overview</h2>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-foreground-secondary">
                    {project.description.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Project Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <AnimatedSection animation="fade-up" delay={200}>
                <Card className="bg-card/90 border-border backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {project.gallery.map((image, index) => (
                        <AnimatedSection key={index} animation="zoom-in" delay={100 * (index + 1)}>
                          <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden border border-border">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.caption || `Gallery image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </AnimatedSection>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}
          </div>

        </div>

        <AnimatedSection animation="fade-up" delay={300} className="mt-4 sm:mt-6">
          <Card className="bg-card/90 border-border backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">The Challenge</h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-foreground-secondary">
                <p>
                  I chose this project because it reflects a real challenge in technical training services: inquiries do not always turn into confirmed clients. At first glance, this can look like a sales team issue, but I wanted to avoid assuming that training was automatically the solution. 
                  For this case study, I approached the problem as both an instructional designer and performance consultant. 
                  My goal is to find out whether low or inconsistent client conversion is caused by a trainable gap, such as product knowledge or sales conversation skills, or by non-training factors, such as weak follow-up processes, unclear accountability, poor lead quality, pricing concerns, or unclear market positioning.
                </p>
              </div>

              <div className="mt-5 sm:mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wide text-primary-hover">
                  Key Diagnostic Question:
                </h3>
                <p className="mt-2 text-sm sm:text-base text-foreground">
                  What is preventing client-facing employees from consistently converting potential clients into
                  confirmed clients?
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={350} className="mt-4 sm:mt-6">
          <Card className="bg-card/90 border-border backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Diagnostic Approach</h2>

              <p className="w-full text-sm sm:text-base text-foreground-secondary">
                To keep the project focused, I used a five-category diagnostic framework. 
                This helped me avoid jumping straight into course development and instead look at the wider performance system around client conversion. 
                Each category represents a possible reason why conversion may be inconsistent.
                Some of these gaps can be solved through training, while others may require job aids, process improvements, clearer ownership, or better offer positioning.
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    label: "01",
                    title: "Knowledge Gap",
                    description:
                      "I checked whether employees understand the training services, program differences, inclusions, requirements, and value points.",
                  },
                  {
                    label: "02",
                    title: "Skill Gap",
                    description:
                      "I looked at whether employees can ask needs-based questions, explain value, handle objections, and confirm next steps.",
                  },
                  {
                    label: "03",
                    title: "Process Gap",
                    description:
                      "I reviewed whether there is a clear workflow for inquiry handling, lead tracking, proposal preparation, follow-up, documentation, and handoff.",
                  },
                  {
                    label: "04",
                    title: "Motivation / Accountability Gap",
                    description:
                      "I examined whether lead ownership, response time expectations, sales targets, monitoring, feedback, and accountability are clearly defined.",
                  },
                  {
                    label: "05",
                    title: "Market / Offer Gap",
                    description:
                      "I considered whether pricing, lead quality, competitor options, client budget, schedule availability, or unclear positioning affect conversion.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-surface-inset/70 p-4 sm:p-5 transition-colors hover:border-primary/30 hover:bg-card-hover"
                  >
                    <div className="mb-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-2 text-xs font-bold text-primary-hover">
                      {item.label}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-foreground-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={400} className="mt-4 sm:mt-6">
          <Card className="bg-card/90 border-border backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Desired Performance Flow</h2>

              <p className="text-sm sm:text-base leading-7 text-foreground-secondary">
                Before diagnosing the gaps, I first defined what effective sales and client engagement performance should
                look like. This gave the project a clear standard for comparing actual performance later.
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
                {desiredPerformanceFlow.map((step, index) => (
                  <div key={step} className="relative">
                    {index < desiredPerformanceFlow.length - 1 && (
                      <div className="pointer-events-none absolute left-[calc(100%+0.15rem)] top-1/2 z-10 hidden w-3 -translate-y-1/2 items-center xl:flex">
                        <span className="h-px flex-1 bg-gradient-to-r from-primary/65 to-accent/45 shadow-[0_0_8px_hsl(var(--primary)/0.12)]" />
                        <span className="h-2 w-2 rotate-45 border-r border-t border-primary/75" />
                      </div>
                    )}

                    <div className="relative flex h-full gap-3 rounded-lg border border-border bg-surface-inset/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_18px_hsl(var(--primary)/0.08)] md:flex-col md:gap-2 md:p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-bold text-primary-hover shadow-[0_0_18px_hsl(var(--primary)/0.08)]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="min-w-0 text-sm font-medium leading-6 text-foreground md:text-center">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 sm:mt-6 text-sm sm:text-base leading-7 text-foreground-secondary">
                This desired performance flow became the reference point for identifying whether the problem was related
                to knowledge, skill, process, accountability, or market or offer factors.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={450} className="mt-4 sm:mt-6">
          <Card className="bg-card/90 border-border backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Selected Artifacts</h2>

              <p className="text-sm sm:text-base leading-7 text-foreground-secondary">
                To keep this portfolio case study focused, I am presenting the artifacts that best show my analysis
                process, design decisions, and performance support strategy. These outputs are meant to show how I moved
                from problem diagnosis to practical sales enablement recommendations.
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {selectedArtifacts.map((artifact) => (
                  <div
                    key={artifact.title}
                    className="flex h-full flex-col rounded-lg border border-border bg-surface-inset/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_18px_hsl(var(--primary)/0.08)] sm:p-5"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-6 text-foreground">{artifact.title}</h3>
                      <span
                        className={
                          artifact.status === "Completed"
                            ? "shrink-0 rounded-full border border-success/35 bg-success/10 px-2.5 py-1 text-xs font-medium text-success"
                            : artifact.status === "In development"
                              ? "shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-secondary"
                              : "shrink-0 rounded-full border border-border-strong bg-surface-raised/70 px-2.5 py-1 text-xs font-medium text-foreground-secondary"
                        }
                      >
                        {artifact.status}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-foreground-secondary">{artifact.description}</p>
                    {artifact.includes && (
                      <p className="mt-3 text-xs leading-5 text-muted-foreground">{artifact.includes}</p>
                    )}
                    {artifact.links && (
                      <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap">
                        {artifact.links.map((link) => (
                          <Button
                            key={link.href}
                            asChild
                            size="sm"
                            variant={link.download ? "outline" : "default"}
                            className={
                              link.download
                                ? "border-border-strong bg-surface-inset/80 text-xs text-foreground hover:bg-surface-raised hover:text-foreground"
                                : "bg-gradient-to-r from-primary to-accent text-xs hover:from-primary hover:to-accent"
                            }
                          >
                            <a
                              href={link.href}
                              target={link.download ? undefined : "_blank"}
                              rel={link.download ? undefined : "noopener noreferrer"}
                              download={link.download ? true : undefined}
                            >
                              {link.icon === "download" ? (
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                              ) : (
                                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                              )}
                              {link.label}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={500} className="mt-4 sm:mt-6">
          <Card className="bg-card/90 border-border backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Reflection</h2>

              <div className="border-l-2 border-primary/60 pl-4 sm:pl-5">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-7 text-foreground-secondary">
                  <p>
                    This project is helping me practice instructional design as performance consulting. Instead of
                    starting with the assumption that a course is the answer, I am first defining the business problem,
                    identifying the desired performance, and designing tools to diagnose the real causes of low or
                    inconsistent client conversion.
                  </p>

                  <p>
                    For me, the value of this project is that it connects learning design to workplace performance. It
                    allows me to demonstrate not only course development, but also problem analysis, root cause thinking,
                    training versus non-training decision-making, job aid design, and evaluation planning.
                  </p>

                  <p>
                    This case study also reflects the kind of work I want to keep building: practical learning solutions
                    that are grounded in real business problems and supported by clear evidence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <AnimatedSection animation="fade-up" delay={550} className="mt-4 sm:mt-6">
            <Card className="bg-card/90 border-border backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">More Projects</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.relatedProjects.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/projects/${related.slug}`}
                      className="group flex items-center gap-3 rounded-lg border border-border bg-surface-inset/70 p-3 transition-colors hover:border-primary/35 hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded">
                        <Image src={related.image || "/placeholder.svg"} alt={related.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium transition-colors group-hover:text-primary-hover">{related.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{related.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Footer */}
        <AnimatedSection
          animation="fade-in"
          delay={500}
          className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-foreground-subtle"
        >
          <p>© 2026 Ken Gilmer P. Macawili. Instructional Design and HSEQ Training Portfolio.</p>
        </AnimatedSection>
      </div>

      {/* Scroll to Top Button */}
      <EnhancedScrollIndicator />
    </main>
  )
}
