import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/types/event";
import { MapPin } from "lucide-react";
import Link from "next/link";

function formatDate(date?: string | null) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function UpcomingEventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
        <CardContent className="p-4 flex flex-col gap-3">
          {/* top */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {formatDate(event.startDateTime)}
            </span>

            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
              {event.fee === 0 ? "Free" : "Paid"}
            </span>
          </div>

          {/* title */}
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">
            {event.title}
          </h3>

          {/* meta */}
          <div className="text-xs text-muted-foreground flex flex-col gap-1">
            <span className="flex items-center gap-1">
              {event.eventType === "PHYSICAL" ? (
                <>
                  <MapPin className="w-3 h-3" />
                  {event.location ?? "TBD"}
                </>
              ) : (
                "🌐 Online"
              )}
            </span>
            {event.organizer && <span>By {event.organizer.name}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
