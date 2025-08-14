"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, LogOut, User, Bell, Shield } from "lucide-react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RegisteredEvents } from "@/components/dashboard/registered-events"
import { EventRecommendations } from "@/components/dashboard/event-recommendations"
import { QuickActions } from "@/components/dashboard/quick-actions"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-primary">EventHub</h1>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/events">
                <Button variant="ghost" size="sm" className="text-xs">
                  Events
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">EventHub</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/events">
                <Button variant="ghost">Browse Events</Button>
              </Link>
              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="ghost">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              )}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Welcome, {user.name}!</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your events and discover new opportunities in your community
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Stats Overview */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Events */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <RegisteredEvents />
              <EventRecommendations />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Name</p>
                    <p className="font-medium text-sm sm:text-base">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm sm:text-base break-all">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Account Type</p>
                    <p className="font-medium capitalize flex items-center gap-2 text-sm sm:text-base">
                      {user.role}
                      {user.role === "admin" && <Shield className="h-4 w-4 text-primary" />}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full bg-transparent text-xs sm:text-sm">
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                      <div>
                        <p className="font-medium">Welcome to EventHub!</p>
                        <p className="text-muted-foreground">Start exploring local events</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <p className="font-medium">Profile created</p>
                        <p className="text-muted-foreground">Your account is ready to use</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Button variant="outline" size="sm" className="w-full bg-transparent text-xs sm:text-sm">
                      View All Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
