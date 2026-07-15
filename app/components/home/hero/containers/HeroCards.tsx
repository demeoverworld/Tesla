"use client";

import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function HeroCards() {
  const tHero = useTranslations("Hero");

  const cards = [
    {
      header: tHero("card1Title"),
      description: tHero("card1Description"),
    },
    {
      header: tHero("card2Title"),
      description: tHero("card2Description"),
    },
  ];

  return (
    <section className="relative z-10 mt-0 px-6 pb-8 sm:px-10 sm:pt-12 lg:px-5.5 lg:pb-5 lg:pt-5">
      <div className="mx-auto mt-15 max-w-7xl">
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="pointer-events-auto flex w-full min-w-0 items-center gap-6 rounded-2xl border border-black/10 bg-linear-to-b [--tw-gradient-from:#300] from-[var(--tw-gradient-from)] to-[#0a0a0a] p-6 text-white shadow-sm lg:w-1/2 lg:flex-1"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <h3 className="text-2xl font-semibold">{card.header}</h3>
                <p className="text-sm text-white/80 sm:text-base">{card.description}</p>
              <Button 
  className="group relative isolate w-fit overflow-hidden border border-red-600 bg-red-600 px-6 py-2.5 text-white transition-colors duration-300 
             /* Hover Background Slide Effect */
             before:absolute before:inset-0 before:-z-10 before:origin-center before:scale-x-0 before:rounded-[inherit] before:bg-white before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-red-600 hover:before:scale-x-100 
             /* Start / Entry Animation via Arbitrary CSS */
             animate-[fadeInUp_0.6s_ease-out_forwards]"
>
  <span className="relative z-10">{tHero("shopNow")}</span>
</Button>
              </div>
              <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-xl sm:h-44 sm:w-36">
                <Image
                  src="/serv.jpg"
                  alt={tHero("missingPartsAlt")}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
