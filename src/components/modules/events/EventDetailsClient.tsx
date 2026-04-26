"use client";

import { Event } from "@/types/event";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MapPin, Globe, CalendarDays, User, Users } from "lucide-react";
import { EventReviewsResponse } from "@/types/review";
import PublicReviews from "./PublicReviews";
import { getEventActionLabel } from "@/lib/utils/eventActionLabel";
import { createBookingAction } from "@/service/bookings/booking.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventDetailsClient({
  event,
  reviews,
}: {
  event: Event;
  reviews: EventReviewsResponse;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isFree = event.fee === 0;
  const isFull = event.isFull ?? false;
  const spotsLeft = event.spotsLeft ?? 0;
  const actionLabel = getEventActionLabel(event, isFull);

  const handleJoin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const raw: any = await createBookingAction({
        eventId: event.id,
      });

      if (!raw?.success) {
        if (raw?.statusCode === 401) {
          toast.error("Please login to continue");

          const current = window.location.pathname + window.location.search;

          setTimeout(() => {
            router.push(`/login?redirectTo=${encodeURIComponent(current)}`);
          }, 600);

          return;
        }
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
        router.push(`/dashboard/my-bookings/${res.id}`);
        return;
      }

      console.error("Unexpected booking response:", res);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* HERO */}
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-xl md:text-2xl font-semibold leading-tight">
              {event.title}
            </h1>

            <Badge
              variant="secondary"
              className="shrink-0 text-[11px] px-2 py-0.5"
            >
              {isFree
                ? "Free"
                : new Intl.NumberFormat("en-BD", {
                    style: "currency",
                    currency: "BDT",
                  }).format(event.fee)}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-[11px]">
              {event.eventType}
            </Badge>

            <Badge variant="outline" className="text-[11px]">
              {event.visibility}
            </Badge>

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
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4 flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                {event.startDateTime
                  ? format(new Date(event.startDateTime), "PPP p")
                  : "Date not set"}
              </div>

              {event.eventType === "PHYSICAL" ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {event.location || "TBD"}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  {event.meetingLink ? (
                    <a
                      href={event.meetingLink}
                      target="_blank"
                      className="underline hover:text-primary transition"
                    >
                      Join link
                    </a>
                  ) : (
                    "Link TBD"
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-1.5">
              <h2 className="text-sm font-medium">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Reviews</h2>
                <span className="text-[11px] text-muted-foreground">
                  {reviews?.stats?.totalReviews || 0}
                </span>
              </div>

              <PublicReviews initialData={reviews} eventId={event.id} />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4 lg:sticky lg:top-16 h-fit">
          <Card>
            <CardContent className="p-4 space-y-4">
              <Button
                className="
                  w-full h-9 text-sm
                  bg-primary text-primary-foreground
                  hover:bg-primary/90
                  transition-all duration-200
                  shadow-sm hover:shadow-md
                  hover:scale-[1.02]
                  active:scale-[0.97]
                  cursor-pointer
                "
                disabled={event.status === "ENDED" || isFull || loading}
                onClick={handleJoin}
              >
                {loading ? "Processing..." : actionLabel}
              </Button>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Capacity
                  </span>

                  <span className="font-medium text-sm">
                    {event.maxParticipants
                      ? isFull
                        ? "Full"
                        : `${spotsLeft} left`
                      : "Unlimited"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    Organizer
                  </span>

                  <span className="font-medium truncate max-w-[120px] text-sm">
                    {event.organizer?.name || "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
