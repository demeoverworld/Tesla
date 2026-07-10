import { GlobalVideoHero } from "@/app/components/hero/GlobalVideoHero";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReserveGuys } from "./ReserveGuys";
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

          <form
            data-reserve-reveal
            className={`reveal-from-right ${styles.form} ${styles.revealBase}`}
          >
            <div className={styles.box1}>
              <input type="text" placeholder={tReservePage("name")} />
              <input type="text" placeholder={tReservePage("lastName")} />
              <input type="text" placeholder={tReservePage("phone")} />
              <input type="text" className={styles.eyesClosed} placeholder={tReservePage("email")} />
            </div>

            <div className={styles.box2}>
              <div className={styles.box3}>
                <select name="Select model" defaultValue="selectModel">
                  <option value="selectModel">{tReservePage("selectModel")}</option>
                  <option value="Model X">{tReservePage("modelX")}</option>
                  <option value="Model S">{tReservePage("modelS")}</option>
                  <option value="Model 3">{tReservePage("model3")}</option>
                  <option value="Model Y">{tReservePage("modelY")}</option>
                </select>

                <select name="hour" defaultValue="selectHour">
                  <option value="selectHour">{tReservePage("selectHour")}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>

                <select name="Select day" defaultValue="selectDay">
                  <option value="selectDay">{tReservePage("selectDay")}</option>
                  <option value="Monday">{tReservePage("monday")}</option>
                  <option value="Tuesday">{tReservePage("tuesday")}</option>
                  <option value="Wednesday">{tReservePage("wednesday")}</option>
                  <option value="Thursday">{tReservePage("thursday")}</option>
                  <option value="Friday">{tReservePage("friday")}</option>
                  <option value="Saturday">{tReservePage("saturday")}</option>
                  <option value="Sunday">{tReservePage("sunday")}</option>
                </select>

                <select name="Select Month" defaultValue="selectMonth">
                  <option value="selectMonth">{tReservePage("selectMonth")}</option>
                  <option value="January">{tReservePage("january")}</option>
                  <option value="February">{tReservePage("february")}</option>
                  <option value="March">{tReservePage("march")}</option>
                  <option value="April">{tReservePage("april")}</option>
                  <option value="May">{tReservePage("may")}</option>
                  <option value="June">{tReservePage("june")}</option>
                  <option value="July">{tReservePage("july")}</option>
                  <option value="August">{tReservePage("august")}</option>
                  <option value="September">{tReservePage("september")}</option>
                  <option value="October">{tReservePage("october")}</option>
                  <option value="November">{tReservePage("november")}</option>
                  <option value="December">{tReservePage("december")}</option>
                </select>

                <select name="Select service" defaultValue="selectService">
                  <option value="selectService">{tReservePage("selectService")}</option>
                  <option value="Climate Control Problem">{tReservePage("climateControlProblem")}</option>
                  <option value="Key Installation">{tReservePage("keyInstallation")}</option>
                  <option value="Engine Problems">{tReservePage("engineProblems")}</option>
                  <option value="Ai Navigation">{tReservePage("aiNavigation")}</option>
                </select>

                <select name="Select Car Year" defaultValue="selectCarYear">
                  <option value="selectCarYear">{tReservePage("selectCarYear")}</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <input type="submit" value={tReservePage("order")} className={styles.submit} />
            </div>
          </form>
        </div>
        </div>
      </section>
    </>
  );
}
