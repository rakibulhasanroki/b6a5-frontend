import { fetcher } from "@/lib/api/fetcher";

export const getMeService = async () => {
  return fetcher<any>("/users/me", {
    method: "GET",
    auth: true,
    tags: ["me"],
    cache: "force-cache",
    revalidate: 60,
  });
};

export const updateMeService = async (formData: FormData) => {
  return fetcher<any, FormData>("/users/me", {
    method: "PATCH",
    body: formData,
    auth: true,
  });
};

export const getUserStatsService = async () => {
  return fetcher<any>("/users/stats", {
    method: "GET",
    auth: true,
    cache: "no-store",
  });
};
