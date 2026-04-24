import { fetcher } from "@/lib/api/fetcher";
import { MyPaymentsResponse, OrganizerPaymentsResponse } from "@/types/payment";

export const PaymentService = {
  getMyPayments: (query?: { page?: number; limit?: number }) =>
    fetcher<MyPaymentsResponse>("/payments/my", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["my-payments"],
      revalidate: 60,
    }),

  getOrganizerPayments: (query?: { page?: number; limit?: number }) =>
    fetcher<OrganizerPaymentsResponse>("/payments/organizer", {
      query,
      auth: true,
      cache: "force-cache",
      tags: ["organizer-payments"],
      revalidate: 60,
    }),
};
