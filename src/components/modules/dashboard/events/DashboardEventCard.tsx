"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardEventCard({
  event,
  tab,
}: {
  event: any;
  tab: string;
}) {
  const isOrganizer = tab === "organizer";

  const getBadge = () => {
    switch (event.status) {
      case "ENDED":
        return <Badge variant="destructive">Ended</Badge>;

      case "ONGOING":
        return <Badge className="bg-green-600 text-white">Ongoing</Badge>;

      case "UPCOMING":
        if (event.isFull) {
          return <Badge variant="destructive">Full</Badge>;
        }
        return <Badge className="bg-primary text-white">Upcoming</Badge>;

      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border bg-background p-4 flex flex-col justify-between min-h-[180px] hover:shadow-md transition">
      {/* Top */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold text-base line-clamp-1">
            {event.title}
          </h2>

          {getBadge()}
        </div>

        {/* Meta */}
        <div className="text-sm text-muted-foreground space-y-1">
          {event.startDateTime && (
            <p>{new Date(event.startDateTime).toLocaleDateString()}</p>
          )}

          {event.location && <p>{event.location}</p>}
        </div>

        {/* Organizer-only stats */}
        {isOrganizer && event.currentParticipants !== undefined && (
          <div className="text-xs text-muted-foreground">
            <span>{event.currentParticipants} participants</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Link href={`/dashboard/events/${event.id}`}>
        <Button className="w-full h-9 mt-4 hover:bg-primary/90 hover:text-white cursor-pointer">
          {isOrganizer ? "Manage" : "View"}
        </Button>
      </Link>
    </div>
  );
}
