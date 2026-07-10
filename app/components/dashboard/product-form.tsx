"use client";

import { useEffect, useRef, useActionState } from "react";
import { addProduct, type ProductAddState } from "@/server/actions/product";

const initialState: ProductAddState = {};

type ProductFormProps = {
  locale: "en" | "ka" | "ru";
  productId?: string;
  existingProduct?: {
    name: string;
    year: number;
    model: string;
    price: number;
    stock: number;
    desc: string;
    photo: string;
  };
};

export function ProductForm({ locale, productId, existingProduct }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(addProduct, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && !productId) {
      formRef.current?.reset();
    }
  }, [state.success, productId]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 text-red-500 pl-15"
    >
      <input type="hidden" name="locale" value={locale} />
      {productId && <input type="hidden" name="productId" value={productId} />}
      <input type="hidden" name="existingPhoto" value={existingProduct?.photo || ""} />

      <header className="text-[25px]">{productId ? "Edit Product" : "Add Product"}</header>

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-green-600">{state.success}</p> : null}

      <div className="flex flex-col gap-3 md:flex-row md:gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="#">Name</h2>
          <div className="relative w-72">
            <input
              id="product-name"
              name="name"
              defaultValue={existingProduct?.name || ""}
              required
              className="peer w-72 rounded-md border border-red-500 bg-white px-3 pb-1.5 pt-3 text-sm text-red-700 placeholder-transparent outline-none transition-colors hover:border-red-600 hover:bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-200"
              placeholder="Enter product name"
            />
            <label
              htmlFor="product-name"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-red-300 transition-all peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[10px] peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-red-500"
            >
              Enter product name
            </label>
          </div>

          <h2 className="">Year</h2>
          <div className="relative w-72">
            <input
              id="product-year"
              name="year"
              type="number"
              min={1886}
              defaultValue={existingProduct?.year || ""}
              required
              className="peer w-72 rounded-md border border-red-500 bg-white px-3 pb-1.5 pt-3 text-sm text-red-700 placeholder-transparent outline-none transition-colors hover:border-red-600 hover:bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-200"
              placeholder="Enter product year"
            />
            <label
              htmlFor="product-year"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-red-300 transition-all peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[10px] peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-red-500"
            >
              Enter product year
            </label>
          </div>

          <h2 className="">Model</h2>
          <div className="relative w-72">
            <input
              id="product-model"
              name="model"
              defaultValue={existingProduct?.model || ""}
              required
              className="peer w-72 rounded-md border border-red-500 bg-white px-3 pb-1.5 pt-3 text-sm text-red-700 placeholder-transparent outline-none transition-colors hover:border-red-600 hover:bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-200"
              placeholder="Enter product model"
            />
            <label
              htmlFor="product-model"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-red-300 transition-all peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[10px] peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-red-500"
            >
              Enter product model
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="">Price</h2>
          <div className="relative w-72">
            <input
              id="product-price"
              name="price"
              type="number"
              min={0}
              defaultValue={existingProduct?.price || ""}
              required
              className="peer w-72 rounded-md border border-red-500 bg-white px-3 pb-1.5 pt-3 text-sm text-red-700 placeholder-transparent outline-none transition-colors hover:border-red-600 hover:bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-200"
              placeholder="Enter product price"
            />
            <label
              htmlFor="product-price"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-red-300 transition-all peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[10px] peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-red-500"
            >
              Enter product price
            </label>
          </div>

          <h2 className="">Stock</h2>
          <div className="relative w-72">
            <input
              id="product-stock"
              name="stock"
              type="number"
              min={0}
              defaultValue={existingProduct?.stock || ""}
              required
              className="peer w-72 rounded-md border border-red-500 bg-white px-3 pb-1.5 pt-3 text-sm text-red-700 placeholder-transparent outline-none transition-colors hover:border-red-600 hover:bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-200"
              placeholder="Enter product stock"
            />
            <label
              htmlFor="product-stock"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-red-300 transition-all peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[10px] peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-red-500"
            >
              Enter product stock
            </label>
          </div>

          <h2 className="">Description</h2>
          <div className="relative w-72">
            <input
              id="product-description"
              name="desc"
              defaultValue={existingProduct?.desc || ""}
              required
              className="peer w-72 rounded-md border border-red-500 bg-white px-3 pb-1.5 pt-3 text-sm text-red-700 placeholder-transparent outline-none transition-colors hover:border-red-600 hover:bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-200"
              placeholder="Enter product description"
            />
            <label
              htmlFor="product-description"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-xs text-red-300 transition-all peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[10px] peer-focus:text-red-500 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-red-500"
            >
              Enter product description
            </label>
          </div>

          <h2 className="">Photo</h2>
          <input
            id="product-photo"
            name="photo"
            type="file"
            accept="image/*"
            required={!productId}
            className="w-72 rounded-md border border-red-500 bg-white px-3 py-1.5 text-sm text-red-700 outline-none transition-colors file:mr-3 file:rounded file:border-0 file:bg-red-600 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-white hover:border-red-600 hover:bg-red-50/30 focus:border-red-600 focus:ring-2 focus:ring-red-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        aria-busy={pending}
        className="group mt-2 flex h-[25px] w-152 flex-col items-center overflow-hidden rounded-md border hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-[25px] group-hover:text-[#fff]">
          <span>{pending ? "Saving" : productId ? "Update" : "Submit"}</span>
          <span>{pending ? "Saving" : productId ? "Update" : "Submit"}</span>
        </div>
      </button>
    </form>
  );
}
