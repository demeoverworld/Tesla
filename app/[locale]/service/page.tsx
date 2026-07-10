import { GlobalVideoHero } from "@/app/components/hero/GlobalVideoHero";
import { notFound } from "next/navigation";
import { ServiceGallery } from "./ServiceGallery";
import styles from "./service.module.css";

const locales = ["en", "ka", "ru"] as const;

type Locale = (typeof locales)[number];

type ServicePageProps = {
  params: Promise<{ locale: string }>;
};

const leftServiceImageUrls = {
  climate: "/something.png",
  keys: "/keys.png",
  display: "/Screenshot_5-removebg-preview.png",
  navigation: "/navigation_install.jpg",
} as const;

const rightGalleryImageUrls = {
  climate: "/Screenshot_3.png",
  keys: "/Screenshot_4.png",
  display: "/Screenshot_5.png",
  navigation: "/Screenshot_6.png",
  parts: "/wmremove-transformed.png",
} as const;

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const galleryServices = [
    {
      title: "General diagnostics of the car",
      description: "",
      image: rightGalleryImageUrls.climate,
    },
    {
      title: "Car key pairing or installation",
      description: "",
      image: rightGalleryImageUrls.keys,
    },
    {
      title: "Battery check and repair",
      description: "",
      image: rightGalleryImageUrls.display,
    },
    {
      title: "Navigation setup or installation",
      description: "",
      image: rightGalleryImageUrls.navigation,
    },
    {
      title: "You can purchase spare parts,that we provide",
      description: "",
      image: rightGalleryImageUrls.parts,
    },
  ];

  return (
    <>
      <GlobalVideoHero />
      <section className="min-h-screen bg-white px-6 pb-20 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className={styles.serviceContainer}>
            <div className={`${styles.contentSide} contentSide`}>
            <div className={styles.serviceItem} data-index={0}>
              <h2 className={styles.title}>General diagnostics of the car</h2>
              <p className={styles.description}>
                We use advanced diagnostic tools to check your vehicle's
                systems and ensure all components are operating correctly.
              </p>
              <div className={styles.inlineImageDisplay}>
                <img
                  src={leftServiceImageUrls.climate}
                  alt="General diagnostics of the car"
                  className={styles.inlineImage}
                />
              </div>
            </div>

            <div className={styles.serviceItem} data-index={1}>
              <h2 className={styles.title}>Car key pairing or installation</h2>
              <p className={styles.description}>
                We can pair keys to your car and also your phone.
              </p>
              <div className={styles.inlineImageDisplay}>
                <img
                  src={leftServiceImageUrls.keys}
                  alt="Car key pairing or installation"
                  className={styles.inlineImage}
                />
              </div>
            </div>

            <div className={styles.serviceItem} data-index={2}>
              <h2 className={styles.title}>Battery check and repair</h2>
              <p className={styles.description}>
                As part of our diagnostic process, we thoroughly test the
                battery system and carry out repairs or servicing if required.
              </p>
              <div className={styles.inlineImageDisplay}>
                <img
                  src={leftServiceImageUrls.display}
                  alt="Battery check and repair"
                  className={styles.inlineImage}
                />
              </div>
            </div>

            <div className={styles.serviceItem} data-index={3}>
              <h2 className={styles.title}>Navigation setup or installation</h2>
              <p className={styles.description}>
                We configure and update vehicle navigation systems to ensure
                accurate routing, optimal performance, and seamless operation.
              </p>
              <div className={styles.inlineImageDisplay}>
                <img
                  src={leftServiceImageUrls.navigation}
                  alt="Navigation setup or installation"
                  className={styles.inlineImage}
                />
              </div>
            </div>

            <div className={styles.serviceItem} data-index={4}>
              <h2 className={styles.title}>
                You can purchase spare parts,that we provide
              </h2>
              <p className={styles.description}>
                Feel free to shop on our website!
              </p>
            </div>

            </div>

            <div className={styles.gallerySide}>
              <ServiceGallery services={galleryServices} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
