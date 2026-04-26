"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get("status");

  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      if (status === "success") {
        toast.success("Payment successful. Booking created.");
      } else if (status === "cancel") {
        toast.error("Payment cancelled. No booking created.");
      }

      router.replace("/dashboard/payments");
    }, 100);

    return () => clearTimeout(timer);
  }, [status, router, searchParams]);

  return null;
}
