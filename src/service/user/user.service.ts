import { fetcher } from "@/lib/api/fetcher";
import { ApiResponse, PaginatedApiResponse } from "@/types/api";
import { IUser, IUserStats } from "@/types/user";

export const getMeService = async () => {
  return fetcher<ApiResponse<IUser>>("/users/me", {
    method: "GET",
    auth: true,
    cache: "no-store",
  });
};

export const updateMeService = async (formData: FormData) => {
  return fetcher<ApiResponse<IUser>, FormData>("/users/me", {
    method: "PATCH",
    body: formData,
    auth: true,
  });
};

export const getUserStatsService = async () => {
  return fetcher<ApiResponse<IUserStats>>("/users/stats", {
    method: "GET",
    auth: true,
    cache: "no-store",
  });
};

export const getAllUsersService = async (query?: {
  page?: number;
  limit?: number;
}) => {
  return fetcher<PaginatedApiResponse<IUser>>("/users", {
    method: "GET",
    auth: true,
    query,
    cache: "no-store",
  });
};
