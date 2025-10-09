"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTracking, EVENTS } from "@/experiments/tracking";
import { getPostHog } from "@/lib/posthog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WowLogo } from "@/components/ui/logo";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Signup Landing - Minimal Variant
 *
 * Hypothesis: A clean, distraction-free signup form will convert better
 * by removing cognitive load and focusing solely on the value proposition.
 *
 * Key Features:
 * - Minimal design with lots of whitespace
 * - Single prominent CTA
 * - 3 key benefits only
 * - No navigation, no distractions
 */
export default function SignupMinimalPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { trackEvent, trackConversion, trackCTAClick } = useTracking();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Track conversion
    trackConversion(EVENTS.WAITLIST_JOINED, {
      variant: "minimal",
      source: "hero-form",
      email_provided: true,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Redirect to external waitlist (update URL as needed)
    setTimeout(() => {
      window.open("https://accounts.getwow.ai/waitlist", "_blank");
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-2">{t("homepage.thankYou")}</h2>
          <p className="text-gray-600">
            {t("homepage.checkYourEmail")}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Minimal Header */}
      <header className="p-6">
        <div className="container mx-auto">
          <WowLogo size="default" />
        </div>
      </header>

      {/* Hero Section - Centered */}
      <section className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block bg-[#aedf1a]/10 text-[#4a5568] px-4 py-2 rounded-full text-sm font-medium">
              ✨ {t("homepage.aiPowered")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t("homepage.subtitle")}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            {t("homepage.description")}
          </p>

          {/* Signup Form */}
          <Card className="p-8 shadow-xl border-2 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder={t("homepage.enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-lg h-14"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg bg-[#4a5568] hover:bg-[#3a4553]"
                disabled={isSubmitting}
                onClick={() => trackCTAClick("Join Waitlist", "hero-form")}
              >
                {isSubmitting ? (
                  t("homepage.joiningWaitlist")
                ) : (
                  <>
                    {t("homepage.joinWaitlist")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Trust indicators */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {t("homepage.freeTrialBadge")}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {t("homepage.noCreditCardBadge")}
              </span>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* 3 Key Benefits - Minimal */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-semibold text-lg mb-2">
              {t("homepage.aiAgentsTitle")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("homepage.aiAgentsDesc")}
            </p>
          </div>

          <div>
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-semibold text-lg mb-2">
              {t("homepage.insightsTitle")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("homepage.insightsDesc")}
            </p>
          </div>

          <div>
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">
              {t("homepage.automationTitle")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("homepage.automationDesc")}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer - Minimal */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
        <p>{t("homepage.copyright")}</p>
      </footer>
    </div>
  );
}
