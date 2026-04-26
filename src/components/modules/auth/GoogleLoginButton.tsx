import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/utils/redirect";
import { useSearchParams } from "next/navigation";

type Props = {
  className?: string;
};

export default function GoogleLoginButton({ className }: Props) {
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirectTo"));
  const callbackURL = `${env.NEXT_PUBLIC_FRONTEND_URL}/api/v1/auth/google/callback?redirect=${encodeURIComponent(
    redirectTo,
  )}`;

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackURL,
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className={`
    group relative flex items-center justify-center gap-3
    px-6 h-11
    rounded-xl
    border border-border/60
    bg-background/80 backdrop-blur-md
    shadow-sm
    hover:shadow-md hover:border-border
    hover:bg-accent/60
    active:scale-[0.98]
    transition-all duration-200 ease-out
    text-sm font-medium
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-primary/40
    ${className || ""}
  `}
    >
      {/* subtle glow effect */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-md" />

      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5 h-5 z-10"
      />

      <span className="z-10 tracking-wide">Continue with Google</span>
    </button>
  );
}
