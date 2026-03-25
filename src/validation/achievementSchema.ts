import { z } from "zod";

export const achievementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  achieved_at: z.string().min(1, "Date is required"),
  image_url: z
    .any()
    .refine(
      (files) => !files || files.length === 0 || files[0]?.size <= 5000000,
      `Max image size is 5MB.`,
    )
    .optional(),
});

export type AchievementFormData = z.infer<typeof achievementSchema>;
