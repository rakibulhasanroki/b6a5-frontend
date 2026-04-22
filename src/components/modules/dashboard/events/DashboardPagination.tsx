"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/shared/Pagination";

export default function DashboardPagination({
  meta,
  tab,
}: {
  meta: any;
  tab: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);

  const handlePage = (page: number) => {
    const params = new URLSearchParams();

    if (tab === "joined") {
      params.set("tab", "joined");
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    router.push(`/dashboard/events?${params.toString()}`);
  };

  if (!meta) return null;

  return (
    <Pagination
      page={currentPage}
      totalPages={meta.totalPages}
      onPrev={() => handlePage(currentPage - 1)}
      onNext={() => handlePage(currentPage + 1)}
    />
  );
}
