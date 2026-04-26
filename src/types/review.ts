import { Event } from "./event";

export interface ReviewUser {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  editableUntil: string;

  userId: string;
  eventId: string;

  createdAt: string;
  updatedAt: string;

  user?: ReviewUser;
  event?: Event;
}

// ✅ Event reviews response (paginated + stats)
export interface EventReviewsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  stats: {
    averageRating: number;
    totalReviews: number;
  };
  data: Review[];
}

// ✅ Create
export interface CreateReviewPayload {
  eventId: string;
  rating: number;
  comment: string;
}

// ✅ Update
export type UpdateReviewPayload = Partial<{
  rating: number;
  comment: string;
}>;

export type MyEventReviewResponse = Review | null;
