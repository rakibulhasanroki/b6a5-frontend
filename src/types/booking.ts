import { Event } from "./event";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "BANNED";

export interface Payment {
  id: string;
  amount: number;
  status: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingWithEvent extends Booking {
  event: Event;
  payment?: Payment | null;
}

export interface BookingWithUser extends Booking {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
