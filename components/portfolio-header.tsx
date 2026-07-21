"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getNavItems, getPersonalInfo } from "@/lib/data"

export function PortfolioHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const navItems = getNavItems()
  const personalInfo = getPersonalInfo()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Get all section IDs (strip the leading "#")
      const sections = navItems.filter((item) => item.href.startsWith("#")).map((item) => item.href.substring(1))

      // Find the current section in view
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "border-b border-border bg-background-elevated/90 backdrop-blur-md shadow-md py-2" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo/Name */}
        <Link href="/" className="flex items-center group">
          <div className="text-primary font-bold text-xl relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            {personalInfo.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </div>
          <span className="text-muted-foreground text-sm ml-2 hidden sm:inline-block transition-all duration-300 group-hover:text-foreground-secondary">
            / Safety, Learning &amp; Systems Professional
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const target =
              item.href === "/projects"
                ? item.href
                : item.href.startsWith("/")
                  ? `#${item.href.replace("/", "")}`
                  : item.href
            const isActive = target === "#" ? activeSection === "" : activeSection === target.substring(1)

            return (
              <a
                key={item.label}
                href={target}
                className={cn(
                  "px-3 py-2 text-sm relative group transition-all duration-300",
                  isActive ? "font-medium text-primary" : "text-muted-foreground hover:text-primary-hover",
                )}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 rounded-md bg-primary/0 group-hover:bg-primary/10 transition-all duration-300"></span>
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4/5",
                    isActive && "w-4/5",
                  )}
                ></span>
              </a>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-muted-foreground hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-300 relative overflow-hidden group"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="relative z-10">{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</span>
          <span className="absolute inset-0 scale-0 rounded-full bg-surface-raised/70 group-hover:scale-100 transition-transform duration-300"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 z-40 flex flex-col pt-20 px-4 md:hidden transition-all duration-500",
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
        )}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map((item, index) => {
            const target =
              item.href === "/projects"
                ? item.href
                : item.href.startsWith("/")
                  ? `#${item.href.replace("/", "")}`
                  : item.href
            const isActive = target === "#" ? activeSection === "" : activeSection === target.substring(1)

            return (
              <a
                key={item.label}
                href={target}
                className={cn(
                  "px-3 py-4 text-lg border-b border-border relative group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "font-medium text-primary border-primary/30" : "text-foreground-secondary hover:text-primary-hover hover:pl-5",
                )}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1/2 bg-primary/40 transition-all duration-300 group-hover:w-1",
                    isActive && "w-1",
                  )}
                ></span>
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
