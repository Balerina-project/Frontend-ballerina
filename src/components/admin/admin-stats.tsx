"use client"

import { mockEvents } from "@/lib/mock-events"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, DollarSign, TrendingUp, Clock, MapPin } from "lucide-react"

export function AdminStats() {
  const now = new Date()
  const upcomingEvents = mockEvents.filter((event) => new Date(event.date) >= now)
  const pastEvents = mockEvents.filter((event) => new Date(event.date) < now)

  const totalAttendees = mockEvents.reduce((sum, event) => sum + event.currentAttendees, 0)
  const totalRevenue = mockEvents.reduce((sum, event) => sum + event.price * event.currentAttendees, 0)
  const averageAttendance = Math.round(totalAttendees / mockEvents.length)

  const categoryStats = mockEvents.reduce(
    (acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topCategory = Object.entries(categoryStats).reduce((a, b) =>
    categoryStats[a[0]] > categoryStats[b[0]] ? a : b,
  )[0]

  const stats = [
    {
      title: "Total Events",
      value: mockEvents.length,
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Attendees",
      value: totalAttendees,
      change: "+23%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      change: "+18%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg. Attendance",
      value: averageAttendance,
      change: "+8%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      change: "Active",
      icon: Clock,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      title: "Top Category",
      value: topCategory.charAt(0).toUpperCase() + topCategory.slice(1),
      change: `${categoryStats[topCategory]} events`,
      icon: MapPin,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-1 rounded ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
