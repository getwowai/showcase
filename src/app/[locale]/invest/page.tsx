"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Card } from "@/components/ui/card";
import {
  PlayCircleIcon,
  MailIcon,
  UsersIcon,
  BrainCircuitIcon,
  TrendingUpIcon,
  BuildingIcon,
} from "lucide-react";
import Image from "next/image";

export default function InvestPage() {
  const t = useTranslations("invest");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const links = [
    {
      icon: PlayCircleIcon,
      titleKey: "demo",
      descKey: "demoDesc",
      href: "https://demo.getwow.ai",
      bgColor: "bg-[#86c9e5]",
      preview: "/waiting-landing/waiting-banner.jpg",
      badge: "interactive",
      external: true,
    },
    // {
    //   icon: FileTextIcon,
    //   titleKey: "pitchDeck",
    //   descKey: "pitchDeckDesc",
    //   href: "#",
    //   bgColor: "bg-[#aedf1a]",
    //   badge: "document",
    //   external: true,
    //   customIcon: true,
    // },
    // {
    //   icon: TrendingUpIcon,
    //   titleKey: "metrics",
    //   descKey: "metricsDesc",
    //   href: `/${locale}/invest/metrics`,
    //   bgColor: "bg-[#4a5568]",
    //   badge: "live",
    //   customIcon: true,
    // },
    {
      icon: MailIcon,
      titleKey: "bookCall",
      descKey: "contactDesc",
      href: "https://calendly.com",
      bgColor: "bg-[#86c9e5]",
      badge: "direct",
      external: true,
      customIcon: true,
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-[#86c9e5]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#aedf1a]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#4a5568]/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col">
        {/* Language Switcher */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center pt-8 pb-2"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="mb-4 scale-[2] sm:scale-[2.5] lg:scale-[3] drop-shadow-2xl"
          >
            <WowLogo size="header" />
          </motion.div>
        </motion.div>

        {/* Backed by 500 Global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center mb-4"
        >
          <p className="text-sm text-gray-500 font-medium mb-2">
            {t("backedBy")}
          </p>
          <motion.a
            href="https://500.co/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/500_Global_Logo.svg"
              alt="500 Global"
              width={180}
              height={60}
              className="h-10 w-auto"
            />
          </motion.a>
        </motion.div>

        {/* Stats Grid Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-6 max-w-4xl mx-auto space-y-4"
        >
          {/* Company Stats */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl">
            <div className="flex flex-col divide-y divide-[#86c9e5]/30">
              {[
                { icon: UsersIcon, value: t("foundersValue") },
                { icon: BrainCircuitIcon, value: t("technologyValue") },
                { icon: TrendingUpIcon, value: t("marketValue") },
                { icon: BuildingIcon, value: t("customersValue") },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + idx * 0.1, duration: 0.4 }}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-[#86c9e5] flex-shrink-0" />
                    <p className="text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((link, idx) => (
              <motion.a
                key={link.titleKey}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 + idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 hover:border-[#86c9e5] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="flex flex-col space-y-3">
                    {/* Preview Image or Icon */}
                    {link.preview ? (
                      <div className="rounded-2xl overflow-hidden bg-gray-100 h-40 relative">
                        <Image
                          src={link.preview}
                          alt={t(link.titleKey)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/5" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div
                          className={`p-4 rounded-2xl ${link.bgColor} shadow-lg`}
                        >
                          <link.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t(link.titleKey)}
                      </h3>
                      {link.descKey && (
                        <p className="text-sm text-gray-600">
                          {t(link.descKey)}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>

          {/* Market Impact Stats */}
          {/* <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: t("revenueImpact"), value: "+23%" },
                { label: t("retention"), value: "94%" },
                { label: t("ordersProcessed"), value: "45K+" },
                { label: t("avgGrowth"), value: "200%" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3 + idx * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#4a5568] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card> */}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="py-6 text-center"
        >
          <p className="text-sm text-gray-500 font-medium">{t("footer")}</p>
        </motion.div>
      </div>
    </div>
  );
}
