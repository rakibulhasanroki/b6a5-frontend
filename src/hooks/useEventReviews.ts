"use client";

import { useState, useTransition } from "react";
import { getEventReviewsAction } from "@/service/review/review.actions";
import { EventReviewsResponse } from "@/types/review";

export function useEventReviews(
  initialData: EventReviewsResponse | null,
  eventId: string,
) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialData?.meta.page || 1);
  const [pending, startTransition] = useTransition();

  const fetchPage = (newPage: number) => {
    if (!eventId) return;

    startTransition(async () => {
      const res = await getEventReviewsAction(eventId, {
        page: newPage,
        limit: 5,
      });

      setData(res);
      setPage(newPage);
    });
  };

  return { data, page, pending, fetchPage };
}
