"use server";

import { PaginatedResponse } from "@/types/api";
import { EventService } from "./event.service";
import { Event } from "@/types/event";
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
  return res.data;
};

export const getMyEventsAction = async (query?: any) => {
  const res = await EventService.getMyEvents(query);
  return res.data;
};

export const getEventDetailsAction = async (
  eventId: string,
  options?: { auth?: boolean },
) => {
  return await EventService.getSingleEvent(eventId, options);
};

export const getEventRequestsAction = async (id: string) => {
  return await EventService.getEventRequests(id);
};

export const createEventAction = async (body: any) => {
  const res = await EventService.createEvent(body);

  updateTag("my-events");
  updateTag("events");
  updateTag("joined-events");
  return res;
};

export const updateEventAction = async (id: string, body: any) => {
  const res = await EventService.updateEvent(id, body);

  updateTag("my-events");
  updateTag(`event-${id}`);

  updateTag(`event-bookings-${id}`);
  updateTag("joined-events");

  return res;
};

export const deleteEventAction = async (id: string) => {
  const res = await EventService.deleteEvent(id);
  updateTag("events");

  updateTag("my-events");

  updateTag(`event-${id}`);
  updateTag(`event-bookings-${id}`);
  updateTag("joined-events");

  return res;
};
export const getJoinedEventsAction = async (query?: any) => {
  const res = await EventService.getJoinedEvents(query);
  return res.data;
};

export const getAllParticipantsAction = async () => {
  const res = await EventService.getAllParticipants();

  return res;
};
