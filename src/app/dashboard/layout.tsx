"use client"

import type React from "react"

import { AuthProvider } from "@/contexts/auth-context"
import { RegistrationProvider } from "@/contexts/registration-context"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <RegistrationProvider>
        {children}
        <Toaster />
      </RegistrationProvider>
    </AuthProvider>
  )
}
