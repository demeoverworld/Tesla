"use server";

import { db } from "@/server";
import { reserve } from "@/server/schema";
import { reserveSchema } from "@/types/reserve-schema";

export type ReserveActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function addReserve(
  _prevState: ReserveActionState,
  formData: FormData
): Promise<ReserveActionState> {
  if (!db) {
    return { error: "Database is not configured" };
  }

  const payload = {
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    model: formData.get("model"),
    hour: formData.get("hour"),
    day: formData.get("day"),
    month: formData.get("month"),
    service: formData.get("service"),
    carYear: formData.get("carYear"),
  };

  const parsed = reserveSchema.safeParse(payload);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      error: flattened.formErrors[0] ?? "Invalid reservation data",
      fieldErrors: flattened.fieldErrors,
    };
  }

  try {
    await db.insert(reserve).values(parsed.data);
    return { success: "Reservation submitted successfully" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to save reservation" };
  }
}
