import { FolderKanban, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPersonalInfo } from "@/lib/data"

export function HomepageContactCta() {
  const personalInfo = getPersonalInfo()

  return (
    <Card className="relative overflow-hidden border-border bg-card/90 backdrop-blur-sm">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-3xl" />
      <CardContent className="relative p-5 text-center sm:p-7">
        <h2 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          Have a problem worth improving?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-foreground-secondary sm:text-base">
          I am open to opportunities involving automation, digital systems, learning technology, instructional design,
          safety, and operations.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring"
          >
            <a href={`mailto:${personalInfo.email}`} aria-label={`Contact ${personalInfo.name} by email`}>
              <Mail aria-hidden="true" />
              Contact Me
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-border-strong bg-transparent text-foreground-secondary hover:border-primary hover:bg-card-hover hover:text-foreground"
          >
            <a href="/projects" aria-label="View all portfolio projects">
              <FolderKanban aria-hidden="true" />
              View Projects
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
