import { db } from "@/server"; import {productSchema} from "@/types/product-schema"; import {createSafeActionClient} from "next-safe-action"; import { products } from "../schema"; import { eq } from "drizzle-orm";

const action = createSafeActionClient();

export const createProduct = action
  .schema(productSchema)
  .action(async ({ parsedInput }) => {
    const { name, year, model, price, desc, photo, stock, id } = parsedInput;

    try {
      if (id) {
        const currentProduct = await db.query.products.findFirst({
          where: (products, { eq }) => eq(products.id, String(id)),
        });

        if (!currentProduct) {
          throw new Error("Product not found");
        }

        await db
          .update(products)
          .set({ name, year, model, price, desc, photo, stock})
          .where(eq(products.id, String(id)));

        return {
          message: "Product updated successfully",
          status: 200,
        };
      }

      await db
        .insert(products)
        .values({
          name,
          year,
          model,
          price,
          desc,
          photo,
          stock,
        });

      return {
        message: "Product created successfully",
        status: 200,
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Unknown error",
        status: 500,
      };
    }
  });
