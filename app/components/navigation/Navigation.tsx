"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const languageItems = [
  { locale: "en", code: "EN", flagSrc: "/flags/gb.svg", flagAlt: "United Kingdom" },
  { locale: "ka", code: "GE", flagSrc: "/flags/ge.svg", flagAlt: "Georgia" },
  { locale: "ru", code: "RU", flagSrc: "/flags/ru.svg", flagAlt: "Russia" },
] as const;

type NavigationProps = {
  locale: "en" | "ka" | "ru";
};

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith(`/${locale}/dashboard`) ?? false;
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { data: session } = useSession();

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("parts"), href: "/parts" },
    { label: t("service"), href: "/service" },
    { label: t("contact"), href: "/contact" },
    { label: t("reserve"), href: "/reserve" },
  ];

  const activeLanguage = useMemo(
    () =>
      languageItems.find((item) => item.locale === locale) ??
      languageItems[0],
    [locale]
  );

  const withLocale = (href: string) => {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  };

  const isActiveLink = (href: string) => {
    const localizedHref = withLocale(href);

    if (href === "/") return pathname === localizedHref;
    return pathname.startsWith(localizedHref);
  };

  const getLanguageHref = (nextLocale: "en" | "ka" | "ru") => {
    if (!pathname) return `/${nextLocale}`;

    const segments = pathname.split("/");
    segments[1] = nextLocale;

    return segments.join("/");
  };

  const userName =
    session?.user?.name?.trim() || session?.user?.email?.split("@")[0] || "User";

  return (
   <header className="absolute inset-x-0 top-0 z-20 w-full px-6 sm:px-12 lg:px-16">
  <nav className="mx-auto flex max-w-7xl items-center justify-between py-6 text-white">
    
    {/* 1. Brand Logo */}
    <Link href={withLocale("/")} className="flex items-center transition-opacity hover:opacity-90">
      <Image src="/logo.png" alt="Logo" width={130} height={40} priority />
    </Link>

    {/* 2. Navigation Actions Wrapper */}
    <div className="flex items-center gap-6 md:gap-8">
      
      {/* Navigation Links */}
      <ul className="hidden items-center gap-8 text-sm font-heading font-medium sm:flex md:text-base">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={withLocale(item.href)}
              className={`relative py-1.5 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.25,1,0.5,1)] hover:after:scale-x-100 ${
                isDashboardRoute 
                  ? "text-red-500 font-semibold" 
                  : "text-neutral-200 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* 3. Session Controls (Glassmorphism design) */}
      <div className="flex items-center gap-3">
        {session ? (
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]">
            <span className="text-neutral-200">{userName}</span>
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: withLocale("/") })}
              className="text-white/80 transition-colors hover:text-red-500"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            href={withLocale("/auth/login")}
            className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/10 hover:text-red-400"
          >
            Login
          </Link>
        )}

        {/* 4. Language Picker */}
        <div className="relative text-sm font-medium">
          <button
            type="button"
            onClick={() => setIsLanguageOpen((prev) => !prev)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3.5 py-2 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
          >
            <img
              src={activeLanguage.flagSrc}
              alt={activeLanguage.flagAlt}
              width={18}
              height={12}
              className="h-3 w-4.5 rounded-[1px] object-cover"
            />
            <span className="text-neutral-200">{activeLanguage.code}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4.5 w-4.5 text-neutral-400 transition-transform duration-300 ${
                isLanguageOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <ul
            className={`absolute right-0 top-full mt-2 min-w-[120px] origin-top rounded-lg border border-white/10 bg-neutral-950/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLanguageOpen
                ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                : "pointer-events-none -translate-y-2 opacity-0 scale-95"
            }`}
          >
            {languageItems.map((item) => (
              <li key={item.locale}>
                <Link
                  href={getLanguageHref(item.locale)}
                  onClick={() => setIsLanguageOpen(false)}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors duration-200 hover:bg-white/10 hover:text-red-400 ${
                    locale === item.locale ? "bg-red-600/10 text-red-400" : "text-neutral-300"
                  }`}
                >
                  <img
                    src={item.flagSrc}
                    alt={item.flagAlt}
                    width={18}
                    height={12}
                    className="h-3 w-4.5 rounded-[1px] object-cover"
                  />
                  <span className="text-xs font-semibold">{item.code}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  </nav>
</header>
  );
}