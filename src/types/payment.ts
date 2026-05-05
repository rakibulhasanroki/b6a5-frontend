export interface PaymentItem {
  paymentId: string;
  amount: number;
  transactionId: string;
  invoiceUrl: string | null;
  paidAt: string;
  eventId: string;

  eventTitle: string | null;
  eventDate: string | null;
}

export interface MyPaymentsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: PaymentItem[];
}

// ✅ organizer
export interface OrganizerPaymentItem {
  paymentId: string;
  amount: number;
  transactionId: string;
  invoiceUrl: string | null;
  paidAt: string;

  participant: {
    id: string | null;
    name: string;
    email: string;
  };
}

export interface OrganizerPaymentGroup {
  eventId: string;
  eventTitle: string | null;
  totalRevenue: number;
  totalPayments: number;
  payments: OrganizerPaymentItem[];
}

export interface OrganizerPaymentsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: OrganizerPaymentGroup[];
}

export interface MyPaymentsQuery {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
}

export interface OrganizerPaymentsQuery {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  search?: string;
}
