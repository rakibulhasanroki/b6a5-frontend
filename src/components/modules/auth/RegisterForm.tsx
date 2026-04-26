"use client";

import { useForm } from "@tanstack/react-form";
import { registerSchema } from "@/lib/validations/register.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeRedirect } from "@/lib/utils/redirect";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const redirectToRaw = searchParams.get("redirectTo");
        const redirectTo = getSafeRedirect(redirectToRaw);

        const res = await fetch(`/api/v1/auth/register`, {
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
              : "Registration failed";

          router.replace(
            `/register?error=${encodeURIComponent(errorMessage)}${
              redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""
            }`,
          );

          return;
        }

        router.replace(
          `/register?success=register${
            redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""
          }`,
        );
      } catch {
        router.replace(
          `/register?error=${encodeURIComponent("Something went wrong")}`,
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
    px-5 sm:px-8 md:px-10
    gap-3 sm:gap-4
    text-center
  "
    >
      <div className="w-full max-w-[320px] sm:max-w-[340px] space-y-3">
        {/* HEADER */}
        <div className="space-y-1">
          <p className="text-lg font-semibold">Create your account</p>
        </div>

        {/* NAME */}
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field
                className="text-left space-y-1 w-full relative"
                data-invalid={isInvalid}
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-medium text-muted-foreground"
                >
                  Name
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder={
                    !field.state.value && !field.state.meta.isValid
                      ? (field.state.meta.errors?.[0]?.message ??
                        "Name is required")
                      : "Enter your name"
                  }
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`
    h-9 rounded-lg
    px-3 text-sm
    ${
      !field.state.value && !field.state.meta.isValid
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

                {field.state.value && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="
      text-[10px]
      absolute
      -bottom-4
      left-0
      text-red-500
      whitespace-nowrap
    "
                  />
                )}
              </Field>
            );
          }}
        />

        {/* EMAIL */}
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field
                className="text-left space-y-1 w-full relative"
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
                    !field.state.value && !field.state.meta.isValid
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
      !field.state.value && !field.state.meta.isValid
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

                {field.state.value && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="
      text-[10px]
      absolute
      -bottom-4
      left-0
      text-red-500
      whitespace-nowrap
    "
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

            return (
              <Field
                className="text-left space-y-1 w-full relative"
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
                      !field.state.value && !field.state.meta.isValid
                        ? (field.state.meta.errors?.[0]?.message ??
                          "Password is required")
                        : "••••••••"
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`
      h-9 rounded-lg
      px-3 pr-10 text-sm
      ${
        !field.state.value && !field.state.meta.isValid
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

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {field.state.value && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="
      text-[10px]
      absolute
      -bottom-4
      left-0
      text-red-500
      whitespace-nowrap
    "
                  />
                )}
              </Field>
            );
          }}
        />

        {/* CONFIRM PASSWORD */}
        <form.Field
          name="confirmPassword"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field
                className="text-left space-y-1 w-full relative"
                data-invalid={isInvalid}
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-medium text-muted-foreground"
                >
                  Confirm Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showConfirm ? "text" : "password"}
                    placeholder={
                      !field.state.value && !field.state.meta.isValid
                        ? (field.state.meta.errors?.[0]?.message ??
                          "Passwords must match")
                        : "••••••••"
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`
      h-9 rounded-lg
      px-3 pr-10 text-sm
      ${
        !field.state.value && !field.state.meta.isValid
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

                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {field.state.value && !field.state.meta.isValid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="
      text-[10px]
      absolute
      -bottom-4
      left-0
      text-red-500
      whitespace-nowrap
    "
                  />
                )}
              </Field>
            );
          }}
        />

        {/* BUTTON */}
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
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          )}
        />
      </div>
    </form>
  );
}
