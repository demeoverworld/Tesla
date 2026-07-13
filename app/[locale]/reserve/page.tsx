import { GlobalVideoHero } from "@/app/components/hero/GlobalVideoHero";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReserveGuys } from "./ReserveGuys";
import { ReserveForm } from "./ReserveForm";
import { ReserveSectionReveal } from "./ReserveSectionReveal";
import styles from "./reserve.module.css";

const locales = ["en", "ka", "ru"] as const;

type Locale = (typeof locales)[number];

type ReservePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ReservePage({ params }: ReservePageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const tReservePage = await getTranslations({ locale, namespace: "ReservePage" });

  return (
    <>
      <GlobalVideoHero />
      <ReserveSectionReveal />
      <section className="min-h-screen bg-white px-6 pb-20 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
        <h1
          data-reserve-reveal
          className={`reveal-from-bottom mb-20 text-center text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl ${styles.revealBase}`}
        >
          {tReservePage("title")}
        </h1>

        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div
            data-reserve-reveal
            className={`reveal-from-left flex items-end justify-center ${styles.revealBase}`}
          >
            <ReserveGuys />
          </div>

          <div className="reveal-from-right">
            <ReserveForm />
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
