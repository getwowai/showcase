"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTracking, EVENTS } from "@/experiments/tracking";
import { getPostHog } from "@/lib/posthog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Brain,
  Zap,
  ExternalLink,
  LogIn,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * Signup Landing - Minimal Variant
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
export default function SignupMinimalPage() {
  const t = useTranslations("signupMinimal");
  const locale = useLocale();
  const { trackEvent, trackConversion, trackCTAClick } = useTracking();

  // Track experiment exposure
  useEffect(() => {
    trackEvent("experiment_exposure", {
      experiment_name: "signup-variants-oct-2025",
      variant: "minimal",
      page_path: `/${locale}/signup-minimal`,
    });

    // Set PostHog person property for experiment tracking
    const posthog = getPostHog();
    if (posthog) {
      posthog.setPersonProperties({
        "experiment:signup-variants-oct-2025": "minimal",
      });
    }
  }, [locale, trackEvent]);

  const handleInstallApp = () => {
    // Track conversion
    trackConversion(EVENTS.WAITLIST_JOINED, {
      variant: "minimal",
      source: "install-app-button",
      action: "shopify_install",
    });

    // Track CTA click
    trackCTAClick("Install Shopify App", "hero-cta");

    // Open Shopify App installation
    window.open(
      "https://admin.shopify.com/?organization_id=184935022&no_redirect=true&redirect=/oauth/redirect_from_developer_dashboard?client_id%3Dffba2100cb6b0b2cb593b30dfc4dc08a",
      "_blank",
    );
  };

  const handleLogin = () => {
    // Track CTA click
    trackCTAClick("Already a customer? Login", "hero-cta");

    // Open WOW AI login page
    window.open("https://app.getwow.ai/sign-in", "_blank");
  };

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

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col gap-4 justify-center px-4"
          >
            <Button
              size="lg"
              onClick={handleInstallApp}
              className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-[#4a5568] hover:bg-[#3a4553] text-white hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all w-full sm:w-auto cursor-pointer"
            >
              <ExternalLink className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              {t("installButton")}
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>

            {/* Already a customer? */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogin}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer mx-auto"
            >
              <LogIn className="h-4 w-4" />
              {t("alreadyCustomer")}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Chat Demo Section */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("chatWithData")}
          </h2>
          <p className="text-lg text-gray-600">{t("chatDescription")}</p>
        </motion.div>

        {/* Chat Demo Card */}
        <Card className="p-8 shadow-xl border-2 max-w-2xl mx-auto">
          <div className="space-y-4">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-[#4a5568] text-white p-4 rounded-lg max-w-[80%]">
                <p className="text-sm">"{t("chatDemo.userMessage1")}"</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-[#4a5568]" />
                  <span className="text-xs font-medium text-gray-600">
                    WOW AI
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {t("chatDemo.aiResponse1")}
                  <br />• {t("chatDemo.product1")}
                  <br />• {t("chatDemo.product2")}
                  <br />• {t("chatDemo.product3")}
                  <br />
                  <br />
                  <span className="text-green-600 font-medium">
                    {t("chatDemo.increase")}
                  </span>
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-[#4a5568] text-white p-4 rounded-lg max-w-[80%]">
                <p className="text-sm">"{t("chatDemo.userMessage2")}"</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-[#4a5568]" />
                  <span className="text-xs font-medium text-gray-600">
                    WOW AI
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {t("chatDemo.aiResponse2")}
                  <br />
                  <br />
                  <span className="text-green-600 font-medium">
                    {t("chatDemo.monthlyIncrease")}
                  </span>
                  <br />
                  <span className="text-blue-600 font-medium">
                    {t("chatDemo.averageOrderValue")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 3 Key Benefits - Chat Focused */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="bg-[#4a5568] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              {t("naturalConversation")}
            </h3>
            <p className="text-gray-600">{t("naturalConversationDesc")}</p>
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
            <div className="bg-[#86c9e5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("readyToStart")}
          </h2>
          <p className="text-lg text-gray-600 mb-8">{t("readyToStartDesc")}</p>
          <Button
            size="lg"
            onClick={handleInstallApp}
            className="text-xl px-12 py-6 bg-[#4a5568] hover:bg-[#3a4553] text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
          >
            <ExternalLink className="mr-3 h-6 w-6" />
            {t("installButton")}
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      {/* Footer - Minimal */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
        <p>{t("copyright")}</p>
      </footer>
    </div>
  );
}
