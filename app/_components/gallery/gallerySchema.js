import { z } from "zod";
export const gallerySchema = z.object({
  name: z.string().min(2, {
    message: "Variations Name must be at least 2 characters.",
  }),
  productId: z.string().min(1, { message: "Select at least one Product" }),
  size: z.string(),
  color: z.string(),
  description: z.string(),
    price: z.preprocess(
  (val) => Number(val),
  z.number({ invalid_type_error: "Price must be a number" })
    .min(1, { message: "Price must be at least 1" })
),
  stock: z.preprocess(
  (val) => Number(val),
  z.number({ invalid_type_error: "Stock must be a number" })
    .min(1, { message: "Price must be at least 1" })
),
imageUrl: z.string(),
  image: z.any()
//   .refine((file) => file instanceof File || file?.length > 0, {
//     message: "Image is required.",
//   }),
});
