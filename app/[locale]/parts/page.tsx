import Link from "next/link";
import { notFound } from "next/navigation";
import { partModelConfig } from "./model-config";
import { PartsHero } from "./PartsHero";

const locales = ["en", "ka", "ru"] as const;

type Locale = (typeof locales)[number];

type PartsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PartsPage({ params }: PartsPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <>
      <PartsHero />
      <section className="min-h-screen bg-[radial-gradient(circle_at_12%_18%,#ffffff_0%,#f1f3f5_36%,#e4e7eb_72%,#d8dde3_100%)] px-6 pb-14 pt-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1700px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {partModelConfig.map((category) => (
              <Link
                key={category.slug}
                href={`/${locale}/parts/${category.slug}`}
                className="group relative isolate h-84 overflow-hidden rounded-[26px] border border-white/70 bg-[#a5acb4] shadow-[0_20px_36px_rgba(32,39,48,0.18)] transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_44px_rgba(20,26,34,0.24)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.imageSrc})` }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(12,14,18,0.08)_0%,rgba(12,14,18,0.52)_52%,rgba(8,10,13,0.78)_100%)] transition-opacity duration-400 group-hover:opacity-95" />
                <div className="absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-white/28 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-6 bottom-8 z-10 h-px origin-left scale-x-0 bg-white/80 transition-transform duration-400 ease-out group-hover:scale-x-100" />

                <h2 className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-4xl font-semibold tracking-[0.06em] text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)] sm:text-5xl">
                  {category.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
