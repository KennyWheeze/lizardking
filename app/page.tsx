import { BriefcaseIcon, CodeIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getExperienceInfo, getHomepageCapabilities } from "@/lib/data"
import { ExperienceCard } from "@/components/experience-card"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { AnimatedSection } from "@/components/animated-section"
import { EnhancedProfile } from "@/components/enhanced-profile"
import { CredentialsSection } from "@/components/credentials-section"
import { PortfolioHeader } from "@/components/portfolio-header"
import { HomepageHero } from "@/components/homepage-hero"
import { FeaturedWorkSection } from "@/components/featured-work-section"
import { HomepageContactCta } from "@/components/homepage-contact-cta"

export default function Home() {
  const experienceInfo = getExperienceInfo()
  const homepageCapabilities = getHomepageCapabilities()

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(hsl(var(--border-strong))_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      {/* Header */}
      <PortfolioHeader />

      <HomepageHero />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-0 pb-6 sm:pb-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Enhanced Profile Section */}
          <div className="md:sticky md:top-24 self-start">
            <AnimatedSection animation="slide-right">
              <EnhancedProfile />
            </AnimatedSection>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Experience Section */}
            <AnimatedSection animation="fade-up" id="experience">
              <Card className="bg-card/90 border-border backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Experience</h3>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    {experienceInfo.map((experience, index) => (
                      <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                        <ExperienceCard
                          company={experience.company}
                          period={experience.period}
                          roles={experience.roles}
                          sectionLabel={experience.sectionLabel}
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Featured Work Section */}
            <AnimatedSection animation="fade-up" id="projects">
              <Card className="bg-card/90 border-border backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Featured Work</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Selected examples of how I improve safety, learning, operations, and organizational performance.
                      </p>
                    </div>
                  </div>

                  <FeaturedWorkSection />
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Credentials Section */}
            <AnimatedSection animation="fade-up" id="credentials">
              <CredentialsSection />
            </AnimatedSection>

            {/* Capabilities Section */}
            <AnimatedSection animation="fade-up" id="skills">
              <Card className="bg-card/90 border-border backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-5 flex items-start sm:mb-6">
                    <CodeIcon className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent-secondary" />
                    <div>
                      <h3 className="text-lg font-medium">Capabilities</h3>
                      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        Core capabilities developed through safety, training, leadership, instructional design, and
                        digital operations work.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {homepageCapabilities.map((group, index) => (
                      <AnimatedSection
                        key={group.title}
                        animation={index % 2 === 0 ? "slide-right" : "slide-left"}
                        delay={100 * (index + 1)}
                      >
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-foreground-secondary sm:text-base">{group.title}</h4>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-border-strong bg-surface-inset/80 px-3 py-1.5 text-sm leading-tight text-foreground-secondary"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-up">
              <HomepageContactCta />
            </AnimatedSection>
          </div>
        </div>

        {/* Footer */}
        <AnimatedSection
          animation="fade-in"
          delay={500}
          className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-foreground-subtle"
        >
          <p>© {new Date().getFullYear()} Ken Gilmer P. Macawili. All Rights Reserved.</p>
        </AnimatedSection>
      </div>

      {/* Scroll to Top Button */}
      <EnhancedScrollIndicator />
    </main>
  )
}
