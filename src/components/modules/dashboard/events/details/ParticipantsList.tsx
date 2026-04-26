"use client";

import { Button } from "@/components/ui/button";
import { updateBookingStatusAction } from "@/service/bookings/booking.actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookingWithUser } from "@/types/booking";

export default function ParticipantsList({
  participants,
  eventId,
  eventStatus,
}: {
  participants: BookingWithUser[];
  eventId: string;
  eventStatus: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const isDisabled = pending || eventStatus === "ENDED";

  const handleUnban = (bookingId: string) => {
    if (eventStatus === "ENDED") {
      toast.error("Cannot modify after event ended");
      return;
    }

    startTransition(() => {
      updateBookingStatusAction(bookingId, "PENDING", eventId).then((res) => {
        if (!res?.success) {
          toast.error(res?.message || "Unban failed");
          return;
        }

        router.refresh();
        toast.success("User moved to pending");
      });
    });
  };

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold">Participants</h2>

      {participants.length === 0 && (
        <p className="text-sm text-muted-foreground">No participants yet</p>
      )}

      {participants.map((p: any) => (
        <div
          key={p.id}
          className="flex items-center justify-between border-b pb-2 last:border-none"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{p.user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {p.user.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {p.status === "BANNED" ? (
              <Button
                size="sm"
                variant="outline"
                disabled={isDisabled}
                onClick={() => handleUnban(p.id)}
                className="h-8 px-3 min-w-[90px] border-red-500 text-red-500 hover:bg-red-50"
              >
                Unban
              </Button>
            ) : (
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                {p.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
