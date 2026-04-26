"use client";

import { Event } from "@/types/event";

export default function EventInfoCard({
  event,
  isOrganizer,
}: {
  event: Event;
  isOrganizer: boolean;
}) {
  const statusMap: Record<string, string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    ONGOING: "bg-green-100 text-green-700",
    ENDED: "bg-red-100 text-red-700",
  };

  const formattedStart = event.startDateTime
    ? new Intl.DateTimeFormat("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(event.startDateTime))
    : "N/A";

  const formattedEnd = event.endDateTime
    ? new Intl.DateTimeFormat("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(event.endDateTime))
    : null;

  return (
    <div className="lg:sticky lg:top-6 h-fit rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Event Info</h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${statusMap[event.status]}`}
        >
          {event.status}
        </span>
      </div>

      <div className="border-t" />

      <div className="space-y-3 text-sm">
        {!isOrganizer && event.organizer && (
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Organizer</span>
            <span className="font-medium text-right">
              {event.organizer.name}
            </span>
          </div>
        )}

        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">Type</span>
          <span className="font-medium">
            {event.visibility === "PRIVATE" ? "Private" : "Public"}
          </span>
        </div>

        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">Location</span>
          <span className="font-medium text-right break-words">
            {event.location || "N/A"}
          </span>
        </div>

        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">Start</span>
          <span className="font-medium text-right">{formattedStart}</span>
        </div>

        {formattedEnd && (
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">End</span>
            <span className="font-medium text-right">{formattedEnd}</span>
          </div>
        )}

        {event.fee !== undefined && (
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Fee</span>
            <span className="font-medium">
              {event.fee > 0 ? `৳ ${event.fee}` : "Free"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
