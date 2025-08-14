import { EventCalendar } from "@/components/events/event-calendar"

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Calendar</h1>
          <p className="text-gray-600">View all events in a monthly calendar format</p>
        </div>

        <EventCalendar />
      </div>
    </div>
  )
}
