"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthContainerDesktop from "./AuthContainerDesktop";
import AuthContainerMobile from "./AuthContainerMobile";
import { getSafeRedirect } from "@/lib/utils/redirect";

type Props = {
  mode: "login" | "register";
};

export default function AuthContainer({ mode }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get("error");
  const success = searchParams.get("success");

  useEffect(() => {
    if (!error && !success) return;
    if (error === "NEXT_REDIRECT") return;

    const currentRedirect = getSafeRedirect(searchParams.get("redirectTo"));

    const timer = setTimeout(() => {
      if (error === "account_inactive") {
        toast.error("Your account has been inactive. Please contact support.");
      } else if (error) {
        toast.error(error);
      }

      if (success === "logout") {
        toast.success("Logged out successfully");
      }
      if (success === "login") {
        toast.success("Logged in successfully");
      }
      if (success === "register") {
        toast.success("Account created successfully");
      }

      const basePath = mode === "register" ? "/register" : "/login";

      if ((success === "login" || success === "register") && currentRedirect) {
        router.replace(currentRedirect);
        return;
      }

      router.replace(
        `${basePath}${
          currentRedirect
            ? `?redirectTo=${encodeURIComponent(currentRedirect)}`
            : ""
        }`,
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [error, success, mode, router, searchParams]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <AuthContainerDesktop mode={mode} />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <AuthContainerMobile mode={mode} />
      </div>
    </>
  );
}
