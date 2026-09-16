"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTracking } from "@/experiments/tracking";

const WEBINAR_URL = "https://wow-webinar.com";
const CONTACT_EMAIL = "hello@getwow.ai";

/**
 * Brand Handoff Variant
 *
 * The shortest possible answer to "what is getwow.ai?". One screen, no nav, no
 * scroll: WOW is the company, WOW Webinar is the flagship, here is the link.
 *
 * It exists because getwow.ai is primarily an identity domain rather than a
 * website — it carries the company's Google Workspace mail and is the SendGrid
 * sending domain for hello@getwow.ai — while the business now runs on
 * wow-webinar.com. A visitor arriving from a business card, an @getwow.ai
 * email, or a search for the company name needs the relationship stated, not a
 * product pitch. Deliberately lighter than the ai-native-products variant,
 * which sells the company to investors; this one only resolves the confusion
 * and hands off.
 *
 * Bilingual via next-intl like every other variant, and RTL-aware: the CTA
 * arrow flips direction with the locale rather than pointing backwards in
 * Arabic.
 *
 * Registered in src/lib/variant-config.ts and rendered from
 * src/app/[locale]/page.tsx when the resolved variant is "brand-handoff".
 */
export default function BrandHandoffPage() {
  const t = useTranslations("brandHandoff");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { trackEvent } = useTracking();

  useEffect(() => {
    trackEvent("variant_viewed", { variant: "brand-handoff", locale });
  }, [trackEvent, locale]);

  // The arrow is directional, so it has to follow the reading order rather
  // than sit at a fixed side.
  const Arrow = isRTL ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
    >
      <div className="fixed top-4 end-4 z-50">
        <LanguageSwitcher />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 scale-[1.6] sm:scale-[2] drop-shadow-xl"
        >
          <WowLogo size="header" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-3xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900"
        >
          {t("statement")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-gray-600"
        >
          {t("flagshipLead")}{" "}
          <span className="font-semibold text-gray-900">
            {t("flagshipName")}
          </span>{" "}
          — {t("flagshipDesc")}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          href={WEBINAR_URL}
          onClick={() =>
            trackEvent("hero_cta_clicked", {
              variant: "brand-handoff",
              destination: WEBINAR_URL,
            })
          }
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          {t("cta")}
          <Arrow className="h-5 w-5" aria-hidden="true" />
        </motion.a>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="pb-10 px-6"
      >
        <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-gray-200 pt-6 text-sm text-gray-500">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-gray-900"
          >
            {CONTACT_EMAIL}
          </a>
          <span aria-hidden="true">·</span>
          <span>{t("backedBy")} 500 Global</span>
        </div>
      </motion.footer>
    </div>
  );
}
