"use client"

import { mockEvents } from "@/lib/mock-events"
import { useRegistration } from "@/contexts/registration-context"
import { EventCard } from "@/components/events/event-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

export function RegisteredEvents() {
  const { getUserRegistrations } = useRegistration()
  const registrations = getUserRegistrations()

  const registeredEvents = mockEvents.filter((event) =>
    registrations.some((reg) => reg.eventId === event.id && reg.status === "confirmed"),
  )

  const now = new Date()
  const upcomingEvents = registeredEvents.filter((event) => new Date(event.date) >= now)
  const pastEvents = registeredEvents.filter((event) => new Date(event.date) < now)

  if (registeredEvents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            My Events
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-muted-foreground mb-4">
            <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No events registered yet</p>
            <p className="text-sm">Discover amazing local events and start connecting with your community!</p>
          </div>
          <Link href="/events">
            <Button>Browse Events</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Events ({upcomingEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingEvents.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} showRegisterButton={false} />
              ))}
            </div>
            {upcomingEvents.length > 4 && (
              <div className="mt-4 text-center">
                <Link href="/dashboard/events">
                  <Button variant="outline">View All Upcoming Events</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Past Events ({pastEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {pastEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} showRegisterButton={false} />
              ))}
            </div>
            {pastEvents.length > 2 && (
              <div className="mt-4 text-center">
                <Link href="/dashboard/events">
                  <Button variant="outline">View All Past Events</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
