"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Search, Users, Settings, MapPin, Bell } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Browse Events",
      description: "Discover new events in your area",
      icon: Search,
      href: "/events",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Find Nearby",
      description: "Events happening close to you",
      icon: MapPin,
      href: "/events?location=nearby",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Community Events",
      description: "Join local community activities",
      icon: Users,
      href: "/events?category=community",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "My Calendar",
      description: "View your event schedule",
      icon: Calendar,
      href: "/dashboard/calendar",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Notifications",
      description: "Manage event reminders",
      icon: Bell,
      href: "/dashboard/notifications",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Profile Settings",
      description: "Update your preferences",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow bg-transparent"
              >
                <div className={`p-2 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
