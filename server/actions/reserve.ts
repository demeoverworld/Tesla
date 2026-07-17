"use server";

import { db } from "@/server";
import { reserve } from "@/server/schema";
import { reserveSchema } from "@/types/reserve-schema";
import { and, eq } from "drizzle-orm";

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
    const month = new Date().toLocaleString("en-US", { month: "long" });

    const existingReservation = await db
      .select({ id: reserve.id })
      .from(reserve)
      .where(
        and(
          eq(reserve.day, parsed.data.day),
          eq(reserve.hour, parsed.data.hour),
          eq(reserve.month, month)
        )
      )
      .limit(1);

    if (existingReservation.length > 0) {
      return {
        error: "This time slot is already reserved. Please choose another day or hour.",
        fieldErrors: {
          day: ["This day and hour is already reserved"],
          hour: ["This day and hour is already reserved"],
        },
      };
    }

    await db.insert(reserve).values({ ...parsed.data, month });
    return { success: "Reservation submitted successfully" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to save reservation" };
  }
}
