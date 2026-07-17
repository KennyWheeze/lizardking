import Image from "next/image"
import { Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPersonalInfo } from "@/lib/data"

const coreFocus = [
  "Occupational Safety & Health",
  "Training Operations",
  "Instructional Design",
  "Process Improvement",
]

function isUsableExternalUrl(url: string) {
  const normalizedUrl = url.trim().toLowerCase()

  return Boolean(
    normalizedUrl &&
      !normalizedUrl.includes("your-handle") &&
      !normalizedUrl.includes("example") &&
      (normalizedUrl.startsWith("https://") || normalizedUrl.startsWith("http://")),
  )
}

export function EnhancedProfile() {
  const personalInfo = getPersonalInfo()
  const linkedIn = personalInfo.social.find((link) => link.platform.toLowerCase() === "linkedin")
  const showLinkedIn = linkedIn && isUsableExternalUrl(linkedIn.url)

  return (
    <Card className="col-span-1 border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="flex flex-col items-center gap-3 border-b border-zinc-800 bg-gradient-to-r from-zinc-800/40 to-zinc-900/40 p-4 text-center sm:flex-row sm:text-left md:flex-col md:text-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-yellow-400/20 ring-4 ring-zinc-800/50 sm:h-24 sm:w-24 md:h-20 md:w-20 lg:h-24 lg:w-24">
            <Image
              src={personalInfo.avatar}
              alt={`Portrait of ${personalInfo.name}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight text-white">{personalInfo.name}</h2>
            <div className="mt-2 flex items-start justify-center text-xs leading-relaxed text-zinc-400 sm:justify-start md:justify-center">
              <MapPin aria-hidden="true" className="mr-1 mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="mt-2 flex items-center justify-center text-xs text-zinc-300 sm:justify-start md:justify-center">
              <span
                aria-hidden="true"
                className={`mr-2 h-2 w-2 rounded-full ${
                  personalInfo.availableForWork ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span>{personalInfo.availableForWork ? "Available for opportunities" : "Not currently available"}</span>
            </div>
          </div>
        </div>

        <div className="border-b border-zinc-800 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Core Focus</h3>
          <ul className="mt-3 space-y-2.5">
            {coreFocus.map((focus) => (
              <li key={focus} className="flex items-start text-sm text-zinc-200">
                <span aria-hidden="true" className="mr-2.5 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Contact</h3>
          <div className="mt-3 flex flex-col gap-2">
            <Button
              asChild
              className="w-full bg-yellow-400 text-zinc-950 hover:bg-yellow-300 focus-visible:ring-yellow-400"
            >
              <a href={`mailto:${personalInfo.email}`}>
                <Mail aria-hidden="true" />
                Email Me
              </a>
            </Button>

            {showLinkedIn && (
              <Button asChild variant="outline" className="w-full border-zinc-700 bg-transparent hover:bg-zinc-800">
                <a href={linkedIn.url} target="_blank" rel="noopener noreferrer">
                  <Linkedin aria-hidden="true" />
                  View LinkedIn
                </a>
              </Button>
            )}
          </div>

          <a
            href={`mailto:${personalInfo.email}`}
            className="mt-3 block break-all text-center text-xs text-zinc-400 transition-colors hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            {personalInfo.email}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
