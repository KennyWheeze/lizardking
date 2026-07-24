import Image from "next/image"
import { ArrowRight, Award, GraduationCap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent } from "@/components/ui/card"
import { getCredentialsInfo } from "@/lib/data"

const selectedCredentialNames = [
  "Bachelor of Science in Petroleum Engineering",
  "Master of Science in Environmental Management",
  "ISO 9001:2015 Lead Auditor",
  "Emergency Medical Services NC II",
  "Basic Occupational Safety and Health for Safety Officer 2",
  "Google Data Analytics",
]

export function CredentialsSection() {
  const credentialsInfo = getCredentialsInfo()
  const credentials = [
    ...credentialsInfo.education.map((item) => ({
      name:
        item.degree === "Master of Science in Environmental Management"
          ? "Master of Science in Environmental Management — In Progress"
          : item.degree,
      lookupName: item.degree,
      detail: `${item.institution} • ${item.year}`,
      logo: item.logo,
      type: "education" as const,
    })),
    ...credentialsInfo.certifications.map((item) => ({
      name: item.name,
      lookupName: item.name,
      detail: `${item.issuer} • ${item.date}`,
      logo: item.logo,
      type: "certification" as const,
    })),
  ]
    .filter((item) => selectedCredentialNames.includes(item.lookupName))
    .sort(
      (first, second) =>
        selectedCredentialNames.indexOf(first.lookupName) - selectedCredentialNames.indexOf(second.lookupName),
    )

  return (
    <Card className="border-border bg-card/90 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-5 flex items-start sm:mb-6">
          <Award aria-hidden="true" className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Selected Credentials</h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Academic and professional preparation supporting work across safety, learning, systems, and operations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 sm:gap-4">
          {credentials.map((credential, index) => {
            const FallbackIcon = credential.type === "education" ? GraduationCap : Award
            return (
              <AnimatedSection key={credential.name} animation="fade-up" delay={60 * (index + 1)}>
                <article className="flex h-full items-start rounded-lg border border-border bg-surface-inset/70 p-3 transition-colors hover:border-primary/35 hover:bg-card-hover sm:p-4">
                  {credential.logo ? (
                    <div className="relative mr-3 h-11 w-11 shrink-0 overflow-hidden rounded-md bg-surface-raised">
                      <Image
                        src={credential.logo}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-raised">
                      <FallbackIcon aria-hidden="true" className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-foreground">{credential.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{credential.detail}</p>
                  </div>
                </article>
              </AnimatedSection>
            )
          })}
        </div>

        <a
          href="/#credentials"
          className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View all credentials in the credentials section"
        >
          View All Credentials
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  )
}
