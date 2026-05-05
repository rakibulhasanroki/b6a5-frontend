"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/shared/Pagination";

type Props = {
  totalPages: number;
  page: number;
  loading?: boolean;
};

export default function MyBookingsPagination({
  totalPages,
  page,
  loading,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    router.push(`/dashboard/my-bookings?${params.toString()}`);
  };

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      loading={loading}
      onPrev={() => updatePage(page - 1)}
      onNext={() => updatePage(page + 1)}
    />
  );
}
