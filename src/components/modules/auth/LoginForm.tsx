"use client";

import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/lib/validations/login.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeRedirect } from "@/lib/utils/redirect";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const redirectTo = getSafeRedirect(searchParams.get("redirectTo"));

        const res = await fetch(`/api/v1/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(value),
        });

        const data = await res.json();

        if (!res.ok) {
          const errorMessage =
            typeof data?.message === "string"
              ? data.message
              : "Invalid credentials";

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
      } catch (err: any) {
        router.replace(
          `/login?error=${encodeURIComponent("Something went wrong")}`,
        );
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="
    w-full 
    flex flex-col justify-center items-center
    px-6 sm:px-8 md:px-10
    gap-3
    text-center
  "
    >
      <div className="w-full max-w-[320px] space-y-3">
        {/* HEADER */}
        <div className="space-y-1">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            Sign in to continue
          </p>
        </div>

        {/* EMAIL */}
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const isEmptyError = isInvalid && field.state.value === "";
            const isValueError = isInvalid && field.state.value !== "";

            return (
              <Field
                className="text-left space-y-1 w-full"
                data-invalid={isInvalid}
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-medium text-muted-foreground"
                >
                  Email
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder={
                    isEmptyError
                      ? (field.state.meta.errors?.[0]?.message ??
                        "Email is required")
                      : "you@example.com"
                  }
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`
    h-9 rounded-lg
    px-3 text-sm
    ${
      isEmptyError
        ? "placeholder:text-red-500 placeholder:text-xs"
        : "placeholder:text-xs placeholder:text-muted-foreground/70"
    }
    bg-background/70
    border border-border/50
    focus:border-primary/60
    focus:ring-1 focus:ring-primary/20
    focus:bg-background
    transition-all
  `}
                />

                {isValueError && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="text-[10px]"
                  />
                )}
              </Field>
            );
          }}
        />

        {/* PASSWORD */}
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const isEmptyError = isInvalid && field.state.value === "";
            const isValueError = isInvalid && field.state.value !== "";

            return (
              <Field
                className="text-left space-y-1 w-full"
                data-invalid={isInvalid}
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-medium text-muted-foreground"
                >
                  Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      isEmptyError
                        ? (field.state.meta.errors?.[0]?.message ??
                          "Password is required")
                        : "••••••••"
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`
      h-9 rounded-lg pr-10
      bg-background/60
      border-border/60
      ${isEmptyError ? "placeholder:text-red-500 placeholder:text-xs" : ""}
      focus:border-primary/50
      focus:ring-1 focus:ring-primary/30
      transition-all
    `}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {isValueError && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="text-[10px]"
                  />
                )}
              </Field>
            );
          }}
        />

        {/* ACTION */}
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="
        mt-1 w-full h-9 rounded-lg
        bg-primary/90 text-primary-foreground
        hover:bg-accent/90
        transition-all duration-300
        shadow-sm hover:shadow-md
        hover:scale-[1.02]
        active:scale-[0.97]
        border border-primary/20
        cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
      "
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          )}
        />
      </div>
    </form>
  );
}
