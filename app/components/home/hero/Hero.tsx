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
  size="sm"
  className="
    /* 1. Base Styles & Typography */
    group/button relative cursor-pointer overflow-hidden rounded-lg border-none 
    bg-red-600 px-4 py-2 text-sm font-semibold tracking-wide text-white 
    shadow-[0_3px_12px_rgba(220,38,38,0.25)] 

    /* 2. Premium Transitions (Custom Cubic Bezier) */
    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 

    /* 3. Hover & Active States */
    hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-red-700 
    hover:shadow-[0_6px_16px_rgba(220,38,38,0.3)]
    active:scale-95 active:translate-y-0
    
    /* 4. Motion Respect */
    motion-reduce:transition-none motion-reduce:hover:transform-none
  "
>
  <Link href="/reserve" className="relative z-10 flex items-center justify-center gap-3">
    {/* Micro-interaction: The Icon Reveal */}
    <span className="
      relative flex h-4 w-0 -translate-x-3 items-center justify-center 
      opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
      group-hover/button:w-4 group-hover/button:translate-x-0 group-hover/button:opacity-100
    ">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className="h-4 w-4"
      >
        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
      </svg>
    </span>

    {/* Text logic */}
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/button:translate-x-1">
      {orderLabel}
    </span>

    {/* 5. The "Premium Shine" Overlay */}
    <span className="
      absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
      transition-transform duration-1000 ease-in-out group-hover/button:translate-x-full
    " />
  </Link>
</Button>
			</div>
		</section>
	);
}
