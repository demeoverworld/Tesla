import { Hero } from "@/app/components/home/hero/Hero";
import { HeroCards } from "@/app/components/home/hero/containers/HeroCards";
import Carousel from "@/app/components/home/carousel/Carousel";
import InstallNavigation from "@/app/components/home/install-navigation/InstallNavigation";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ka", "ru"] as const;

type Locale = (typeof locales)[number];

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const tHero = await getTranslations({ locale, namespace: "Hero" });

  return (
    <>
      <Hero
        title={tHero("title")}
        subtitle={tHero("subtitle")}
        orderLabel={tHero("order")}
        locale={locale as Locale}
      />
      <HeroCards />
      <InstallNavigation />
      <Carousel />
    </>
  );
}
