import * as React from "react";

import { cn } from "@/lib/utils";
 
export type PartCardProduct = {
	id: string;
	name: string;
	year: number;
	model: string;
	price: number;
	stock: number;
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

	const photoSrc = product.photo
		? product.photo.startsWith("http")
			? product.photo
			: product.photo.startsWith("/")
			? product.photo
			: `/uploads/${product.photo}`
		: "/";

	return (
	  <div className={cn("flex w-full max-w-[16.5rem] flex-col items-center overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(160deg,_rgba(68,0,0,0.95)_0%,_rgba(24,24,24,0.98)_48%,_rgba(6,6,6,1)_100%)] px-3 py-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-sm")}>
	
		<img src={photoSrc} alt={product.name} className="h-32 w-full rounded-[14px] border border-white/10 bg-black/30 object-cover" />
		<div className="mt-3 flex w-full items-center justify-between gap-2">
			<h2 className="text-[16px] font-semibold uppercase tracking-[0.1em] text-white">{product.name}</h2>
			<span className="rounded-full border border-red-400/40 bg-red-500 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(239,68,68,0.25)]">{product.price}$</span>
		</div>
		 <p className="mt-2 text-center text-[12px] leading-5 text-white/72">{product.desc}</p>
		 <div className="mt-3 flex w-full items-center justify-between gap-2 text-[12px]">
			<span className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-white/88">Stock: {product.stock}</span>
			<span className="rounded-full border border-red-400/25 bg-red-500/18 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-red-100">Year: {product.year}</span>
		 </div>
		<button type="button" className="button rounded-full">
			<span>view details</span>
		</button>

		<style jsx>{`
			.button {
				pointer-events: auto;
				cursor: pointer;
				background: #f3f3f3;
				border: 1px solid rgba(255, 255, 255, 0.14);
				padding: 0.65rem 1.2rem;
				margin: 0.85rem 0 0;
				font-family: inherit;
				font-size: 0.68rem;
				font-weight: 700;
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				color: #f3f3f3;
				letter-spacing: 0.16em;
				text-transform: uppercase;
				box-shadow: 0 10px 22px rgba(0, 0, 0, 0.24);
			}

			.button span {
				position: relative;
				z-index: 1;
				color: #ef4444;
				transition: color 0.4s cubic-bezier(0.3, 1, 0.8, 1);
			}

			.button::before,
			.button::after {
				content: "";
				position: absolute;
				top: 0;
				left: -10%;
				width: 120%;
				height: 100%;
				background: linear-gradient(135deg, #b30000 0%, #ff3b30 100%);
				transform: skew(30deg) translateX(-115%);
				transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
			}

			.button::after {
				background: #f3f3f3;
				transform: skew(30deg) translateX(0%);
			}

			.button:hover::before {
				transform: skew(30deg) translateX(0%);
			}

			.button:hover::after {
				transform: skew(30deg) translateX(115%);
			}

			.button:hover span {
				color: #fff;
			}

			.button:hover {
				box-shadow: 0 16px 34px rgba(179, 0, 0, 0.26);
			}
		`}</style>
	  </div>
	);
}
