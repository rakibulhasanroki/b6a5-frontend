"use client";

import { Button } from "@/components/ui/button";
import InviteSheet from "./InviteSheet";
import { deleteEventAction } from "@/service/event/event.actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Event } from "@/types/event";

export default function EventDetailsHeader({
  event,
  isOrganizer,
}: {
  event: Event;
  isOrganizer: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(() => {
      deleteEventAction(event.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success("Event deleted");
        router.push("/dashboard/events");
      });
    });
  };

  const formattedDate = event.startDateTime
    ? new Intl.DateTimeFormat("en-BD", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(event.startDateTime))
    : "No date set";

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-xl font-semibold">{event.title}</h1>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </div>

      {isOrganizer && (
        <div className="flex items-center gap-2">
          {event.visibility === "PRIVATE" && (
            <InviteSheet eventId={event.id} eventStatus={event.status} />
          )}

          <Button
            onClick={() => router.push(`/dashboard/events/${event.id}/edit`)}
            className="h-9 px-4 hover:bg-primary/90 hover:text-white cursor-pointer"
          >
            Edit
          </Button>

          <Button
            onClick={handleDelete}
            disabled={pending}
            variant="destructive"
            className="h-9 px-4 disabled:opacity-50 cursor-pointer"
          >
            {pending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      )}
    </div>
  );
}
