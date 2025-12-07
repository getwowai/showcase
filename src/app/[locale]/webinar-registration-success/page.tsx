"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  CheckCircle,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { WowLogo } from "@/components/ui/logo";
import { useMixpanelTracking } from "@/lib/mixpanel-tracking";
import { Button } from "@/components/ui/button";

export default function WebinarRegistrationSuccessPage() {
  const t = useTranslations("webinarSuccess");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { trackEvent } = useMixpanelTracking();
  const [webinarDate, setWebinarDate] = useState<string | null>(null);
  const [webinarTime, setWebinarTime] = useState<string | null>(null);

  useEffect(() => {
    // Track webinar registration success page view
    trackEvent("webinar_registration_success_page_viewed", {
      locale,
    });

    // Fire Facebook Pixel conversion events
    if (
      typeof window !== "undefined" &&
      "fbq" in window &&
      typeof window.fbq === "function"
    ) {
      window.fbq("track", "Lead");
      window.fbq("track", "CompleteRegistration");
    }

    // Fire Google Ads conversion event (if configured)
    if (
      typeof window !== "undefined" &&
      "gtag" in window &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
      });
    }
  }, [locale, trackEvent]);

  useEffect(() => {
    // Get datetime from environment variable
    const webinarDatetime = process.env.NEXT_PUBLIC_WEBINAR_DATETIME;

    if (!webinarDatetime) {
      setWebinarDate(null);
      setWebinarTime(null);
      return;
    }

    const targetDate = new Date(webinarDatetime);

    if (isRTL) {
      // Arabic: Gregorian calendar explicitly
      const dateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      setWebinarDate(dateFormatter.format(targetDate));

      const timeFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
        hour: "numeric",
        dayPeriod: "short",
        timeZone: "Asia/Riyadh",
      });
      const timeString = timeFormatter.format(targetDate);
      setWebinarTime(`${timeString} – توقيت الرياض`);
    } else {
      // English: Standard Gregorian formatting
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setWebinarDate(dateFormatter.format(targetDate));

      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      });
      setWebinarTime(timeFormatter.format(targetDate));
    }
  }, [isRTL]);

  const handleProceed = () => {
    // Track proceed button click
    trackEvent("webinar_registration_proceed_clicked", {
      locale,
      redirect_destination: "app",
    });

    // Redirect to WOW app with UTM parameters
    const baseUrl =
      process.env.NEXT_PUBLIC_WOW_APP_URL ?? "https://app.getwow.ai";
    const redirectUrl = new URL(baseUrl);
    redirectUrl.searchParams.set("utm_source", "webinar");
    redirectUrl.searchParams.set("utm_medium", "signup");
    redirectUrl.searchParams.set("utm_campaign", "webinar-signup");

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
            <div className="space-y-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 flex items-center justify-center gap-2">
                <Sparkles className="h-8 w-8 text-[#aedf1a]" />
                {t("title")}
                <Sparkles className="h-8 w-8 text-[#aedf1a]" />
              </h1>
              <p className="text-zinc-600 text-lg">{t("subtitle")}</p>
              <p className="text-zinc-500 text-base">
                {t("emailConfirmation")}
              </p>
            </div>

            {/* Date and Time Display */}
            {webinarDate && webinarTime && (
              <div className="pt-2 flex flex-col items-center gap-4">
                <div
                  className={`flex items-center gap-3 text-base md:text-lg font-semibold text-zinc-700 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Calendar className="w-6 h-6 text-[#aedf1a]" />
                  <span>{webinarDate}</span>
                </div>
                <div
                  className={`flex items-center gap-3 text-base md:text-lg font-semibold text-zinc-700 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Clock className="w-6 h-6 text-[#aedf1a]" />
                  <span>{webinarTime}</span>
                </div>
              </div>
            )}

            {/* Account Ready Section */}
            <div className="pt-4 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center flex items-center justify-center gap-2">
                {t("accountReadyTitle")}
              </h2>
              <p className="text-zinc-600 text-base text-center">
                {t("accountReadyMessage")}
              </p>
              <p className="text-zinc-700 text-base text-center font-medium">
                {t("activateMessage")}
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
