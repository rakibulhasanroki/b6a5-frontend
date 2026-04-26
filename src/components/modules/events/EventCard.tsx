import { Event } from "@/types/event";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getEventActionLabel } from "@/lib/utils/eventActionLabel";
import { createBookingAction } from "@/service/bookings/booking.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const max = event.maxParticipants;
  const isFull = event.isFull ?? false;
  const spotsLeft = event.spotsLeft ?? 0;

  const actionLabel = getEventActionLabel(event, isFull);
  const isDisabled = event.status === "ENDED" || isFull;

  const handleJoin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const raw: any = await createBookingAction({
        eventId: event.id,
      });

      if (!raw?.success) {
        toast.error(raw?.message || "Failed to join event");
        return;
      }

      const res = raw?.data.data ?? raw;

      if (res?.requiresPayment === true) {
        if (res?.paymentUrl) {
          toast.info("Redirecting to payment...");

          setTimeout(() => {
            window.location.href = res.paymentUrl;
          }, 200);

          return;
        }

        toast.error("Payment URL missing");
        return;
      }

      if (res?.id) {
        toast.success("Joined successfully");
        router.push(`/dashboard/my-booking/${res.id}`);
        return;
      }

      console.error("Unexpected booking response:", res);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 space-y-3">
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

        <p className="text-xs text-muted-foreground">
          {(() => {
            if (!event.startDateTime) return "N/A";

            const date = new Date(event.startDateTime);
            return isNaN(date.getTime()) ? "N/A" : format(date, "PPP p");
          })()}
        </p>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="truncate">{event.organizer.name}</span>

          <div className="flex items-center gap-2">
            <Badge variant="outline">{event.eventType}</Badge>

            <Badge
              className={
                event.status === "UPCOMING"
                  ? "bg-blue-100 text-blue-700"
                  : event.status === "ONGOING"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
              }
            >
              {event.status}
            </Badge>
          </div>
        </div>

        <div className="text-[11px] text-muted-foreground h-[14px] flex items-center">
          {max
            ? isFull
              ? "Event Full"
              : `${spotsLeft} spots left`
            : "Unlimited"}
        </div>

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
            disabled={isDisabled || loading}
            onClick={handleJoin}
          >
            {loading ? "Processing..." : actionLabel}
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-[40%] h-9 cursor-pointer"
          >
            <Link href={`/events/${event.id}`}>Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
