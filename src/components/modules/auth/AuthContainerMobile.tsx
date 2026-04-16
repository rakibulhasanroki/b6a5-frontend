"use client";

import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Container from "@/components/custom/Container";
import { useAuthContainer } from "./useAuthContainer";
import AuthSocial from "./AuthSocial";

type Props = {
  mode: "login" | "register";
};

export default function AuthContainerMobile({ mode }: Props) {
  const { isActive, handleSwitch, router } = useAuthContainer(mode);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 gap-5">
      <Container>
        <div
          className="relative w-full max-w-md h-[540px]
          bg-card/80 backdrop-blur-xl border border-border
          rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] overflow-hidden"
        >
          {/* LOGIN FORM */}
          <div
            className={`absolute top-0 left-0 w-full h-[82%] flex items-end justify-center pb-6
            transition-transform duration-700 ease-in-out transform-gpu will-change-transform
            ${
              isActive
                ? "translate-y-full opacity-0 scale-95 z-10 pointer-events-none"
                : "translate-y-0 opacity-100 scale-100 z-20"
            }`}
          >
            <LoginForm />
          </div>

          {/* REGISTER FORM */}
          <div
            className={`absolute bottom-0 left-0 w-full h-full flex items-start justify-center pt-6
            transition-transform duration-700 ease-in-out transform-gpu will-change-transform
            ${
              isActive
                ? "translate-y-0 opacity-100 scale-100 z-30"
                : "-translate-y-full opacity-0 scale-95 z-10 pointer-events-none"
            }`}
          >
            <RegisterForm />
          </div>

          {/* OVERLAY */}
          <div
            className={`absolute left-0 w-full h-[18%] overflow-hidden
            transition-transform duration-700 ease-in-out transform-gpu will-change-transform z-50
            ${
              isActive ? "top-[82%] rounded-t-[60px]" : "top-0 rounded-b-[60px]"
            }`}
          >
            <div
              className={`relative w-full h-[200%] flex flex-col
              transition-transform duration-700 ease-in-out transform-gpu will-change-transform
              ${isActive ? "-translate-y-1/2" : "translate-y-0"}`}
            >
              {/* LOGIN SIDE */}
              <div
                className="relative w-full h-1/2 flex flex-col items-center justify-center text-center px-4
                bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50
                text-primary-foreground"
              >
                <div className="absolute top-2 left-3">
                  <Button variant="ghost" onClick={() => router.push("/")}>
                    ← Home
                  </Button>
                </div>

                <h1 className="text-sm font-semibold">Welcome Back</h1>

                <Button
                  className="mt-2 bg-primary-foreground text-primary"
                  onClick={() => handleSwitch("register")}
                >
                  Register
                </Button>
              </div>

              {/* REGISTER SIDE */}
              <div
                className="relative w-full h-1/2 flex flex-col items-center justify-center text-center px-4
                bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50
                text-primary-foreground"
              >
                <div className="absolute bottom-2 left-3">
                  <Button variant="ghost" onClick={() => router.push("/")}>
                    ← Home
                  </Button>
                </div>

                <h1 className="text-sm font-semibold">Welcome</h1>

                <Button
                  className="mt-2 bg-primary-foreground text-primary"
                  onClick={() => handleSwitch("login")}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <AuthSocial />
    </div>
  );
}
