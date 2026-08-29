"use client"

import Image from "next/image"
import { useRef, useState, type KeyboardEvent } from "react"
import { Check, Expand, Layers3, MessageCircleQuestion, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PrototypeScreenshot {
  src: string
  width: number
  height: number
  label: string
  alt: string
  caption: string
}

const prototypeScreenshots: PrototypeScreenshot[] = [
  {
    src: "/images/projects/sales-enablement/thumbnailsales.png",
    width: 1459,
    height: 816,
    label: "Introduction",
    alt: "Opening screen of the Client Inquiry Simulation with a laptop conversation interface and a start button",
    caption:
      "Opening screen of the Client Inquiry Simulation, where learners practise moving a potential client from an initial inquiry toward a clear next step.",
  },
  {
    src: "/images/projects/sales-enablement/sales2.png",
    width: 1456,
    height: 816,
    label: "Scenario Setup",
    alt: "Incoming Client Inquiry screen showing a new digital message from a prospective client asking about training options",
    caption:
      "Introduces the incoming client inquiry and asks the learner to review the context before responding.",
  },
  {
    src: "/images/projects/sales-enablement/sales3.png",
    width: 1461,
    height: 818,
    label: "How It Works",
    alt: "How Your Choices Are Scored screen showing the need accuracy, client trust, and next-step readiness criteria",
    caption:
      "Explains how each decision affects need accuracy, client trust, and readiness for a clear next step.",
  },
]

const authoringScreenshot: PrototypeScreenshot = {
  src: "/images/projects/sales-enablement/sales1.png",
  width: 1919,
  height: 1032,
  label: "Storyline authoring workspace",
  alt: "Articulate Storyline authoring workspace for the Meet Coach Earl slide, including the timeline, triggers, layers, and scene thumbnails",
  caption:
    "Articulate Storyline authoring workspace showing the slide timeline, triggers, layers, and animated elements used to construct the prototype.",
}

const metadata = [
  { label: "Tool", value: "Articulate Storyline" },
  { label: "Format", value: "Scenario-based performance simulation" },
  { label: "Estimated duration", value: "15 minutes" },
  { label: "Status", value: "Functional prototype in development" },
]

const buildEvidence = [
  {
    title: "Interaction Logic",
    description: "Triggers control navigation, animation, learner choices, and feedback behavior.",
    icon: Workflow,
  },
  {
    title: "Visual States and Layers",
    description:
      "States and slide layers support changing interface conditions without interrupting the scenario.",
    icon: Layers3,
  },
  {
    title: "Guided Reflection",
    description:
      "Coach Earl helps learners interpret the consequences of their choices rather than simply marking answers as correct or incorrect.",
    icon: MessageCircleQuestion,
  },
]

const learningDesignCards = [
  {
    title: "What the Learner Does",
    description:
      "Responds to a realistic inquiry, gathers client needs, communicates value, handles concerns, and guides the conversation toward an appropriate next step.",
  },
  {
    title: "What I Designed",
    description:
      "The scenario structure, interface, response choices, coach guidance, feedback layers, interaction logic, animations, and visual system.",
  },
  {
    title: "Why This Approach",
    description:
      "Conversation skills require judgement and practice. A scenario-based simulation allows employees to test decisions safely and receive immediate, contextual feedback.",
  },
]

export function SalesEnablementPrototype() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [enlargedScreenshot, setEnlargedScreenshot] = useState<PrototypeScreenshot | null>(null)
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedScreenshot = prototypeScreenshots[selectedIndex]

  const selectThumbnail = (index: number, moveFocus = false) => {
    setSelectedIndex(index)

    if (moveFocus) {
      thumbnailRefs.current[index]?.focus()
      thumbnailRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center" })
    }
  }

  const handleThumbnailKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % prototypeScreenshots.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + prototypeScreenshots.length) % prototypeScreenshots.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = prototypeScreenshots.length - 1
    }

    if (nextIndex !== undefined) {
      event.preventDefault()
      selectThumbnail(nextIndex, true)
    }
  }

  return (
    <Card className="border-border bg-card/90 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured Prototype</p>
          <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
            Client Inquiry Conversation Simulation
          </h2>
          <p className="mt-3 text-sm leading-6 text-foreground-secondary sm:text-base sm:leading-7">
            The Storyline prototype allows client-facing employees to practise guiding a realistic inquiry from initial
            contact toward a clear next step. Learners must understand the client’s needs, communicate relevant value,
            respond thoughtfully, and reflect on how each decision affects the conversation.
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {metadata.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-surface-inset/70 p-3">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-wide text-primary">{item.label}</dt>
              <dd className="mt-1.5 text-sm leading-5 text-foreground-secondary">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <figure
            id="prototype-featured-image"
            className="overflow-hidden rounded-xl border border-border-strong bg-background-elevated shadow-2xl shadow-black/30"
          >
            <button
              type="button"
              className="group relative block aspect-video w-full overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              onClick={() => setEnlargedScreenshot(selectedScreenshot)}
              aria-label={`Enlarge ${selectedScreenshot.label} screenshot`}
            >
              <Image
                key={selectedScreenshot.src}
                src={selectedScreenshot.src}
                alt={selectedScreenshot.alt}
                fill
                priority
                sizes="(min-width: 1400px) 1320px, (min-width: 1024px) calc(100vw - 64px), calc(100vw - 32px)"
                className="object-contain"
              />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-100 shadow-sm sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                Enlarge
              </span>
            </button>
            <figcaption
              className="border-t border-border px-4 py-3 text-xs leading-5 text-foreground-secondary sm:text-sm"
              aria-live="polite"
            >
              {selectedScreenshot.caption}
            </figcaption>
          </figure>

          {prototypeScreenshots.length > 1 && (
            <div
              className="mt-3 flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-thin"
              role="group"
              aria-label="Choose a prototype screenshot"
            >
              {prototypeScreenshots.map((screenshot, index) => {
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={screenshot.src}
                    ref={(element) => {
                      thumbnailRefs.current[index] = element
                    }}
                    type="button"
                    aria-label={`Show ${screenshot.label} screenshot`}
                    aria-pressed={isSelected}
                    aria-controls="prototype-featured-image"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => selectThumbnail(index)}
                    onKeyDown={(event) => handleThumbnailKeyDown(event, index)}
                    className={`w-36 shrink-0 snap-start rounded-lg border p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-44 ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-surface-inset/70 hover:border-border-strong hover:bg-surface-raised"
                    }`}
                  >
                    <span className="relative block aspect-video overflow-hidden rounded bg-white">
                      <Image
                        src={screenshot.src}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="176px"
                        className="object-contain"
                      />
                    </span>
                    <span className="mt-2 flex min-h-5 items-center justify-between gap-2 px-0.5 text-xs font-medium text-foreground">
                      {screenshot.label}
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-primary-hover">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Selected
                        </span>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-border pt-7 sm:mt-10 sm:pt-9">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Development Evidence</p>
            <h3 className="mt-2 text-lg font-bold text-foreground sm:text-2xl">Inside the Storyline Build</h3>
          </div>

          <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)] xl:gap-6">
            <figure className="overflow-hidden rounded-lg border border-border-strong bg-background-elevated shadow-xl shadow-black/20">
              <button
                type="button"
                className="group relative block w-full bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                onClick={() => setEnlargedScreenshot(authoringScreenshot)}
                aria-label="Enlarge the Articulate Storyline authoring workspace screenshot"
              >
                <Image
                  src={authoringScreenshot.src}
                  alt={authoringScreenshot.alt}
                  width={authoringScreenshot.width}
                  height={authoringScreenshot.height}
                  loading="lazy"
                  sizes="(min-width: 1280px) 800px, calc(100vw - 48px)"
                  className="h-auto w-full object-contain"
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-100 shadow-sm sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  Enlarge
                </span>
              </button>
              <figcaption className="border-t border-border px-4 py-3 text-xs leading-5 text-foreground-secondary sm:text-sm">
                {authoringScreenshot.caption}
              </figcaption>
            </figure>

            <div>
              <p className="text-sm leading-6 text-foreground-secondary sm:text-base sm:leading-7">
                The prototype was developed in Articulate Storyline using slide triggers, timeline-based animations,
                object states, layers, motion paths, and conditional feedback. The authoring view demonstrates how the
                finished learner experience was constructed and controlled behind the scenes.
              </p>

              <div className="mt-5 space-y-3">
                {buildEvidence.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="rounded-lg border border-border bg-surface-inset/70 p-4">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary-hover">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-foreground-secondary">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 sm:mt-10 sm:gap-4">
          {learningDesignCards.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-surface-inset/70 p-4 sm:p-5">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={Boolean(enlargedScreenshot)} onOpenChange={(open) => !open && setEnlargedScreenshot(null)}>
        {enlargedScreenshot && (
          <DialogContent className="max-h-[96vh] max-w-[96vw] gap-3 overflow-y-auto border-border-strong bg-background-elevated p-3 sm:p-5 lg:max-w-6xl">
            <DialogHeader className="pr-10 text-left">
              <DialogTitle>{enlargedScreenshot.label}</DialogTitle>
              <DialogDescription>{enlargedScreenshot.caption}</DialogDescription>
            </DialogHeader>
            <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
              <Image
                src={enlargedScreenshot.src}
                alt={enlargedScreenshot.alt}
                width={enlargedScreenshot.width}
                height={enlargedScreenshot.height}
                sizes="96vw"
                className="max-h-[78vh] h-auto w-auto max-w-full object-contain"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Card>
  )
}
