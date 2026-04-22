import { fetcher } from "@/lib/api/fetcher";

export const PaymentService = {
  getMyPayments: (query?: { page?: number; limit?: number }) =>
    fetcher("/payments/my", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["my-payments"],
      revalidate: 60,
    }),

  getOrganizerPayments: (query?: { page?: number; limit?: number }) =>
    fetcher("/payments/organizer", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["organizer-payments"],
      revalidate: 60,
    }),
};
