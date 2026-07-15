import { Button } from "@/app/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

type HeroProps = {
	title: string;
	subtitle: string;
	orderLabel: string;
};

export function Hero({ title, subtitle, orderLabel }: HeroProps) {
	const tHero = useTranslations("Hero");

	return (
		<section className="relative isolate min-h-screen overflow-hidden px-12.5">
			<video
				className="absolute inset-0 h-full w-full object-cover"
				src="/videos/hero.mp4"
				autoPlay
				loop
				muted
				playsInline
			/>

			<div className="absolute inset-0 bg-black/45" />

			<div className="relative z-10 flex min-h-screen w-full flex-col items-start justify-center gap-6 px-12.5 text-left text-white font-heading">
				<h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
					{title}
				</h1>
				<p className="max-w-2xl text-lg font-bold text-red-500 sm:text-xl md:text-2xl">
					{subtitle}
				</p>
<Button
  asChild
  size="lg"
  className="
    group/button relative cursor-pointer overflow-hidden rounded-xl border border-red-500/40 px-8 text-white shadow-lg
    /* 1. Dynamic Background Changing (Gradient Shift) */
    bg-gradient-to-r from-red-800 via-red-600 to-red-700 bg-[size:200%_auto] bg-left transition-all duration-500 ease-out 
    hover:bg-right hover:-translate-y-1 hover:scale-105
    /* 2. Flashy Red Neon Glow */
    hover:shadow-[0_0_30px_rgba(239,68,68,0.65)] hover:border-red-400
    /* 3. Physical Click Feedback */
    active:scale-95 active:translate-y-0
    /* 4. Laser / Shimmer Sweeping Light Effect */
    after:absolute after:top-0 after:-left-[100%] after:h-full after:w-[60%] after:-skew-x-20 
    after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent 
    after:transition-all after:duration-1000 after:ease-[cubic-bezier(0.16,1,0.3,1)]
    group-hover/button:after:left-[150%]
  "
>
  <Link href="/reserve" className="flex items-center justify-center gap-2.5 font-semibold tracking-wide">
    {/* Sliding & Fading Glowing Arrow */}
    <span className="pointer-events-none -ml-5 flex h-5 w-0 -translate-x-4 items-center justify-center opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:w-6 group-hover/button:translate-x-0 group-hover/button:opacity-100">
      <svg
        className="h-5 w-5 stroke-white stroke-[2.5] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </span>

    {/* Smooth Nudging Text */}
    <span className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:translate-x-1.5">
      {orderLabel}
    </span>
  </Link>
</Button>
			</div>
		</section>
	);
}
