import Link from "next/link"
import { ArrowLeft, FolderKanbanIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator"
import { PortfolioHeader } from "@/components/portfolio-header"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects } from "@/lib/data"

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 bg-[radial-gradient(hsl(var(--border-strong))_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <AnimatedSection animation="fade-in">
          <Link
            href="/"
            className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back to Portfolio
          </Link>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <Card className="bg-card/90 border-border backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <FolderKanbanIcon className="w-5 h-5 mr-2 text-primary" />
                <h1 className="text-xl sm:text-2xl font-semibold">Projects</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <AnimatedSection key={project.slug} animation="fade-up" delay={100 * (index + 1)}>
                    <ProjectCard
                      title={project.title}
                      category={project.category}
                      image={project.thumbnailImage}
                      slug={project.slug}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection
          animation="fade-in"
          delay={500}
          className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-foreground-subtle"
        >
          <p>&copy; {new Date().getFullYear()} Ken Gilmer P. Macawili. All Rights Reserved.</p>
        </AnimatedSection>
      </div>

      <EnhancedScrollIndicator />
    </main>
  )
}
