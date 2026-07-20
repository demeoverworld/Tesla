import type { Metadata } from "next";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import { Navigation } from "@/app/components/navigation/Navigation";
import Footer from "@/app/components/footer/footer";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

const SEO_BY_LOCALE: Record<"en" | "ka" | "ru", Metadata> = {
  en: {
    title: "Tesla Service Tbilisi | Diagnostics, Repair & Maintenance",
    description:
      "Professional Tesla service in Tbilisi. Diagnostics, battery checks, software updates, suspension, brake and electrical repair by experienced technicians.",
    keywords: [
      "tesla service",
      "tesla service tbilisi",
      "tesla repair",
      "tesla diagnostics",
      "tesla maintenance",
    ],
  },
  ka: {
    title: "ტესლა სერვისი თბილისში | დიაგნოსტიკა, რემონტი და მოვლა",
    description:
      "ტესლა სერვისი თბილისში: პროფესიონალური დიაგნოსტიკა, რემონტი და გეგმიური მოვლა. ვასრულებთ ბატარეის შემოწმებას, ელექტრო სისტემების დიაგნოსტიკას, მუხრუჭებისა და სავალი ნაწილის სერვისს.",
    keywords: [
      "ტესლა სერვისი",
      "ტესლა სერვისი თბილისი",
      "ტესლა რემონტი",
      "ტესლა დიაგნოსტიკა",
      "tesla service",
      "tesla service tbilisi",
      "tesla repair",
      "tesla diagnostics",
      "tesla maintenance",
    ],
  },
  ru: {
    title: "Tesla Service Tbilisi | Диагностика, ремонт и обслуживание",
    description:
      "Tesla сервис в Тбилиси: диагностика, ремонт и обслуживание. Проверка батареи, электроники, подвески и тормозной системы опытными специалистами.",
    keywords: [
      "tesla service",
      "tesla service tbilisi",
      "ремонт tesla",
      "диагностика tesla",
      "сервис tesla в тбилиси",
    ],
  },
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return SEO_BY_LOCALE.en;
  }

  const currentLocale = locale as "en" | "ka" | "ru";
  const currentSeo = SEO_BY_LOCALE[currentLocale];

  return {
    ...currentSeo,
    alternates: {
      canonical: `/${currentLocale}`,
      languages: {
        en: "/en",
        ka: "/ka",
        ru: "/ru",
      },
    },
    openGraph: {
      title: typeof currentSeo.title === "string" ? currentSeo.title : undefined,
      description:
        typeof currentSeo.description === "string" ? currentSeo.description : undefined,
      url: `/${currentLocale}`,
      siteName: "Tesla Service Tbilisi",
      locale: currentLocale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <Navigation locale={locale as "en" | "ka" | "ru"} />
      {children}
      <Footer locale={locale as "en" | "ka" | "ru"} />
    </NextIntlClientProvider>
  );
}
