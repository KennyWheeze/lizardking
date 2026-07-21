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
    <Card className="border-border bg-card/90 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-5 flex items-start sm:mb-6">
          <Award aria-hidden="true" className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h3 className="text-lg font-medium">Credentials</h3>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Professional certifications and academic preparation supporting my work in safety, learning, systems,
              and operations.
            </p>
          </div>
        </div>

        <div className="space-y-7 sm:space-y-8">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-4">
              <h4 className="flex items-center border-b border-border pb-2 text-sm font-medium text-foreground-secondary">
                <Award aria-hidden="true" className="mr-2 h-4 w-4 text-primary" />
                Professional Certifications
              </h4>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 sm:gap-4">
                {credentialsInfo.certifications.map((certification) => (
                  <article
                    key={certification.name}
                    className="flex h-full items-start rounded-lg border border-border bg-surface-inset/70 p-3 sm:p-4"
                  >
                    {certification.logo ? (
                      <div className="relative mr-3 h-11 w-11 shrink-0 overflow-hidden rounded-md bg-surface-raised">
                        <Image
                          src={certification.logo}
                          alt={`${certification.issuer} logo`}
                          fill
                          sizes="44px"
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-raised">
                        <Award aria-hidden="true" className="h-5 w-5 text-primary" />
                      </div>
                    )}

                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <h5 className="text-sm font-semibold leading-snug text-foreground">{certification.name}</h5>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {certification.issuer} <span aria-hidden="true">•</span> {certification.date}
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-3 border-primary/35 bg-primary/10 text-[0.7rem] text-primary-hover"
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
              <h4 className="flex items-center border-b border-border pb-2 text-sm font-medium text-foreground-secondary">
                <GraduationCap aria-hidden="true" className="mr-2 h-4 w-4 text-accent-secondary" />
                Education
              </h4>

              <div className="space-y-3">
                {homepageEducation.map((education) => (
                  <article
                    key={education.degree}
                    className="flex items-start rounded-lg border border-border bg-surface-inset/70 p-3 sm:p-4"
                  >
                    {education.logo ? (
                      <div className="relative mr-3 h-10 w-10 shrink-0 overflow-hidden rounded-md bg-surface-raised">
                        <Image
                          src={education.logo}
                          alt={`${education.institution} logo`}
                          fill
                          sizes="40px"
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-raised">
                        <GraduationCap aria-hidden="true" className="h-5 w-5 text-accent-secondary" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h5 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                          {education.degree}
                        </h5>
                        {education.status && (
                          <Badge
                            variant="outline"
                            className="border-accent/35 bg-accent/10 text-[0.7rem] text-accent-secondary"
                          >
                            {education.status}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
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
