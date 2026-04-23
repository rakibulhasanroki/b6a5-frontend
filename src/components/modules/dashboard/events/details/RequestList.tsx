"use client";

import { Button } from "@/components/ui/button";
import { updateBookingStatusAction } from "@/service/bookings/booking.actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RequestsList({ requests, eventId, eventStatus }: any) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const isDisabled = pending || eventStatus === "ENDED";

  const handleAction = (bookingId: string, status: string) => {
    if (eventStatus === "ENDED") {
      toast.error("Cannot modify after event ended");
      return;
    }

    startTransition(async () => {
      try {
        await updateBookingStatusAction(bookingId, status, eventId);
        router.refresh();

        if (status === "CONFIRMED") {
          toast.success("User confirmed");
        } else {
          toast.success("User banned");
        }
      } catch (err: any) {
        toast.error(err.message || "Action failed");
      }
    });
  };

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold">Requests</h2>

      {requests.length === 0 && (
        <p className="text-sm text-muted-foreground">No pending requests</p>
      )}

      {requests.map((r: any) => (
        <div
          key={r.id}
          className="flex items-center justify-between border-b pb-2 last:border-none"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{r.user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {r.user.email}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={isDisabled}
              onClick={() => handleAction(r.id, "CONFIRMED")}
              className="h-8 px-3 min-w-[90px]"
            >
              Confirm
            </Button>

            <Button
              size="sm"
              variant="outline"
              disabled={isDisabled}
              onClick={() => handleAction(r.id, "BANNED")}
              className="h-8 px-3 min-w-[90px]"
            >
              Ban
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
