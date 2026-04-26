"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DashboardEventCard({
  event,
  tab,
}: {
  event: Event;
  tab: string;
}) {
  const isOrganizer = tab === "organizer";
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleNavigate = () => {
    startTransition(() => {
      router.push(`/dashboard/events/${event.id}`);
    });
  };

  const getBadge = () => {
    switch (event.status) {
      case "ENDED":
        return <Badge variant="destructive">Ended</Badge>;
      case "ONGOING":
        return <Badge className="bg-green-100 text-green-700">Ongoing</Badge>;
      case "UPCOMING":
        if (event.isFull) {
          return <Badge variant="destructive">Full</Badge>;
        }
        return <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border bg-background p-4 flex flex-col justify-between min-h-[180px] hover:shadow-md transition">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold text-base line-clamp-1">
            {event.title}
          </h2>
          {getBadge()}
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            {event.startDateTime
              ? new Date(event.startDateTime).toLocaleDateString()
              : "N/A"}
          </p>
          <p>{event.location ? event.location : "No location provided"}</p>
        </div>

        {isOrganizer && (
          <div className="text-xs text-muted-foreground">
            <span>
              {event.currentParticipants !== undefined
                ? `${event.currentParticipants} participants`
                : "N/A"}
            </span>
          </div>
        )}
      </div>

      <Button
        onClick={handleNavigate}
        disabled={pending}
        className="w-full h-9 mt-4 hover:bg-primary/90 hover:text-white cursor-pointer"
      >
        {pending ? "Loading..." : isOrganizer ? "Manage" : "View"}
      </Button>
    </div>
  );
}
