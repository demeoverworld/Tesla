"use client";

import { PartCard, type PartCardProduct } from "@/app/components/ui/part-card";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./ExpandablePartsPanels.module.css";

type ExpandablePartsPanelsProps = {
  products: PartCardProduct[];
  categoryImageSrc: string;
  categorySideImageSrc: string;
  categoryPartsImageSrc: string;
  categoryTitle: string;
  categorySlug: string;
};

export function ExpandablePartsPanels({
  products,
  categoryImageSrc,
  categorySideImageSrc,
  categoryPartsImageSrc,
  categoryTitle,
  categorySlug,
}: ExpandablePartsPanelsProps) {
  const t = useTranslations("PartsPage");
  const imageUpModels = ["model-s", "model-3", "model-y"];
  const isCybertruck = categorySlug === "cybertruck";
  const isModelY = categorySlug === "model-y";
  const mainImageClass = isCybertruck
    ? styles.mainImageCybertruck
    : imageUpModels.includes(categorySlug)
      ? styles.mainImageUp
      : styles.mainImage;
  const mainClass = isCybertruck
    ? styles.mainCybertruck
    : isModelY
      ? styles.mainModelY
      : styles.main;
  const mainCarClass = isCybertruck ? styles.mainCarCybertruck : styles.mainCar;

  const rangeConfig = {
    "model-s": [
      { id: "model-s-2012-2015", label: "2012-2015", min: 2012, max: 2015 },
      { id: "model-s-2016-2020", label: "2016-2020", min: 2016, max: 2020 },
      { id: "model-s-2021-2026", label: "2021-2026", min: 2021, max: 2026 },
    ],
    "model-x": [
      { id: "model-x-2016-2020", label: "2016-2020", min: 2016, max: 2020 },
      { id: "model-x-2021-2026", label: "2021-2026", min: 2021, max: 2026 },
    ],
    "model-3": [
      { id: "model-3-2017-2020", label: "2017-2020", min: 2017, max: 2020 },
      { id: "model-3-2021-2023", label: "2021-2023", min: 2021, max: 2023 },
      { id: "model-3-2024-2026", label: "2024-2026", min: 2024, max: 2026 },
    ],
    "model-y": [
      { id: "model-y-2019-2024", label: "2019-2024", min: 2019, max: 2024 },
      { id: "model-y-2025-2026", label: "2025-2026", min: 2025, max: 2026 },
    ],
    cybertruck: [{ id: "cybertruck-2023-2026", label: "2023-2026", min: 2023, max: 2026 }],
    roadster: [{ id: "roadster-2026", label: "2026", min: 2026, max: 2026 }],
  } as const;

  const panelRanges =
    rangeConfig[categorySlug as keyof typeof rangeConfig] ?? [
      { id: "default-2016-2020", label: "2016-2020", min: 2016, max: 2020 },
      { id: "default-2021-2026", label: "2021-2026", min: 2021, max: 2026 },
    ];

  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>({});

  const togglePanel = (id: string) => {
    setExpandedPanels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const panelBaseButtonClass =
    "group flex w-full max-w-[62.5rem] cursor-pointer flex-col items-center justify-center gap-4 rounded-t-[24px] border border-slate-300/80 bg-[linear-gradient(165deg,#ffffff_0%,#f5f7fa_58%,#edf1f6_100%)] px-6 py-8 text-slate-900 shadow-[0_16px_34px_rgba(30,41,59,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(15,23,42,0.16)]";
  const panelBaseContentClass =
    "w-full max-w-[62.5rem] overflow-hidden rounded-b-[24px] border border-t-0 border-slate-300/80 bg-[linear-gradient(180deg,#f8fafc_0%,#eff3f8_100%)] transition-all duration-500";

  return (
    <div className="mx-auto flex w-full flex-col items-center gap-16 px-4 pb-12 sm:px-6">
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>
            {categoryTitle}
          </h1>
        </div>

        <div className={mainClass}>
          <img
            src={categoryImageSrc}
            alt={`${categoryTitle} main`}
            className={mainImageClass}
          />
        </div>

        <div className={mainCarClass}>
          <img
            src={categorySideImageSrc}
            alt={`${categoryTitle} side`}
            className="h-[600px] w-[700px] object-contain"
          />
        </div>
      </div>

      {panelRanges.map((range) => {
        const panelProducts = products.filter(
          (product) => product.year >= range.min && product.year <= range.max
        );
        const isExpanded = expandedPanels[range.id] ?? false;

        return (
          <div key={range.id} className="w-full max-w-[62.5rem]">
            <button
              type="button"
              onClick={() => togglePanel(range.id)}
              className={panelBaseButtonClass}
              aria-expanded={isExpanded}
            >
              <img
                src={categoryPartsImageSrc}
                alt={categoryTitle}
                className="h-auto w-56 transition-transform duration-300 group-hover:scale-[1.03] sm:w-72"
              />
              <div className="flex items-center gap-3">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
                  {t("partsRange")}
                </span>
                <span className="h-px w-10 bg-slate-400/60" />
                <span className="text-lg font-semibold tracking-[0.06em] text-slate-900">{range.label}</span>
              </div>
              <span
                className={`text-sm text-slate-500 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                v
              </span>
            </button>

            <div
              className={`${panelBaseContentClass} ${
                isExpanded ? "max-h-[56rem] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className={`flex flex-col justify-center gap-4 px-4 py-5 transition-all duration-400 sm:px-6 md:flex-row md:flex-wrap ${
                  isExpanded ? "translate-y-0" : "translate-y-3"
                }`}
              >
                {panelProducts.map((product) => (
                  <PartCard key={product.id} product={product}></PartCard>
                ))}
                {panelProducts.length === 0 && (
                  <p className="text-sm text-slate-500">{t("noProducts", { range: range.label })}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
