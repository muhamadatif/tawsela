import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least one special character"
    ),
});

export const signupSchema = z.object({
  mobile: z
    .string({ required_error: "Phone is required" })
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid phone number"),
});

export const registerSchema = z
  .object({
    fullname: z
      .string({ required_error: "Fullname is required" })
      .min(6, "Fullname must be at least 6 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Must include at least one number"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });
