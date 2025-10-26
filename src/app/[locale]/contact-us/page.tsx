"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { MailIcon, ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href={`/${locale}`}>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            {t("backToHome")}
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="scale-125">
                <WowLogo size="hero" />
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium leading-relaxed"
            >
              {t("description")}
            </motion.p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#aedf1a]/20 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-40 right-16 w-16 h-16 bg-[#86c9e5]/20 rounded-full opacity-50 animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-[#86c9e5]/30 rounded-full opacity-50 animate-pulse delay-2000" />
      </section>

      {/* Email Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="surface-white border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="bg-[#86c9e5] feature-icon mx-auto mb-4">
                    <MailIcon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#4a5568]">
                    {t("emailSupport.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">
                    {t("emailSupport.description")}
                  </p>
                  <p className="text-lg font-medium text-[#4a5568] mb-8">
                    {t("emailSupport.email")}
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#4a5568] hover:bg-[#3a4553] text-white px-8 py-4"
                    onClick={() =>
                      window.open("mailto:support@getwow.ai", "_blank")
                    }
                  >
                    <MailIcon className="mr-3 h-6 w-6" />
                    {t("emailSupport.button")}
                    <ArrowRightIcon className="ml-3 h-6 w-6" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
