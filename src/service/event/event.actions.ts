"use server";

import { PaginatedResponse } from "@/types/api";
import { EventService } from "./event.service";
import {
  AllParticipant,
  BookingRequest,
  CreateEventPayload,
  Event,
  RelatedEvent,
} from "@/types/event";
import { updateTag } from "next/cache";

export const getEventsAction = async (
  query?: any,
  options?: {
    cache?: RequestCache;
    revalidate?: number;
    tags?: string[];
  },
): Promise<PaginatedResponse<Event>> => {
  const res = await EventService.getEvents(query, options);
  return {
    meta: res.data.meta,
    data: res.data.data,
  };
};

export const getMyEventsAction = async (query?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: "UPCOMING" | "ONGOING" | "ENDED";
}) => {
  const res = await EventService.getMyEvents(query);
  return res.data;
};

export const getEventDetailsAction = async (
  eventId: string,
  options?: { auth?: boolean },
) => {
  return await EventService.getSingleEvent(eventId, options);
};

export const getEventRequestsAction = async (
  id: string,
): Promise<BookingRequest[]> => {
  const res = await EventService.getEventRequests(id);
  return res.data;
};

export const createEventAction = async (
  body: CreateEventPayload | FormData,
) => {
  try {
    const res = await EventService.createEvent(body);

    updateTag("my-events");
    updateTag("events");
    updateTag("joined-events");

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create event",
    };
  }
};

export const updateEventAction = async (id: string, body: any) => {
  try {
    const res = await EventService.updateEvent(id, body);

    updateTag("events");
    updateTag("my-events");
    updateTag(`event-${id}`);
    updateTag(`event-bookings-${id}`);
    updateTag("joined-events");

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update event",
    };
  }
};

export const deleteEventAction = async (id: string) => {
  try {
    const res = await EventService.deleteEvent(id);
    updateTag("events");

    updateTag("my-events");

    updateTag(`event-${id}`);
    updateTag(`event-bookings-${id}`);
    updateTag("joined-events");

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete event",
    };
  }
};
export const getJoinedEventsAction = async (query?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: "UPCOMING" | "ONGOING" | "ENDED";
}) => {
  const res = await EventService.getJoinedEvents(query);
  return res.data;
};

export const getAllParticipantsAction = async () => {
  try {
    const res = await EventService.getAllParticipants();

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to load users",
    };
  }
};

export const getRelatedEventsAction = async (
  eventId: string,
): Promise<RelatedEvent[]> => {
  const res = await EventService.getRelatedEvents(eventId);
  return res.data;
};
