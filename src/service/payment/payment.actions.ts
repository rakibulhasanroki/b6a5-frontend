"use server";

import { PaymentService } from "./payment.service";

export const getMyPaymentsAction = async (query?: {
  page?: number;
  limit?: number;
}) => {
  return await PaymentService.getMyPayments(query);
};

export const getOrganizerPaymentsAction = async (query?: {
  page?: number;
  limit?: number;
}) => {
  return await PaymentService.getOrganizerPayments(query);
};
