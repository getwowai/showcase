"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  SparklesIcon,
  BrainCircuitIcon,
  DatabaseIcon,
  BotIcon,
  LayersIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  Linkedin,
  MessageCircle,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Footer from "@/components/Footer";
import { useTracking } from "@/experiments/tracking";
import { getMixpanel } from "@/lib/mixpanel";

const WEBINAR_URL = "https://wow-webinar.com";
const INVESTOR_CALL_URL = "https://calendly.com/sherif-getwow/investor-meeting";

/**
 * AI-Native Products Variant
 *
 * Company-positioning landing for WOW AI as a technology company that builds
 * AI-native apps & solutions. Features WOW Webinar as the flagship product,
 * highlights WOW Query and the broader AI capabilities, introduces the
 * founders, and surfaces the 500 Global backing. Aimed at investors and
 * visitors who want to understand the power of the company.
 */
export default function AiNativeProductsPage() {
  const t = useTranslations("aiNative");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { trackEvent, trackCTAClick } = useTracking();

  // Track experiment exposure
  useEffect(() => {
    trackEvent("experiment_exposure", {
      experiment_name: "signup-variants-oct-2025",
      variant: "ai-native-products",
      page_path: `/${locale}/ai-native-products`,
    });

    const mixpanel = getMixpanel();
    if (mixpanel) {
      mixpanel.people.set({
        "experiment:signup-variants-oct-2025": "ai-native-products",
      });
    }
  }, [locale, trackEvent]);

  const capabilities = [
    {
      icon: SparklesIcon,
      title: t("cap1Title"),
      desc: t("cap1Desc"),
      color: "bg-[#86c9e5]",
    },
    {
      icon: DatabaseIcon,
      title: t("cap2Title"),
      desc: t("cap2Desc"),
      color: "bg-[#aedf1a]",
    },
    {
      icon: BotIcon,
      title: t("cap3Title"),
      desc: t("cap3Desc"),
      color: "bg-[#4a5568]",
    },
    {
      icon: LayersIcon,
      title: t("cap4Title"),
      desc: t("cap4Desc"),
      color: "bg-[#86c9e5]",
    },
  ];

  const products = [
    {
      icon: DatabaseIcon,
      name: t("prod1Name"),
      desc: t("prod1Desc"),
    },
    {
      icon: BrainCircuitIcon,
      name: t("prod2Name"),
      desc: t("prod2Desc"),
    },
  ];

  const founders = [
    {
      name: t("sherifName"),
      title: t("sherifTitle"),
      initials: "SM",
      linkedin: "https://www.linkedin.com/in/sherifmakhlouf/",
      whatsapp: "https://wa.me/201000780302",
    },
    {
      name: t("ahmedName"),
      title: t("ahmedTitle"),
      initials: "AS",
      linkedin: "https://www.linkedin.com/in/edshadi/",
      whatsapp: "https://wa.me/201098037226",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#86c9e5]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-[#aedf1a]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-16 pb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 scale-[1.9] sm:scale-[2.4] drop-shadow-xl"
          >
            <WowLogo size="header" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Badge className="mb-6 bg-white/80 text-[#4a5568] border border-[#86c9e5]/40 hover:bg-white px-5 py-2 text-sm sm:text-base font-semibold shadow-sm">
              <SparklesIcon className="h-4 w-4 mr-2 text-[#86c9e5]" />
              {t("heroBadge")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl"
          >
            {t("heroTitle")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href={WEBINAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick(t("heroCtaPrimary"), "hero")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#86c9e5] hover:bg-[#6fb9da] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("heroCtaPrimary")}
              <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
            </a>
            <a
              href={INVESTOR_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick(t("heroCtaSecondary"), "hero")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#4a5568] font-semibold border-2 border-gray-200 hover:border-[#86c9e5] shadow-sm transition-all duration-300"
            >
              {t("heroCtaSecondary")}
            </a>
          </motion.div>

          {/* Backed by 500 Global */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center mt-14"
          >
            <p className="text-sm text-gray-500 font-medium mb-3">
              {t("backedBy")}
            </p>
            <a
              href="https://500.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src="/500_Global_Logo.svg"
                alt="500 Global"
                width={180}
                height={60}
                className="h-9 w-auto"
              />
            </a>
          </motion.div>
        </section>

        {/* Capabilities */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("capabilitiesTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("capabilitiesSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <Card className="p-6 h-full bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 hover:border-[#86c9e5] shadow-lg hover:shadow-xl transition-all duration-300">
                  <div
                    className={`${cap.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md`}
                  >
                    <cap.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{cap.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Flagship: WOW Webinar */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-2 border-[#86c9e5]/40 shadow-2xl bg-gradient-to-br from-[#4a5568] via-[#3c4656] to-[#2d3543] text-white">
              <div className="p-8 sm:p-12">
                <Badge className="mb-5 bg-[#aedf1a] text-[#2d3543] hover:bg-[#aedf1a] px-4 py-1.5 text-sm font-semibold">
                  {t("flagshipLabel")}
                </Badge>
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                      {t("flagshipName")}
                    </h2>
                    <p className="text-xl text-[#86c9e5] font-medium mb-4">
                      {t("flagshipTagline")}
                    </p>
                    <p className="text-gray-200 leading-relaxed mb-7 max-w-xl">
                      {t("flagshipDesc")}
                    </p>
                    <a
                      href={WEBINAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackCTAClick(t("flagshipCta"), "flagship")
                      }
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#86c9e5] hover:bg-[#6fb9da] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <PlayCircleIcon className="h-5 w-5" />
                      {t("flagshipCta")}
                    </a>
                  </div>
                  <div className="lg:w-72 flex-shrink-0">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-8 flex items-center justify-center">
                      <PlayCircleIcon className="h-24 w-24 text-[#86c9e5]" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Products & technology */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("productsTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("productsSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card className="p-7 h-full bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#86c9e5]/15 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <product.icon className="h-6 w-6 text-[#4a5568]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t("foundersTitle")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {founders.map((founder, idx) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card className="p-7 h-full bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-lg flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#86c9e5] to-[#4a5568] flex items-center justify-center mb-4 shadow-md">
                    <span className="text-white text-xl font-bold">
                      {founder.initials}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {founder.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{founder.title}</p>
                  <div className="flex gap-3">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] hover:bg-[#006399] text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <a
                      href={founder.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-10 sm:p-14 text-center bg-gradient-to-r from-[#86c9e5] to-[#aedf1a] border-0 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                {t("ctaSubtitle")}
              </p>
              <a
                href={INVESTOR_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick(t("ctaButton"), "closing-cta")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-gray-50 text-[#4a5568] font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("ctaButton")}
                <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
              </a>
            </Card>
          </motion.div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
