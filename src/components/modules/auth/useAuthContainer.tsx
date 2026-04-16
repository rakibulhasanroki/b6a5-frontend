"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useAuthContainer(mode: "login" | "register") {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isActive, setIsActive] = useState(mode === "register");

  const handleSwitch = (type: "login" | "register") => {
    const redirectTo = searchParams.get("redirectTo");

    const basePath = type === "login" ? "/login" : "/register";

    const url = redirectTo
      ? `${basePath}?redirectTo=${encodeURIComponent(redirectTo)}`
      : basePath;

    if (type === "register") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    setTimeout(() => {
      router.replace(url);
    }, 700);
  };

  return {
    isActive,
    handleSwitch,
    router,
  };
}
