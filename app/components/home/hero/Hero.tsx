import { Button } from "@/app/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

type HeroProps = {
	title: string;
	subtitle: string;
	orderLabel: string;
  locale: "en" | "ka" | "ru";
};

export function Hero({ title, subtitle, orderLabel, locale }: HeroProps) {
	const tHero = useTranslations("Hero");
  const isCompactLocale = locale === "ka" || locale === "ru";

	return (
	<section className="relative isolate min-h-screen overflow-hidden">
  {/* 1. Background Video */}
  <video
    className="absolute inset-0 h-full w-full object-cover"
    src="/videos/hero.mp4"
    autoPlay
    loop
    muted
    playsInline
  />

  {/* 2. Premium Gradient Overlay: Darker on the left/bottom to make text pop, clear on the right */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50 md:bg-gradient-to-r md:from-black/85 md:to-transparent" />

  {/* 3. Main Content Container */}
  <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 sm:px-12 lg:px-16 text-left text-white">
    <div className="flex max-w-3xl flex-col items-start gap-4 md:gap-6">
      
      {/* Editorial Eyebrow Tag */}
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 sm:text-sm">
        Exclusive Experience
      </span>

      {/* Title with tracking and tighter line height */}
      <h1
        className={`font-extrabold tracking-tight leading-[1.1] ${
          isCompactLocale
            ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        }`}
      >
        {title}
      </h1>

      {/* Subtitle softened to neutral-200 for a less harsh, highly elegant contrast */}
      <p
        className={`max-w-2xl font-medium text-neutral-200/90 leading-relaxed ${
          isCompactLocale
            ? "text-base sm:text-lg md:text-xl"
            : "text-lg sm:text-xl md:text-2xl"
        }`}
      >
        {subtitle}
      </p>

      {/* Button Wrapper with a touch of top clearance */}
      <div className="pt-4">
        <Button
          asChild
          className="
            group/button relative cursor-pointer overflow-hidden rounded-lg border-none 
            bg-red-600 px-6 py-3.5 text-base font-semibold tracking-wide text-white 
            shadow-[0_4px_14px_rgba(220,38,38,0.3)] 

            /* Premium Transitions (Custom Cubic Bezier) */
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 

            /* Hover & Active States */
            hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-red-700 
            hover:shadow-[0_8px_20px_rgba(220,38,38,0.4)]
            active:scale-95 active:translate-y-0
            
            /* Motion Respect */
            motion-reduce:transition-none motion-reduce:hover:transform-none
          "
        >
          <Link href="/reserve" className="relative z-10 flex items-center justify-center gap-3">
            {/* Micro-interaction: The Icon Reveal */}
            <span className="
              relative flex h-5 w-0 -translate-x-3 items-center justify-center 
              opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
              group-hover/button:w-5 group-hover/button:translate-x-0 group-hover/button:opacity-100
            ">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="h-5 w-5"
              >
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </span>

            {/* Text logic */}
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/button:translate-x-1">
              {orderLabel}
            </span>

            {/* The "Premium Shine" Overlay */}
            <span className="
              absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
              transition-transform duration-1000 ease-in-out group-hover/button:translate-x-full
            " />
          </Link>
        </Button>
      </div>

    </div>
  </div>
</section>
	);
}
