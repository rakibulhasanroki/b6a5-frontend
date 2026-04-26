"use client";

import Pagination from "@/components/shared/Pagination";
import { EventReviewsResponse, Review } from "@/types/review";
import { useEventReviews } from "@/hooks/useEventReviews";

type Props = {
  initialData: EventReviewsResponse | null;
  eventId: string;
};

export default function ReviewsList({ initialData, eventId }: Props) {
  const { data, page, pending, fetchPage } = useEventReviews(
    initialData,
    eventId,
  );
  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">No reviews available</p>
    );
  }

  return (
    <div className="space-y-4">
      {/* STATS */}
      <div className="flex justify-between items-center border rounded-lg p-4">
        <p className="text-sm font-medium">
          ⭐ {data.stats.averageRating.toFixed(1)} / 5
        </p>

        <p className="text-xs text-muted-foreground">
          {data.stats.totalReviews} reviews
        </p>
      </div>

      {/*  EMPTY STATE */}
      {data.data.length === 0 && (
        <p className="text-sm text-muted-foreground">No reviews yet</p>
      )}

      {/*  LIST */}
      {data.data.map((review: Review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {/*  PAGINATION */}
      <Pagination
        page={page}
        totalPages={data.meta.totalPages}
        loading={pending}
        onPrev={() => fetchPage(page - 1)}
        onNext={() => fetchPage(page + 1)}
      />
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{review.user?.name || "User"}</p>

        <p className="text-xs text-muted-foreground">⭐ {review.rating}/5</p>
      </div>

      {/* COMMENT */}
      <p className="text-sm text-muted-foreground">{review.comment}</p>

      {/* DATE */}
      <p className="text-xs text-muted-foreground">
        {new Date(review.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
