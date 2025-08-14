"use client"

import { mockEvents } from "@/lib/mock-events"
import { useRegistration } from "@/contexts/registration-context"
import { EventCard } from "@/components/events/event-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function EventRecommendations() {
  const { getUserRegistrations } = useRegistration()
  const registrations = getUserRegistrations()

  // Get user's registered event categories for recommendations
  const registeredEventIds = registrations.map((reg) => reg.eventId)
  const registeredEvents = mockEvents.filter((event) => registeredEventIds.includes(event.id))
  const userCategories = [...new Set(registeredEvents.map((event) => event.category))]

  // Recommend events based on user's interests or featured events
  let recommendedEvents = mockEvents.filter((event) => {
    const isNotRegistered = !registeredEventIds.includes(event.id)
    const isUpcoming = new Date(event.date) >= new Date()

    if (userCategories.length > 0) {
      return isNotRegistered && isUpcoming && userCategories.includes(event.category)
    }

    return isNotRegistered && isUpcoming && event.featured
  })

  // If no category-based recommendations, show featured events
  if (recommendedEvents.length === 0) {
    recommendedEvents = mockEvents.filter((event) => {
      const isNotRegistered = !registeredEventIds.includes(event.id)
      const isUpcoming = new Date(event.date) >= new Date()
      return isNotRegistered && isUpcoming
    })
  }

  // Limit to 3 recommendations
  recommendedEvents = recommendedEvents.slice(0, 3)

  if (recommendedEvents.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {recommendedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/events">
            <Button variant="outline">Discover More Events</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
