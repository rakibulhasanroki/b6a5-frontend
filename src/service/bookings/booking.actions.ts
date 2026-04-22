"use server";

import { BookingService } from "./booking.service";
import { updateTag } from "next/cache";

// READ
export const getMyBookingsAction = async () => {
  return await BookingService.getMyBookings();
};

export const getBookingByIdAction = async (bookingId: string) => {
  return await BookingService.getBookingById(bookingId);
};

export const getEventBookingsAction = async (eventId: string) => {
  return await BookingService.getEventBookings(eventId);
};

// WRITE

export const createBookingAction = async (body: {
  eventId: string;
  invitationId?: string;
}) => {
  const res = await BookingService.createBooking(body);

  updateTag("my-bookings");
  updateTag("joined-events");
  updateTag(`event-bookings-${body.eventId}`);
  updateTag(`event-${body.eventId}`);

  // only needed extra
  updateTag("my-invitations");
  updateTag(`event-invitations-${body.eventId}`);

  return res;
};

export const updateBookingStatusAction = async (
  bookingId: string,
  status: string,
  eventId: string,
) => {
  const res = await BookingService.updateBookingStatus(bookingId, {
    status,
  });

  updateTag("my-bookings");
  updateTag("joined-events");
  updateTag(`event-bookings-${eventId}`);
  updateTag(`event-${eventId}`);

  return res;
};
