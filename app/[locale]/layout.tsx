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
      <Footer />
    </NextIntlClientProvider>
  );
}
