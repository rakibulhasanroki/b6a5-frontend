"use client";

import { Button } from "@/components/ui/button";
import { updateInvitationStatusAction } from "@/service/invitation/invitation.actions";
import { createBookingAction } from "@/service/bookings/booking.actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Invitation = {
  id: string;
  status: string;
  eventId: string;
  event: {
    title: string;
    startDateTime: string;
    endDateTime?: string;
    fee?: number;
  };
};

const formatDate = (date?: string) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "ACCEPTED":
      return "bg-green-100 text-green-700";
    case "DECLINED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getEventStatus = (start?: string, end?: string) => {
  const now = new Date();

  if (end && now > new Date(end)) return "ENDED";
  if (start && now >= new Date(start)) return "ONGOING";
  return "UPCOMING";
};

const getEventStatusStyle = (status: string) => {
  switch (status) {
    case "UPCOMING":
      return "bg-blue-100 text-blue-700";
    case "ONGOING":
      return "bg-green-100 text-green-700";
    case "ENDED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function MyInvitationsList({
  invitations,
}: {
  invitations: Invitation[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [active, setActive] = useState<{
    id: string | null;
    type: "accept" | "decline" | null;
  }>({ id: null, type: null });

  const handleDecline = (invitation: Invitation) => {
    setActive({ id: invitation.id, type: "decline" });

    startTransition(async () => {
      try {
        await updateInvitationStatusAction(invitation.id, {
          status: "DECLINED",
        });

        toast.success("Invitation declined");
        router.refresh();
      } catch (err: any) {
        toast.error(err?.message || "Failed to update invitation");
      } finally {
        setActive({ id: null, type: null });
      }
    });
  };

  const handleAccept = (invitation: Invitation) => {
    setActive({ id: invitation.id, type: "accept" });

    startTransition(() => {
      createBookingAction({
        eventId: invitation.eventId,
        invitationId: invitation.id,
      }).then((raw: any) => {
        if (!raw?.success) {
          toast.error(raw?.message || "Failed to join event");
          setActive({ id: null, type: null });
          return;
        }

        const res = raw?.data.data ?? raw;

        if (res?.requiresPayment === true) {
          if (res?.paymentUrl) {
            toast.info("Redirecting to payment...");

            setTimeout(() => {
              window.location.href = res.paymentUrl;
            }, 200);

            setActive({ id: null, type: null });
            return;
          }

          toast.error("Payment URL missing");
          setActive({ id: null, type: null });
          return;
        }

        toast.success("Joined event successfully");
        router.refresh();
        setActive({ id: null, type: null });
      });
    });
  };

  return (
    <div className="space-y-4">
      {invitations.length === 0 && (
        <p className="text-sm text-muted-foreground">No invitations found</p>
      )}

      {invitations.map((invitation) => {
        const eventStatus = getEventStatus(
          invitation.event?.startDateTime,
          invitation.event?.endDateTime,
        );

        const isAcceptLoading =
          active.id === invitation.id && active.type === "accept";

        const isDeclineLoading =
          active.id === invitation.id && active.type === "decline";

        return (
          <div
            key={invitation.id}
            className="rounded-xl border bg-background p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* LEFT */}
            <div className="space-y-2">
              <p className="font-semibold text-sm">{invitation.event?.title}</p>

              <p className="text-xs text-muted-foreground">
                {formatDate(invitation.event?.startDateTime)}
              </p>

              {invitation.event?.endDateTime && (
                <p className="text-xs text-muted-foreground">
                  Ends: {formatDate(invitation.event.endDateTime)}
                </p>
              )}
            </div>

            {/* RIGHT (balanced layout) */}
            <div className="flex flex-col md:items-end gap-2">
              {/* BADGES */}
              <div className="flex gap-2 flex-wrap justify-end">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getEventStatusStyle(
                    eventStatus,
                  )}`}
                >
                  {eventStatus}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(
                    invitation.status,
                  )}`}
                >
                  {invitation.status}
                </span>
              </div>

              {/* FEE */}
              <p className="text-xs text-muted-foreground">
                {invitation.event?.fee && invitation.event.fee > 0
                  ? `Paid • ৳ ${invitation.event.fee}`
                  : "Free"}
              </p>

              {/* ACTIONS */}
              {invitation.status === "PENDING" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(invitation)}
                    disabled={isAcceptLoading || isDeclineLoading}
                    className="min-w-[110px]"
                  >
                    {isAcceptLoading ? "Processing..." : "Accept"}
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDecline(invitation)}
                    disabled={isAcceptLoading || isDeclineLoading}
                    className="min-w-[110px]"
                  >
                    {isDeclineLoading ? "Processing..." : "Decline"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
