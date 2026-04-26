// admin.service.ts

import { fetcher } from "@/lib/api/fetcher";
import { CreateAdminPayload } from "@/types/admin";
import { ApiResponse } from "@/types/api";

export const AdminService = {
  createAdmin: (body: CreateAdminPayload) =>
    fetcher<ApiResponse<any>>("/admin/create-admin", {
      method: "POST",
      body,
      auth: true,
    }),

  deleteUser: (userId: string) =>
    fetcher<ApiResponse<null>>(`/admin/users/${userId}`, {
      method: "DELETE",
      auth: true,
    }),

  deleteEvent: (eventId: string) =>
    fetcher<ApiResponse<null>>(`/admin/events/${eventId}`, {
      method: "DELETE",
      auth: true,
    }),
};
