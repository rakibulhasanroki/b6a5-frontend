"use client";

import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuthContainer } from "./useAuthContainer";
import AuthSocial from "./AuthSocial";

type Props = {
  mode: "login" | "register";
};

export default function AuthContainerDesktop({ mode }: Props) {
  const { isActive, handleSwitch, router } = useAuthContainer(mode);
  return (
    <div className="px-4 min-h-screen flex flex-col items-center justify-center bg-background gap-6">
      <div
        className="relative w-[768px] max-w-full min-h-[480px]
        bg-card/80 backdrop-blur-xl border border-border
        rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center
          transition-transform duration-700 ease-in-out transform-gpu will-change-transform
          ${
            isActive
              ? "translate-x-full opacity-0 scale-95 z-10 pointer-events-none"
              : "translate-x-0 opacity-100 scale-100 z-20"
          }`}
        >
          <LoginForm />
        </div>

        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center
          transition-transform duration-700 ease-in-out transform-gpu will-change-transform
          ${
            isActive
              ? "translate-x-full opacity-100 scale-100 z-30"
              : "-translate-x-full opacity-0 scale-95 z-10 pointer-events-none"
          }`}
        >
          <RegisterForm />
        </div>

        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden
          transition-transform duration-700 ease-in-out transform-gpu will-change-transform z-50
          ${
            isActive
              ? "-translate-x-full rounded-r-[150px] rounded-l-none"
              : "translate-x-0 rounded-l-[150px]"
          }`}
        >
          <div
            className={`relative w-[200%] h-full flex
            transition-transform duration-700 ease-in-out transform-gpu will-change-transform
            ${isActive ? "-translate-x-1/2" : "translate-x-0"}`}
          >
            <div
              className="relative w-1/2 h-full flex flex-col items-center justify-center text-center px-8
              bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50
              backdrop-blur-xl text-primary-foreground"
            >
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/")}
                  className="cursor-pointer"
                >
                  ← Home
                </Button>
              </div>
              <h1 className="text-2xl font-semibold">Welcome Back</h1>

              <Button
                className="
                mt-5 px-6 h-10
                bg-primary-foreground text-primary
                hover:bg-primary-foreground/90
                transition-all duration-300
                shadow-sm hover:shadow-md
                hover:scale-[1.03]
                active:scale-[0.97]
                cursor-pointer
              "
                onClick={() => handleSwitch("register")}
              >
                Register
              </Button>
            </div>

            <div
              className="relative w-1/2 h-full flex flex-col items-center justify-center text-center px-8
              bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50
              backdrop-blur-xl text-primary-foreground"
            >
              <div className="absolute top-4 left-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/")}
                  className="cursor-pointer"
                >
                  ← Home
                </Button>
              </div>
              <h1 className="text-2xl font-semibold">Welcome</h1>

              <Button
                className="
                mt-5 px-6 h-10
                bg-primary-foreground text-primary
                hover:bg-primary-foreground/90
                transition-all duration-300
                shadow-sm hover:shadow-md
                hover:scale-[1.03]
                active:scale-[0.97]
                cursor-pointer
              "
                onClick={() => handleSwitch("login")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AuthSocial />
    </div>
  );
}
