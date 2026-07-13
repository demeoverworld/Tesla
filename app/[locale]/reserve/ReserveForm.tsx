"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { addReserve, type ReserveActionState } from "@/server/actions/reserve";

export function ReserveForm() {
  const tReservePage = useTranslations("ReservePage");
  const [state, formAction, pending] = useActionState(addReserve, {} as ReserveActionState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      method="post"
      className="reveal-from-right flex flex-col gap-6 bg-white p-6 shadow-lg"
    >
      {state.error ? (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="rounded-md bg-green-50 px-4 py-2 text-sm text-green-700">{state.success}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder={tReservePage("name")}
          required
          className="rounded border border-slate-200 px-3 py-2"
        />
        <input
          name="lastname"
          type="text"
          placeholder={tReservePage("lastName")}
          required
          className="rounded border border-slate-200 px-3 py-2"
        />
        <input
          name="phone"
          type="tel"
          placeholder={tReservePage("phone")}
          required
          className="rounded border border-slate-200 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder={tReservePage("email")}
          required
          className="rounded border border-slate-200 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <select name="model" required className="rounded border border-slate-200 px-3 py-2">
          <option value="">{tReservePage("selectModel")}</option>
          <option value="Model X">{tReservePage("modelX")}</option>
          <option value="Model S">{tReservePage("modelS")}</option>
          <option value="Model 3">{tReservePage("model3")}</option>
          <option value="Model Y">{tReservePage("modelY")}</option>
        </select>

        <select name="hour" required className="rounded border border-slate-200 px-3 py-2">
          <option value="">{tReservePage("selectHour")}</option>
          {[...Array(12)].map((_, index) => {
            const hour = (index + 1).toString();
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>

        <select name="day" required className="rounded border border-slate-200 px-3 py-2">
          <option value="">{tReservePage("selectDay")}</option>
          <option value="Monday">{tReservePage("monday")}</option>
          <option value="Tuesday">{tReservePage("tuesday")}</option>
          <option value="Wednesday">{tReservePage("wednesday")}</option>
          <option value="Thursday">{tReservePage("thursday")}</option>
          <option value="Friday">{tReservePage("friday")}</option>
          <option value="Saturday">{tReservePage("saturday")}</option>
          <option value="Sunday">{tReservePage("sunday")}</option>
        </select>

        <select name="month" required className="rounded border border-slate-200 px-3 py-2">
          <option value="">{tReservePage("selectMonth")}</option>
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

        <select name="service" required className="rounded border border-slate-200 px-3 py-2">
          <option value="">{tReservePage("selectService")}</option>
          <option value="Climate Control Problem">{tReservePage("climateControlProblem")}</option>
          <option value="Key Installation">{tReservePage("keyInstallation")}</option>
          <option value="Engine Problems">{tReservePage("engineProblems")}</option>
          <option value="Ai Navigation">{tReservePage("aiNavigation")}</option>
        </select>

        <select name="carYear" required className="rounded border border-slate-200 px-3 py-2">
          <option value="">{tReservePage("selectCarYear")}</option>
          {Array.from({ length: 12 }, (_, index) => {
            const year = 2014 + index;
            return (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Sending..." : tReservePage("order")}
      </button>
    </form>
  );
}
