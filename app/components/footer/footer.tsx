"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const contactNumbers = ["599757044", "599704155", "597050500"];
const email = "Teslaservicetbilisi@gmail.com";
const extraContacts = ["595900934", "595900934"];

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = /\/contact\/?$/.test(pathname ?? "");
  const isReservePage = /\/reserve\/?$/.test(pathname ?? "");

  const mapAndPatent = (
    <>
      <div className="Map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.796942179578!2d44.9079785760724!3d41.63852037126904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d51b12dbdbd%3A0x47e2bd170fcd06b9!2sTesla%20Service%20Tbilisi!5e0!3m2!1ska!2sge!4v1756712610033!5m2!1ska!2sge"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="patent py-3 text-center">
        <h3 className="text-black/55">© 2021 Tesla Service Tbilisi</h3>
      </div>
    </>
  );

  if (isContactPage) {
    return (
      <footer className="mt-12 border-t border-black/10 bg-white">
        {mapAndPatent}
      </footer>
    );
  }

  return (
    <footer
      className={`mt-12 border-t border-black/5 bg-white ${
        isReservePage ? "" : "bg-[url('/Red%20energy%20and%20motion.png')] bg-contain bg-no-repeat"
      }`}
    >
      <div className="mx-auto flex min-h-[320px] max-w-7xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-around">
        <div className="flex flex-col gap-3">
          <h4
            className={`border-b pb-2 text-base font-semibold ${
              isReservePage ? "border-black/30 text-black" : "border-white text-white"
            }`}
          >
            Contact
          </h4>

          {contactNumbers.map((number) => (
            <Link
              key={number}
              href={`tel:${number}`}
              className={`text-sm transition-colors ${
                isReservePage
                  ? "text-black/55 hover:text-black"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {number}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="border-b border-black/30 pb-2 text-base font-semibold text-black">
            Contact
          </h4>

          <Link
            href={`mailto:${email}`}
            className="text-sm text-black/55 transition-colors hover:text-black"
          >
            {email}
          </Link>

          {extraContacts.map((number) => (
            <Link
              key={number}
              href={`tel:${number}`}
              className="text-sm text-black/55 transition-colors hover:text-black"
            >
              {number}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="border-b border-black/30 pb-2 text-base font-semibold text-black">
            Socials
          </h4>

          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-black/55 transition-colors hover:text-black"
          >
            <span>Facebook</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            >
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.102 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.028 1.792-4.703 4.533-4.703 1.312 0 2.686.235 2.686.235v2.963h-1.514c-1.491 0-1.956.93-1.956 1.884v2.28h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.102 24 12.073z" />
            </svg>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-black/55 transition-colors hover:text-black"
          >
            <span>Instagram</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            >
              <path d="M7.5 0h9A7.5 7.5 0 0 1 24 7.5v9A7.5 7.5 0 0 1 16.5 24h-9A7.5 7.5 0 0 1 0 16.5v-9A7.5 7.5 0 0 1 7.5 0zm0 2A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2h-9zm11 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 6.25A5.75 5.75 0 1 1 6.25 12 5.76 5.76 0 0 1 12 6.25zm0 2A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25z" />
            </svg>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-black/55 transition-colors hover:text-black"
          >
            <span>WhatsApp</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            >
              <path d="M12 2a9.9 9.9 0 0 0-8.486 15.016L2 22l5.17-1.485A10 10 0 1 0 12 2zm0 18a8.1 8.1 0 0 1-4.146-1.136l-.298-.175-3.07.882.892-2.988-.194-.31A8 8 0 1 1 12 20zm4.53-5.812c-.247-.124-1.463-.722-1.688-.804-.226-.082-.39-.124-.555.124-.165.247-.638.804-.782.97-.144.165-.288.186-.535.062-.247-.124-1.04-.383-1.982-1.222-.733-.653-1.228-1.46-1.373-1.706-.144-.247-.015-.38.108-.504.112-.111.247-.288.37-.432.124-.144.165-.247.247-.412.083-.165.041-.309-.021-.432-.062-.124-.555-1.34-.76-1.833-.2-.48-.403-.415-.555-.423h-.474c-.165 0-.432.062-.658.309s-.863.843-.863 2.06.884 2.392 1.007 2.557c.124.165 1.735 2.648 4.205 3.713.588.254 1.046.405 1.404.52.589.187 1.126.16 1.55.097.472-.07 1.463-.597 1.67-1.174.206-.577.206-1.071.144-1.174-.061-.103-.226-.165-.473-.289z" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="border-b border-black/30 pb-2 text-base font-semibold text-black">
            Menu
          </h4>

          <Link
            href="/"
            className="text-sm text-black/55 transition-colors hover:text-black"
          >
            Home
          </Link>

          <Link
            href="/service"
            className="text-sm text-black/55 transition-colors hover:text-black"
          >
            Service
          </Link>

          <Link
            href="/reserve"
            className="text-sm text-black/55 transition-colors hover:text-black"
          >
            Reserve
          </Link>
        </div>
      </div>
      {isReservePage && mapAndPatent}
    </footer>
  );
}