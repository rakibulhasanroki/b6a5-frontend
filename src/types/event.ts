export type EventVisibility = "PUBLIC" | "PRIVATE";
export type EventType = "PHYSICAL" | "ONLINE";
export type EventStatus = "UPCOMING" | "ONGOING" | "ENDED";

export interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime?: string;
  endDateTime?: string;
  status: EventStatus;
  maxParticipants?: number | null;
  eventType: EventType;

  location?: string | null;
  meetingLink?: string | null;

  visibility: EventVisibility;
  fee: number;

  organizer: {
    id: string;
    name: string;
  };
  isParticipant?: boolean;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  isDeleted?: boolean;
  organizerId?: string;
  isFull?: boolean;
  spotsLeft?: number | null;
}
