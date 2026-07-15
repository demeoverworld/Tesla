"use server";

import { db } from "@/server";
import { messages } from "@/server/schema";
import { messageSchema } from "@/types/messages-schema";

export type MessageActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function addMessage(
  _prevState: MessageActionState,
  formData: FormData
): Promise<MessageActionState> {
  if (!db) {
    return { error: "Database is not configured" };
  }

  const payload = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = messageSchema.safeParse(payload);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      error: flattened.formErrors[0] ?? "Invalid message data",
      fieldErrors: flattened.fieldErrors,
    };
  }

  try {
    await db.insert(messages).values(parsed.data);
    return { success: "Message sent successfully" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to save message",
    };
  }
}
