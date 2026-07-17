import { FolderKanban, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPersonalInfo } from "@/lib/data"

export function HomepageContactCta() {
  const personalInfo = getPersonalInfo()

  return (
    <Card className="relative overflow-hidden border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-400/5 blur-3xl" />
      <CardContent className="relative p-5 text-center sm:p-7">
        <h3 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
          Looking for someone who can connect safety, learning, and operations?
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          I am currently exploring opportunities in Safety and HSE, training and learning operations, instructional
          design, and learning technology.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            className="bg-yellow-400 text-zinc-950 hover:bg-yellow-300 focus-visible:ring-yellow-400"
          >
            <a href={`mailto:${personalInfo.email}`} aria-label={`Contact ${personalInfo.name} by email`}>
              <Mail aria-hidden="true" />
              Contact Me
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-zinc-600 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
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
