"use client";

import { Button } from "@/components/ui/button";
import { updateBookingStatusAction } from "@/service/bookings/booking.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { BookingWithEvent } from "@/types/booking";

export default function MyBookingsList({
  bookings,
}: {
  bookings: BookingWithEvent[];
}) {
  const router = useRouter();

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleCancel = async (booking: BookingWithEvent) => {
    if (activeId === booking.id) return;

    setActiveId(booking.id);

    const res = await updateBookingStatusAction(
      booking.id,
      "CANCELLED",
      booking.eventId,
    );

    if (!res?.success) {
      toast.error(res?.message || "Failed to cancel booking");
      setActiveId(null);
      return;
    }

    toast.success("Booking cancelled");
    router.refresh();
    setActiveId(null);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "BANNED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {bookings.length === 0 && (
        <p className="text-sm text-muted-foreground">No bookings found</p>
      )}

      {bookings.map((booking) => {
        const isLoading = activeId === booking.id;

        return (
          <div
            key={booking.id}
            className="rounded-xl border bg-background p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-sm transition"
          >
            {/* LEFT */}
            <div className="space-y-2">
              <p className="font-semibold text-sm line-clamp-1">
                {booking.event.title}
              </p>

              <p className="text-xs text-muted-foreground">
                {booking.event.startDateTime
                  ? new Date(booking.event.startDateTime).toLocaleString()
                  : "N/A"}
              </p>

              {booking.event.endDateTime && (
                <p className="text-xs text-muted-foreground">
                  Ends: {new Date(booking.event.endDateTime).toLocaleString()}
                </p>
              )}

              <span
                className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(
                  booking.status,
                )}`}
              >
                {booking.status}
              </span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="min-w-[90px] cursor-pointer"
              >
                <Link href={`/dashboard/my-bookings/${booking.id}`}>
                  Details
                </Link>
              </Button>

              {booking.status !== "CANCELLED" && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleCancel(booking)}
                  disabled={isLoading}
                  className="min-w-[110px] cursor-pointer"
                >
                  {isLoading ? "Cancelling..." : "Cancel"}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
