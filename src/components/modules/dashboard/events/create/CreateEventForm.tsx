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
      .min(10, "Description must be at least 10 characters"),

    eventType: z.enum(["PHYSICAL", "ONLINE"]),

    location: z.string().optional(),
    meetingLink: z.url("Invalid meeting link").optional(),

    visibility: z.enum(["PUBLIC", "PRIVATE"]),

    startDateTime: z.string().optional(),
    endDateTime: z.string().optional(),

    fee: z.number().min(0, "Fee cannot be negative"),
    maxParticipants: z
      .number()
      .int()
      .min(1, "Max participants must be at least 1")
      .optional(),
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
  image: File | null; // ✅ added
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
    image: null, // ✅ added
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

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      if (form.image) {
        formData.append("image", form.image);
      }

      createEventAction(formData).then((res) => {
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
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-semibold tracking-tight">Create Event</h2>

      {/* IMAGE */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Event Image</label>

        <div className="border border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-4 bg-muted/30 hover:bg-muted/50 transition">
          {!form.image ? (
            <label className="cursor-pointer flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Upload event cover</span>
              <span className="text-xs opacity-70">PNG or JPG · Max ~5MB</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  updateField("image", e.target.files?.[0] || null)
                }
              />

              <div className="mt-2 px-4 py-2 rounded-md border bg-background text-xs font-medium shadow-sm hover:bg-muted transition">
                Choose Image
              </div>
            </label>
          ) : (
            <div className="w-full space-y-3">
              <div className="relative w-full h-44 rounded-lg overflow-hidden border">
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer text-center border rounded-md py-2 text-xs font-medium hover:bg-muted transition">
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      updateField("image", e.target.files?.[0] || null)
                    }
                  />
                </label>

                <button
                  type="button"
                  onClick={() => updateField("image", null)}
                  className="flex-1 border rounded-md py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TITLE */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
          placeholder="Enter event title"
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-primary/40 transition"
          placeholder="Write a short description..."
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      {/* EVENT TYPE */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Event Type</label>
        <select
          value={form.eventType}
          onChange={(e) =>
            updateField("eventType", e.target.value as EventType)
          }
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
        >
          <option value="PHYSICAL">Physical</option>
          <option value="ONLINE">Online</option>
        </select>
      </div>

      {/* CONDITIONAL */}
      {form.eventType === "PHYSICAL" ? (
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <input
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
            placeholder="Event location"
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
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
            placeholder="https://..."
          />
          {errors.meetingLink && (
            <p className="text-xs text-red-500">{errors.meetingLink}</p>
          )}
        </div>
      )}

      {/* VISIBILITY */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Visibility</label>
        <select
          value={form.visibility}
          onChange={(e) =>
            updateField("visibility", e.target.value as EventVisibility)
          }
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      {/* DATE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="datetime-local"
          value={form.startDateTime}
          onChange={(e) => updateField("startDateTime", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
        <input
          type="datetime-local"
          value={form.endDateTime}
          onChange={(e) => updateField("endDateTime", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
      </div>

      {errors.endDateTime && (
        <p className="text-xs text-red-500">{errors.endDateTime}</p>
      )}

      {/* NUMBERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          value={form.fee}
          onChange={(e) => updateField("fee", Number(e.target.value))}
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
          placeholder="Fee (0 for free)"
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
          className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
          placeholder="Max participants"
        />
      </div>

      {/* SUBMIT */}
      <Button
        onClick={handleSubmit}
        disabled={pending}
        className="w-full h-11 text-sm font-medium cursor-pointer"
      >
        {pending ? "Creating..." : "Create Event"}
      </Button>
    </div>
  );
}
