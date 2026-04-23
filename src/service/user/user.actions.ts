"use server";

import { updateTag } from "next/cache";
import {
  getMeService,
  getUserStatsService,
  updateMeService,
} from "./user.service";
import { IUser, IUserStats } from "@/types/user";

export const updateMeAction = async (formData: FormData) => {
  const res = await updateMeService(formData);

  updateTag("me");

  return res.data;
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
