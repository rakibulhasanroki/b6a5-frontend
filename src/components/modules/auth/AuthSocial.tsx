"use client";

import GoogleLoginButton from "./GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeRedirect } from "@/lib/utils/redirect";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type DemoType = "participant" | "organizer" | null;

export default function AuthSocial() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<DemoType>(null);

  const handleDemoLogin = async (type: "participant" | "organizer") => {
    if (loading) return;

    setLoading(type);

    const redirectTo = getSafeRedirect(searchParams.get("redirectTo"));

    const credentials =
      type === "participant"
        ? { email: "participant@gmail.com", password: "@Part1234" }
        : { email: "organizer@gmail.com", password: "@Orga1234" };

    try {
      const res = await fetch(`/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          typeof data?.message === "string"
            ? data.message
            : "Demo login failed";

        router.replace(
          `/login?error=${encodeURIComponent(errorMessage)}${
            redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""
          }`,
        );
        return;
      }

      router.replace(
        `/login?success=login&redirectTo=${encodeURIComponent(redirectTo)}`,
      );
      router.refresh();
    } catch {
      router.replace(`/login?error=Something%20went%20wrong`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Google */}
      <div className="w-full max-w-[320px] flex justify-center">
        <GoogleLoginButton />
      </div>

      {/* Demo buttons */}
      <div className="w-full max-w-[320px] flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!!loading}
          className="
            h-9 px-4 text-xs
            border-border/60
            hover:bg-accent/60
            transition-all duration-200
            flex items-center gap-2
            disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
          "
          onClick={() => handleDemoLogin("participant")}
        >
          {loading === "participant" && (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          )}
          {loading === "participant" ? "Signing in..." : "Demo Participant"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={!!loading}
          className="
            h-9 px-4 text-xs
            border-border/60
            hover:bg-accent/60
            transition-all duration-200
            flex items-center gap-2
            disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
          "
          onClick={() => handleDemoLogin("organizer")}
        >
          {loading === "organizer" && (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          )}
          {loading === "organizer" ? "Signing in..." : "Demo Organizer"}
        </Button>
      </div>
    </div>
  );
}
