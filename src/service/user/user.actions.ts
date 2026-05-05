"use server";

import {
  getAllUsersService,
  getMeService,
  getUserStatsService,
  updateMeService,
} from "./user.service";
import { IUser, IUserStats } from "@/types/user";

export const updateMeAction = async (formData: FormData) => {
  try {
    const res = await updateMeService(formData);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to update profile",
    };
  }
};

export const getNavUser = async (): Promise<IUser | null> => {
  try {
    const res = await getMeService();
    return res.data;
  } catch {
    return null;
  }
};

export const getUserStatsAction = async (): Promise<IUserStats | null> => {
  try {
    const res = await getUserStatsService();
    return res.data;
  } catch {
    return null;
  }
};

export const getAllUsersAction = async (query?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: "USER" | "ADMIN";
  sortBy?: "name" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}) => {
  const res = await getAllUsersService(query);

  return {
    meta: res.data.meta,
    data: res.data.data,
  };
};
