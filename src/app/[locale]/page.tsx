"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  MessageCirclePlusIcon,
  ChartColumnIncreasingIcon,
  BarChart3Icon,
  PackageIcon,
  DollarSignIcon,
  ZapIcon,
  ArrowRightIcon,
  SparklesIcon,
  RocketIcon,
  BrainIcon,
  TrendingUpIcon,
  CheckCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WowLogo } from "@/components/ui/logo";
// import LanguageSwitcher from "@/components/LanguageSwitcher"; // Hidden until copy is fixed

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const powerfulFeatures = [
    {
      icon: <MessageCirclePlusIcon className="h-6 w-6" />,
      title: t("features.aiChatAssistant.title"),
      description: t("features.aiChatAssistant.description"),
      color: "bg-[#86c9e5]",
      demo: {
        type: "chat",
        messages: [
          {
            type: "user",
            text:
              locale === "ar"
                ? "ما هي أفضل منتجاتي هذا الشهر؟"
                : "What are my top products this month?",
          },
          {
            type: "ai",
            text:
              locale === "ar"
                ? "أفضل ٣ منتجات:\n١. سترة شتوية - ١٢،٤٥٠ ريال (↑٢٣٪)\n٢. كنزة دافئة - ٨،٩٢٠ ريال (↑١٨٪)\n٣. أحذية حرارية - ٦،٧٨٠ ريال (↑٣١٪)\n\nإجمالي الإيرادات: ٢٨،١٥٠ ريال هذا الشهر"
                : "Top 3 Products:\n1. Winter Parka - $12,450 (↑23%)\n2. Cozy Sweater - $8,920 (↑18%)\n3. Thermal Boots - $6,780 (↑31%)\n\nTotal revenue: $28,150 this month",
          },
        ],
        metrics: [
          {
            label: locale === "ar" ? "الإيرادات" : "Revenue",
            value: locale === "ar" ? "٢٨،١٥٠ ريال" : "$28,150",
            change: locale === "ar" ? "+٢٣٪" : "+23%",
            positive: true,
          },
          {
            label: locale === "ar" ? "الطلبات" : "Orders",
            value: locale === "ar" ? "٢٤٧" : "247",
            change: locale === "ar" ? "+١٨٪" : "+18%",
            positive: true,
          },
        ],
      },
    },
    {
      icon: <ChartColumnIncreasingIcon className="h-6 w-6" />,
      title: t("features.dailyInsights.title"),
      description: t("features.dailyInsights.description"),
      color: "bg-[#aedf1a]",
      demo: {
        type: "insights",
        insight: {
          title:
            locale === "ar"
              ? "اكتشاف فرصة إيرادات"
              : "Revenue Opportunity Detected",
          priority: locale === "ar" ? "عالية" : "high",
          impact: locale === "ar" ? "+٤،٢٣٠ ريال محتملة" : "+$4,230 potential",
          description:
            locale === "ar"
              ? "مجموعة الشتاء تحقق أداءً أعلى بنسبة ٣٤٪ من التوقعات"
              : "Winter collection performing 34% above forecast",
        },
        actions: [
          locale === "ar"
            ? "✓ زيادة مخزون الشتاء بنسبة ٢٥٪"
            : "✓ Increase winter inventory by 25%",
          locale === "ar"
            ? "✓ إطلاق حملة شتوية مستهدفة"
            : "✓ Launch targeted winter campaign",
          locale === "ar"
            ? "⏳ تحسين التسعير لذروة الطلب"
            : "⏳ Optimize pricing for peak demand",
        ],
        chart: {
          current: 134,
          target: 100,
          trend: [85, 92, 108, 115, 128, 134],
        },
      },
    },
    {
      icon: <BarChart3Icon className="h-6 w-6" />,
      title: t("features.liveAgentIntelligence.title"),
      description: t("features.liveAgentIntelligence.description"),
      color: "bg-[#4a5568]",
      demo: {
        type: "dashboard",
        agents: [
          {
            name: locale === "ar" ? "المالية" : "Finance",
            status: locale === "ar" ? "نشط" : "active",
            score: 95,
            action: locale === "ar" ? "حسّن ١٢ سعر" : "Optimized 12 prices",
          },
          {
            name: locale === "ar" ? "المخزون" : "Inventory",
            status: locale === "ar" ? "يعمل" : "working",
            score: 88,
            action:
              locale === "ar" ? "أعاد طلب ٥ منتجات" : "Reordered 5 products",
          },
          {
            name: locale === "ar" ? "التسعير" : "Pricing",
            status: locale === "ar" ? "نشط" : "active",
            score: 92,
            action: locale === "ar" ? "وجد ٣ فرص" : "Found 3 opportunities",
          },
          {
            name: locale === "ar" ? "اللوجستيات" : "Logistics",
            status: locale === "ar" ? "نشط" : "active",
            score: 97,
            action: locale === "ar" ? "حسّن الشحن" : "Optimized shipping",
          },
          {
            name: locale === "ar" ? "العروض الترويجية" : "Promotions",
            status: locale === "ar" ? "نشط" : "active",
            score: 90,
            action: locale === "ar" ? "أنشأ تخفيض سريع" : "Created flash sale",
          },
        ],
        summary: {
          alerts: 2,
          actions: 8,
          revenue: locale === "ar" ? "+٢،٣٤٠ ريال" : "+$2,340",
          efficiency: locale === "ar" ? "٩٤٪" : "94%",
        },
      },
    },
    {
      icon: <PackageIcon className="h-6 w-6" />,
      title: t("features.smartInventory.title"),
      description: t("features.smartInventory.description"),
      color: "bg-[#86c9e5]",
      demo: {
        type: "inventory",
        alerts: [
          {
            product: locale === "ar" ? "سترة شتوية" : "Winter Parka",
            stock: 3,
            demand: locale === "ar" ? "عالي" : "High",
            action: locale === "ar" ? "أعد طلب ٥٠ قطعة" : "Reorder 50 units",
            urgent: true,
          },
          {
            product: locale === "ar" ? "قفازات حرارية" : "Thermal Gloves",
            stock: 8,
            demand: locale === "ar" ? "متوسط" : "Medium",
            action: locale === "ar" ? "أعد طلب ٢٥ قطعة" : "Reorder 25 units",
            urgent: false,
          },
        ],
        predictions: [
          {
            week: locale === "ar" ? "هذا الأسبوع" : "This Week",
            demand: 145,
            stock: 120,
            status: "critical",
          },
          {
            week: locale === "ar" ? "الأسبوع القادم" : "Next Week",
            demand: 167,
            stock: 200,
            status: "optimal",
          },
        ],
        automated:
          locale === "ar"
            ? "تم وضع ١٢ طلب تلقائياً هذا الشهر"
            : "12 orders placed automatically this month",
      },
    },
    {
      icon: <DollarSignIcon className="h-6 w-6" />,
      title: t("features.profitOptimizer.title"),
      description: t("features.profitOptimizer.description"),
      color: "bg-[#aedf1a]",
      demo: {
        type: "finance",
        metrics: [
          {
            label: locale === "ar" ? "الهامش الإجمالي" : "Gross Margin",
            value: locale === "ar" ? "٣٤.٢٪" : "34.2%",
            change: locale === "ar" ? "+٢.٣٪" : "+2.3%",
            target: locale === "ar" ? "٣٥٪" : "35%",
          },
          {
            label: locale === "ar" ? "صافي الربح" : "Net Profit",
            value: locale === "ar" ? "١٨،٤٥٠ ريال" : "$18,450",
            change: locale === "ar" ? "+١٥٪" : "+15%",
            target: locale === "ar" ? "٢٠ ألف ريال" : "$20K",
          },
          {
            label: locale === "ar" ? "متوسط قيمة الطلب" : "AOV",
            value: locale === "ar" ? "١٢٧ ريال" : "$127",
            change: locale === "ar" ? "+٨٪" : "+8%",
            target: locale === "ar" ? "١٣٠ ريال" : "$130",
          },
        ],
        opportunities: [
          {
            action:
              locale === "ar"
                ? "زيادة سعر السترة الشتوية"
                : "Increase Winter Parka price",
            impact: locale === "ar" ? "+٨٩٠ ريال/شهر" : "+$890/month",
            confidence: locale === "ar" ? "٩٤٪" : "94%",
          },
          {
            action:
              locale === "ar"
                ? "تجميع المنتجات بطيئة الحركة"
                : "Bundle slow-moving items",
            impact: locale === "ar" ? "+٣٤٠ ريال/شهر" : "+$340/month",
            confidence: locale === "ar" ? "٨٧٪" : "87%",
          },
        ],
      },
    },
    {
      icon: <ZapIcon className="h-6 w-6" />,
      title: t("features.smartPromotions.title"),
      description: t("features.smartPromotions.description"),
      color: "bg-[#4a5568]",
      demo: {
        type: "promotions",
        campaigns: [
          {
            name: locale === "ar" ? "تخفيض الشتاء السريع" : "Winter Flash Sale",
            status: locale === "ar" ? "مباشر" : "live",
            performance: locale === "ar" ? "+٢٣٪ تحويل" : "+23% conversion",
            revenue: locale === "ar" ? "٣،٢٤٠ ريال" : "$3,240",
            remaining: locale === "ar" ? "يومان ١٤ساعة" : "2d 14h",
          },
          {
            name: locale === "ar" ? "دفعة الحزم" : "Bundle Boost",
            status: locale === "ar" ? "مجدول" : "scheduled",
            prediction: locale === "ar" ? "+١٨٪ متوسط قيمة الطلب" : "+18% AOV",
            target: locale === "ar" ? "٢،١٠٠ ريال" : "$2,100",
            starts: locale === "ar" ? "غداً ٩ صباحاً" : "Tomorrow 9AM",
          },
        ],
        aiGenerated:
          locale === "ar"
            ? "تم إنشاء ٣ حملات تلقائياً هذا الأسبوع"
            : "3 campaigns created automatically this week",
      },
    },
  ];

  const testimonials = [
    {
      name: t("testimonials.sarahChen.name"),
      role: t("testimonials.sarahChen.role"),
      company: t("testimonials.sarahChen.company"),
      quote: t("testimonials.sarahChen.quote"),
    },
    {
      name: t("testimonials.marcusRodriguez.name"),
      role: t("testimonials.marcusRodriguez.role"),
      company: t("testimonials.marcusRodriguez.company"),
      quote: t("testimonials.marcusRodriguez.quote"),
    },
    {
      name: t("testimonials.emilyDavis.name"),
      role: t("testimonials.emilyDavis.role"),
      company: t("testimonials.emilyDavis.company"),
      quote: t("testimonials.emilyDavis.quote"),
    },
    {
      name: t("testimonials.alexThompson.name"),
      role: t("testimonials.alexThompson.role"),
      company: t("testimonials.alexThompson.company"),
      quote: t("testimonials.alexThompson.quote"),
    },
    {
      name: t("testimonials.jessicaWang.name"),
      role: t("testimonials.jessicaWang.role"),
      company: t("testimonials.jessicaWang.company"),
      quote: t("testimonials.jessicaWang.quote"),
    },
    {
      name: t("testimonials.davidKim.name"),
      role: t("testimonials.davidKim.role"),
      company: t("testimonials.davidKim.company"),
      quote: t("testimonials.davidKim.quote"),
    },
    {
      name: t("testimonials.lisaMartinez.name"),
      role: t("testimonials.lisaMartinez.role"),
      company: t("testimonials.lisaMartinez.company"),
      quote: t("testimonials.lisaMartinez.quote"),
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % powerfulFeatures.length);
    }, 4000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
    };
  }, [powerfulFeatures.length, testimonials.length]);

  const renderPowerfulDemo = (feature: any) => {
    const { demo } = feature;

    switch (demo.type) {
      case "chat":
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {demo.messages?.map((msg: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.5 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-[#4a5568] text-white"
                        : "bg-white border shadow-sm"
                    }`}
                  >
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {msg.text}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {demo.metrics.map((metric: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.2 }}
                  className="bg-white border rounded-lg p-3 text-center"
                >
                  <div className="font-bold text-lg">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                  <div
                    className={`text-xs ${metric.positive ? "text-green-600" : "text-red-600"}`}
                  >
                    {metric.change}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "insights":
        return (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <TrendingUpIcon className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">
                    {demo.insight.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {demo.insight.description}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge className="bg-red-100 text-red-800">
                      {demo.insight.priority}
                    </Badge>
                    <Badge className="bg-[#4a5568] text-white">
                      {demo.insight.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 gap-2">
              {demo.actions.map((action: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.2 }}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm">{action}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(demo.summary).map(([key, value], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border rounded-lg p-3 text-center"
                >
                  <div className="font-bold text-lg text-white">
                    {value as string}
                  </div>
                  <div className="text-xs text-gray-600 capitalize">
                    {locale === "ar"
                      ? key === "alerts"
                        ? "تنبيهات"
                        : key === "actions"
                          ? "إجراءات"
                          : key === "revenue"
                            ? "إيرادات"
                            : key === "efficiency"
                              ? "كفاءة"
                              : key
                      : key}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2">
              {demo.agents.map((agent: any, idx: number) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white border rounded-lg"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      agent.status === "active" || agent.status === "نشط"
                        ? "bg-green-500"
                        : agent.status === "working" || agent.status === "يعمل"
                          ? "bg-blue-500 animate-pulse"
                          : "bg-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-gray-600">{agent.action}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      {agent.score}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {locale === "ar" ? "نقاط" : "Score"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "inventory":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {demo.alerts.map((alert: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className={`p-3 rounded-lg border ${
                    alert.urgent
                      ? "bg-red-50 border-red-200"
                      : "bg-[#86c9e5]/5 border-[#86c9e5]/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{alert.product}</div>
                      <div className="text-sm text-gray-600">
                        {locale === "ar"
                          ? `المخزون: ${alert.stock} • الطلب: ${alert.demand}`
                          : `Stock: ${alert.stock} • Demand: ${alert.demand}`}
                      </div>
                    </div>
                    <Badge
                      className={
                        alert.urgent
                          ? "bg-red-100 text-red-800"
                          : "bg-[#86c9e5]/15 text-[#4a5568]"
                      }
                    >
                      {alert.action}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center"
            >
              <div className="text-sm text-blue-700 font-medium">
                {demo.automated}
              </div>
            </motion.div>
          </div>
        );

      case "finance":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {demo.metrics.map((metric: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white border rounded-lg p-3"
                >
                  <div className="text-center">
                    <div className="font-bold text-lg">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    <div className="text-xs text-green-600">
                      {metric.change}
                    </div>
                    <div className="text-xs text-gray-500">
                      {locale === "ar"
                        ? `الهدف: ${metric.target}`
                        : `Target: ${metric.target}`}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2">
              {demo.opportunities.map((opp: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.2 }}
                  className="p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{opp.action}</div>
                      <div className="text-green-600 font-bold">
                        {opp.impact}
                      </div>
                    </div>
                    <Badge className="bg-[#4a5568] text-white">
                      {opp.confidence}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "promotions":
        return (
          <div className="space-y-4">
            {demo.campaigns.map((campaign: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.3 }}
                className="p-4 bg-white border rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">{campaign.name}</h4>
                  <Badge
                    className={
                      campaign.status === "live" || campaign.status === "مباشر"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">
                      {locale === "ar" ? "الأداء" : "Performance"}
                    </div>
                    <div className="font-medium">
                      {campaign.performance || campaign.prediction}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">
                      {locale === "ar" ? "الإيرادات" : "Revenue"}
                    </div>
                    <div className="font-medium">
                      {campaign.revenue || campaign.target}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {campaign.remaining || campaign.starts}
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-[#aedf1a]/10 border border-[#aedf1a]/30 rounded-lg p-3 text-center"
            >
              <div className="text-sm text-[#4a5568] font-medium">
                {demo.aiGenerated}
              </div>
            </motion.div>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-gray-500">
            {t("common.loading")}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Language Switcher - Hidden until copy is fixed */}
      {/* <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div> */}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <WowLogo size="hero" variant="primary" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6"
            >
              {t("homepage.subtitle")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              {t("homepage.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href={`/${locale}/onboarding`}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-[#4a5568] hover:bg-[#3a4553] text-white hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <RocketIcon className="mr-2 h-5 w-5" />
                  {t("homepage.seeItInAction")}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-[#86c9e5] text-white hover:bg-[#86c9e5] hover:text-white transform hover:scale-105 transition-all"
                onClick={() =>
                  window.open("https://accounts.getwow.ai/waitlist", "_blank")
                }
              >
                <SparklesIcon className="mr-2 h-5 w-5" />
                {t("homepage.signUpForWowAi")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Powerful Live Feature Demo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="overflow-hidden shadow-2xl border-0 surface-white-strong">
              <CardHeader className="text-center pb-4 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-xl ${powerfulFeatures[currentFeature].color} text-white shadow-lg`}
                  >
                    {powerfulFeatures[currentFeature].icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
                      {powerfulFeatures[currentFeature].title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {powerfulFeatures[currentFeature].description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[300px] sm:min-h-[400px]"
                  >
                    {renderPowerfulDemo(powerfulFeatures[currentFeature])}
                  </motion.div>
                </AnimatePresence>

                {/* Feature indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {powerfulFeatures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentFeature
                          ? "bg-[#aedf1a] w-8"
                          : "bg-gray-300 hover:bg-gray-400 w-2"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#aedf1a]/20 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-40 right-16 w-16 h-16 bg-[#86c9e5]/20 rounded-full opacity-50 animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-[#86c9e5]/30 rounded-full opacity-50 animate-pulse delay-2000" />
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t("homepage.powerfullAiAgents")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("homepage.powerfullAiAgentsDesc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {powerfulFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full surface-white border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className={`feature-icon ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      {feature.demo.type === "chat" && (
                        <div>
                          <div className="font-medium mb-1">
                            💬 &ldquo;{feature.demo.messages?.[0]?.text}&rdquo;
                          </div>
                          <div className="text-green-600">
                            ✓{" "}
                            {locale === "ar"
                              ? "رؤى ذكية فورية مع البيانات"
                              : "Instant AI insights with data"}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "insights" && (
                        <div>
                          <div className="font-medium mb-1">
                            📊 {feature.demo.insight?.title}
                          </div>
                          <div className="text-green-600">
                            {feature.demo.insight?.impact}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "dashboard" && (
                        <div>
                          <div className="font-medium mb-1">
                            🤖 {feature.demo.agents?.length}{" "}
                            {locale === "ar"
                              ? "وكلاء ذكيين نشطين"
                              : "AI agents active"}
                          </div>
                          <div className="text-green-600">
                            {feature.demo.summary?.revenue}{" "}
                            {locale === "ar"
                              ? "تأثير الإيرادات"
                              : "revenue impact"}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "inventory" && (
                        <div>
                          <div className="font-medium mb-1">
                            📦{" "}
                            {locale === "ar"
                              ? "تنبيهات إعادة التخزين الذكية"
                              : "Smart restocking alerts"}
                          </div>
                          <div className="text-green-600">
                            {feature.demo.automated}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "finance" && (
                        <div>
                          <div className="font-medium mb-1">
                            💰{" "}
                            {locale === "ar"
                              ? "تحسين الأرباح"
                              : "Profit optimization"}
                          </div>
                          <div className="text-green-600">
                            {feature.demo.opportunities?.[0]?.impact}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "promotions" && (
                        <div>
                          <div className="font-medium mb-1">
                            ⚡ {feature.demo.campaigns?.[0]?.name}
                          </div>
                          <div className="text-green-600">
                            {feature.demo.campaigns?.[0]?.performance ||
                              feature.demo.campaigns?.[0]?.prediction}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t("homepage.whyStoreOwnersLove")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="benefit-icon bg-[#aedf1a]">
                <TrendingUpIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("homepage.increaseRevenue")}
              </h3>
              <p className="text-gray-600">
                {t("homepage.increaseRevenueDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="benefit-icon bg-[#86c9e5]">
                <BrainIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("homepage.saveTime")}
              </h3>
              <p className="text-gray-600">{t("homepage.saveTimeDesc")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="benefit-icon bg-[#4a5568]">
                <CheckCircleIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("homepage.makeBetterDecisions")}
              </h3>
              <p className="text-gray-600">
                {t("homepage.makeBetterDecisionsDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t("homepage.trustedByEcommerceLeaders")}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="surface-white border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <p className="text-xl text-gray-700 mb-4 italic leading-relaxed">
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </p>
                    <div className="text-lg text-gray-600 font-medium">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-[#aedf1a] w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t("homepage.readyToTransform")}
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              {t("homepage.readyToTransformDesc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={`/${locale}/onboarding`}>
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-[#4a5568] hover:bg-[#3a4553] text-white hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <RocketIcon className="mr-3 h-6 w-6" />
                  {t("homepage.experienceTheMagic")}
                  <ArrowRightIcon className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
              <Badge variant="secondary" className="px-3 py-1">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                {t("homepage.freeTrialBadge")}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                {t("homepage.noCreditCardBadge")}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                {t("homepage.setupInMinutesBadge")}
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
