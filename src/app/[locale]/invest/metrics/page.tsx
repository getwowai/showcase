"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { WowLogo } from "@/components/ui/logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Card } from "@/components/ui/card";
import {
  TrendingUpIcon,
  UsersIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  ZapIcon,
  BarChart3Icon,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";

export default function InvestMetricsPage() {
  const t = useTranslations("investMetrics");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Placeholder metrics - you'll replace these with actual data
  const metrics = [
    {
      icon: UsersIcon,
      label: t("totalMerchants"),
      value: "250+",
      change: "+45%",
      period: t("thisMonth"),
      color: "bg-[#86c9e5]",
    },
    {
      icon: DollarSignIcon,
      label: t("totalRevenue"),
      value: "$2.4M",
      change: "+127%",
      period: t("thisQuarter"),
      color: "bg-[#aedf1a]",
    },
    {
      icon: ShoppingCartIcon,
      label: t("ordersProcessed"),
      value: "45K+",
      change: "+89%",
      period: t("thisMonth"),
      color: "bg-[#4a5568]",
    },
    {
      icon: TrendingUpIcon,
      label: t("monthlyGrowth"),
      value: "200%",
      change: t("consistent"),
      period: t("last6Months"),
      color: "bg-[#86c9e5]",
    },
    {
      icon: ZapIcon,
      label: t("avgRevenueIncrease"),
      value: "23%",
      change: t("perMerchant"),
      period: t("first30Days"),
      color: "bg-[#aedf1a]",
    },
    {
      icon: BarChart3Icon,
      label: t("retention"),
      value: "94%",
      change: t("high"),
      period: t("after90Days"),
      color: "bg-[#4a5568]",
    },
  ];

  const keyHighlights = [
    { label: t("highlight1"), value: t("highlight1Value") },
    { label: t("highlight2"), value: t("highlight2Value") },
    { label: t("highlight3"), value: t("highlight3Value") },
    { label: t("highlight4"), value: t("highlight4Value") },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-[#86c9e5]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#aedf1a]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
        {/* Language Switcher */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>

        {/* Back Button */}
        <Link href={`/${locale}/invest`}>
          <motion.button
            whileHover={{ scale: 1.05, x: isRTL ? 5 : -5 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeftIcon
              className={`h-5 w-5 text-gray-700 ${isRTL ? "rotate-180" : ""}`}
            />
            <span className="text-sm font-semibold text-gray-700">
              {t("back")}
            </span>
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="mb-6 flex justify-center">
            <WowLogo size="header" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 hover:border-[#86c9e5] hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-2xl ${metric.color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-gray-900">
                        {metric.value}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {metric.label}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-semibold">
                      {metric.change}
                    </span>
                    <span className="text-gray-500">{metric.period}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl">
            <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
              {t("keyHighlights")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#86c9e5] flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {highlight.label}
                    </h3>
                    <p className="text-gray-600 text-sm">{highlight.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 italic">{t("lastUpdated")}</p>
        </motion.div>
      </div>
    </div>
  );
}
