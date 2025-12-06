"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import { WowLogo } from "@/components/ui/logo";
import { getMixpanel } from "@/lib/mixpanel";

export default function SignupSuccessPage() {
  const [locale, setLocale] = useState<"en" | "ar">("ar");
  const isRTL = locale === "ar";

  // Translations
  const t = {
    en: {
      title: "Welcome to WOW AI!",
      subtitle: "Your account has been created successfully",
      redirecting: "Redirecting you to your dashboard in a few seconds...",
      welcome:
        "Get ready to transform your e-commerce business with AI-powered insights",
    },
    ar: {
      title: "أهلاً بك في WOW AI!",
      subtitle: "تم إنشاء حسابك بنجاح",
      redirecting: "جارٍ نقلك إلى لوحة التحكم خلال ثوانٍ...",
      welcome: "استعد لتحويل عملك التجاري الإلكتروني بواسطة الذكاء الاصطناعي",
    },
  }[locale as "en" | "ar"] || {
    title: "Welcome to WOW AI!",
    subtitle: "Your account has been created successfully",
    redirecting: "Redirecting you to your dashboard in a few seconds...",
    welcome:
      "Get ready to transform your e-commerce business with AI-powered insights",
  };

  useEffect(() => {
    // Detect locale from URL query param or localStorage (client-side only)
    const detectLocale = () => {
      if (typeof window === "undefined") return "ar";
      const params = new URLSearchParams(window.location.search);
      const localeParam = params.get("locale");
      if (localeParam === "ar" || localeParam === "en") {
        return localeParam;
      }
      // Fallback to localStorage or browser language
      const savedLocale = localStorage.getItem("preferredLocale");
      return savedLocale === "en" ? "en" : "ar";
    };

    const detectedLocale = detectLocale();
    setLocale(detectedLocale);

    // Track signup success page view and redirect
    const mixpanel = getMixpanel();
    if (mixpanel) {
      mixpanel.track("signup_landing_redirected", {
        locale: detectedLocale,
        redirect_destination: "app",
      });
    }

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

    // Redirect to WOW app after 5 seconds with UTM parameters
    // (5 seconds gives conversion pixels enough time to fire)
    const baseUrl =
      process.env.NEXT_PUBLIC_WOW_APP_URL ?? "https://app.getwow.ai";
    const redirectUrl = new URL(baseUrl);
    redirectUrl.searchParams.set("utm_source", "showcase");
    redirectUrl.searchParams.set("utm_medium", "signup");
    redirectUrl.searchParams.set("utm_campaign", "showcase-signup");

    const timer = setTimeout(() => {
      window.location.href = redirectUrl.toString();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
              <WowLogo size="standard" />
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
                {t.title}
                <Sparkles className="h-8 w-8 text-[#aedf1a]" />
              </h1>
              <p className="text-zinc-600 text-lg md:text-xl">{t.subtitle}</p>
              <p className="text-zinc-500 text-sm">{t.redirecting}</p>
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center pt-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-[#aedf1a]" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-zinc-200">
              <p className="text-center text-sm text-zinc-500">{t.welcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
