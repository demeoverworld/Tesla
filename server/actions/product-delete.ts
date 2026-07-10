"use server";

import { db } from "@/server";
import { products } from "@/server/schema";
import { eq } from "drizzle-orm";

export async function deleteProduct(productId: string) {
  try {
    await db.delete(products).where(eq(products.id, productId));
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete product" };
  }
}
