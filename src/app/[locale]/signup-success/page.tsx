"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle, Sparkles } from "lucide-react";
import { WowLogo } from "@/components/ui/logo";

export default function SignupSuccessPage() {
  const t = useTranslations("signupSuccess");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    // Redirect to WOW app after 3 seconds
    const redirectUrl =
      process.env.NEXT_PUBLIC_WOW_APP_URL ?? "https://app.getwow.ai";
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 3000);

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
                {t("title")}
                <Sparkles className="h-8 w-8 text-[#aedf1a]" />
              </h1>
              <p className="text-zinc-600 text-lg md:text-xl">
                {t("subtitle")}
              </p>
              <p className="text-zinc-500 text-sm">{t("redirecting")}</p>
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center pt-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-200 border-t-[#aedf1a]" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-zinc-200">
              <p className="text-center text-sm text-zinc-500">
                {t("welcome")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
