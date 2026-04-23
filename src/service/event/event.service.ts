import { fetcher } from "@/lib/api/fetcher";
import { ApiResponse, PaginatedApiResponse } from "@/types/api";
import {
  AllParticipant,
  BookingRequest,
  CreateEventPayload,
  Event,
} from "@/types/event";

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
    fetcher<PaginatedApiResponse<Event>>("/events", {
      query,
      cache: options?.cache ?? "no-store",
      revalidate: options?.revalidate,
      tags: options?.tags ?? ["events"],
    }),
  getSingleEvent: async (eventId: string, options?: { auth?: boolean }) => {
    const isAuth = options?.auth === true;

    const res = await fetcher<ApiResponse<Event>>(`/events/${eventId}`, {
      cache: isAuth ? "no-store" : "force-cache",
      auth: isAuth,
      ...(isAuth ? {} : { tags: [`event-${eventId}`], revalidate: 60 }),
    });

    return res.data;
  },

  createEvent: (body: CreateEventPayload) =>
    fetcher<ApiResponse<Event>>("/events", {
      method: "POST",
      body,
      auth: true,
    }),

  updateEvent: (id: string, body: Partial<Event>) =>
    fetcher<ApiResponse<Event>>(`/events/${id}`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  deleteEvent: (id: string) =>
    fetcher<ApiResponse<boolean>>(`/events/${id}`, {
      method: "DELETE",
      auth: true,
    }),

  getMyEvents: (query?: { page?: number; limit?: number }) =>
    fetcher<PaginatedApiResponse<Event>>("/events/my", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["my-events"],
      revalidate: 60,
    }),

  getJoinedEvents: (query?: { page?: number; limit?: number }) =>
    fetcher<PaginatedApiResponse<Event>>("/events/joined", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["joined-events"],
      revalidate: 60,
    }),

  getEventRequests: (eventId: string) =>
    fetcher<ApiResponse<BookingRequest[]>>(`/events/${eventId}/requests`, {
      auth: true,
    }),

  getAllParticipants: () =>
    fetcher<ApiResponse<AllParticipant[]>>("/events/participants/all", {
      auth: true,
      cache: "no-store",
    }),
};
