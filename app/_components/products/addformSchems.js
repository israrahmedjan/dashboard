import { z } from "zod";
export const addformSchema = z.object({
  name: z.string().min(2, {
    message: "Category Name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  price: z.preprocess(
  (val) => Number(val),
  z.number({ invalid_type_error: "Price must be a number" })
    .min(1, { message: "Price must be at least 1" })
),
 productType: z.enum(["simple", "variable"],
   { required_error: "Select product type",message :"Product Type is required" }
  ),
  categories: z.array(z.string()).min(1, { message: "Select at least one category" }),
  sku: z.string().optional(),
  stock: z.number().min(1, { message: "Stock must be zero or more" }),
  status: z.enum(["draft", "published", "archived"],
    { required_error: "Select status type",message :"Select status type" },
  ),
  description: z.string(),
  productId: z.string(),
  imageUrl: z.string(),
  brand: z.string().optional(),
  image: z
    .any()
//   .refine((file) => file instanceof File || file?.length > 0, {
//     message: "Image is required.",
//   }),
});