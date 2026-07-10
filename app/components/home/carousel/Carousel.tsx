import Image from "next/image";
import { useTranslations } from "next-intl";

const carouselImageFiles = [
  "climate-control.png",
  "key-installation.png",
  "navigation_install.jpg",
] as const;

const formatImageTitle = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());

export default function Carousel() {
  const tCarousel = useTranslations("Carousel");

  const cards = carouselImageFiles.map((fileName) => ({
    title: formatImageTitle(fileName),
    image: `/${fileName}`,
  }));

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 lg:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[12px] bg-white p-0 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-transparent" />

        <div className="relative overflow-hidden pt-6">
          <div id="track" className="flex w-max animate-services-marquee">
            {[...cards, ...cards].map((card, index) => (
              <div
                key={`${card.title}-${index}`}
                className="mr-2.5 h-[350px] w-[350px] overflow-hidden rounded-[10px] transition-all duration-300 ease-out hover:-translate-y-1"
              >
                <div className="flex h-[40%] w-full items-center justify-center overflow-hidden rounded-t-[10px] bg-linear-to-b from-[#330000] to-[#0a0a0a]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={180}
                    height={180}
                    className="h-auto w-[50%] object-contain"
                  />
                </div>

                <div className="flex h-[25%] w-full flex-col items-center justify-center overflow-hidden rounded-b-[10px] bg-[#ff1f1f] text-center text-white">
                  <h3 className="text-base font-semibold text-white">
                    {card.title}
                  </h3>
                  <button className="mt-2 h-[38px] w-[120px] rounded-full bg-white font-semibold text-[#cc0000] shadow-[0_4px_8px_rgba(255,75,75,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f2f2f2] hover:text-[#ff1a1a]">
                    {tCarousel("reserve")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
