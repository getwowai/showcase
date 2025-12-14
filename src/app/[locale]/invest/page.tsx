"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Card } from "@/components/ui/card";
import {
  PlayCircleIcon,
  MailIcon,
  GlobeIcon,
  SmartphoneIcon,
  ArrowRightIcon,
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
      titleKey: "contactUs",
      descKey: "contactDesc",
      href: "https://getwow.ai/en/contact-us",
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
          className="flex flex-col items-center pt-8 pb-6 sm:pb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="mb-8 scale-[2] sm:scale-[2.5] lg:scale-[3] drop-shadow-2xl"
          >
            <WowLogo size="header" />
          </motion.div>
        </motion.div>

        {/* Backed by 500 Global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <p className="text-sm text-gray-500 font-medium mb-3">
            {t("backedBy")}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-gray-200/50"
          >
            <Image
              src="/500_Global_Logo.svg"
              alt="500 Global"
              width={180}
              height={60}
              className="h-10 w-auto"
            />
          </motion.div>
        </motion.div>

        {/* Stats Grid Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-12 max-w-4xl mx-auto space-y-6"
        >
          {/* Company Stats */}
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: t("founded"), value: "2024" },
                { label: t("market"), value: t("marketValue") },
                { label: t("team"), value: t("teamValue") },
                { label: t("stage"), value: t("stageValue") },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + idx * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#86c9e5] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Growth & Performance Stats */}
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: t("growthLabel"), value: t("stat1") },
                { label: t("merchantsLabel"), value: t("stat2") },
                { label: t("techLabel"), value: t("stat3") },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + idx * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#aedf1a] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Market Impact Stats */}
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl">
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
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {links.map((link, index) => {
              const Icon = link.icon;
              const delay = 0.8 + index * 0.15;

              return (
                <motion.a
                  key={link.titleKey}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay }}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    link.preview ? "lg:col-span-1" : ""
                  }`}
                >
                  {/* Card Background with Solid Color */}
                  <div
                    className={`absolute inset-0 ${link.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Card Content */}
                  <div className="relative bg-white/90 backdrop-blur-sm h-full p-6 border-2 border-gray-200/50 group-hover:border-transparent transition-colors duration-300">
                    {/* Preview Image or Custom Icon Design */}
                    {link.preview ? (
                      <div className="mb-4 rounded-2xl overflow-hidden bg-gray-100 h-32 sm:h-40 relative">
                        <Image
                          src={link.preview}
                          alt={t(link.titleKey)}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    ) : link.customIcon ? (
                      <div
                        className={`mb-4 rounded-2xl h-32 sm:h-40 relative flex items-center justify-center ${link.bgColor} group-hover:scale-105 transition-transform duration-500`}
                      >
                        <Icon className="h-20 w-20 text-white opacity-20" />
                      </div>
                    ) : null}

                    {/* Header with Icon and Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`p-3 rounded-2xl ${link.bgColor} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {link.badge && (
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wide bg-white/90 text-gray-700 rounded-full shadow-sm">
                          {t(`badge_${link.badge}`)}
                        </span>
                      )}
                    </div>

                    {/* Title and Description */}
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                        {t(link.titleKey)}
                      </h2>
                      {link.descKey && (
                        <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                          {t(link.descKey)}
                        </p>
                      )}
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={`mt-4 flex items-center gap-2 text-gray-400 group-hover:text-gray-700 transition-colors duration-300 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span className="text-sm font-semibold">
                        {t("explore")}
                      </span>
                      <ArrowRightIcon
                        className={`h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-4 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
          >
            {[
              {
                label: t("website"),
                href: `/${locale}`,
                icon: GlobeIcon,
              },
              {
                label: t("app"),
                href: "https://app.getwow.ai",
                icon: SmartphoneIcon,
                external: true,
              },
            ].map((quickLink, idx) => (
              <motion.a
                key={idx}
                href={quickLink.href}
                target={quickLink.external ? "_blank" : undefined}
                rel={quickLink.external ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-xl border border-gray-200/50 hover:border-[#86c9e5] transition-all duration-300"
              >
                <quickLink.icon className="h-4 w-4 text-[#86c9e5]" />
                <span className="text-sm font-semibold text-gray-700">
                  {quickLink.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

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
