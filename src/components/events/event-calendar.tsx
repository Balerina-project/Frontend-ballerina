"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { mockEvents } from "@/lib/mock-events"

export function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base sm:text-lg">Event Calendar</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <span className="font-semibold min-w-[120px] sm:min-w-[140px] text-center text-sm sm:text-base">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2 sm:mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-muted-foreground">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {emptyDays.map((day) => (
            <div key={`empty-${day}`} className="p-1 sm:p-2 h-12 sm:h-16 md:h-20" />
          ))}
          {days.map((day) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const events = getEventsForDate(date)
            const isToday = date.toDateString() === new Date().toDateString()

            return (
              <div
                key={day}
                className={`p-0.5 sm:p-1 h-12 sm:h-16 md:h-20 border rounded-sm sm:rounded-lg ${
                  isToday ? "bg-primary/10 border-primary" : "border-gray-200"
                } hover:bg-gray-50 cursor-pointer`}
              >
                <div className={`text-xs sm:text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</div>
                <div className="space-y-0.5 sm:space-y-1 mt-0.5 sm:mt-1">
                  {events.slice(0, window.innerWidth < 640 ? 1 : 2).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-0.5 sm:p-1 bg-primary/20 text-primary rounded truncate"
                      title={event.title}
                    >
                      <span className="hidden sm:inline">{event.title}</span>
                      <span className="sm:hidden">•</span>
                    </div>
                  ))}
                  {events.length > (window.innerWidth < 640 ? 1 : 2) && (
                    <div className="text-xs text-muted-foreground">
                      <span className="hidden sm:inline">+{events.length - 2} more</span>
                      <span className="sm:hidden">+{events.length - 1}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
