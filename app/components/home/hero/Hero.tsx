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
  className="group/button relative cursor-pointer overflow-hidden border border-red-600 bg-red-600 px-8 text-white shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/20 active:scale-95 active:translate-y-0"
>
  <Link href="/reserve" className="flex items-center justify-center gap-2">
    {/* Sliding & Fading Arrow */}
    <span className="pointer-events-none -ml-4 flex h-5 w-0 -translate-x-3 items-center justify-center opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:w-5 group-hover/button:translate-x-0 group-hover/button:opacity-100">
      <svg
        className="h-4 w-4 stroke-white stroke-[2.5]"
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
    <span className="translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:translate-x-1">
      {orderLabel}
    </span>
  </Link>
</Button>
			</div>
		</section>
	);
}
