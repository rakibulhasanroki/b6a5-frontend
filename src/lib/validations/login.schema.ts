import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .refine((val) => val.length === 0 || val.length >= 8, {
      message: "Password must be at least 8 characters long",
    })
    .refine(
      (val) => {
        if (val.length < 8) return true; // skip this check until length is valid

        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasSpecial = /[^A-Za-z0-9]/.test(val);

        return hasLower && hasUpper && hasSpecial;
      },
      {
        message:
          "Password must include uppercase, lowercase and special character",
      },
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
