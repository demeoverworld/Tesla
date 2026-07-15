import * as z from "zod";

export const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string().trim().min(1, "Phone is required").max(30, "Phone number is too long"),
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message is too long"),
});

export type MessageSchema = z.infer<typeof messageSchema>;
