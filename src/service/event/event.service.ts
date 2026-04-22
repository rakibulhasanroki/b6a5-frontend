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
  getSingleEvent: async (eventId: string, options?: { auth?: boolean }) => {
    const res = await fetcher<{
      success: boolean;
      message: string;
      data: Event;
    }>(`/events/${eventId}`, {
      cache: "force-cache",
      auth: options?.auth ?? false,
      tags: [`event-${eventId}`],
      revalidate: 60,
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

  getMyEvents: (query?: { page?: number; limit?: number }) =>
    fetcher<{ data: PaginatedResponse<Event> }>("/events/my", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["my-events"],
      revalidate: 60,
    }),

  getJoinedEvents: (query?: { page?: number; limit?: number }) =>
    fetcher<{ data: PaginatedResponse<Event> }>("/events/joined", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["joined-events"],
      revalidate: 60,
    }),

  getEventRequests: (eventId: string) =>
    fetcher(`/events/${eventId}/requests`, {
      auth: true,
    }),

  getAllParticipants: () =>
    fetcher("/events/participants/all", {
      auth: true,
      cache: "no-store",
    }),
};
