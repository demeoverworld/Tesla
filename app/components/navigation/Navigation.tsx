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
    <header className="absolute inset-x-0 top-0 z-20 px-12.5">
      <nav className="flex w-full items-center justify-between py-6 text-white">

        <Link href={withLocale("/")} className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={130} height={40} priority />
        </Link>

        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-8 text-sm font-heading font-medium md:text-base">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={withLocale(item.href)}
                  className={`relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    isDashboardRoute ? "text-red-500" : "hover:text-red-500"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {session ? (
            <div className="flex items-center gap-3 rounded-md border border-white/30 bg-black/30 px-4 py-1.5 text-sm font-medium transition-colors hover:border-red-500 hover:text-red-500">
              <span>{userName}</span>
              <span className="h-4 w-px bg-white/70" aria-hidden="true" />
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
              className="rounded-md border border-white/30 bg-black/30 px-4 py-1.5 text-sm font-medium transition-colors hover:border-red-500 hover:text-red-500"
            >
              Login
            </Link>
          )}

          <div className="relative text-sm font-medium">
            <button
              type="button"
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-white/30 bg-black/30 px-3 py-1.5 transition-colors hover:border-red-500"
            >
              <img
                src={activeLanguage.flagSrc}
                alt={activeLanguage.flagAlt}
                width={18}
                height={12}
                className="h-3 w-4.5 rounded-xs object-cover"
              />
              <span>{activeLanguage.code}</span>
              <span className="text-xs">▾</span>
            </button>

            <ul
              className={`absolute right-0 top-full mt-2 min-w-30 origin-top rounded-md border border-white/20 bg-black/85 p-1 transition-all duration-200 ease-out ${
                isLanguageOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              {languageItems.map((item) => (
                <li key={item.locale}>
                  <Link
                    href={getLanguageHref(item.locale)}
                    onClick={() => setIsLanguageOpen(false)}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-white/10 hover:text-red-500 ${
                      locale === item.locale ? "text-red-500" : "text-white"
                    }`}
                  >
                    <img
                      src={item.flagSrc}
                      alt={item.flagAlt}
                      width={18}
                      height={12}
                      className="h-3 w-4.5 rounded-xs object-cover"
                    />
                    <span>{item.code}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}