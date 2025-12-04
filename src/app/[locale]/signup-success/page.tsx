"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { WowLogo } from "@/components/ui/logo";
import { useMixpanelTracking } from "@/lib/mixpanel-tracking";
import { Button } from "@/components/ui/button";

export default function SignupSuccessPage() {
  const t = useTranslations("signupSuccess");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { trackEvent } = useMixpanelTracking();

  useEffect(() => {
    // Track signup success page view
    trackEvent("signup_landing_success_page_viewed", {
      locale,
    });

    // Fire Facebook Pixel conversion events
    if (
      typeof window !== "undefined" &&
      "fbq" in window &&
      typeof window.fbq === "function"
    ) {
      window.fbq("track", "Lead");
    }

    // Fire Google Ads conversion event (if configured)
    if (
      typeof window !== "undefined" &&
      "gtag" in window &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Replace with your Google Ads conversion ID
      });
    }
  }, [locale, trackEvent]);

  const handleProceed = () => {
    // Track proceed button click
    trackEvent("signup_landing_proceed_clicked", {
      locale,
      redirect_destination: "app",
    });

    // Redirect to WOW app with UTM parameters
    const baseUrl =
      process.env.NEXT_PUBLIC_WOW_APP_URL ?? "https://app.getwow.ai";
    const redirectUrl = new URL(baseUrl);
    redirectUrl.searchParams.set("utm_source", "showcase");
    redirectUrl.searchParams.set("utm_medium", "signup");
    redirectUrl.searchParams.set("utm_campaign", "showcase-signup");

    window.location.href = redirectUrl.toString();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4 py-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#aedf1a]/10 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#86c9e5]/10 rounded-full blur-3xl -z-0" />

          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <WowLogo size="hero" />
            </div>

            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#aedf1a] rounded-full blur-xl opacity-30 animate-pulse" />
                <CheckCircle className="h-24 w-24 text-[#aedf1a] relative" />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 flex items-center justify-center gap-2">
                <Sparkles className="h-8 w-8 text-[#aedf1a]" />
                {t("title")}
                <Sparkles className="h-8 w-8 text-[#aedf1a]" />
              </h1>
              <p className="text-zinc-600 text-lg md:text-xl">
                {t("subtitle")}
              </p>
            </div>

            {/* Additional Info */}
            <div className="pt-2">
              <p className="text-center text-sm text-zinc-500">
                {t("welcome")}
              </p>
            </div>

            {/* Proceed Button */}
            <div className="pt-4">
              <Button
                onClick={handleProceed}
                size="lg"
                className="w-full h-14 bg-[#aedf1a] text-black font-bold text-lg border-2 border-[#aedf1a] hover:bg-[#9bc917] hover:border-[#9bc917] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all rounded-[12px] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isRTL ? (
                  <>
                    <ArrowRight className="h-5 w-5 rotate-180" />
                    {t("proceed") || "أطلق WOW AI"}
                  </>
                ) : (
                  <>
                    {t("proceed") || "Launch WOW AI"}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
