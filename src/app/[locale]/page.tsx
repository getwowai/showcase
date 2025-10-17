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
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useExperiment } from "@/experiments/hooks/useExperiment";
import { getVariantConfig, getVariantDebugInfo } from "@/lib/variant-config";
import SignupMinimalPage from "./(landing-variants)/signup-minimal/page";

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  // Use PostHog experiment to determine which landing page to show
  const posthogVariant = useExperiment("signup-landing-variant");
  const variantConfig = getVariantConfig(posthogVariant);

  // Debug logging
  useEffect(() => {
    const debugInfo = getVariantDebugInfo(posthogVariant);
    console.log("Variant Configuration:", debugInfo);
    console.log("Selected variant:", variantConfig.variant);
    console.log("Source:", variantConfig.source);
    console.log("Is overridden:", variantConfig.isOverridden);
  }, [posthogVariant, variantConfig]);

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
            text: t("demo.chat.userMessage"),
          },
          {
            type: "ai",
            text: t("demo.chat.aiResponse"),
          },
        ],
        metrics: [
          {
            label: t("demo.chat.revenue"),
            value: t("demo.chat.revenueValue"),
            change: t("demo.chat.revenueChange"),
            positive: true,
          },
          {
            label: t("demo.chat.orders"),
            value: t("demo.chat.ordersValue"),
            change: t("demo.chat.ordersChange"),
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
          title: t("demo.insights.title"),
          priority: t("demo.insights.priority"),
          impact: t("demo.insights.impact"),
          description: t("demo.insights.description"),
        },
        actions: [
          t("demo.insights.action1"),
          t("demo.insights.action2"),
          t("demo.insights.action3"),
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
            name: t("demo.dashboard.finance"),
            status: t("demo.dashboard.financeStatus"),
            score: 95,
            action: t("demo.dashboard.financeAction"),
          },
          {
            name: t("demo.dashboard.inventory"),
            status: t("demo.dashboard.inventoryStatus"),
            score: 88,
            action: t("demo.dashboard.inventoryAction"),
          },
          {
            name: t("demo.dashboard.pricing"),
            status: t("demo.dashboard.pricingStatus"),
            score: 92,
            action: t("demo.dashboard.pricingAction"),
          },
          {
            name: t("demo.dashboard.logistics"),
            status: t("demo.dashboard.logisticsStatus"),
            score: 97,
            action: t("demo.dashboard.logisticsAction"),
          },
          {
            name: t("demo.dashboard.promotions"),
            status: t("demo.dashboard.promotionsStatus"),
            score: 90,
            action: t("demo.dashboard.promotionsAction"),
          },
        ],
        summary: {
          alerts: 2,
          actions: 8,
          revenue: "+$2,340",
          efficiency: "94%",
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
            product: t("demo.inventory.winterParka"),
            stock: 3,
            demand: t("demo.inventory.high"),
            action: t("demo.inventory.reorderAction"),
            urgent: true,
          },
          {
            product: t("demo.inventory.thermalGloves"),
            stock: 8,
            demand: t("demo.inventory.medium"),
            action: t("demo.inventory.reorderAction2"),
            urgent: false,
          },
        ],
        predictions: [
          {
            week: "This Week",
            demand: 145,
            stock: 120,
            status: "critical",
          },
          {
            week: "Next Week",
            demand: 167,
            stock: 200,
            status: "optimal",
          },
        ],
        automated: t("demo.inventory.automated"),
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
            label: t("demo.finance.grossMargin"),
            value: t("demo.finance.grossMarginValue"),
            change: t("demo.finance.grossMarginChange"),
            target: t("demo.finance.grossMarginTarget"),
          },
          {
            label: t("demo.finance.netProfit"),
            value: t("demo.finance.netProfitValue"),
            change: t("demo.finance.netProfitChange"),
            target: t("demo.finance.netProfitTarget"),
          },
          {
            label: t("demo.finance.aov"),
            value: t("demo.finance.aovValue"),
            change: t("demo.finance.aovChange"),
            target: t("demo.finance.aovTarget"),
          },
        ],
        opportunities: [
          {
            action: t("demo.finance.opportunity1"),
            impact: t("demo.finance.opportunity1Impact"),
            confidence: t("demo.finance.opportunity1Confidence"),
          },
          {
            action: t("demo.finance.opportunity2"),
            impact: t("demo.finance.opportunity2Impact"),
            confidence: t("demo.finance.opportunity2Confidence"),
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
            name: t("demo.promotions.winterFlashSale"),
            status: t("demo.promotions.live"),
            performance: t("demo.promotions.conversion"),
            revenue: t("demo.promotions.revenue"),
            remaining: t("demo.promotions.remaining"),
          },
          {
            name: t("demo.promotions.bundleBoost"),
            status: t("demo.promotions.scheduled"),
            prediction: t("demo.promotions.aovPrediction"),
            target: t("demo.promotions.target"),
            starts: t("demo.promotions.starts"),
          },
        ],
        aiGenerated: t("demo.promotions.aiGenerated"),
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

  // If variant is 'minimal', render the minimal signup page
  if (variantConfig.variant === "minimal") {
    console.log("Rendering minimal signup page");
    return <SignupMinimalPage />;
  }

  // For 'control' or any other variant, show the original landing page
  console.log(
    "Rendering original landing page, variant:",
    variantConfig.variant,
  );

  const renderPowerfulDemo = (feature: any) => {
    const { demo } = feature;

    switch (demo.type) {
      case "chat":
        return (
          <div className="h-full flex flex-col space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 flex-1">
              {demo.messages?.slice(0, 2).map((msg: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.3 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-lg ${
                      msg.type === "user"
                        ? "bg-[#4a5568] text-white"
                        : "bg-white border shadow-sm"
                    }`}
                  >
                    <div className="text-xs sm:text-sm whitespace-pre-wrap font-sans">
                      {msg.text.length > 100
                        ? msg.text.substring(0, 100) + "..."
                        : msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demo.metrics.slice(0, 2).map((metric: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="bg-white border rounded-lg p-2 text-center"
                >
                  <div className="font-bold text-sm">{metric.value}</div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
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
          <div className="h-full flex flex-col space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3 flex-1"
            >
              <div className="flex items-start gap-2">
                <div className="bg-red-100 p-1.5 rounded-full">
                  <TrendingUpIcon className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">
                    {demo.insight.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {demo.insight.description}
                  </p>
                  <div className="mt-2 flex gap-1">
                    <Badge className="bg-red-100 text-red-800 text-xs px-2 py-0.5">
                      {demo.insight.priority}
                    </Badge>
                    <Badge className="bg-[#4a5568] text-white text-xs px-2 py-0.5">
                      {demo.insight.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="space-y-1">
              {demo.actions.slice(0, 2).map((action: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs"
                >
                  <span>{action}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="h-full flex flex-col space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(demo.summary)
                .slice(0, 4)
                .map(([key, value], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white border rounded-lg p-2 text-center"
                  >
                    <div className="font-bold text-sm text-[#4a5568]">
                      {value as string}
                    </div>
                    <div className="text-xs text-gray-600 capitalize">
                      {t(`demo.dashboard.${key}`)}
                    </div>
                  </motion.div>
                ))}
            </div>
            <div className="space-y-1 flex-1 overflow-y-auto">
              {demo.agents.slice(0, 3).map((agent: any, idx: number) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-2 p-2 bg-white border rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      agent.status === "active" || agent.status === "نشط"
                        ? "bg-green-500"
                        : agent.status === "working" || agent.status === "يعمل"
                          ? "bg-blue-500 animate-pulse"
                          : "bg-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-xs">{agent.name}</div>
                    <div className="text-xs text-gray-600 truncate">
                      {agent.action}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-green-600">
                      {agent.score}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "inventory":
        return (
          <div className="h-full flex flex-col space-y-3">
            <div className="space-y-2 flex-1">
              {demo.alerts.slice(0, 2).map((alert: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className={`p-2 rounded-lg border ${
                    alert.urgent
                      ? "bg-red-50 border-red-200"
                      : "bg-[#86c9e5]/5 border-[#86c9e5]/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{alert.product}</div>
                      <div className="text-xs text-gray-600">
                        {t("demo.inventory.stock")}: {alert.stock} •{" "}
                        {t("demo.inventory.demand")}: {alert.demand}
                      </div>
                    </div>
                    <Badge
                      className={`text-xs px-2 py-0.5 ${
                        alert.urgent
                          ? "bg-red-100 text-red-800"
                          : "bg-[#86c9e5]/15 text-[#4a5568]"
                      }`}
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
              transition={{ delay: 0.4 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center"
            >
              <div className="text-xs text-blue-700 font-medium">
                {demo.automated}
              </div>
            </motion.div>
          </div>
        );

      case "finance":
        return (
          <div className="h-full flex flex-col space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {demo.metrics.slice(0, 3).map((metric: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border rounded-lg p-2"
                >
                  <div className="text-center">
                    <div className="font-bold text-sm">{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                    <div className="text-xs text-green-600">
                      {metric.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-1 flex-1">
              {demo.opportunities.slice(0, 2).map((opp: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="p-2 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-xs">{opp.action}</div>
                      <div className="text-green-600 font-bold text-xs">
                        {opp.impact}
                      </div>
                    </div>
                    <Badge className="bg-[#4a5568] text-white text-xs px-2 py-0.5">
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
          <div className="h-full flex flex-col space-y-3">
            <div className="space-y-2 flex-1">
              {demo.campaigns.slice(0, 2).map((campaign: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="p-3 bg-white border rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm">{campaign.name}</h4>
                    <Badge
                      className={`text-xs px-2 py-0.5 ${
                        campaign.status === "live" ||
                        campaign.status === "مباشر"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-gray-600">
                        {t("demo.promotions.performance")}
                      </div>
                      <div className="font-medium">
                        {campaign.performance || campaign.prediction}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">
                        {t("demo.promotions.revenue")}
                      </div>
                      <div className="font-medium">
                        {campaign.revenue || campaign.target}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#aedf1a]/10 border border-[#aedf1a]/30 rounded-lg p-2 text-center"
            >
              <div className="text-xs text-[#4a5568] font-medium">
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
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-10 md:mb-12">
              <div className="scale-150 sm:scale-175 md:scale-[1.8] lg:scale-[2]">
                <WowLogo size="hero" />
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-8 md:mb-8 leading-tight px-4"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: t("homepage.subtitle").includes("Co-Pilot")
                    ? t("homepage.subtitle").replace(
                        /Co-Pilot/g,
                        '<span class="whitespace-nowrap">Co-Pilot</span>',
                      )
                    : t("homepage.subtitle"),
                }}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-gray-600 mb-16 md:mb-16 max-w-4xl mx-auto font-medium leading-relaxed px-4"
            >
              {t("homepage.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Link href={`/${locale}/onboarding`}>
                <Button
                  size="lg"
                  className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-[#4a5568] hover:bg-[#3a4553] text-white hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all w-full sm:w-auto"
                >
                  <RocketIcon className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  {t("homepage.seeItInAction")}
                  <ArrowRightIcon className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-2 border-[#86c9e5] text-[#86c9e5] hover:bg-[#86c9e5] hover:text-white transform hover:scale-105 transition-all w-full sm:w-auto"
                onClick={() =>
                  window.open("https://accounts.getwow.ai/waitlist", "_blank")
                }
              >
                <SparklesIcon className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                {t("homepage.signUpForWowAi")}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#aedf1a]/20 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-40 right-16 w-16 h-16 bg-[#86c9e5]/20 rounded-full opacity-50 animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-[#86c9e5]/30 rounded-full opacity-50 animate-pulse delay-2000" />
      </section>

      {/* Features Grid */}
      <section className="pt-12 pb-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#4a5568] mb-4 md:mb-6">
              {t("homepage.powerfullAiAgents")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
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
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-700">
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
                            ✓ {t("demo.chat.instantInsights")}
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
                            🤖 {feature.demo.agents?.length} AI agents active
                          </div>
                          <div className="text-green-600">
                            {feature.demo.summary?.revenue}{" "}
                            {t("demo.dashboard.revenueImpact")}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "inventory" && (
                        <div>
                          <div className="font-medium mb-1">
                            📦 {t("demo.inventory.smartAlerts")}
                          </div>
                          <div className="text-green-600">
                            {feature.demo.automated}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "finance" && (
                        <div>
                          <div className="font-medium mb-1">
                            💰 {t("demo.finance.profitOptimization")}
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

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#aedf1a] to-[#86c9e5] bg-clip-text text-transparent mb-4 md:mb-6">
              {t("homepage.readyToTransform")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
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

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a5568] mb-4 md:mb-6">
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
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-3 md:mb-4">
                {t("homepage.increaseRevenue")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
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
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-3 md:mb-4">
                {t("homepage.saveTime")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t("homepage.saveTimeDesc")}
              </p>
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
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-3 md:mb-4">
                {t("homepage.makeBetterDecisions")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t("homepage.makeBetterDecisionsDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Powerful Live Feature Demo */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
                    className="h-[350px] sm:h-[400px] overflow-hidden"
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
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4a5568] mb-4 md:mb-6">
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
                    <p className="text-lg sm:text-xl text-gray-700 mb-4 italic leading-relaxed">
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </p>
                    <div className="text-base sm:text-lg text-gray-600 font-medium">
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

      {/* Final CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
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

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
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
