import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { Toaster } from "@/components/ui/toaster"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "EventHub - Join Your Community",
  description: "Discover, connect, and participate in local events and activities",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          <FavoritesProvider>
            {children}
            <Toaster />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
