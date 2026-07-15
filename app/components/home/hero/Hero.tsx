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
  className="group/button cursor-pointer border-red-600 bg-red-600 px-8 text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-red-700 active:scale-95"
>
  <Link href="/reserve" className="flex items-center justify-center gap-1">
    <span className="inline-flex w-0 -translate-x-2 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover/button:w-5 group-hover/button:translate-x-0 group-hover/button:opacity-100">
      <span className="text-lg">→</span>
    </span>
    <span className="transition-transform duration-300 group-hover/button:translate-x-0.5">
      {orderLabel}
    </span>
  </Link>
</Button>
			</div>
		</section>
	);
}
