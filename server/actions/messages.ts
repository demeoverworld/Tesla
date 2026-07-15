"use server";

import { db } from "@/server";
import { messages } from "@/server/schema";
import { sendContactEmail } from "@/server/actions/emails";
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
    const inserted = await db.insert(messages).values(parsed.data).returning();
    const savedMessage = inserted[0];

    if (savedMessage) {
      await sendContactEmail({
        name: savedMessage.name,
        email: savedMessage.email,
        phone: savedMessage.phone,
        message: savedMessage.message,
      });
    }

    return { success: "Message sent successfully" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to save message",
    };
  }
}
