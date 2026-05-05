import { fetcher } from "@/lib/api/fetcher";
import { ApiResponse, PaginatedApiResponse } from "@/types/api";
import { Booking, BookingWithEvent, BookingWithUser } from "@/types/booking";

export const BookingService = {
  createBooking: (body: { eventId: string; invitationId?: string }) =>
    fetcher("/bookings", {
      method: "POST",
      body,
      auth: true,
    }),

  getMyBookings: (query?: {
    page?: number;
    limit?: number;
    status?: "CONFIRMED" | "PENDING" | "CANCELLED" | "BANNED";
  }) =>
    fetcher<PaginatedApiResponse<BookingWithEvent>>("/bookings/my", {
      query,
      auth: true,
      cache: "force-cache",
      revalidate: 30,
      tags: ["my-bookings"],
    }),

  getBookingById: (bookingId: string) =>
    fetcher<ApiResponse<BookingWithEvent>>(`/bookings/${bookingId}`, {
      auth: true,
      cache: "no-store",
    }),

  updateBookingStatus: (bookingId: string, body: { status: string }) =>
    fetcher(`/bookings/${bookingId}/status`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  getEventBookings: (eventId: string) =>
    fetcher<ApiResponse<BookingWithUser[]>>(`/bookings/event/${eventId}`, {
      auth: true,
      cache: "force-cache",
      revalidate: 30,
      tags: [`event-bookings-${eventId}`],
    }),
};
