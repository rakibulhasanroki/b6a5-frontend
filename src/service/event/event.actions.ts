"use server";

import { PaginatedResponse } from "@/types/api";
import { EventService } from "./event.service";
import { Event } from "@/types/event";

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
