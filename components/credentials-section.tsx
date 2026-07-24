"use client"

import Image from "next/image"
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react"
import { Award, BadgeCheck, ChartNoAxesCombined, GraduationCap, ShieldCheck } from "lucide-react"
import { getCredentialsInfo } from "@/lib/data"

type CredentialMarkProps = {
  logo: string
  type: "education" | "professional"
}

function CredentialMark({ logo, type }: CredentialMarkProps) {
  const FallbackIcon = type === "education" ? GraduationCap : Award

  return (
    <div
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-strong/70 bg-surface-raised ${
        logo ? "" : "text-foreground-subtle"
      }`}
    >
      {logo ? (
        <Image src={logo} alt="" fill sizes="36px" className="object-contain p-1.5" />
      ) : (
        <FallbackIcon aria-hidden="true" className="h-4 w-4" />
      )}
    </div>
  )
}

type EducationEntryProps = {
  title: string
  institution: string
  year: string
  logo: string
  status?: string
}

function EducationEntry({ title, institution, year, logo, status }: EducationEntryProps) {
  return (
    <article className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-3 rounded-md bg-surface-inset/35 px-3 py-3">
      <CredentialMark logo={logo} type="education" />
      <div className="min-w-0">
        <h4 className="text-sm font-semibold leading-[1.4] text-foreground">{title}</h4>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{institution}</p>
        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-xs leading-5 text-foreground-secondary">{year}</p>
          {status && (
            <span className="inline-flex min-h-5 items-center rounded-full border border-primary/30 bg-primary/[0.07] px-2 py-0.5 text-[11px] font-semibold capitalize leading-none text-primary">
              {status}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

type CredentialEntryProps = {
  title: string
  issuer: string
  date: string
  logo: string
}

function CredentialEntry({ title, issuer, date, logo }: CredentialEntryProps) {
  return (
    <article className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-3 py-2.5">
      <CredentialMark logo={logo} type="professional" />
      <div className="min-w-0">
        <h4 className="text-sm font-semibold leading-[1.4] text-foreground">{title}</h4>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          <span className="text-foreground-secondary">{issuer}</span>
          <span aria-hidden="true"> · </span>
          {date}
        </p>
      </div>
    </article>
  )
}

export function CredentialsSection() {
  const credentialsInfo = getCredentialsInfo()
  const safetyAndEmergencyResponse = credentialsInfo.certifications.filter((item) =>
    ["Safety Practice", "Emergency Response", "Occupational Health"].includes(item.relevance),
  )
  const qualityAndCompliance = credentialsInfo.certifications.filter(
    (item) => item.relevance === "Quality Management",
  )
  const dataAndDigitalSystems = credentialsInfo.certifications.filter(
    (item) => item.relevance === "Data & Analytics",
  )
  const categories = [
    {
      id: "education",
      label: "Education",
      count: credentialsInfo.education.length,
      icon: GraduationCap,
      context: "Formal academic preparation supporting technical and professional work.",
      activeIconClass: "text-primary",
      badgeClass: "border-primary/25 bg-primary/10 text-primary",
      indicatorSurfaceClass: "bg-primary/[0.07]",
      indicatorLineClass: "bg-primary",
      panelTintClass: "from-primary/[0.045]",
    },
    {
      id: "safety",
      label: "Safety & Emergency Response",
      count: safetyAndEmergencyResponse.length,
      icon: ShieldCheck,
      context:
        "Training and qualifications supporting occupational safety, emergency readiness, and workplace health.",
      activeIconClass: "text-amber-400",
      badgeClass: "border-amber-400/25 bg-amber-400/10 text-amber-300",
      indicatorSurfaceClass: "bg-amber-400/[0.07]",
      indicatorLineClass: "bg-amber-400",
      panelTintClass: "from-amber-400/[0.04]",
    },
    {
      id: "quality",
      label: "Quality & Compliance",
      count: qualityAndCompliance.length,
      icon: BadgeCheck,
      context: "Credentials supporting audit discipline, quality systems, and continuous improvement.",
      activeIconClass: "text-red-400",
      badgeClass: "border-red-400/25 bg-red-400/10 text-red-300",
      indicatorSurfaceClass: "bg-red-400/[0.07]",
      indicatorLineClass: "bg-red-400",
      panelTintClass: "from-red-400/[0.04]",
    },
    {
      id: "data",
      label: "Data & Digital Systems",
      count: dataAndDigitalSystems.length,
      icon: ChartNoAxesCombined,
      context: "Training supporting analytical thinking, digital tools, and data-informed decision-making.",
      activeIconClass: "text-indigo-400",
      badgeClass: "border-indigo-400/25 bg-indigo-400/10 text-indigo-300",
      indicatorSurfaceClass: "bg-indigo-400/[0.07]",
      indicatorLineClass: "bg-indigo-400",
      panelTintClass: "from-indigo-400/[0.04]",
    },
  ] as const

  const [activeIndex, setActiveIndex] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({ opacity: 0 })
  const tablistRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeCategory = categories[activeIndex]
  const ActiveCategoryIcon = activeCategory.icon

  const updateIndicator = useCallback(() => {
    const tablist = tablistRef.current
    const tab = tabRefs.current[activeIndex]
    if (!tablist || !tab) return

    setIndicatorStyle({
      width: tab.offsetWidth,
      height: tab.offsetHeight,
      transform: `translate3d(${tab.offsetLeft}px, ${tab.offsetTop}px, 0)`,
      opacity: 1,
    })
  }, [activeIndex])

  useLayoutEffect(() => {
    updateIndicator()
    const tablist = tablistRef.current
    if (!tablist) return

    const observer = new ResizeObserver(updateIndicator)
    observer.observe(tablist)
    return () => observer.disconnect()
  }, [updateIndicator])

  const selectAndFocus = (index: number) => {
    const nextIndex = (index + categories.length) % categories.length
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index + 1
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index - 1
    if (event.key === "Home") nextIndex = 0
    if (event.key === "End") nextIndex = categories.length - 1

    if (nextIndex !== null) {
      event.preventDefault()
      selectAndFocus(nextIndex)
    }
  }

  return (
    <div className="border-y border-border/80 px-1 py-7 sm:px-2 sm:py-8">
      <header className="flex min-w-0 items-start">
        <Award aria-hidden="true" className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Selected Credentials</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Formal education, professional qualifications, and continuing development across safety, learning,
            systems, and operations.
          </p>
        </div>
      </header>

      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Credential categories"
        className="relative mt-6 grid min-w-0 grid-cols-2 gap-1 rounded-lg border border-border-strong/70 bg-surface-inset/35 p-1 lg:grid-cols-4"
      >
        <span
          aria-hidden="true"
          style={indicatorStyle}
          className={`pointer-events-none absolute left-0 top-0 overflow-hidden rounded-md transition-[width,height,transform,opacity,background-color] duration-200 ease-out motion-reduce:transition-none ${activeCategory.indicatorSurfaceClass}`}
        >
          <span
            className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full ${activeCategory.indicatorLineClass}`}
          />
        </span>
        {categories.map((category, index) => {
          const isActive = index === activeIndex
          const Icon = category.icon
          return (
            <button
              key={category.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              id={`credential-tab-${category.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="credential-category-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`relative z-10 flex min-h-11 min-w-0 items-center gap-2 rounded-md px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none ${
                isActive ? "text-foreground" : "text-foreground-secondary hover:bg-surface-raised/35 hover:text-foreground"
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 transition-colors motion-reduce:transition-none ${
                  isActive ? category.activeIconClass : "text-foreground-subtle"
                }`}
              />
              <span className="min-w-0 flex-1 text-xs font-semibold leading-snug sm:text-sm">
                {category.label}
              </span>
              <span
                className={`inline-flex min-h-6 min-w-7 shrink-0 items-center justify-center rounded-full border px-1.5 text-[11px] font-semibold tabular-nums ${
                  isActive
                    ? category.badgeClass
                    : "border-border-strong/70 bg-background/25 text-foreground-subtle"
                }`}
                aria-label={`${category.count} credentials`}
              >
                {String(category.count).padStart(2, "0")}
              </span>
            </button>
          )
        })}
      </div>

      <div
        id="credential-category-panel"
        role="tabpanel"
        aria-labelledby={`credential-tab-${activeCategory.id}`}
        tabIndex={0}
        className="relative mt-3 min-w-0 overflow-hidden rounded-lg border border-border-strong/70 bg-surface/70 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b to-transparent ${activeCategory.panelTintClass}`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-px ${activeCategory.indicatorLineClass} opacity-45`}
        />
        <div
          key={activeCategory.id}
          className="relative animate-in fade-in-50 slide-in-from-bottom-1 duration-200 motion-reduce:animate-none"
        >
          <div className="mb-3 flex items-start gap-3 border-b border-border/70 pb-3">
            <ActiveCategoryIcon
              aria-hidden="true"
              className={`mt-0.5 h-4 w-4 shrink-0 ${activeCategory.activeIconClass}`}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-foreground">{activeCategory.label}</h3>
              <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">{activeCategory.context}</p>
            </div>
            <span
              className={`inline-flex min-h-6 min-w-7 shrink-0 items-center justify-center rounded-full border px-1.5 text-[11px] font-semibold tabular-nums ${activeCategory.badgeClass}`}
              aria-label={`${activeCategory.count} credentials`}
            >
              {String(activeCategory.count).padStart(2, "0")}
            </span>
          </div>

          {activeCategory.id === "education" && (
            <div className="grid min-w-0 gap-x-5 divide-y divide-border/70 md:grid-cols-2 md:divide-y-0 xl:grid-cols-3">
              {credentialsInfo.education.map((item) => (
                <EducationEntry
                  key={item.degree}
                  title={item.degree}
                  institution={item.institution}
                  year={item.year}
                  logo={item.logo}
                  status={item.status || undefined}
                />
              ))}
            </div>
          )}

          {activeCategory.id === "safety" && (
            <div className="grid min-w-0 gap-x-6 divide-y divide-border/70 md:grid-cols-2 md:divide-y-0">
              {safetyAndEmergencyResponse.map((item) => (
                <CredentialEntry
                  key={item.name}
                  title={item.name}
                  issuer={item.issuer}
                  date={item.date}
                  logo={item.logo}
                />
              ))}
            </div>
          )}

          {activeCategory.id === "quality" && (
            <div className="max-w-2xl">
              {qualityAndCompliance.map((item) => (
                <CredentialEntry
                  key={item.name}
                  title={item.name}
                  issuer={item.issuer}
                  date={item.date}
                  logo={item.logo}
                />
              ))}
            </div>
          )}

          {activeCategory.id === "data" && (
            <div className="max-w-2xl">
              {dataAndDigitalSystems.map((item) => (
                <CredentialEntry
                  key={item.name}
                  title={item.name}
                  issuer={item.issuer}
                  date={item.date}
                  logo={item.logo}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <noscript>
        <div className="mt-4 space-y-5 rounded-lg border border-border-strong/70 bg-surface/70 p-4">
          <section>
            <h3 className="text-sm font-semibold text-foreground">Education</h3>
            <ul className="mt-2 space-y-2">
              {credentialsInfo.education.map((item) => (
                <li key={item.degree} className="text-sm leading-6 text-foreground-secondary">
                  <span className="font-medium text-foreground">{item.degree}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    — {item.institution} · {item.year}
                    {item.status ? ` · ${item.status}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {[
            { title: "Safety & Emergency Response", credentials: safetyAndEmergencyResponse },
            { title: "Quality & Compliance", credentials: qualityAndCompliance },
            { title: "Data & Digital Systems", credentials: dataAndDigitalSystems },
          ].map((group) => (
            <section key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-2 space-y-2">
                {group.credentials.map((item) => (
                  <li key={item.name} className="text-sm leading-6 text-foreground-secondary">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — {item.issuer} · {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </noscript>
    </div>
  )
}
