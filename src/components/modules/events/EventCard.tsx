import { Event } from "@/types/event";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  event: Event;
}

function getActionLabel(event: Event, isFull: boolean) {
  if (event.status === "ENDED") return "Event Ended";
  if (isFull) return "Full";

  if (event.visibility === "PUBLIC" && event.fee === 0) return "Join";
  if (event.visibility === "PUBLIC" && event.fee > 0) return "Pay & Join";
  if (event.visibility === "PRIVATE" && event.fee === 0) return "Request";
  if (event.visibility === "PRIVATE" && event.fee > 0) return "Pay & Request";

  return "View Details";
}

export default function EventCard({ event }: Props) {
  const max = event.maxParticipants;
  const isFull = event.isFull ?? false;
  const spotsLeft = event.spotsLeft ?? 0;

  const actionLabel = getActionLabel(event, isFull);
  const isDisabled = event.status === "ENDED" || isFull;

  return (
    <Card className="group transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 space-y-3">
        {/* Top */}
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-base font-semibold leading-tight line-clamp-2">
            {event.title}
          </h3>

          <Badge variant="secondary" className="shrink-0">
            {event.fee === 0
              ? "Free"
              : new Intl.NumberFormat("en-BD", {
                  style: "currency",
                  currency: "BDT",
                }).format(event.fee)}
          </Badge>
        </div>

        {/* Date */}
        <p className="text-xs text-muted-foreground">
          {event.startDateTime &&
            format(new Date(event.startDateTime), "PPP p")}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="truncate">{event.organizer.name}</span>

          <div className="flex items-center gap-2">
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
        </div>

        {/* Capacity */}
        <div className="text-[11px] text-muted-foreground h-[14px] flex items-center">
          {max
            ? (() => {
                if (isFull) return "Event Full";
                return `${spotsLeft} spots left`;
              })()
            : "Unlimited"}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            className="
              w-[60%] h-9
              bg-primary text-primary-foreground
              hover:bg-primary/90
              transition-all duration-300
              shadow-sm hover:shadow-md
              hover:scale-[1.02]
              active:scale-[0.97]
              cursor-pointer
            "
            disabled={isDisabled}
          >
            {actionLabel}
          </Button>

          <Link href={`/events/${event.id}`} className="w-[40%]">
            <Button variant="outline" className="w-full h-9 cursor-pointer">
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
