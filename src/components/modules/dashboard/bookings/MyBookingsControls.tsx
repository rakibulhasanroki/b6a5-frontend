"use client";

import { useRouter, useSearchParams } from "next/navigation";

const STATUS = ["ALL", "CONFIRMED", "PENDING", "CANCELLED", "BANNED"] as const;

export default function MyBookingsControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "ALL";

  const setStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    params.set("page", "1");

    router.push(`/dashboard/my-bookings?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS.map((s) => {
        const active =
          currentStatus === s || (s === "ALL" && !searchParams.get("status"));

        return (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`
              px-3 py-1 text-xs rounded-full border transition-all duration-200 cursor-pointer
              ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }
            `}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
