"use client"

import { useState } from "react"
import { mockEvents } from "@/lib/mock-events"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useRegistration } from "@/contexts/registration-context"
import { RegistrationDialog } from "@/components/events/registration-dialog"
import { useToast } from "@/hooks/use-toast"

interface EventDetailPageProps {
  params: {
    id: string
  }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false)
  const { user } = useAuth()
  const { registerForEvent, unregisterFromEvent, isRegisteredForEvent, isLoading } = useRegistration()
  const { toast } = useToast()
  const router = useRouter()

  const event = mockEvents.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  const isRegistered = isRegisteredForEvent(event.id)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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

  const spotsLeft = event.maxAttendees - event.currentAttendees
  const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0
  const isFull = spotsLeft <= 0

  const handleRegisterClick = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to register for events.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (isRegistered) {
      handleUnregister()
    } else {
      setShowRegistrationDialog(true)
    }
  }

  const handleConfirmRegistration = async () => {
    const success = await registerForEvent(event.id)

    if (success) {
      toast({
        title: "Registration successful!",
        description: `You're now registered for ${event.title}`,
      })
      setShowRegistrationDialog(false)
    } else {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleUnregister = async () => {
    const success = await unregisterFromEvent(event.id)

    if (success) {
      toast({
        title: "Unregistered successfully",
        description: `You've been removed from ${event.title}`,
      })
    } else {
      toast({
        title: "Failed to unregister",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">EventHub</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/events">
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Event Header */}
            <div className="mb-8">
              <div className="relative mb-6">
                <Image
                  src={event.imageUrl || "/placeholder.svg"}
                  alt={event.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
                {event.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured Event
                    </Badge>
                  </div>
                )}
                {isRegistered && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      You're Registered
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                    {event.price === 0 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Free Event
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
                  <p className="text-lg text-gray-600">{event.description}</p>
                </div>

                <div className="md:text-right">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </div>
                  <Button
                    size="lg"
                    disabled={isFull || isLoading}
                    onClick={handleRegisterClick}
                    variant={isRegistered ? "secondary" : "default"}
                    className="w-full md:w-auto"
                  >
                    {isLoading ? "Processing..." : isRegistered ? "Unregister" : isFull ? "Event Full" : "Register Now"}
                  </Button>
                  {isAlmostFull && !isRegistered && (
                    <p className="text-sm text-orange-600 mt-2">Only {spotsLeft} spots left!</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Event Details */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{formatDate(event.date)}</p>
                        <p className="text-sm text-muted-foreground">Date</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{event.time}</p>
                        <p className="text-sm text-muted-foreground">Start Time</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{event.location}</p>
                        <p className="text-sm text-muted-foreground">{event.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">
                          {event.currentAttendees} / {event.maxAttendees} attending
                        </p>
                        <p className="text-sm text-muted-foreground">Attendees</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="font-semibold">{event.organizer.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${event.organizer.email}`} className="hover:text-primary">
                          {event.organizer.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Share Event
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <RegistrationDialog
        event={event}
        isOpen={showRegistrationDialog}
        onClose={() => setShowRegistrationDialog(false)}
        onConfirm={handleConfirmRegistration}
        isLoading={isLoading}
        isRegistered={isRegistered}
      />
    </>
  )
}
