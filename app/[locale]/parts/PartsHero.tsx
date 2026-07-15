"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useTeslaReveal } from "./TeslaReveal";

const categories = ["Wheels & Tires", "Body Parts", "Interior", "Maintenance", "Charging"];

export function PartsHero() {
  useTeslaReveal();

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black text-white">
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="reveal-hidden reveal-fade-up max-w-4xl text-5xl font-medium tracking-tight mt-3 sm:text-7xl lg:text-8xl">
          Performance <span className="font-light italic text-gray-400">Engineered.</span>
        </h1>

        <p className="reveal-hidden reveal-fade-up stagger-1 mt-8 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          Maintain the integrity of your Tesla with parts designed, tested, and manufactured to the same exact specifications as your vehicle.
        </p>

        <div className="reveal-hidden reveal-scale-in stagger-2 mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group/btn relative h-14 min-w-[220px] overflow-hidden rounded-full bg-white px-8 text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500 hover:scale-105 hover:bg-gray-100 active:scale-95"
          >
            <Link href="/shop" className="flex items-center justify-center gap-2">
              <span className="text-sm font-bold uppercase tracking-wide">Shop All Parts</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="group/btn2 h-14 min-w-[220px] rounded-full border-white/30 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white/10"
          >
            <Link href="/service" className="text-sm font-bold uppercase tracking-wide">Find Service</Link>
          </Button>
        </div>

        <div className="reveal-hidden reveal-fade-right stagger-3 absolute bottom-6 hidden w-full max-w-5xl justify-between border-t border-white/10 pt-9 lg:flex">
          {categories.map((cat, idx) => (
            <Link
              key={cat}
              href={`#${cat.toLowerCase()}`}
              className="group flex flex-col items-start gap-1 opacity-60 transition-opacity hover:opacity-100"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">0{idx + 1}</span>
              <span className="text-sm font-semibold tracking-wide">{cat}</span>
              <div className="h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
