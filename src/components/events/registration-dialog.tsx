"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react"
import type { Event } from "@/types/event"

interface RegistrationDialogProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  isRegistered: boolean
}

export function RegistrationDialog({
  event,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  isRegistered,
}: RegistrationDialogProps) {
  if (!event) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const spotsLeft = event.maxAttendees - event.currentAttendees

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isRegistered ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                You're Registered!
              </>
            ) : (
              "Confirm Registration"
            )}
          </DialogTitle>
          <DialogDescription>
            {isRegistered
              ? "You're all set for this event. We'll send you a reminder before it starts."
              : "Please review the event details before confirming your registration."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <Badge className="mt-1">{event.category}</Badge>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.currentAttendees}/{event.maxAttendees} attending
              </span>
              {spotsLeft <= 5 && spotsLeft > 0 && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  {spotsLeft} spots left
                </Badge>
              )}
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Cost:</span>
              <span className="text-lg font-bold">{event.price === 0 ? "Free" : `$${event.price}`}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto bg-transparent">
            {isRegistered ? "Close" : "Cancel"}
          </Button>
          {!isRegistered && (
            <Button onClick={onConfirm} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Registering..." : "Confirm Registration"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
