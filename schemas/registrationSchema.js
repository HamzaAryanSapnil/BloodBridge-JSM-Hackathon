import { passwordRules } from "@/app/(auth)/registration/page";
import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username cannot exceed 20 characters")
  .regex(/^[a-zA-Z]+$/, "Username can only contain letters");

export const registrationSchema = z.object({
  username: usernameValidation,

  email: z
    .string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Please enter a valid email address.",
    }),
  bloodGroup: z.string({ required_error: "Please select a blood group." }).min(1, "Please select a blood group.") ,
  bloodDonationAbility: z.boolean({
    required_error: "Please select a blood donation ability.",
  }),
  division: z.string({
    required_error: "Please select a division.",
  }).min(1, "Please select a division."),
  district: z.string({ required_error: "Please select a district." }).min(1, "Please select a district."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(20, { message: "Password cannot be longer than 20 characters." })
    .refine((value) => passwordRules.lowercase.test(value), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((value) => passwordRules.uppercase.test(value), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((value) => passwordRules.digit.test(value), {
      message: "Password must contain at least one digit.",
    })
    .refine((value) => passwordRules.special.test(value), {
      message: "Password must contain at least one special character.",
    }),
});
