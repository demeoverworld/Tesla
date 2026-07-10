import * as z from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  year: z.coerce.number().int().min(1886, "Enter a valid year"),
  model: z.string().min(1, "Model is required"),
  price: z.coerce.number().int().min(0, "Price must be zero or greater"),
  stock: z.coerce.number().int().min(0, "Stock must be zero or greater"),
  desc: z.string().min(1, "Description is required"),
  photo: z.string().min(1, "Photo is required"),
});

export type ProductSchema = z.infer<typeof productSchema>;
