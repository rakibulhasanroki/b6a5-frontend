"use server";

import { ReviewService } from "./review.service";
import { updateTag } from "next/cache";
import { CreateReviewPayload, UpdateReviewPayload } from "@/types/review";

// CREATE
export const createReviewAction = async (body: CreateReviewPayload) => {
  try {
    const res = await ReviewService.createReview(body);

    updateTag(`event-reviews-${body.eventId}`);

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to create review",
    };
  }
};

// UPDATE
export const updateReviewAction = async (
  reviewId: string,
  body: UpdateReviewPayload,
  eventId: string,
) => {
  try {
    const res = await ReviewService.updateReview(reviewId, body);

    updateTag(`event-reviews-${eventId}`);

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update review",
    };
  }
};

// DELETE
export const deleteReviewAction = async (reviewId: string, eventId: string) => {
  try {
    await ReviewService.deleteReview(reviewId);

    updateTag(`event-reviews-${eventId}`);

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete review",
    };
  }
};

// READ
export const getEventReviewsAction = async (
  eventId: string,
  query?: { page?: number; limit?: number },
) => {
  const res = await ReviewService.getEventReviews(eventId, query);
  return res.data;
};
