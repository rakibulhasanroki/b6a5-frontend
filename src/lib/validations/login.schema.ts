import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .refine(
      (val) => val.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      {
        message: "Enter a valid email",
      },
    )
    .refine(
      (val) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return true;

        return /\.(com|net|org|edu|gov)$/i.test(val);
      },
      {
        message: "Email must have a valid domain (e.g. .com, .net)",
      },
    ),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .refine((val) => val.length === 0 || val.length >= 8, {
      message: "Password must be at least 8 characters long",
    })
    .refine(
      (val) => {
        if (val.length < 8) return true;

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
