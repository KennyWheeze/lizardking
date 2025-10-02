import React from "react"
import portfolio from "@/data/portfolio-data.json"
import { AnimatedSection } from "@/components/animated-section"

// Import some icons from lucide-react
import { MicIcon, GraduationCapIcon, MonitorPlayIcon, UsersIcon } from "lucide-react"

export function EngagementsSection() {
  // Map specific titles to icons
  const iconMap: Record<string, JSX.Element> = {
    "Emcee": <MicIcon className="w-5 h-5 text-cyan-400 mr-2" />,
    "Guest Speaker": <UsersIcon className="w-5 h-5 text-cyan-400 mr-2" />,
    "Webinar Host": <MonitorPlayIcon className="w-5 h-5 text-cyan-400 mr-2" />,
    "Trainer & Facilitator": <GraduationCapIcon className="w-5 h-5 text-cyan-400 mr-2" />,
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {portfolio.engagements.map((item, index) => (
        <AnimatedSection
          key={index}
          animation="fade-up"
          delay={100 * (index + 1)}
        >
          <div className="p-4 sm:p-6 rounded-xl shadow bg-zinc-900/70 border border-zinc-800 backdrop-blur-sm flex flex-col">
            <div className="flex items-center mb-2">
              {iconMap[item.title] || <MicIcon className="w-5 h-5 text-cyan-400 mr-2" />}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-zinc-400">{item.organization}</p>
            <p className="mt-2 text-zinc-300">{item.description}</p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  )
}
