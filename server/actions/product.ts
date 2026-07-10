"use server";

import { db } from "@/server";
import { products } from "@/server/schema";
import { productSchema } from "@/types/product-schema";
import { eq } from "drizzle-orm";

export type ProductAddState = {
	error?: string;
	success?: string;
	fieldErrors?: Record<string, string[]>;
};

export async function addProduct(
	_prevState: ProductAddState,
	formData: FormData
): Promise<ProductAddState> {
	const rawPhoto = formData.get("photo");
	const productId = formData.get("productId");

	const payload = {
		name: formData.get("name"),
		year: formData.get("year"),
		model: formData.get("model"),
		price: formData.get("price"),
		stock: formData.get("stock"),
		desc: formData.get("desc"),
		photo:
			typeof rawPhoto === "string"
				? rawPhoto
				: rawPhoto instanceof File && rawPhoto.size > 0
				? rawPhoto.name
				: "",
	};

	if (!db) {
		return { error: "Database is not configured" };
	}

	const parsed = productSchema.safeParse(payload);

	if (!parsed.success) {
		const flattened = parsed.error.flatten();
		return {
			error: flattened.formErrors[0] ?? "Invalid product data",
			fieldErrors: flattened.fieldErrors,
		};
	}

	try {
		const { name, year, model, price, stock, desc, photo } = parsed.data;

		if (productId && typeof productId === "string") {
			// Update existing product
			await db
				.update(products)
				.set({
					name,
					year,
					model,
					price,
					stock,
					desc,
					...(photo ? { photo } : {}),
				})
				.where(eq(products.id, productId));

			return { success: "Product updated successfully" };
		} else {
			// Create new product
			await db.insert(products).values({
				name,
				year,
				model,
				price,
				stock,
				desc,
				photo,
			});

			return { success: "Product created successfully" };
		}
	} catch {
		return { error: "Failed to save product" };
	}
}
