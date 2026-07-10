"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const AUTO_SLIDE_MS = 3500;

export function Gallery() {
	const slides = useMemo(
		() => [
			{ src: "/logo.png", alt: "Gallery slide 1" },
			{ src: "/flags/us.svg", alt: "Gallery slide 2" },
			{ src: "/flags/ge.svg", alt: "Gallery slide 3" },
			{ src: "/flags/ru.svg", alt: "Gallery slide 4" },
		],
		[],
	);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % slides.length);
		}, AUTO_SLIDE_MS);

		return () => window.clearInterval(timer);
	}, [slides.length]);

	return (
		<section className="w-full bg-black px-12.5 py-12.5 mt-25">
			<div className="group relative h-96 w-full overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl ring-1 ring-white/10 sm:h-112 lg:h-136">
				{slides.map((slide, index) => {
					const isActive = currentIndex === index;

					return (
						<div
							key={slide.src}
							className="absolute inset-0"
							style={{ zIndex: isActive ? 2 : 1 }}
							aria-hidden={!isActive}
						>
							<Image
								src={slide.src}
								alt={slide.alt}
								fill
								className={`object-cover transition-all duration-1000 ease-in-out ${
									isActive
										? "scale-100 opacity-100"
										: "scale-110 opacity-0"
								}`}
							/>
							<div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-1000" />
						</div>
					);
				})}

				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/70 to-transparent" />
			</div>
		</section>
	);
}
