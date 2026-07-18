import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SkillTag } from "@/components/skill-tag"
import { getProjectBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { AnimatedSection } from "@/components/animated-section"
import { PortfolioHeader } from "@/components/portfolio-header"

interface ProjectPageProps {
  params: {
    slug: string
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

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      {/* Header */}
      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Project Header */}
          <AnimatedSection animation="fade-up" className="lg:col-span-3">
            <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 sm:h-64 md:h-80 w-full">
                <Image
                  src={project.coverImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                  <div className="text-xs sm:text-sm text-cyan-400 mb-1 sm:mb-2">{project.category}</div>
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">{project.title}</h1>
                  <p className="text-sm text-zinc-400 mt-1 sm:mt-2 max-w-2xl">{project.shortDescription}</p>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-sm leading-relaxed text-zinc-300 sm:p-4">
                  This independent portfolio case study is based on a real workplace performance challenge.
                  Organizational details, internal information, and identifying data have been anonymized.
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    asChild
                    size="sm"
                    className="bg-yellow-400 text-zinc-950 hover:bg-yellow-300 focus-visible:ring-yellow-400"
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
                  <Button asChild size="sm" variant="outline" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white">
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
                    className="inline-flex w-fit items-center rounded-sm px-1 py-1 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  >
                    <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                    Back to Portfolio
                  </Link>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100} className="lg:col-span-3">
            <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-bold sm:text-xl">Executive Summary</h2>
                <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {executiveSummary.map((item) => (
                    <div key={item.label} className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-yellow-400">{item.label}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-zinc-200">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150} className="lg:col-span-3">
            <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
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
            <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
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
            <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg font-bold sm:text-xl">Project Status</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {projectStatuses.map((item) => (
                    <li key={item.artifact} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 p-3">
                      <span className="text-sm font-medium text-zinc-200">{item.artifact}</span>
                      <span
                        className={
                          item.status === "Completed"
                            ? "shrink-0 rounded-full border border-green-400/30 bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-300"
                            : item.status === "In development"
                              ? "shrink-0 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-1 text-xs font-medium text-yellow-300"
                              : "shrink-0 rounded-full border border-zinc-600 bg-zinc-800/70 px-2.5 py-1 text-xs font-medium text-zinc-300"
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
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Context and Overview</h2>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-300">
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
                <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {project.gallery.map((image, index) => (
                        <AnimatedSection key={index} animation="zoom-in" delay={100 * (index + 1)}>
                          <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden border border-zinc-800">
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
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">The Challenge</h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-300">
                <p>
                  I chose this project because it reflects a real challenge in technical training services: inquiries do not always turn into confirmed clients. At first glance, this can look like a sales team issue, but I wanted to avoid assuming that training was automatically the solution. 
                  For this case study, I approached the problem as both an instructional designer and performance consultant. 
                  My goal is to find out whether low or inconsistent client conversion is caused by a trainable gap, such as product knowledge or sales conversation skills, or by non-training factors, such as weak follow-up processes, unclear accountability, poor lead quality, pricing concerns, or unclear market positioning.
                </p>
              </div>

              <div className="mt-5 sm:mt-6 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wide text-yellow-300">
                  Key Diagnostic Question:
                </h3>
                <p className="mt-2 text-sm sm:text-base text-zinc-100">
                  What is preventing client-facing employees from consistently converting potential clients into
                  confirmed clients?
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={350} className="mt-4 sm:mt-6">
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Diagnostic Approach</h2>

              <p className="w-full text-sm sm:text-base text-zinc-300">
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
                    className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5 transition-colors hover:border-yellow-400/30"
                  >
                    <div className="mb-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 text-xs font-bold text-cyan-300">
                      {item.label}
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={400} className="mt-4 sm:mt-6">
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Desired Performance Flow</h2>

              <p className="text-sm sm:text-base leading-7 text-zinc-300">
                Before diagnosing the gaps, I first defined what effective sales and client engagement performance should
                look like. This gave the project a clear standard for comparing actual performance later.
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
                {desiredPerformanceFlow.map((step, index) => (
                  <div key={step} className="relative">
                    {index < desiredPerformanceFlow.length - 1 && (
                      <div className="pointer-events-none absolute left-[calc(100%+0.15rem)] top-1/2 z-10 hidden w-3 -translate-y-1/2 items-center xl:flex">
                        <span className="h-px flex-1 bg-gradient-to-r from-yellow-300/65 to-yellow-400/45 shadow-[0_0_8px_rgba(250,204,21,0.22)]" />
                        <span className="h-2 w-2 rotate-45 border-r border-t border-yellow-300/75" />
                      </div>
                    )}

                    <div className="relative flex h-full gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)] md:flex-col md:gap-2 md:p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/10 text-xs font-bold text-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.12)]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="min-w-0 text-sm font-medium leading-6 text-zinc-100 md:text-center">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 sm:mt-6 text-sm sm:text-base leading-7 text-zinc-300">
                This desired performance flow became the reference point for identifying whether the problem was related
                to knowledge, skill, process, accountability, or market or offer factors.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={450} className="mt-4 sm:mt-6">
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Selected Artifacts</h2>

              <p className="text-sm sm:text-base leading-7 text-zinc-300">
                To keep this portfolio case study focused, I am presenting the artifacts that best show my analysis
                process, design decisions, and performance support strategy. These outputs are meant to show how I moved
                from problem diagnosis to practical sales enablement recommendations.
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                {selectedArtifacts.map((artifact) => (
                  <div
                    key={artifact.title}
                    className="flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)] sm:p-5"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-6 text-white">{artifact.title}</h3>
                      <span
                        className={
                          artifact.status === "Completed"
                            ? "shrink-0 rounded-full border border-green-400/30 bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-300"
                            : artifact.status === "In development"
                              ? "shrink-0 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-2.5 py-1 text-xs font-medium text-yellow-300"
                              : "shrink-0 rounded-full border border-zinc-600 bg-zinc-800/70 px-2.5 py-1 text-xs font-medium text-zinc-300"
                        }
                      >
                        {artifact.status}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-zinc-300">{artifact.description}</p>
                    {artifact.includes && (
                      <p className="mt-3 text-xs leading-5 text-zinc-400">{artifact.includes}</p>
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
                                ? "border-zinc-700 bg-zinc-950/50 text-xs text-zinc-100 hover:bg-zinc-800 hover:text-white"
                                : "bg-gradient-to-r from-cyan-500 to-blue-500 text-xs hover:from-cyan-600 hover:to-blue-600"
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
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Reflection</h2>

              <div className="border-l-2 border-yellow-400/60 pl-4 sm:pl-5">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-7 text-zinc-300">
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
            <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">More Projects</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.relatedProjects.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/projects/${related.slug}`}
                      className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded">
                        <Image src={related.image || "/placeholder.svg"} alt={related.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium transition-colors group-hover:text-yellow-400">{related.title}</h3>
                        <p className="mt-1 text-xs text-zinc-400">{related.category}</p>
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
          className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-zinc-500"
        >
          <p>© 2026 Ken Gilmer P. Macawili. Instructional Design and HSEQ Training Portfolio.</p>
        </AnimatedSection>
      </div>

      {/* Scroll to Top Button */}
      <EnhancedScrollIndicator />
    </main>
  )
}
