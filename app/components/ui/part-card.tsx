import * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
 
export type PartCardProduct = {
	id: string;
	name: string;
	year: number;
	model: string;
	price: number;
	stock: boolean;
	desc: string;
	photo: string;
};

type PartCardProps = {
	product?: PartCardProduct;
};

export function PartCard({ product }: PartCardProps) {
	if (!product) {
		return null;
	}

	const [loadError, setLoadError] = useState(false);
	const normalizedPhoto = String(product.photo ?? "")
		.trim()
		.replace(/^['"]+|['"]+$/g, "");
	const photoSrc = normalizedPhoto
		? normalizedPhoto.startsWith("http")
			? normalizedPhoto
			: normalizedPhoto.startsWith("//")
			? `https:${normalizedPhoto}`
			: normalizedPhoto.startsWith("/")
			? normalizedPhoto
			: normalizedPhoto.startsWith("uploads/")
			? `/${normalizedPhoto}`
			: `/uploads/${normalizedPhoto}`
		: "/";

	const isValidPhotoSrc = photoSrc.startsWith("http") || photoSrc.startsWith("/");

	return (
	  <div className={cn("flex w-full max-w-[16.5rem] flex-col items-center overflow-hidden rounded-none border border-slate-200 bg-white px-3 py-3 text-slate-900 shadow-[0_18px_40px_rgba(0,0,0,0.08)]")}>
	
		<img
			src={isValidPhotoSrc && !loadError ? photoSrc : "/placeholder.png"}
			alt={product.name}
			className="h-32 w-full rounded-[14px] border border-slate-200 bg-slate-100 object-cover"
			onError={() => setLoadError(true)}
		/>
		{loadError ? (
			<p className="mt-2 text-xs text-red-600">Image failed to load.</p>
		) : null}
		<div className="mt-3 flex w-full items-center justify-between gap-2">
			<h2 className="text-[16px] font-semibold uppercase tracking-[0.1em] text-slate-900">{product.name}</h2>
			<span className="rounded-full border border-red-500/30 bg-red-500 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(239,68,68,0.25)]">{product.price}₾</span>
		</div>
		 <p className="mt-2 text-center text-[12px] leading-5 text-slate-600">{product.desc}</p>
		 <div className="mt-3 flex w-full items-center justify-between gap-2 text-[12px]">
			<span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700">{product.stock ? "In stock" : "Out of stock"}</span>
			<span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-red-700">Year: {product.year}</span>
		 </div>
	  </div>
	);
}