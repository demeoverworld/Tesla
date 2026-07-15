"use client";

import { GlobalVideoHero } from "@/app/components/hero/GlobalVideoHero";
import { addMessage, type MessageActionState } from "@/server/actions/messages";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const tContactPage = useTranslations("ContactPage");
  const textSectionRef = useRef<HTMLDivElement | null>(null);
  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [state, formAction, pending] = useActionState(addMessage, {} as MessageActionState);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const textNode = textSectionRef.current;
    const formNode = formSectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === textNode) setIsTextVisible(true);
          if (entry.target === formNode) setIsFormVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    if (textNode) observer.observe(textNode);
    if (formNode) observer.observe(formNode);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalVideoHero />
      <section className="min-h-screen bg-white px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Section */}
          <div
            ref={textSectionRef}
            className={`flex flex-col justify-center transition-all duration-700 ease-out ${
              isTextVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              {tContactPage("title")}
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              {tContactPage("description")}
            </p>

            <div className="space-y-3">
              <h3 className="text-xl font-bold">{tContactPage("serviceAreas")}</h3>
              <p className="text-gray-700">{tContactPage("area")}</p>
              <h3 className="text-xl font-bold">{tContactPage("phoneNumber")}</h3>
              <p className="text-2xl font-bold text-gray-900">595900934</p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div
            ref={formSectionRef}
            className={`flex items-center justify-center transition-all duration-700 ease-out ${
              isFormVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <form
              action={formAction}
              className="flex flex-col justify-center rounded-[20px] border border-black/19 w-full max-w-125 h-150 m-auto mt-25 mb-5"
            >
              {/* First Box - Top Half */}
              <div className="flex flex-col justify-end items-center w-full h-1/2 p-5 bg-linear-to-br from-[#f9f9f9] to-[#f1f1f1] border-b-2 border-[#eee] space-y-3">
                <h2 className="text-2xl font-bold mb-4">{tContactPage("contactUs")}</h2>

                <input
                  type="text"
                  name="name"
                  placeholder={tContactPage("yourName")}
                  value={formData.name}
                  onChange={handleChange}
                  className="outline-none box-border w-62.5 px-3.75 py-2.5 text-sm border border-black/15 rounded-[8px] bg-[#fafafa] transition-all duration-300 ease-in-out mb-3"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={tContactPage("yourPhone")}
                  value={formData.phone}
                  onChange={handleChange}
                  className="outline-none box-border w-62.5 px-3.75 py-2.5 text-sm border border-black/15 rounded-[8px] bg-[#fafafa] transition-all duration-300 ease-in-out mb-3"
                />
              </div>

              {/* Second Box - Bottom Half */}
              <div className="flex flex-col items-center justify-center h-1/2 w-full p-5 bg-white space-y-3">
                <input
                  type="email"
                  name="email"
                  placeholder={tContactPage("yourEmail")}
                  value={formData.email}
                  onChange={handleChange}
                  className="outline-none box-border w-62.5 px-3.75 py-2.5 text-sm border border-black/15 rounded-[8px] bg-[#fafafa] transition-all duration-300 ease-in-out mb-3"
                />

                <textarea
                  name="message"
                  placeholder={tContactPage("yourMessage")}
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="outline-none box-border w-62.5 min-h-38.75 px-3.75 py-2.5 text-sm border border-black/15 rounded-[8px] bg-[#fafafa] transition-all duration-300 ease-in-out mb-3"
                />

                {state?.error ? (
                  <p className="text-sm text-red-600">{state.error}</p>
                ) : null}
                {state?.success ? (
                  <p className="text-sm text-green-600">{state.success}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-red-500 px-6 py-1.5 font-semibold text-white text-sm transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {pending ? "Sending..." : tContactPage("submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
