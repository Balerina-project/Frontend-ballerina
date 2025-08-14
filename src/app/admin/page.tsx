"use client"

import { AdminGuard } from "@/components/admin/admin-guard"
import { AdminStats } from "@/components/admin/admin-stats"
import { EventManagementTable } from "@/components/admin/event-management-table"
import { UserManagement } from "@/components/admin/user-management"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, LogOut, Settings, BarChart3, Users, Plus } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">EventHub</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">User Dashboard</Button>
              </Link>
              <Link href="/events">
                <Button variant="ghost">Browse Events</Button>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Settings className="h-4 w-4" />
                <span>Admin: {user?.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Manage events, users, and monitor platform activity</p>
          </div>

          <div className="space-y-8">
            {/* Stats Overview */}
            <AdminStats />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Plus className="h-6 w-6" />
                    <span>Create Event</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                    <Users className="h-6 w-6" />
                    <span>Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                    <BarChart3 className="h-6 w-6" />
                    <span>View Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                    <Settings className="h-6 w-6" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Management */}
            <EventManagementTable />

            {/* User Management */}
            <UserManagement />

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">New user registration</p>
                      <p className="text-sm text-muted-foreground">Sarah Wilson joined the platform</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Event registration</p>
                      <p className="text-sm text-muted-foreground">
                        5 new registrations for "Community Garden Cleanup"
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">4 hours ago</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Event created</p>
                      <p className="text-sm text-muted-foreground">New workshop "Pottery Making" was published</p>
                    </div>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
