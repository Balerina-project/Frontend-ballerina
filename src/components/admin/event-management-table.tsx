"use client"

import { useState } from "react"
import { mockEvents } from "@/lib/mock-events"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Users, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EventManagementTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [events, setEvents] = useState(mockEvents)
  const { toast } = useToast()

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    toast({
      title: "Event deleted",
      description: "The event has been successfully removed.",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      community: "bg-green-100 text-green-800",
      sports: "bg-blue-100 text-blue-800",
      workshop: "bg-purple-100 text-purple-800",
      concert: "bg-red-100 text-red-800",
      performance: "bg-yellow-100 text-yellow-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <CardTitle className="text-base sm:text-lg">Event Management</CardTitle>
          <Button size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
            Create New Event
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 text-xs sm:text-sm"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Event</TableHead>
                <TableHead className="min-w-[100px]">Category</TableHead>
                <TableHead className="min-w-[120px]">Date</TableHead>
                <TableHead className="min-w-[150px] hidden sm:table-cell">Location</TableHead>
                <TableHead className="min-w-[120px]">Attendees</TableHead>
                <TableHead className="min-w-[80px] hidden md:table-cell">Price</TableHead>
                <TableHead className="min-w-[100px] hidden lg:table-cell">Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => {
                const spotsLeft = event.maxAttendees - event.currentAttendees
                const isFull = spotsLeft <= 0
                const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0

                return (
                  <TableRow key={event.id}>
                    <TableCell className="min-w-[200px]">
                      <div>
                        <div className="font-medium text-xs sm:text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground">by {event.organizer.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[100px]">
                      <Badge className={`${getCategoryColor(event.category)} text-xs`}>{event.category}</Badge>
                    </TableCell>
                    <TableCell className="min-w-[120px]">
                      <div>
                        <div className="text-xs sm:text-sm">{formatDate(event.date)}</div>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[150px] hidden sm:table-cell">
                      <div className="max-w-[150px] truncate text-xs sm:text-sm">{event.location}</div>
                    </TableCell>
                    <TableCell className="min-w-[120px]">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                        <span className="text-xs sm:text-sm whitespace-nowrap">
                          {event.currentAttendees}/{event.maxAttendees}
                        </span>
                        {isAlmostFull && (
                          <Badge
                            variant="outline"
                            className="text-orange-600 border-orange-600 text-xs hidden md:inline-flex"
                          >
                            Almost Full
                          </Badge>
                        )}
                        {isFull && (
                          <Badge variant="destructive" className="text-xs">
                            Full
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[80px] hidden md:table-cell">
                      <div className="font-medium text-xs sm:text-sm">
                        {event.price === 0 ? "Free" : `$${event.price}`}
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[100px] hidden lg:table-cell">
                      <Badge variant={new Date(event.date) >= new Date() ? "default" : "secondary"} className="text-xs">
                        {new Date(event.date) >= new Date() ? "Upcoming" : "Past"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                            <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Eye className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            View Registrations
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 text-xs sm:text-sm"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <p className="text-muted-foreground text-sm">No events found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
