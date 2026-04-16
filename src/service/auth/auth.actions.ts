"use server";

import { cookies } from "next/headers";
import { logoutService } from "./auth.service";
import { updateTag } from "next/cache";

export const logoutAction = async () => {
  try {
    await logoutService();

    const cookieStore = await cookies();
    cookieStore.delete("better-auth.session_token");

    updateTag("me");
  } catch (error) {
    console.error("Logout failed:", error);
  }

  return { success: true };
};
