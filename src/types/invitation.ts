import { Event } from "./event";

export type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export interface Invitation {
  id: string;
  eventId: string;
  invitedUserId: string;
  status: InvitationStatus;
  createdAt: string;

  event?: Event;
}

// ✅ organizer API includes invitedUser
export interface InvitationWithUser extends Invitation {
  invitedUser: {
    id: string;
    name: string;
    email: string;
  };
}
