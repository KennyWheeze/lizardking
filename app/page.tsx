import { BriefcaseBusiness } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { FeaturedWorkSection } from "@/components/featured-work-section"
import { HomepageContactCta } from "@/components/homepage-contact-cta"
import { HomepageHero } from "@/components/homepage-hero"
import {
  HowIWorkSection,
  ProfessionalBackgroundSection,
  WhatIDoSection,
} from "@/components/homepage-sections"
import { PortfolioHeader } from "@/components/portfolio-header"
import { CredentialsSection } from "@/components/credentials-section"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-[radial-gradient(hsl(var(--border-strong))_1px,transparent_1px)] [background-size:20px_20px] opacity-20"
      />

      <PortfolioHeader />
      <HomepageHero />

      <div className="relative z-10 container mx-auto space-y-4 px-3 pb-6 sm:space-y-6 sm:px-4 sm:pb-8">
        <AnimatedSection animation="fade-up" id="featured-work">
          <Card className="border-border bg-card/90 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="mb-5 flex items-start sm:mb-6">
                <BriefcaseBusiness aria-hidden="true" className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Featured Work</h2>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Three examples of practical systems and learning solutions built around real workplace needs.
                  </p>
                </div>
              </div>
              <FeaturedWorkSection />
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" id="skills">
          <WhatIDoSection />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" id="experience">
          <ProfessionalBackgroundSection />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" id="credentials">
          <CredentialsSection />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" id="how-i-work">
          <HowIWorkSection />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" id="contact">
          <HomepageContactCta />
        </AnimatedSection>

        <AnimatedSection
          animation="fade-in"
          delay={500}
          className="py-4 text-center text-xs text-foreground-subtle sm:py-6 sm:text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Ken Gilmer P. Macawili. All Rights Reserved.</p>
        </AnimatedSection>
      </div>

      <EnhancedScrollIndicator />
    </main>
  )
}
