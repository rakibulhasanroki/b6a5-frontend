import { fetcher } from "@/lib/api/fetcher";
import { ApiResponse } from "@/types/api";
import {
  Review,
  EventReviewsResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
  MyEventReviewResponse,
} from "@/types/review";

export const ReviewService = {
  createReview: (body: CreateReviewPayload) =>
    fetcher<ApiResponse<Review>>("/reviews", {
      method: "POST",
      body,
      auth: true,
    }),

  updateReview: (reviewId: string, body: UpdateReviewPayload) =>
    fetcher<ApiResponse<Review>>(`/reviews/${reviewId}`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  deleteReview: (reviewId: string) =>
    fetcher(`/reviews/${reviewId}`, {
      method: "DELETE",
      auth: true,
    }),

  getEventReviews: (
    eventId: string,
    query?: { page?: number; limit?: number },
  ) =>
    fetcher<ApiResponse<EventReviewsResponse>>(`/reviews/event/${eventId}`, {
      query,
      cache: "force-cache",
      revalidate: 60,
      tags: [`event-reviews-${eventId}`],
    }),

  getMyEventReview: (eventId: string) =>
    fetcher<ApiResponse<MyEventReviewResponse>>(
      `/reviews/event/${eventId}/my`,
      {
        auth: true,
        cache: "no-store",
      },
    ),
};
