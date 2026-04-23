"use client";

import { useState, useTransition } from "react";
import { updateEventAction } from "@/service/event/event.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Event, EventStatus, EventType } from "@/types/event";

interface EditEventFormProps {
  event: Pick<
    Event,
    | "id"
    | "title"
    | "location"
    | "meetingLink"
    | "startDateTime"
    | "endDateTime"
    | "eventType"
    | "status"
  >;
}

interface FormState {
  title: string;
  eventType: EventType;
  location: string;
  meetingLink: string;
  startDateTime: string;
  endDateTime: string;
}

export default function EditEventForm({ event }: EditEventFormProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: event.title || "",
    eventType: event.eventType,
    location: event.location || "",
    meetingLink: event.meetingLink || "",
    startDateTime: event.startDateTime
      ? new Date(event.startDateTime).toISOString().slice(0, 16)
      : "",
    endDateTime: event.endDateTime
      ? new Date(event.endDateTime).toISOString().slice(0, 16)
      : "",
  });

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isEnded = event.status === "ENDED";
  const isOngoing = event.status === "ONGOING";

  const handleSubmit = () => {
    if (isEnded) {
      toast.error("Cannot update an ended event");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (form.eventType === "PHYSICAL" && !form.location.trim()) {
      toast.error("Location is required for physical events");
      return;
    }

    if (form.eventType === "ONLINE" && !form.meetingLink.trim()) {
      toast.error("Meeting link is required for online events");
      return;
    }

    if (form.startDateTime && form.endDateTime) {
      const start = new Date(form.startDateTime);
      const end = new Date(form.endDateTime);

      if (end < start) {
        toast.error("End time cannot be before start time");
        return;
      }
    }

    startTransition(async () => {
      try {
        await updateEventAction(event.id, {
          ...form,
          startDateTime: form.startDateTime || undefined,
          endDateTime: form.endDateTime || undefined,
          location: form.eventType === "PHYSICAL" ? form.location : undefined,
          meetingLink:
            form.eventType === "ONLINE" ? form.meetingLink : undefined,
        });

        toast.success("Event updated");
        router.push(`/dashboard/events/${event.id}`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Update failed";
        toast.error(message);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Edit Event</h2>

      {/* BASIC */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Title</label>
        <input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          disabled={isEnded}
          className="w-full border rounded-md px-3 py-2 text-sm disabled:opacity-50"
        />
      </div>

      {/* TYPE */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Event Type</label>
        <select
          value={form.eventType}
          onChange={(e) =>
            updateField("eventType", e.target.value as EventType)
          }
          disabled={isEnded}
          className="w-full border rounded-md px-3 py-2 text-sm disabled:opacity-50"
        >
          <option value="PHYSICAL">Physical</option>
          <option value="ONLINE">Online</option>
        </select>
      </div>

      {/* CONDITIONAL */}
      {form.eventType === "PHYSICAL" ? (
        <div className="space-y-3">
          <label className="text-sm font-medium">Location</label>
          <input
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            disabled={isEnded}
            className="w-full border rounded-md px-3 py-2 text-sm disabled:opacity-50"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <label className="text-sm font-medium">Meeting Link</label>
          <input
            value={form.meetingLink}
            onChange={(e) => updateField("meetingLink", e.target.value)}
            disabled={isEnded}
            className="w-full border rounded-md px-3 py-2 text-sm disabled:opacity-50"
          />
        </div>
      )}

      {/* DATES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start</label>
          <input
            type="datetime-local"
            value={form.startDateTime}
            onChange={(e) => updateField("startDateTime", e.target.value)}
            disabled={isEnded || isOngoing} // 🔥 cannot change after start
            className="w-full border rounded-md px-3 py-2 text-sm disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End</label>
          <input
            type="datetime-local"
            value={form.endDateTime}
            onChange={(e) => updateField("endDateTime", e.target.value)}
            disabled={isEnded}
            className="w-full border rounded-md px-3 py-2 text-sm disabled:opacity-50"
          />
        </div>
      </div>

      {/* ACTION */}
      <Button
        onClick={handleSubmit}
        disabled={pending || isEnded}
        className="w-full h-10"
      >
        {pending ? "Updating..." : "Update Event"}
      </Button>
    </div>
  );
}
