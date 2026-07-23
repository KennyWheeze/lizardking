import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "lenis/dist/lenis.css"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { SmoothScroll } from "@/components/smooth-scroll"
import { AnimationProvider } from "@/contexts/animation-context"
import { getMetaInfo } from "@/lib/data"

const inter = Inter({ subsets: ["latin"] })

const metaInfo = getMetaInfo()

export const metadata: Metadata = {
  title: metaInfo.siteTitle,
  description: metaInfo.siteDescription,
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimationProvider>
          <SmoothScroll />
          <ScrollProgressIndicator />
          {children}
        </AnimationProvider>
      </body>
    </html>
  )
}
