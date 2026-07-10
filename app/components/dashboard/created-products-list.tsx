"use client";

import { useRouter } from "next/navigation";
import { deleteProduct } from "@/server/actions/product-delete";

type Product = {
  id: string;
  name: string;
  year: number;
  model: string;
  price: number;
  stock: number;
  desc: string;
  photo: string;
};

type CreatedProductsListProps = {
  products: Product[];
  locale: string;
};

export function CreatedProductsList({ products, locale }: CreatedProductsListProps) {
  const router = useRouter();

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      window.location.reload();
    }
  };

  const handleUpdate = (productId: string) => {
    router.push(`/${locale}/dashboard?view=product&productId=${productId}`);
  };

  if (products.length === 0) {
    return <p className="text-sm text-black/60">No products added yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {products.map((product) => (
        <li
          key={product.id}
          className="rounded-md border border-red-100 p-3"
        >
          <p className="text-base font-semibold text-black">
            {product.name}
          </p>
          <p className="text-sm text-black/70">
            {product.model} • {product.year}
          </p>
          <p className="text-sm text-black/70">
            Price: ${product.price} • Stock: {product.stock}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => handleUpdate(product.id)}
              className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
