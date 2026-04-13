import { fetcher } from "@/lib/api/fetcher";
import { PaginatedResponse } from "@/types/api";
import { Event } from "@/types/event";

interface GetEventsQuery {
  search?: string;
  visibility?: "PUBLIC" | "PRIVATE";
  feeType?: "FREE" | "PAID";
  eventType?: "PHYSICAL" | "ONLINE";
  status?: "UPCOMING" | "ONGOING" | "ENDED";

  page?: number;
  limit?: number;
}

export const EventService = {
  getEvents: (
    query?: GetEventsQuery,
    options?: {
      cache?: RequestCache;
      revalidate?: number;
      tags?: string[];
    },
  ) =>
    fetcher<{ data: PaginatedResponse<Event> }>("/events", {
      query,
      cache: options?.cache ?? "no-store",
      revalidate: options?.revalidate,
      tags: options?.tags ?? ["events"],
    }),
  getSingleEvent: async (id: string) => {
    const res = await fetcher<{
      success: boolean;
      message: string;
      data: Event;
    }>(`/events/${id}`, {
      cache: "force-cache",
      tags: [`event-${id}`],
    });

    return res.data;
  },

  createEvent: (body: any) =>
    fetcher("/events", {
      method: "POST",
      body,
      auth: true,
    }),

  updateEvent: (id: string, body: any) =>
    fetcher(`/events/${id}`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  deleteEvent: (id: string) =>
    fetcher(`/events/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};
