import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number");

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const MAX_FILE_SIZE = 3000000; // 3MB
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

export const UserRegisterSchema = z
  .object({
    first_name: z.string().min(2, "First name is too short"),
    last_name: z.string().min(2, "Last name is too short"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    phone_number: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    image_url: z
      .any()
      .optional()
      // We only run refinements IF a file was actually picked
      .refine((files) => {
        if (!files || files.length === 0) return true; // It's optional, so empty is fine
        return files[0].size <= MAX_FILE_SIZE;
      }, `Max file size is 3MB.`)
      .refine((files) => {
        if (!files || files.length === 0) return true;
        return ACCEPTED_IMAGE_TYPES.has(files[0].type);
      }, ".jpg, .jpeg, .png and .webp files are accepted."),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid work email"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type UserRegisterFormData = z.infer<typeof UserRegisterSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
