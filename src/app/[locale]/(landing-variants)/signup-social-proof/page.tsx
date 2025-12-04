"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTracking, EVENTS } from "@/experiments/tracking";
import { getMixpanel } from "@/lib/mixpanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WowLogo } from "@/components/ui/logo";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * Signup Landing - Social Proof Variant
 *
 * Hypothesis: Displaying social proof, testimonials, and trust signals
 * will increase conversion by reducing anxiety and building credibility.
 *
 * Key Features:
 * - Prominent testimonial quotes
 * - Trust badges and metrics
 * - Customer logos/avatars
 * - Security & guarantee messaging
 */
export default function SignupSocialProofPage() {
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
      variant: "social-proof",
      page_path: `/${locale}/signup-social-proof`,
    });

    // Set Mixpanel user property for experiment tracking
    const mixpanel = getMixpanel();
    if (mixpanel) {
      mixpanel.people.set({
        "experiment:signup-variants-oct-2025": "social-proof",
      });
    }
  }, [locale, trackEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Track conversion
    trackConversion(EVENTS.WAITLIST_JOINED, {
      variant: "social-proof",
      source: "hero-form",
      email_provided: true,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Redirect to external waitlist
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
          <p className="text-gray-600">{t("homepage.checkYourEmail")}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="p-6 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <WowLogo size="header" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span className="font-medium">
              5,000+ {t("homepage.storeOwners")}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Value Prop + Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 5-star rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                4.9/5 {t("homepage.from")} 500+ {t("homepage.reviews")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {t("homepage.subtitle")}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {t("homepage.description")}
            </p>

            {/* Testimonial */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#86c9e5] to-[#aedf1a] rounded-full flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 italic mb-2">
                      &ldquo;{t("testimonials.sarahChen.quote")}&rdquo;
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {t("testimonials.sarahChen.name")}
                    </p>
                    <p className="text-xs text-gray-600">
                      {t("testimonials.sarahChen.role")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Badge variant="secondary" className="px-3 py-2">
                <Shield className="w-4 h-4 mr-2" />
                {t("homepage.secureData")}
              </Badge>
              <Badge variant="secondary" className="px-3 py-2">
                <Zap className="w-4 h-4 mr-2" />
                {t("homepage.setupInMinutesBadge")}
              </Badge>
              <Badge variant="secondary" className="px-3 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                {t("homepage.averageROI")}
              </Badge>
            </div>
          </motion.div>

          {/* Right: Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 shadow-2xl border-2 border-[#86c9e5]/20">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {t("homepage.startFreeTrial")}
                </h2>
                <p className="text-gray-600">{t("homepage.joinThousands")}</p>
              </div>

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
                  onClick={() =>
                    trackCTAClick("Join Waitlist", "hero-form-social-proof")
                  }
                >
                  {isSubmitting ? (
                    t("homepage.joiningWaitlist")
                  ) : (
                    <>
                      {t("homepage.getStartedFree")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Benefits list */}
              <div className="mt-6 space-y-3">
                {[
                  t("homepage.freeTrialBadge"),
                  t("homepage.noCreditCardBadge"),
                  t("homepage.cancelAnytime"),
                  t("homepage.supportIncluded"),
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Social proof avatars */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 border-white ${
                          i === 1
                            ? "bg-gradient-to-br from-purple-400 to-pink-400"
                            : i === 2
                              ? "bg-gradient-to-br from-blue-400 to-cyan-400"
                              : i === 3
                                ? "bg-gradient-to-br from-green-400 to-emerald-400"
                                : "bg-gradient-to-br from-orange-400 to-red-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    <strong>50+</strong> {t("homepage.joinedThisWeek")}
                  </span>
                </div>
              </div>
            </Card>

            {/* Money-back guarantee */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                🛡️ {t("homepage.moneyBackGuarantee")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#4a5568] mb-2">
                5,000+
              </div>
              <p className="text-gray-600">{t("homepage.activeUsers")}</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4a5568] mb-2">$2M+</div>
              <p className="text-gray-600">{t("homepage.revenueGenerated")}</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4a5568] mb-2">98%</div>
              <p className="text-gray-600">{t("homepage.satisfaction")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
        <p>{t("homepage.copyright")}</p>
      </footer>
    </div>
  );
}
