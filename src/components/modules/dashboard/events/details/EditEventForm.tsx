"use client";

import { useState, useTransition } from "react";
import { updateEventAction } from "@/service/event/event.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Event, EventType } from "@/types/event";

interface EditEventFormProps {
  event: Pick<
    Event,
    | "id"
    | "title"
    | "description"
    | "location"
    | "meetingLink"
    | "startDateTime"
    | "endDateTime"
    | "eventType"
    | "status"
    | "visibility"
    | "fee"
    | "maxParticipants"
  >;
}

interface FormState {
  title: string;
  description: string;
  eventType: EventType;
  location: string;
  meetingLink: string;
  startDateTime: string;
  endDateTime: string;
  visibility: "PUBLIC" | "PRIVATE";
  fee: string;
  maxParticipants: string;
}

export default function EditEventForm({ event }: EditEventFormProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: event.title || "",
    description: event.description || "",
    eventType: event.eventType,
    location: event.location || "",
    meetingLink: event.meetingLink || "",
    startDateTime: event.startDateTime
      ? new Date(event.startDateTime).toISOString().slice(0, 16)
      : "",
    endDateTime: event.endDateTime
      ? new Date(event.endDateTime).toISOString().slice(0, 16)
      : "",
    visibility: event.visibility,
    fee: event.fee ? String(event.fee) : "",
    maxParticipants: event.maxParticipants ? String(event.maxParticipants) : "",
  });

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
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

    startTransition(() => {
      updateEventAction(event.id, {
        ...form,
        startDateTime: form.startDateTime || undefined,
        endDateTime: form.endDateTime || undefined,
        location: form.eventType === "PHYSICAL" ? form.location : undefined,
        meetingLink: form.eventType === "ONLINE" ? form.meetingLink : undefined,
        fee: form.fee ? Number(form.fee) : undefined,
        maxParticipants: form.maxParticipants
          ? Number(form.maxParticipants)
          : undefined,
      }).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success("Event updated");
        router.push(`/dashboard/events/${event.id}`);
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Edit Event</h2>

      <div className="space-y-3">
        <label className="text-sm font-medium">Title</label>
        <input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Event Type</label>
        <select
          value={form.eventType}
          onChange={(e) =>
            updateField("eventType", e.target.value as EventType)
          }
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="PHYSICAL">Physical</option>
          <option value="ONLINE">Online</option>
        </select>
      </div>

      {form.eventType === "PHYSICAL" ? (
        <div className="space-y-3">
          <label className="text-sm font-medium">Location</label>
          <input
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <label className="text-sm font-medium">Meeting Link</label>
          <input
            value={form.meetingLink}
            onChange={(e) => updateField("meetingLink", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      )}

      <div className="space-y-3">
        <label className="text-sm font-medium">Visibility</label>
        <select
          value={form.visibility}
          onChange={(e) =>
            updateField("visibility", e.target.value as "PUBLIC" | "PRIVATE")
          }
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Fee</label>
        <input
          type="number"
          value={form.fee}
          onChange={(e) => updateField("fee", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Max Participants</label>
        <input
          type="number"
          value={form.maxParticipants}
          onChange={(e) => updateField("maxParticipants", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start</label>
          <input
            type="datetime-local"
            value={form.startDateTime}
            onChange={(e) => updateField("startDateTime", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End</label>
          <input
            type="datetime-local"
            value={form.endDateTime}
            onChange={(e) => updateField("endDateTime", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={pending} className="w-full h-10">
        {pending ? "Updating..." : "Update Event"}
      </Button>
    </div>
  );
}
