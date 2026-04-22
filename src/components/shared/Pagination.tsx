"use client";

import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages?: number;
  loading?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({
  page,
  totalPages,
  loading,
  onPrev,
  onNext,
}: Props) {
  if (!totalPages || totalPages <= 0) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <Button
        variant="outline"
        disabled={page === 1 || loading}
        onClick={onPrev}
        className="cursor-pointer"
      >
        Prev
      </Button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages || loading}
        onClick={onNext}
        className="cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
}
