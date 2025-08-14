"use client";

import { useState } from "react";
import type { Event } from "@/type/event";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRegistration } from "@/contexts/registration-context";
import { RegistrationDialog } from "./registration-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
  showRegisterButton?: boolean;
}

export function EventCard({
  event,
  showRegisterButton = true,
}: EventCardProps) {
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const { user } = useAuth();
  const {
    registerForEvent,
    unregisterFromEvent,
    isRegisteredForEvent,
    isLoading,
  } = useRegistration();
  const { toast } = useToast();
  const router = useRouter();

  const isRegistered = isRegisteredForEvent(event.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      community: "bg-green-100 text-green-800",
      sports: "bg-blue-100 text-blue-800",
      workshop: "bg-purple-100 text-purple-800",
      concert: "bg-red-100 text-red-800",
      performance: "bg-yellow-100 text-yellow-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const spotsLeft = event.maxAttendees - event.currentAttendees;
  const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;
  const isFull = spotsLeft <= 0;

  const handleRegisterClick = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to register for events.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (isRegistered) {
      handleUnregister();
    } else {
      setShowRegistrationDialog(true);
    }
  };

  const handleConfirmRegistration = async () => {
    const success = await registerForEvent(event.id);

    if (success) {
      toast({
        title: "Registration successful!",
        description: `You're now registered for ${event.title}`,
      });
      setShowRegistrationDialog(false);
    } else {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUnregister = async () => {
    const success = await unregisterFromEvent(event.id);

    if (success) {
      toast({
        title: "Unregistered successfully",
        description: `You've been removed from ${event.title}`,
      });
    } else {
      toast({
        title: "Failed to unregister",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden">
        <div className="relative">
          <Image
            src={event.imageUrl || "/placeholder.svg"}
            alt={event.title}
            width={300}
            height={200}
            className="w-full h-32 sm:h-40 md:h-48 object-cover"
          />
          {event.featured && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <Badge className="bg-accent text-accent-foreground text-xs">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          {event.price === 0 && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 text-xs"
              >
                Free
              </Badge>
            </div>
          )}
          {isRegistered && (
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
              <Badge className="bg-green-600 text-white text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Registered
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <Badge
              className={`${getCategoryColor(event.category)} text-xs shrink-0`}
            >
              {event.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span>{formatDate(event.date)}</span>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 shrink-0" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground flex-wrap">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="whitespace-nowrap">
                {event.currentAttendees}/{event.maxAttendees} attending
              </span>
              {isAlmostFull && (
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-600 text-xs"
                >
                  {spotsLeft} spots left
                </Badge>
              )}
              {isFull && (
                <Badge variant="destructive" className="text-xs">
                  Full
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-2">
            <div className="text-base sm:text-lg font-bold">
              {event.price === 0 ? "Free" : `$${event.price}`}
            </div>
            {showRegisterButton && (
              <div className="flex gap-2 w-full sm:w-auto">
                <Link
                  href={`/events/${event.id}`}
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto text-xs sm:text-sm bg-transparent"
                  >
                    Details
                  </Button>
                </Link>
                <Button
                  size="sm"
                  disabled={isFull || isLoading}
                  onClick={handleRegisterClick}
                  variant={isRegistered ? "secondary" : "default"}
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  {isLoading
                    ? "..."
                    : isRegistered
                    ? "Registered"
                    : isFull
                    ? "Full"
                    : "Register"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <RegistrationDialog
        event={event}
        isOpen={showRegistrationDialog}
        onClose={() => setShowRegistrationDialog(false)}
        onConfirm={handleConfirmRegistration}
        isLoading={isLoading}
        isRegistered={isRegistered}
      />
    </>
  );
}
