import Image from "next/image"
import { ArrowRight, Mail } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPersonalInfo } from "@/lib/data"

const professionalFocus = [
  "Occupational Safety & Health",
  "Training Operations",
  "Instructional Design",
  "Process Improvement",
]

export function HomepageHero() {
  const personalInfo = getPersonalInfo()

  return (
    <section
      aria-labelledby="homepage-hero-title"
      className="relative z-10 container mx-auto px-3 pt-24 pb-8 sm:px-4 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12"
    >
      <AnimatedSection animation="fade-up" rootMargin="0px">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-yellow-400/5 blur-3xl"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400 sm:text-sm">
                Occupational Safety <span aria-hidden="true">•</span> Training Operations{" "}
                <span aria-hidden="true">•</span> Instructional Design
              </p>

              <p className="mb-2 text-sm font-medium text-zinc-300 sm:text-base">
                Safety, Learning, and Systems Professional
              </p>

              <h1
                id="homepage-hero-title"
                className="max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                I build safer workplaces and better learning experiences.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                I combine occupational safety, training operations, instructional design, learning technology, and
                process improvement to help organizations work more safely, efficiently, and effectively.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-zinc-300">
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${
                    personalInfo.availableForWork ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span>
                  {personalInfo.availableForWork ? "Available for new opportunities" : "Not currently available"}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2" aria-label="Professional focus areas">
                {professionalFocus.map((focus) => (
                  <Badge
                    key={focus}
                    variant="outline"
                    className="border-zinc-700 bg-zinc-800/60 px-3 py-1 text-zinc-200"
                  >
                    {focus}
                  </Badge>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="bg-yellow-400 text-zinc-950 hover:bg-yellow-300 focus-visible:ring-yellow-400"
                >
                  <a href="#experience">
                    View Safety &amp; HSE Work
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-zinc-600 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                >
                  <a href="#projects">View Instructional Design Work</a>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="border border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail aria-hidden="true" />
                    Contact Me
                  </a>
                </Button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:max-w-xs">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-xl shadow-yellow-400/5">
                <Image
                  src={personalInfo.avatar}
                  alt={`Portrait of ${personalInfo.name}`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 384px, 320px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/40 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
