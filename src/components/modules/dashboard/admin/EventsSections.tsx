"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { PaginationMeta } from "@/types/api";
import { deleteEventAction } from "@/service/admin/admin.actions";
import { getEventsAction } from "@/service/event/event.actions";
import Pagination from "@/components/shared/Pagination";
import { toast } from "sonner";

export default function EventsSection({
  events: initialEvents,
  meta: initialMeta,
}: {
  events: Event[];
  meta: PaginationMeta;
}) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  const [page, setPage] = useState(initialMeta.page);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await getEventsAction(
          {
            page,
            limit: meta.limit,
          },
          {
            cache: "no-store",
          },
        );

        setEvents(res.data);
        setMeta(res.meta);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      const res = await deleteEventAction(id);

      if (!res?.success) {
        toast.error(res?.message || "Failed to delete event");
        return;
      }

      toast.success(res.message);

      const refreshed = await getEventsAction(
        {
          page,
          limit: meta.limit,
        },
        { cache: "no-store" },
      );

      setEvents(refreshed.data);
      setMeta(refreshed.meta);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex justify-between items-center border rounded-md p-3"
          >
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-xs text-muted-foreground">
                {event.visibility} • {event.status}
              </p>
            </div>

            <button
              onClick={() => handleDelete(event.id)}
              disabled={loading || deletingId === event.id}
              className="text-destructive text-sm font-medium cursor-pointer 
 px-2 py-1 rounded 
 hover:bg-red-50 hover:text-red-600 
 transition-all duration-150 
 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deletingId === event.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={meta.totalPages}
        loading={loading}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
