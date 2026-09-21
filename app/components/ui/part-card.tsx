import * as React from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
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

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		if (isOpen) window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isOpen]);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<div
				role="button"
				tabIndex={0}
				onClick={() => setIsOpen(true)}
				onKeyDown={(e) => { if (e.key === "Enter") setIsOpen(true); }}
				className={cn(
					"flex w-full flex-col items-center overflow-hidden rounded-none border border-slate-200 bg-white px-3 py-3 text-slate-900 shadow-[0_18px_40px_rgba(0,0,0,0.08)] cursor-pointer max-sm:flex-row max-sm:items-center max-sm:gap-3 sm:w-[16.5rem]"
				)}
			>
				<img
					src={isValidPhotoSrc && !loadError ? photoSrc : "/placeholder.png"}
					alt={product.name}
					className="order-1 h-32 w-full rounded-none border border-slate-200 bg-slate-100 object-cover max-sm:order-1 max-sm:h-24 max-sm:w-24 max-sm:shrink-0"
					onError={() => setLoadError(true)}
				/>
				<div className="order-2 flex w-full min-w-0 flex-col max-sm:order-2 max-sm:flex-1 max-sm:justify-center">
					{loadError ? (
						<p className="mt-0 text-xs text-red-600">Image failed to load.</p>
					) : null}
					<div className="flex w-full items-center justify-between gap-2">
						<h2 className="text-[16px] font-semibold uppercase tracking-[0.1em] text-slate-900">{product.name}</h2>
						<span className="rounded-full border border-red-500/30 bg-red-500 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(239,68,68,0.25)]">{product.price}₾</span>
					</div>
					<p className="mt-2 text-left text-[12px] leading-5 text-slate-600 sm:text-center">{product.desc}</p>
					<div className="mt-3 flex w-full items-center justify-between gap-2 text-[12px]">
						<span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700">{product.stock ? "In stock" : "Out of stock"}</span>
						<span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-red-700">Year: {product.year}</span>
					</div>
				</div>
			</div>

		{isOpen && mounted && createPortal(
			<div
				aria-modal="true"
				role="dialog"
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
				onClick={() => setIsOpen(false)}
			>
				<img
					src={isValidPhotoSrc && !loadError ? photoSrc : "/placeholder.png"}
					alt={product.name}
					onClick={(e) => e.stopPropagation()}
					className="max-h-[90vh] max-w-[90vw] object-contain rounded-none shadow-lg"
				/>
			</div>
		, document.body)}
		</>
	);
}