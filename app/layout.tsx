import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SLERF Token Dashboard - Mini Game",
  description: "Interactive SLERF token dashboard with mini coin-clicking game",
  keywords: "SLERF, token, dashboard, crypto, Base chain, DEXTools",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-yellow-50 to-yellow-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
