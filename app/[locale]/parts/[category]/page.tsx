import { notFound } from "next/navigation";
import { ExpandablePartsPanels } from "./ExpandablePartsPanels";
import { db } from "@/server";
import { products } from "@/server/schema";
import { and, asc, gte, lte } from "drizzle-orm";
import { partModelConfig } from "../model-config";



type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

const locales = ["en", "ka", "ru"] as const;
type Locale = (typeof locales)[number];

const normalizeModel = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const getCategoryModelKeys = (slug: string) => {
  const normalizedSlug = normalizeModel(slug);

  if (normalizedSlug.startsWith("model")) {
    const shortModel = normalizedSlug.replace(/^model/, "");
    return [normalizedSlug, shortModel];
  }

  return [normalizedSlug];
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const selectedCategory = partModelConfig.find((item) => item.slug === category);

  if (!selectedCategory) {
    notFound();
  }

  const parts = db
    ? await db
        .select({
          id: products.id,
          name: products.name,
          year: products.year,
          model: products.model,
          price: products.price,
          stock: products.stock,
          desc: products.desc,
          photo: products.photo,
        })
        .from(products)
        .where(and(gte(products.year, 2016), lte(products.year, 2026)))
        .orderBy(asc(products.year))
        .limit(12)
    : [];

  const categoryModelKeys = getCategoryModelKeys(selectedCategory.slug);
  const categoryParts = parts.filter((product) => {
    const productModel = normalizeModel(product.model);

    return categoryModelKeys.some(
      (key) => productModel === key || productModel === `model${key}`
    );
  });

  return (
    <section className="mt-45 flex flex-col items-center justify-center">
      <ExpandablePartsPanels
        products={categoryParts}
        categoryImageSrc={selectedCategory.categoryImageSrc}
        categorySideImageSrc={selectedCategory.categorySideImageSrc}
        categoryPartsImageSrc={selectedCategory.categoryPartsImageSrc}
        categoryTitle={selectedCategory.title}
        categorySlug={selectedCategory.slug}
      />
    </section>
  );
}
