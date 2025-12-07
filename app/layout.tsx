import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tech Tutor - AI-Powered Coding & DSA Learning",
  description:
    "Master coding and data structures with personalized AI tutoring, adaptive quizzes, and intelligent progress tracking.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
