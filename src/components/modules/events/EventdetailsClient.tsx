"use client";

import { Event } from "@/types/event";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MapPin, Globe, CalendarDays, User, Users } from "lucide-react";

export default function EventDetailsClient({ event }: { event: Event }) {
  const isFree = event.fee === 0;
  const isFull = event.isFull ?? false;
  const spotsLeft = event.spotsLeft ?? 0;

  return (
    <div className="container py-10">
      {/* HERO */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-semibold leading-tight">
                {event.title}
              </h1>

              <Badge variant="secondary" className="shrink-0 text-sm">
                {isFree
                  ? "Free"
                  : new Intl.NumberFormat("en-BD", {
                      style: "currency",
                      currency: "BDT",
                    }).format(event.fee)}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="outline">{event.eventType}</Badge>

              <Badge
                variant={
                  event.status === "UPCOMING"
                    ? "secondary"
                    : event.status === "ONGOING"
                      ? "default"
                      : "destructive"
                }
              >
                {event.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* DATE */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Date & Time
              </h2>

              <p className="text-sm text-muted-foreground">
                {event.startDateTime &&
                  format(new Date(event.startDateTime), "PPP p")}
              </p>
            </CardContent>
          </Card>

          {/* DESCRIPTION */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-medium">About this event</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT (STICKY) */}
        <div className="space-y-6 lg:sticky lg:top-20 h-fit">
          <Card>
            <CardContent className="p-6 space-y-5">
              {/* CTA */}
              <Button
                className="w-full h-11 text-base
                bg-primary text-primary-foreground
                hover:bg-primary/90
                transition-all duration-300
                shadow-sm hover:shadow-md
                hover:scale-[1.02]
                active:scale-[0.97]"
                disabled={event.status === "ENDED" || isFull}
              >
                {event.status === "ENDED"
                  ? "Event Ended"
                  : isFull
                    ? "Full"
                    : isFree
                      ? "Join Event"
                      : "Pay & Join"}
              </Button>

              {/* CAPACITY */}
              <div className="text-sm flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                {event.maxParticipants
                  ? isFull
                    ? "Event Full"
                    : `${spotsLeft} spots left`
                  : "Unlimited capacity"}
              </div>

              {/* LOCATION */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Location</h3>

                {event.eventType === "PHYSICAL" ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {event.location ?? "TBD"}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <a
                      href={event.meetingLink ?? "#"}
                      target="_blank"
                      className="underline"
                    >
                      Join via link
                    </a>
                  </div>
                )}
              </div>

              {/* ORGANIZER */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Organizer</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {event.organizer?.name}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
