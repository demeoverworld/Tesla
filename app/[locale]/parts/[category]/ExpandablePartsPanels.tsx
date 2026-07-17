"use client";

import { PartCard, type PartCardProduct } from "@/app/components/ui/part-card";
import { useState } from "react";

type ExpandablePartsPanelsProps = {
  products: PartCardProduct[];
  categoryImageSrc: string;
  categorySideImageSrc: string;
  categoryTitle: string;
};

export function ExpandablePartsPanels({
  products,
  categoryImageSrc,
  categorySideImageSrc,
  categoryTitle,
}: ExpandablePartsPanelsProps) {
  const [firstExpanded, setFirstExpanded] = useState(false);
  const [secondExpanded, setSecondExpanded] = useState(false);
  const firstPanelProducts = products.filter(
    (product) => product.year >= 2016 && product.year <= 2020
  );
  const secondPanelProducts = products.filter(
    (product) => product.year >= 2020 && product.year <= 2026
  );
  const panelBaseButtonClass =
    "group flex w-full max-w-[62.5rem] cursor-pointer flex-col items-center justify-center gap-4 rounded-t-[24px] border border-slate-300/80 bg-[linear-gradient(165deg,#ffffff_0%,#f5f7fa_58%,#edf1f6_100%)] px-6 py-8 text-slate-900 shadow-[0_16px_34px_rgba(30,41,59,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(15,23,42,0.16)]";
  const panelBaseContentClass =
    "w-full max-w-[62.5rem] overflow-hidden rounded-b-[24px] border border-t-0 border-slate-300/80 bg-[linear-gradient(180deg,#f8fafc_0%,#eff3f8_100%)] transition-all duration-500";

  return (
    <div className="mx-auto flex w-full flex-col items-center gap-16 px-4 pb-12 sm:px-6">
      <div className="flex w-full flex-col items-center">
        <div className="mb-6">
          <h1 className="text-center text-6xl font-semibold tracking-[0.08em] text-slate-900 sm:text-7xl md:text-8xl">
            {categoryTitle}
          </h1>
        </div>

        <div className="relative flex w-[18.75rem] items-end justify-center overflow-hidden rounded-[20px] border-2 border-[#c6c6c6] bg-[linear-gradient(to_bottom_right,#a90101,#ffffff)] pl-[11.875rem] sm:w-[20rem] md:w-[21rem]">
          <img
            src={categoryImageSrc}
            alt={`${categoryTitle} main`}
            className="h-[20rem] w-auto object-contain translate-y-[9%] transition-transform duration-500 ease-out"
          />
        </div>

        <div className="-mt-30 flex transition-transform duration-500 ease-out hover:-translate-y-1">
          <img
            src={categorySideImageSrc}
            alt={`${categoryTitle} side`}
            className="h-[14rem] w-auto object-contain sm:h-[16rem] md:h-[18rem]"
          />
        </div>
      </div>

      <div className="w-full max-w-[62.5rem]">
        <button
          type="button"
          onClick={() => setFirstExpanded((prev) => !prev)}
          className={panelBaseButtonClass}
          aria-expanded={firstExpanded}
        >
          <img
            src={categoryImageSrc}
            alt={categoryTitle}
            className="h-auto w-56 transition-transform duration-300 group-hover:scale-[1.03] sm:w-72"
          />
          <div className="flex items-center gap-3">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
              Parts Range
            </span>
            <span className="h-px w-10 bg-slate-400/60" />
            <span className="text-lg font-semibold tracking-[0.06em] text-slate-900">2016-2020</span>
          </div>
          <span
            className={`text-sm text-slate-500 transition-transform duration-300 ${
              firstExpanded ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          >
            v
          </span>
        </button>

        <div
          className={`${panelBaseContentClass} ${
            firstExpanded ? "max-h-[56rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`flex flex-col justify-center gap-4 px-4 py-5 transition-all duration-400 sm:px-6 md:flex-row md:flex-wrap ${
              firstExpanded ? "translate-y-0" : "translate-y-3"
            }`}
          >
            {firstPanelProducts.map((product) => (
              <PartCard key={product.id} product={product}></PartCard>
            ))}
            {firstPanelProducts.length === 0 && (
              <p className="text-sm text-slate-500">No products for 2016-2020.</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[62.5rem]">
        <button
          type="button"
          onClick={() => setSecondExpanded((prev) => !prev)}
          className={panelBaseButtonClass}
          aria-expanded={secondExpanded}
        >
          <img
            src={categoryImageSrc}
            alt={categoryTitle}
            className="h-auto w-56 transition-transform duration-300 group-hover:scale-[1.03] sm:w-72"
          />
          <div className="flex items-center gap-3">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
              Parts Range
            </span>
            <span className="h-px w-10 bg-slate-400/60" />
            <span className="text-lg font-semibold tracking-[0.06em] text-slate-900">2020-2026</span>
          </div>
          <span
            className={`text-sm text-slate-500 transition-transform duration-300 ${
              secondExpanded ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          >
            v
          </span>
        </button>

        <div
          className={`${panelBaseContentClass} ${
            secondExpanded ? "max-h-[56rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`flex flex-col justify-center gap-4 px-4 py-5 transition-all duration-400 sm:px-6 md:flex-row md:flex-wrap ${
              secondExpanded ? "translate-y-0" : "translate-y-3"
            }`}
          >
            {secondPanelProducts.map((product) => (
              <PartCard key={product.id} product={product}></PartCard>
            ))}
            {secondPanelProducts.length === 0 && (
              <p className="text-sm text-slate-500">No products for 2020-2026.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
