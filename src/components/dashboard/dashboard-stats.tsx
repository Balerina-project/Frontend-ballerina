"use client"

import { mockEvents } from "@/lib/mock-events"
import { useRegistration } from "@/contexts/registration-context"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Trophy, Clock } from "lucide-react"

export function DashboardStats() {
  const { getUserRegistrations } = useRegistration()
  const registrations = getUserRegistrations()

  const registeredEvents = mockEvents.filter((event) =>
    registrations.some((reg) => reg.eventId === event.id && reg.status === "confirmed"),
  )

  const now = new Date()
  const upcomingEvents = registeredEvents.filter((event) => new Date(event.date) >= now)
  const pastEvents = registeredEvents.filter((event) => new Date(event.date) < now)

  const totalSpent = registeredEvents.reduce((sum, event) => sum + event.price, 0)
  const favoriteCategory = getFavoriteCategory(registeredEvents)

  function getFavoriteCategory(events: typeof mockEvents) {
    if (events.length === 0) return "None yet"

    const categoryCounts = events.reduce(
      (acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topCategory = Object.entries(categoryCounts).reduce((a, b) =>
      categoryCounts[a[0]] > categoryCounts[b[0]] ? a : b,
    )[0]

    return topCategory.charAt(0).toUpperCase() + topCategory.slice(1)
  }

  const stats = [
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Events Attended",
      value: pastEvents.length,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Spent",
      value: totalSpent === 0 ? "Free" : `$${totalSpent}`,
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Favorite Category",
      value: favoriteCategory,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
