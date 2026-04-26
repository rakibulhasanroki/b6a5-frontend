"use server";

import { BookingWithEvent, BookingWithUser } from "@/types/booking";
import { BookingService } from "./booking.service";
import { updateTag } from "next/cache";

// READ
export const getMyBookingsAction = async (): Promise<BookingWithEvent[]> => {
  const res = await BookingService.getMyBookings();
  return res.data;
};

export const getBookingByIdAction = async (
  bookingId: string,
): Promise<BookingWithEvent> => {
  const res = await BookingService.getBookingById(bookingId);
  return res.data;
};

export const getEventBookingsAction = async (
  eventId: string,
): Promise<BookingWithUser[]> => {
  const res = await BookingService.getEventBookings(eventId);
  return res.data;
};

// WRITE

export const createBookingAction = async (body: {
  eventId: string;
  invitationId?: string;
}) => {
  try {
    const res = await BookingService.createBooking(body);

    updateTag("my-bookings");
    updateTag("joined-events");
    updateTag(`event-bookings-${body.eventId}`);
    updateTag(`event-${body.eventId}`);
    updateTag("my-payments");
    updateTag("organizer-payments");
    updateTag("my-invitations");
    updateTag(`event-invitations-${body.eventId}`);

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create booking",
      statusCode: error.statusCode || error.status || 500,
    };
  }
};

export const updateBookingStatusAction = async (
  bookingId: string,
  status: string,
  eventId: string,
) => {
  try {
    const res = await BookingService.updateBookingStatus(bookingId, {
      status,
    });

    updateTag("my-bookings");
    updateTag("joined-events");
    updateTag(`event-bookings-${eventId}`);
    updateTag(`event-${eventId}`);

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update booking status",
    };
  }
};
