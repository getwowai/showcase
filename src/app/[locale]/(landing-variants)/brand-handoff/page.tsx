"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTracking } from "@/experiments/tracking";

const WEBINAR_URL = "https://wow-webinar.com";
const RUNSTREAM_URL = "https://runstream.ai";
const FUND_URL = "https://500.co/";
const CONTACT_EMAIL = "hello@getwow.ai";

/**
 * Brand Handoff Variant
 *
 * Answers "what is getwow.ai?" for anyone arriving from a business card, an
 * @getwow.ai email, or a search for the company name — while the business
 * itself runs on wow-webinar.com.
 *
 * It exists because getwow.ai is primarily an identity domain rather than a
 * website: it carries the company's Google Workspace mail and is the SendGrid
 * sending domain for hello@getwow.ai. A redirect would retire the name and
 * leave that mismatch permanently unexplained, so the page states the
 * relationship instead.
 *
 * Positioned as a company with proof rather than a holding page: the 500 Global
 * backing is given its own block rather than a footer line, the three headline
 * numbers come from WOW Webinar (the flagship earns the company's credibility),
 * and both shipped products are named. Investors get their own route.
 *
 * Distinct from the ai-native-products variant, which is a full investor
 * narrative with capabilities, founders and a closing CTA. This one is a single
 * scroll: who we are, the proof, where to go next.
 *
 * Bilingual via next-intl and RTL-aware — directional arrows swap with the
 * locale rather than pointing backwards in Arabic, and logical properties
 * (`start`/`end`) are used over left/right throughout.
 *
 * Registered in src/lib/variant-config.ts and rendered from
 * src/app/[locale]/page.tsx when the resolved variant is "brand-handoff".
 * Route-scoped metadata lives in ./layout.tsx.
 */
export default function BrandHandoffPage() {
  const t = useTranslations("brandHandoff");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { trackEvent } = useTracking();

  useEffect(() => {
    trackEvent("variant_viewed", { variant: "brand-handoff", locale });
  }, [trackEvent, locale]);

  // Directional: has to follow reading order, not sit at a fixed side.
  const Arrow = isRTL ? ArrowLeftIcon : ArrowRightIcon;

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  const track = (event: string, destination: string) =>
    trackEvent(event, { variant: "brand-handoff", destination });

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden"
    >
      {/* Ambient accents, matching the ai-native variant's treatment. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -start-40 w-96 h-96 bg-[#86c9e5]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute -bottom-40 -end-40 w-[28rem] h-[28rem] bg-[#aedf1a]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="fixed top-4 end-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        {/* Hero */}
        <section className="pt-16 pb-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 scale-[1.5] sm:scale-[1.9] drop-shadow-xl"
          >
            <WowLogo size="header" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Badge className="mb-6 bg-white/80 text-[#4a5568] border border-[#86c9e5]/40 hover:bg-white px-5 py-2 text-sm font-semibold shadow-sm">
              <SparklesIcon className="h-4 w-4 me-2 text-[#86c9e5]" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900"
          >
            {t("statement")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-gray-600"
          >
            {t("subtitle")}
          </motion.p>
        </section>

        {/* Backing — deliberately a block of its own, not a footer line. */}
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pb-12 flex flex-col items-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            {t("backedBy")}
          </p>
          <a
            href={FUND_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("backer_clicked", FUND_URL)}
            className="rounded-3xl border border-gray-200/60 bg-white/85 px-10 py-7 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl sm:px-16 sm:py-9"
          >
            <Image
              src="/500_Global_Logo.svg"
              alt="500 Global"
              width={320}
              height={110}
              priority
              className="h-14 w-auto sm:h-20"
            />
          </a>
        </motion.section>

        {/* Proof — the flagship's numbers, which are the company's credibility. */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="pb-14"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-200/60 bg-white/70 px-6 py-7 text-center backdrop-blur-sm"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Products */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pb-14 grid grid-cols-1 gap-5 md:grid-cols-5"
        >
          {/* Flagship gets the weight: dark card, three of five columns. */}
          <div className="md:col-span-3 rounded-3xl bg-gray-900 p-8 sm:p-10 text-start shadow-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#aedf1a]">
              {t("flagshipLabel")}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              {t("flagshipName")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              {t("flagshipDesc")}
            </p>
            <a
              href={WEBINAR_URL}
              onClick={() => track("hero_cta_clicked", WEBINAR_URL)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              {t("flagshipCta")}
              <Arrow className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div className="md:col-span-2 rounded-3xl border border-gray-200/60 bg-white/80 p-8 text-start shadow-sm backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {t("secondLabel")}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              {t("secondName")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {t("secondDesc")}
            </p>
            <a
              href={RUNSTREAM_URL}
              onClick={() => track("secondary_product_clicked", RUNSTREAM_URL)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
            >
              {t("secondCta")}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.section>

        {/* Footer row */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="pb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 border-t border-gray-200 pt-7 text-sm">
            <Link
              href={`/${locale}/invest`}
              onClick={() => track("invest_clicked", `/${locale}/invest`)}
              className="inline-flex items-center gap-1.5 font-semibold text-gray-900 transition-colors hover:text-gray-600"
            >
              <TrendingUpIcon className="h-4 w-4" aria-hidden="true" />
              {t("investCta")}
            </Link>
            <span className="text-gray-300" aria-hidden="true">
              |
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => track("contact_clicked", CONTACT_EMAIL)}
              className="text-gray-500 transition-colors hover:text-gray-900"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
