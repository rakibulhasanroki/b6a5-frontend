"use client";

import { useEventReviews } from "@/hooks/useEventReviews";
import Pagination from "@/components/shared/Pagination";
import { EventReviewsResponse } from "@/types/review";

export default function PublicReviews({
  initialData,
  eventId,
}: {
  initialData: EventReviewsResponse | null;
  eventId: string;
}) {
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
    <div className="space-y-5">
      {/* STATS */}
      <div className="flex justify-between">
        <p className="text-sm font-medium">
          ⭐ {data.stats.averageRating.toFixed(1)} / 5
        </p>
        <p className="text-xs text-muted-foreground">
          {data.stats.totalReviews} reviews
        </p>
      </div>

      {/* LIST */}
      {data.data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet</p>
      ) : (
        data.data.map((r) => (
          <div key={r.id} className="border-b pb-3">
            <p className="text-sm font-medium">{r.user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">⭐ {r.rating}/5</p>
            <p className="text-sm">{r.comment}</p>
          </div>
        ))
      )}

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
