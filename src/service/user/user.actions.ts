"use server";

import { updateTag } from "next/cache";
import { getMeService, updateMeService } from "./user.service";

export const getMeAction = async () => {
  return getMeService();
};

export const updateMeAction = async (formData: FormData) => {
  const res = await updateMeService(formData);

  updateTag("me");

  return res;
};
