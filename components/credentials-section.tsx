import Image from "next/image"
import { Award, GraduationCap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getCredentialsInfo } from "@/lib/data"

export function CredentialsSection() {
  const credentialsInfo = getCredentialsInfo()
  const homepageEducation = credentialsInfo.education.filter((education) => education.showOnHomepage)

  return (
    <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-5 flex items-start sm:mb-6">
          <Award aria-hidden="true" className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
          <div>
            <h3 className="text-lg font-medium">Credentials</h3>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-zinc-400">
              Professional certifications and academic preparation supporting my work in safety, learning, systems,
              and operations.
            </p>
          </div>
        </div>

        <div className="space-y-7 sm:space-y-8">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-4">
              <h4 className="flex items-center border-b border-zinc-800 pb-2 text-sm font-medium text-zinc-300">
                <Award aria-hidden="true" className="mr-2 h-4 w-4 text-yellow-400" />
                Professional Certifications
              </h4>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 sm:gap-4">
                {credentialsInfo.certifications.map((certification) => (
                  <article
                    key={certification.name}
                    className="flex h-full items-start rounded-lg border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4"
                  >
                    {certification.logo ? (
                      <div className="relative mr-3 h-11 w-11 shrink-0 overflow-hidden rounded-md bg-zinc-800">
                        <Image
                          src={certification.logo}
                          alt={`${certification.issuer} logo`}
                          fill
                          sizes="44px"
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-zinc-800">
                        <Award aria-hidden="true" className="h-5 w-5 text-yellow-400" />
                      </div>
                    )}

                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <h5 className="text-sm font-semibold leading-snug text-zinc-100">{certification.name}</h5>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {certification.issuer} <span aria-hidden="true">•</span> {certification.date}
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 border-yellow-400/25 bg-yellow-400/5 text-[0.7rem] text-yellow-300"
                      >
                        {certification.relevance}
                      </Badge>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="space-y-4">
              <h4 className="flex items-center border-b border-zinc-800 pb-2 text-sm font-medium text-zinc-300">
                <GraduationCap aria-hidden="true" className="mr-2 h-4 w-4 text-yellow-400" />
                Education
              </h4>

              <div className="space-y-3">
                {homepageEducation.map((education) => (
                  <article
                    key={education.degree}
                    className="flex items-start rounded-lg border border-zinc-800 bg-zinc-950/40 p-3 sm:p-4"
                  >
                    {education.logo ? (
                      <div className="relative mr-3 h-10 w-10 shrink-0 overflow-hidden rounded-md bg-zinc-800">
                        <Image
                          src={education.logo}
                          alt={`${education.institution} logo`}
                          fill
                          sizes="40px"
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-800">
                        <GraduationCap aria-hidden="true" className="h-5 w-5 text-yellow-400" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h5 className="text-sm font-semibold leading-snug text-zinc-100 sm:text-base">
                          {education.degree}
                        </h5>
                        {education.status && (
                          <Badge
                            variant="outline"
                            className="border-yellow-400/25 bg-yellow-400/5 text-[0.7rem] text-yellow-300"
                          >
                            {education.status}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                        {education.institution} <span aria-hidden="true">•</span> {education.year}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </CardContent>
    </Card>
  )
}
