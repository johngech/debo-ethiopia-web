import { z } from "zod";

// For multiple Image upload
export const eventSchema = z.object({
  title: z.string().min(3),
  images: z
    .array(z.any())
    .min(1, "Please upload at least one image")
    .max(5, "You can only upload up to 5 images")
    .refine(
      (files) => files.every((file) => file.size <= 2000000),
      "Each image must be under 2MB",
    ),
});
