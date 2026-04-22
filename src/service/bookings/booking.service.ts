import { fetcher } from "@/lib/api/fetcher";

export const BookingService = {
  // ❌ DO NOT CACHE (mutation)
  createBooking: (body: { eventId: string; invitationId?: string }) =>
    fetcher("/bookings", {
      method: "POST",
      body,
      auth: true,
    }),

  // ✅ SAFE TO CACHE (user list, slightly stale is fine)
  getMyBookings: () =>
    fetcher("/bookings/my", {
      auth: true,
      cache: "force-cache",
      revalidate: 30,
      tags: ["my-bookings"],
    }),

  // ❌ DO NOT CACHE (detail, sensitive)
  getBookingById: (bookingId: string) =>
    fetcher(`/bookings/${bookingId}`, {
      auth: true,
      cache: "no-store",
    }),

  // ❌ DO NOT CACHE (mutation)
  updateBookingStatus: (bookingId: string, body: { status: string }) =>
    fetcher(`/bookings/${bookingId}/status`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  getEventBookings: (eventId: string) =>
    fetcher(`/bookings/event/${eventId}`, {
      auth: true,
      cache: "force-cache",
      revalidate: 30,
      tags: [`event-bookings-${eventId}`],
    }),
};
