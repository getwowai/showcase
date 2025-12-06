"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTracking } from "@/experiments/tracking";
import { getMixpanel } from "@/lib/mixpanel";
import { SignUp } from "@/components/ui/SignUp";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * Signup Landing - Waiting List Variant
 *
 * Hypothesis: A comprehensive landing page with detailed features, benefits, and testimonials
 * combined with the full signup form will convert better through building trust and showing value.
 *
 * Key Features:
 * - Detailed feature showcase with icons
 * - Benefits section with statistics
 * - Social proof via testimonial
 * - Platform logos showing integrations
 * - Complete signup form with all fields
 * - Multiple CTAs throughout the page
 * - Urgency messaging (limited spots)
 */
export default function SignupWaitingListPage() {
  const t = useTranslations("waitingList");
  const locale = useLocale();
  const { trackEvent } = useTracking();
  const isRTL = locale === "ar";

  // Track experiment exposure
  useEffect(() => {
    trackEvent("experiment_exposure", {
      experiment_name: "signup-variants-dec-2025",
      variant: "waiting-list",
      page_path: `/${locale}/signup-waiting-list`,
    });

    // Set Mixpanel user property for experiment tracking
    const mixpanel = getMixpanel();
    if (mixpanel) {
      mixpanel.people.set({
        "experiment:signup-variants-dec-2025": "waiting-list",
      });
    }
  }, [locale, trackEvent]);

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Language Switcher - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Header with Logo */}
      <header className="bg-[#F8F8F8] py-3">
        <div className="container mx-auto px-4 flex justify-center">
          <Image
            src="/waiting-landing/logo.png"
            alt="WOW AI"
            width={150}
            height={50}
            className="h-auto"
            priority
          />
        </div>
      </header>

      {/* Hero Section with Signup Form */}
      <section
        className="py-12 md:py-16 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: isRTL
            ? "url(/waiting-landing/waiting-banner.jpg)"
            : "linear-gradient(to right, rgba(91, 183, 221, 0.95), rgba(91, 183, 221, 0.7))",
          backgroundColor: isRTL ? "transparent" : "#5BB7DD",
        }}
      >
        {/* Inner wrapper */}
        <div>
          <div className="container mx-auto px-4">
            {isRTL ? (
              // Arabic: Everything stacked on the right side
              <div className="max-w-7xl mx-auto flex justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-7/12 lg:max-w-2xl lg:ml-auto space-y-6"
                >
                  {/* Title Section */}
                  <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-right">
                      {t("heroTitle")}
                    </h1>

                    <p className="text-lg md:text-xl text-white font-medium text-right">
                      {t("heroSubtitle")}
                    </p>

                    {/* Platform Logos */}
                    <div className="flex justify-end">
                      <Image
                        src="/waiting-landing/logo3.png"
                        alt={t("platformLogosAlt")}
                        width={500}
                        height={100}
                        className="w-full max-w-md h-auto"
                      />
                    </div>
                  </div>

                  {/* Signup Form Card */}
                  <Card className="p-6 md:p-8 shadow-2xl bg-transparent backdrop-blur-md border-white/30">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {t("formTitle")}
                      </h2>
                      <p className="text-green-600 font-medium text-lg">
                        {t("limitedOffer")}
                      </p>
                    </div>

                    <SignUp />

                    {/* Download Buttons */}
                    <div className="mt-6 pt-6 border-t">
                      <Image
                        src="/waiting-landing/btns.png"
                        alt={t("downloadAppsAlt")}
                        width={300}
                        height={80}
                        className="w-full max-w-sm mx-auto h-auto"
                      />
                    </div>
                  </Card>
                </motion.div>
              </div>
            ) : (
              // English: Text/logos on left, form on right
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-8">
                {/* Text/Logos Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-5/12 space-y-6"
                >
                  {/* Title Section */}
                  <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-left">
                      {t("heroTitle")}
                    </h1>

                    <p className="text-lg md:text-xl text-white font-medium text-left">
                      {t("heroSubtitle")}
                    </p>

                    {/* Platform Logos */}
                    <div className="flex justify-start">
                      <Image
                        src="/waiting-landing/logo3.png"
                        alt={t("platformLogosAlt")}
                        width={500}
                        height={100}
                        className="w-full max-w-md h-auto"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Form Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full lg:w-7/12"
                >
                  {/* Signup Form Card */}
                  <Card className="p-6 md:p-8 shadow-2xl bg-transparent backdrop-blur-md border-white/30">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {t("formTitle")}
                      </h2>
                      <p className="text-green-600 font-medium text-lg">
                        {t("limitedOffer")}
                      </p>
                    </div>

                    <SignUp />

                    {/* Download Buttons */}
                    <div className="mt-6 pt-6 border-t">
                      <Image
                        src="/waiting-landing/btns.png"
                        alt={t("downloadAppsAlt")}
                        width={300}
                        height={80}
                        className="w-full max-w-sm mx-auto h-auto"
                      />
                    </div>
                  </Card>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D] mb-4">
                {t("featuresTitle")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {t("featuresSubtitle")}
              </p>
            </div>

            {/* Feature Grid - 3 on top, 2 on bottom taking full width */}
            <div className="mb-12">
              {/* Top Row: 3 cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Feature 1: Smart Promotions */}
                <Card className="p-6 bg-[#F8FFE4] border-0">
                  <div className="mb-4">
                    <Image
                      src="/waiting-landing/offers.png"
                      alt=""
                      width={50}
                      height={50}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1D] mb-3">
                    {t("feature1Title")}
                  </h3>
                  <p className="text-gray-700">{t("feature1Description")}</p>
                </Card>

                {/* Feature 2: Smart Inventory Monitor */}
                <Card className="p-6 bg-[#E9F4F9] border-0">
                  <div className="mb-4">
                    <Image
                      src="/waiting-landing/stock.png"
                      alt=""
                      width={50}
                      height={50}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1D] mb-3">
                    {t("feature2Title")}
                  </h3>
                  <p className="text-gray-700">{t("feature2Description")}</p>
                </Card>

                {/* Feature 3: Daily Smart Insights */}
                <Card className="p-6 bg-[#F8FFE4] border-0">
                  <div className="mb-4">
                    <Image
                      src="/waiting-landing/reports.png"
                      alt=""
                      width={50}
                      height={50}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1D] mb-3">
                    {t("feature3Title")}
                  </h3>
                  <p className="text-gray-700">{t("feature3Description")}</p>
                </Card>
              </div>

              {/* Bottom Row: 2 cards taking up space of 3 */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Feature 4: Profit & Pricing Optimization */}
                <Card className="p-6 bg-[#E9F4F9] border-0 lg:col-span-1">
                  <div className="mb-4">
                    <Image
                      src="/waiting-landing/profit.png"
                      alt=""
                      width={50}
                      height={50}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1D] mb-3">
                    {t("feature4Title")}
                  </h3>
                  <p className="text-gray-700">{t("feature4Description")}</p>
                </Card>

                {/* Feature 5: AI Chat Assistant */}
                <Card className="p-6 bg-[#F8FFE4] border-0 lg:col-span-1">
                  <div className="mb-4">
                    <Image
                      src="/waiting-landing/askai.png"
                      alt=""
                      width={50}
                      height={50}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1D] mb-3">
                    {t("feature5Title")}
                  </h3>
                  <p className="text-gray-700">{t("feature5Description")}</p>
                </Card>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href={`#signup-form`}
                className="inline-block bg-[#AEDF1A] hover:bg-[#9bc917] text-[#303C0A] font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {t("registerNowFree")}
              </a>
              <p className="text-gray-600 mt-3">{t("limitedTimeOffer")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#F4F8FF] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D] mb-4">
                {t("benefitsTitle")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {t("benefitsSubtitle")}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Benefit 1: Increase Revenue */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/waiting-landing/icon-01.png"
                    alt=""
                    width={120}
                    height={120}
                    className="h-28 w-28 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1D] mb-3">
                  {t("benefit1Title")}
                </h3>
                <p className="text-gray-700 mb-2">{t("benefit1Description")}</p>
                <p className="text-green-600 font-semibold">
                  {t("benefit1Stat")}
                </p>
              </div>

              {/* Benefit 2: Save Time */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/waiting-landing/icon-02.png"
                    alt=""
                    width={120}
                    height={120}
                    className="h-28 w-28 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1D] mb-3">
                  {t("benefit2Title")}
                </h3>
                <p className="text-gray-700">{t("benefit2Description")}</p>
              </div>

              {/* Benefit 3: Better Decisions */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/waiting-landing/icon-03.png"
                    alt=""
                    width={120}
                    height={120}
                    className="h-28 w-28 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1D] mb-3">
                  {t("benefit3Title")}
                </h3>
                <p className="text-gray-700">{t("benefit3Description")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-[#EBF4F8] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-[#1D1D1D] mb-6 leading-relaxed">
              &ldquo;{t("testimonialQuote")}&rdquo;
            </blockquote>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              {t("testimonialAttribution")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#A0C62B] py-12 md:py-16" id="signup-form">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Platform Logos */}
            <div className="mb-8">
              <Image
                src="/waiting-landing/logos.png"
                alt={t("platformLogosAlt")}
                width={400}
                height={100}
                className="mx-auto h-auto"
              />
            </div>

            {/* Offer Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t("finalCtaTitle")}
            </h2>

            {/* CTA Button */}
            <a
              href="#signup-form"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block bg-[#041E42] hover:bg-[#052849] text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              {t("registerNowFree")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#041E42] py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white text-sm">{t("footer")}</p>
        </div>
      </footer>
    </div>
  );
}
