import type { MetadataRoute } from "next";
import getBaseURL from "@/lib/base-url";

const locales = ["en", "ka", "ru"] as const;

const staticRoutes = [
  "",
  "/parts",
  "/service",
  "/contact",
  "/reserve",
  "/auth/login",
  "/auth/register",
] as const;

const partCategoryRoutes = [
  "model-s",
  "model-x",
  "model-3",
  "model-y",
  "cybertruck",
  "roadster",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseURL();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      const urlPath = route ? `/${locale}${route}` : `/${locale}`;
      const url = `${baseUrl}${urlPath}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((item) => {
              const altPath = route ? `/${item}${route}` : `/${item}`;
              return [item, `${baseUrl}${altPath}`];
            })
          ),
        },
      });
    }
  }

  for (const slug of partCategoryRoutes) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}/parts/${slug}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((item) => [item, `${baseUrl}/${item}/parts/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
