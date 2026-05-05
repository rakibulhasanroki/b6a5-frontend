"use client";

import { useForm } from "@tanstack/react-form";
import { createAdminAction } from "@/service/admin/admin.actions";
import { useState } from "react";
import { registerSchema } from "@/lib/validations/register.schema";
import { toast } from "sonner";

export default function CreateAdminSection() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);

      try {
        const res = await createAdminAction({
          name: value.name,
          email: value.email,
          password: value.password,
        });

        if (!res.success) {
          toast.error(res.message || "Something went wrong");
          return;
        }

        toast.success(res.message || "Operation completed successfully");

        form.reset();
      } finally {
        setLoading(false);
      }
    },
    validators: {
      onChange: registerSchema,
    },
  });

  const inputClass =
    "w-full h-10 px-3 text-sm rounded-lg border border-border/50 bg-background/70 " +
    "focus:border-primary/60 focus:ring-1 focus:ring-primary/20 " +
    "transition cursor-text";

  const labelClass = "text-xs font-medium text-muted-foreground";

  return (
    <div className="w-full flex justify-center pt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="max-w-lg w-full space-y-5 p-5 rounded-xl border bg-card"
      >
        <h2 className="text-lg font-semibold text-center">Create Admin</h2>

        {/* NAME */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-muted-foreground">
                  Name
                </label>
                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-md border border-border bg-background/70 focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  placeholder="John Doe"
                />
                {isInvalid && (
                  <p className="text-[11px] text-red-500">
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* EMAIL */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-md border border-border bg-background/70 focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  placeholder="you@example.com"
                />
                {isInvalid && (
                  <p className="text-[11px] text-red-500">
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* PASSWORD */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-muted-foreground">
                  Password
                </label>
                <input
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-md border border-border bg-background/70 focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  placeholder="••••••••"
                />
                {isInvalid && (
                  <p className="text-[11px] text-red-500">
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* CONFIRM PASSWORD */}
        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-muted-foreground">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-md border border-border bg-background/70 focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                  placeholder="••••••••"
                />
                {isInvalid && (
                  <p className="text-[11px] text-red-500">
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-9 rounded-md bg-primary text-white text-sm font-medium 
        hover:bg-primary/90 active:scale-[0.98]
        transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
}
