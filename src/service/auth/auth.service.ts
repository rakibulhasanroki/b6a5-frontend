import { fetcher } from "@/lib/api/fetcher";

export const logoutService = async () => {
  return fetcher("/auth/logout", {
    method: "POST",
    auth: true,
  });
};
