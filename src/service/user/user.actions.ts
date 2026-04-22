"use server";

import { updateTag } from "next/cache";
import {
  getMeService,
  getUserStatsService,
  updateMeService,
} from "./user.service";

export const updateMeAction = async (formData: FormData) => {
  const res = await updateMeService(formData);

  updateTag("me");

  return res;
};
export const getNavUser = async () => {
  try {
    const res = await getMeService();

    return res.data;
  } catch {
    return null;
  }
};

export const getUserStatsAction = async () => {
  try {
    const res = await getUserStatsService();
    return res.data;
  } catch {
    return null;
  }
};
