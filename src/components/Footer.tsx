"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <footer className="py-6 bg-white/50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm text-gray-600">
          <Link
            href={`/${locale}/privacy`}
            className="hover:text-[#4a5568] transition-colors"
          >
            {t("privacyPolicy")}
          </Link>
          <span className="hidden sm:block">•</span>
          <Link
            href={`/${locale}/contact-us`}
            className="hover:text-[#4a5568] transition-colors"
          >
            {t("contactUs")}
          </Link>
          <span className="hidden sm:block">•</span>
          <span className="text-gray-500">
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
        </div>
      </div>
    </footer>
  );
}
