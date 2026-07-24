import Image from "next/image"
import { ArrowRight, FileText, Mail, MapPin } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { getPersonalInfo } from "@/lib/data"

const resumeHref = "/#professional-background"

export function HomepageHero() {
  const personalInfo = getPersonalInfo()

  return (
    <section
      aria-labelledby="homepage-hero-title"
      className="relative z-10 container mx-auto px-3 pb-8 pt-24 sm:px-4 sm:pb-10 sm:pt-28 lg:pb-12 lg:pt-32"
    >
      <AnimatedSection animation="fade-up" rootMargin="0px">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/90 p-5 shadow-2xl shadow-background/30 backdrop-blur-sm sm:p-8 lg:p-10">
          <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:gap-12">
            <div>
              <p className="text-sm font-semibold text-primary sm:text-base">{personalInfo.name}</p>
              <p className="mt-1 text-sm font-medium text-foreground-secondary">
                Safety, Learning, and Systems Professional
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-primary" />
                  {personalInfo.location}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${
                      personalInfo.availableForWork ? "bg-success" : "bg-destructive"
                    }`}
                  />
                  {personalInfo.availableForWork ? "Available for new opportunities" : "Not currently available"}
                </span>
              </div>

              <h1
                id="homepage-hero-title"
                className="mt-5 max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                I design safer operations, better learning experiences, and practical digital systems.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
                I combine safety, training, automation, instructional design, and operations experience to solve real
                workplace problems and build systems people can actually use.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring">
                  <a href="#featured-work">
                    Explore My Work
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-border-strong bg-transparent text-foreground-secondary hover:border-primary hover:bg-card-hover hover:text-foreground"
                >
                  <a href={resumeHref} aria-label="View résumé summary in Professional Background">
                    <FileText aria-hidden="true" />
                    View Résumé
                  </a>
                </Button>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-medium text-foreground-secondary underline-offset-4 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Contact Me
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:max-w-xs">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-surface-raised to-surface-inset shadow-xl shadow-primary/10">
                <Image
                  src={personalInfo.avatar}
                  alt={`Portrait of ${personalInfo.name}`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 384px, 320px"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
