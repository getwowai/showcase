"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTracking } from "@/experiments/tracking";
import { getPostHog } from "@/lib/posthog";
import { Card } from "@/components/ui/card";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Footer from "@/components/Footer";
import { MessageCircle, Brain, Zap, MessageCirclePlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SignUp } from "@/components/ui/SignUp";

/**
 * Signup Landing - Minimal Plus Variant
 *
 * Hypothesis: A simple, focused message about installing the Shopify app and chatting with data
 * will convert better by being clear about the immediate value and next steps.
 *
 * Key Features:
 * - Clear value proposition: Install app, start chatting
 * - Single prominent CTA to Shopify App Store
 * - Simple benefits focused on chat and data
 * - No distractions, minimal design
 */
export default function SignupMinimalPlusPage() {
  const t = useTranslations("signupMinimal");
  const locale = useLocale();
  const { trackEvent } = useTracking();

  // Track experiment exposure
  useEffect(() => {
    trackEvent("experiment_exposure", {
      experiment_name: "signup-variants-oct-2025",
      variant: "minimal-plus",
      page_path: `/${locale}/signup-minimal-plus`,
    });

    // Set PostHog person property for experiment tracking
    const posthog = getPostHog();
    if (posthog) {
      posthog.setPersonProperties({
        "experiment:signup-variants-oct-2025": "minimal-plus",
      });
    }
  }, [locale, trackEvent]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      {/* Hero Section - Centered */}
      <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo - Big like main landing */}
          <div className="flex items-center justify-center mb-10 md:mb-12">
            <div className="scale-150 sm:scale-175 md:scale-[1.8] lg:scale-[2]">
              <WowLogo size="hero" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-8 md:mb-8 leading-tight px-4">
            {t("title")}
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-gray-600 mb-16 md:mb-16 max-w-4xl mx-auto font-medium leading-relaxed px-4">
            {t("subtitle")}
          </p>
          <SignUp />
        </motion.div>
      </section>
      {/* Unified Features Section - Email/WhatsApp Insights & Chat */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("unifiedFeaturesTitle")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("unifiedFeaturesDescription")}
          </p>
        </motion.div>

        {/* Two Cards Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Email Preview Card */}
          <Card className="p-6 shadow-xl border-2 bg-white">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {t("emailAndWhatsappInsights")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("emailAndWhatsappInsightsDescription")}
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Email Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#86c9e5] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">W</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">WOW AI</p>
                    <p className="text-xs text-gray-500">
                      {t("performanceReport")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-4 space-y-4">
                <div className="text-sm text-gray-600">
                  {t("emailGreeting")}
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                    <div className="text-xs text-gray-600 mb-1">
                      {t("grossSales")}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {t("grossSalesValue")}
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                    <div className="text-xs text-gray-600 mb-1">
                      {t("orders")}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {t("ordersValue")}
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
                    <div className="text-xs text-gray-600 mb-1">
                      {t("averageOrderValue")}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {t("averageOrderValueAmount")}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">{t("topProducts")}</div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">
                      {t("product1")}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {t("product1Growth")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">
                      {t("product2")}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {t("product2Growth")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700">
                      {t("product3")}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {t("product3Growth")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Chat Preview Card */}
          <Card className="p-6 shadow-xl border-2 bg-white">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {t("chatWithStoreTitle")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("chatWithStoreDescription")}
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#86c9e5] rounded-full flex items-center justify-center">
                    <MessageCirclePlusIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">WOW AI</p>
                    <p className="text-xs text-gray-500">{t("online")}</p>
                  </div>
                </div>
              </div>

              {/* Chat Content */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 min-h-[200px]">
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[85%] bg-[#4a5568] text-white p-3 rounded-lg">
                    <div className="text-sm whitespace-pre-wrap font-sans">
                      {t("chatUserMessage")}
                    </div>
                  </div>
                </motion.div>

                {/* AI Response */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] bg-white border shadow-sm p-3 rounded-lg">
                    <div className="text-sm whitespace-pre-wrap font-sans text-gray-700">
                      {t("chatAiResponse")}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* 3 Key Benefits - Email Insights Focused */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="bg-[#86c9e5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              {t("weeklyReports")}
            </h3>
            <p className="text-gray-600">{t("weeklyReportsDesc")}</p>
          </div>

          <div>
            <div className="bg-[#aedf1a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              {t("instantInsights")}
            </h3>
            <p className="text-gray-600">{t("instantInsightsDesc")}</p>
          </div>

          <div>
            <div className="bg-[#4a5568] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              {t("smartRecommendations")}
            </h3>
            <p className="text-gray-600">{t("smartRecommendationsDesc")}</p>
          </div>
        </motion.div>
      </section>
      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("readyToLearn")}
          </h2>
          <p className="text-lg text-gray-600 mb-8">{t("readyToLearnDesc")}</p>
          <div className="bg-gradient-to-r from-[#86c9e5] to-[#aedf1a] p-6 rounded-lg max-w-2xl mx-auto mb-8">
            <p className="text-white font-medium text-lg">
              {t("simpleProcess")}
            </p>
          </div>
          <SignUp />
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
