"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  getEventReviewsAction,
  createReviewAction,
  updateReviewAction,
  deleteReviewAction,
} from "@/service/review/review.actions";

import { EventReviewsResponse, Review } from "@/types/review";
import { Button } from "@/components/ui/button";

export default function EventParticipantReview({
  eventId,
}: {
  eventId: string;
}) {
  const [reviews, setReviews] = useState<EventReviewsResponse | null>(null);
  const [pending, startTransition] = useTransition();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const [reviewId, setReviewId] = useState<string | null>(null);

  const load = () => {
    startTransition(async () => {
      try {
        const res = await getEventReviewsAction(eventId, {
          page: 1,
          limit: 5,
        });

        setReviews(res);

        const my = res.data.find((r: Review) => r.userId);

        if (my) {
          setReviewId(my.id);
          setRating(my.rating);
          setComment(my.comment);
        }
      } catch (e: any) {
        toast.error(e?.message || "Failed to load reviews");
      }
    });
  };

  useEffect(() => {
    load();
  }, [eventId]);

  // CREATE or UPDATE
  const handleSubmit = () => {
    startTransition(() => {
      if (reviewId) {
        updateReviewAction(reviewId, { rating, comment }, eventId).then(
          (res) => {
            if (!res?.success) {
              toast.error(res?.message || "Action failed");
              return;
            }

            toast.success("Review updated");
            load();
          },
        );
      } else {
        createReviewAction({
          eventId,
          rating,
          comment,
        }).then((res) => {
          if (!res?.success) {
            toast.error(res?.message || "Action failed");
            return;
          }

          toast.success("Review created");
          load();
        });
      }
    });
  };

  const handleDelete = () => {
    if (!reviewId) return;

    startTransition(() => {
      deleteReviewAction(reviewId, eventId).then((res) => {
        if (!res?.success) {
          toast.error(res?.message || "Cannot delete review");
          return;
        }

        toast.success("Review deleted");

        setReviewId(null);
        setRating(0);
        setComment("");

        load();
      });
    });
  };

  return (
    <div className="w-full border rounded-xl p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold">Your Review</h2>

        {reviews && (
          <p className="text-sm text-muted-foreground">
            ⭐ {reviews.stats.averageRating.toFixed(1)} ·{" "}
            {reviews.stats.totalReviews} reviews
          </p>
        )}
      </div>

      {/* FORM */}
      <div className="space-y-4">
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded-md p-3 text-sm"
          placeholder="Rating (1-5)"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-md p-3 text-sm min-h-[120px]"
          placeholder="Write your review..."
        />

        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={pending} className="flex-1">
            {reviewId ? "Update Review" : "Submit Review"}
          </Button>

          {reviewId && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={pending}
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* LIST (READ ONLY, NO EDIT BUTTONS) */}
      <div className="space-y-4">
        {reviews?.data?.map((r) => (
          <div key={r.id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <p className="font-medium text-sm">{r.user?.name}</p>
              <p className="text-xs">⭐ {r.rating}</p>
            </div>

            <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
