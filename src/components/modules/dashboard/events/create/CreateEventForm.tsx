"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createEventAction } from "@/service/event/event.actions";
import { Button } from "@/components/ui/button";
import { CreateEventPayload, EventType, EventVisibility } from "@/types/event";

const schema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"), // ✅ FIX

    eventType: z.enum(["PHYSICAL", "ONLINE"]),

    location: z.string().optional(),
    meetingLink: z.url("Invalid meeting link").optional(),

    visibility: z.enum(["PUBLIC", "PRIVATE"]),

    startDateTime: z.string().optional(),
    endDateTime: z.string().optional(),

    fee: z.number().min(0, "Fee cannot be negative"), // ✅ match backend
    maxParticipants: z
      .number()
      .int()
      .min(1, "Max participants must be at least 1")
      .optional(), // ✅ match backend
  })
  .superRefine((data, ctx) => {
    if (data.eventType === "PHYSICAL" && !data.location) {
      ctx.addIssue({
        code: "custom",
        message: "Location is required for PHYSICAL events",
        path: ["location"],
      });
    }

    if (data.eventType === "ONLINE" && !data.meetingLink) {
      ctx.addIssue({
        code: "custom",
        message: "Meeting link is required for ONLINE events",
        path: ["meetingLink"],
      });
    }

    if (data.startDateTime && data.endDateTime) {
      const start = new Date(data.startDateTime);
      const end = new Date(data.endDateTime);

      if (start >= end) {
        ctx.addIssue({
          code: "custom",
          message: "startDateTime must be before endDateTime",
          path: ["startDateTime"],
        });
      }
    }
  });

type FormState = {
  title: string;
  description: string;
  eventType: EventType;
  location: string;
  meetingLink: string;
  visibility: EventVisibility;
  startDateTime: string;
  endDateTime: string;
  fee: number;
  maxParticipants?: number;
};

export default function CreateEventForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    eventType: "PHYSICAL",
    location: "",
    meetingLink: "",
    visibility: "PUBLIC",
    startDateTime: "",
    endDateTime: "",
    fee: 0,
    maxParticipants: undefined,
  });

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key as string];
      return copy;
    });
  };

  const handleSubmit = () => {
    const sanitized = {
      ...form,
      location: form.location.trim() || undefined,
      meetingLink: form.meetingLink.trim() || undefined,
    };

    const parsed = schema.safeParse(sanitized);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const key = err.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Fix the highlighted fields");
      return;
    }

    setErrors({});

    startTransition(() => {
      const payload: CreateEventPayload = {
        title: sanitized.title,
        description: sanitized.description,
        eventType: sanitized.eventType,
        visibility: sanitized.visibility,
        fee: sanitized.fee,

        ...(sanitized.startDateTime && {
          startDateTime: new Date(sanitized.startDateTime).toISOString(),
        }),

        ...(sanitized.endDateTime && {
          endDateTime: new Date(sanitized.endDateTime).toISOString(),
        }),

        ...(sanitized.eventType === "PHYSICAL" && {
          location: sanitized.location,
        }),

        ...(sanitized.eventType === "ONLINE" && {
          meetingLink: sanitized.meetingLink,
        }),

        ...(sanitized.maxParticipants !== undefined && {
          maxParticipants: sanitized.maxParticipants,
        }),
      };

      createEventAction(payload).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success("Event created");
        router.push("/dashboard/events");
      });
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Create Event</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
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
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <input
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          {errors.location && (
            <p className="text-xs text-red-500">{errors.location}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium">Meeting Link</label>
          <input
            value={form.meetingLink}
            onChange={(e) => updateField("meetingLink", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          {errors.meetingLink && (
            <p className="text-xs text-red-500">{errors.meetingLink}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Visibility</label>
        <select
          value={form.visibility}
          onChange={(e) =>
            updateField("visibility", e.target.value as EventVisibility)
          }
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="datetime-local"
          value={form.startDateTime}
          onChange={(e) => updateField("startDateTime", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        />
        <input
          type="datetime-local"
          value={form.endDateTime}
          onChange={(e) => updateField("endDateTime", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {errors.endDateTime && (
        <p className="text-xs text-red-500">{errors.endDateTime}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          value={form.fee}
          onChange={(e) => updateField("fee", Number(e.target.value))}
          className="border rounded-md px-3 py-2 text-sm"
        />
        <input
          type="number"
          value={form.maxParticipants ?? ""}
          onChange={(e) =>
            updateField(
              "maxParticipants",
              e.target.value === "" ? undefined : Number(e.target.value),
            )
          }
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={pending}
        className="w-full h-10 cursor-pointer"
      >
        {pending ? "Creating..." : "Create Event"}
      </Button>
    </div>
  );
}
