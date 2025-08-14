"use client"

import { useState } from "react"
import { mockEvents } from "@/lib/mock-events"
import { EventCard } from "@/components/events/event-card"
import { EventCategories } from "@/components/events/event-categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Search, MapPin } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === null || event.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const featuredEvents = filteredEvents.filter((event) => event.featured)
  const regularEvents = filteredEvents.filter((event) => !event.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">EventHub</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing <span className="text-primary">Local Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From community gatherings to exciting workshops, find events that bring people together
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events, locations, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <EventCategories selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
            {selectedCategory && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Featured Events
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Regular Events */}
        {regularEvents.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {featuredEvents.length > 0 ? "More Events" : "All Events"}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or category filter to find more events.</p>
            <Button
              onClick={() => {
                setSelectedCategory(null)
                setSearchQuery("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
