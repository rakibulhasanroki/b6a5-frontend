import { BookingStatus } from "./booking";

export type EventVisibility = "PUBLIC" | "PRIVATE";
export type EventType = "PHYSICAL" | "ONLINE";
export type EventStatus = "UPCOMING" | "ONGOING" | "ENDED";

export interface Event {
  id: string;
  title: string;
  description: string;
  image?: string | null;

  startDateTime?: string | null;
  endDateTime?: string | null;

  status: EventStatus;
  eventType: EventType;

  location?: string | null;
  meetingLink?: string | null;

  visibility: EventVisibility;
  fee: number;
  maxParticipants?: number | null;

  organizer: {
    id: string;
    name: string;
  };

  organizerId: string;

  currentParticipants?: number;
  isFull?: boolean;
  spotsLeft?: number | null;

  isParticipant?: boolean;

  createdAt: string;
  updatedAt: string;
}

export type CreateEventPayload = {
  title: string;
  description: string;

  startDateTime?: string | null;
  endDateTime?: string | null;

  eventType: EventType;

  location?: string | null;
  meetingLink?: string | null;

  visibility: EventVisibility;
  fee: number;
  maxParticipants?: number | null;
};

export interface AllParticipant {
  id: string;
  name: string;
  email: string;
}

export interface BookingRequest {
  id: string;
  status: BookingStatus;
  createdAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };
}
export type RelatedEvent = Pick<
  Event,
  "id" | "title" | "image" | "fee" | "startDateTime"
> & {
  organizer: {
    name: string;
  };
};
