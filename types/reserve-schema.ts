import * as z from "zod";

export const reserveSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  model: z.string().min(1, "Model is required"),
  hour: z.string().min(1, "Hour is required"),
  day: z.string().min(1, "Day is required"),
  service: z.string().min(1, "Service is required"),
  carYear: z.string().min(1, "Car year is required"),
});

export type ReserveSchema = z.infer<typeof reserveSchema>;
