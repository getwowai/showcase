"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  SparklesIcon,
  MessageCirclePlusIcon,
  ChartColumnIncreasingIcon,
  PackageIcon,
  TruckIcon,
  DollarSignIcon,
  TagIcon,
  ZapIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  ClockIcon,
  BrainIcon,
  RocketIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WowLogo } from "@/components/ui/logo";

interface StoreConnectContent {
  type: "store-connect";
  storeName: string;
  progress: number;
}

interface AnalysisContent {
  type: "analysis";
  items: string[];
}

interface Agent {
  name: string;
  status: string;
  icon: React.ReactNode;
}

interface AgentsIntroContent {
  type: "agents-intro";
  agents: Agent[];
}

interface Insight {
  title: string;
  urgency: string;
  message: string;
}

interface InsightsContent {
  type: "insights";
  insights: Insight[];
}

interface ChatMessage {
  type: string;
  text: string;
}

interface ChatDemoContent {
  type: "chat-demo";
  messages: ChatMessage[];
}

interface Action {
  agent: string;
  action: string;
  status: string;
}

interface ActionsContent {
  type: "actions";
  actions: Action[];
}

interface Metric {
  label: string;
  value: string;
  trend: string;
  color: string;
}

interface ResultsContent {
  type: "results";
  metrics: Metric[];
}

type StepContent =
  | StoreConnectContent
  | AnalysisContent
  | AgentsIntroContent
  | InsightsContent
  | ChatDemoContent
  | ActionsContent
  | ResultsContent;

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  content: StepContent;
}

const ProgressIndicator = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => (
  <div className="w-full max-w-md mx-auto mb-8">
    <div className="flex justify-between mb-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i < currentStep
              ? "bg-purple-600"
              : i === currentStep
                ? "bg-purple-400"
                : "bg-gray-300"
          }`}
        />
      ))}
    </div>
    <Progress value={(currentStep / (totalSteps - 1)) * 100} className="h-2" />
  </div>
);

const StoreConnectStep = ({
  isActive,
  t,
}: {
  content: StoreConnectContent;
  isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <div className="feature-icon gradient-feature-1 rounded-full mx-auto">
          <ShoppingCartIcon className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl">
          {t("onboarding.connectStore.storeName")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="h-3" />
          <div className="text-center text-sm text-gray-600">
            {progress < 100
              ? t("onboarding.connectStore.connecting")
              : t("onboarding.connectStore.connected")}
          </div>
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-green-600"
            >
              <CheckCircleIcon className="h-5 w-5" />
              <span className="font-semibold">
                {t("onboarding.connectStore.storeConnected")}
              </span>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AnalysisStep = ({
  content,
  isActive,
  t,
}: {
  content: AnalysisContent;
  isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) => {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentItem((prev) => (prev + 1) % content.items.length);
      }, 750);
      return () => clearInterval(interval);
    }
  }, [isActive, content.items.length]);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="feature-icon gradient-feature-2 rounded-full mx-auto"
        >
          <BrainIcon className="h-8 w-8" />
        </motion.div>
        <CardTitle className="text-xl">
          {t("onboarding.analysis.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {content.items.map((item: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: index <= currentItem ? 1 : 0.3 }}
              className="flex items-center gap-3"
            >
              {index < currentItem ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              ) : index === currentItem ? (
                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
              )}
              <span
                className={
                  index <= currentItem ? "text-gray-900" : "text-gray-400"
                }
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const AgentsIntroStep = ({
  content,
  t,
}: {
  content: AgentsIntroContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) => (
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {t("onboarding.agents.meetYourTeam")}
      </h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {content.agents.map((agent: Agent, index: number) => (
        <motion.div
          key={agent.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="surface-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 gradient-feature-2 rounded-lg text-white">
                  {agent.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {agent.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-800"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

const InsightsStep = ({
  content,
  t,
}: {
  content: InsightsContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) => (
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {t("onboarding.insights.yourFirstInsights")}
      </h3>
    </div>
    <div className="space-y-4">
      {content.insights.map((insight: Insight, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.3 }}
        >
          <Card className="surface-white">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    insight.urgency === "high" || insight.urgency === "عالية"
                      ? "bg-red-100 text-red-600"
                      : insight.urgency === "medium" ||
                          insight.urgency === "متوسطة"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {insight.urgency === "high" || insight.urgency === "عالية" ? (
                    <AlertTriangleIcon className="h-5 w-5" />
                  ) : insight.urgency === "medium" ||
                    insight.urgency === "متوسطة" ? (
                    <ClockIcon className="h-5 w-5" />
                  ) : (
                    <ChartColumnIncreasingIcon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600">{insight.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

const ChatDemoStep = ({
  content,
  t,
}: {
  content: ChatDemoContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) => {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev < content.messages.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [content.messages.length]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {t("onboarding.chat.chatWithData")}
        </h3>
      </div>
      <Card className="surface-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCirclePlusIcon className="h-5 w-5 text-purple-600" />
            <span className="font-semibold">
              {t("onboarding.chat.chatWithData")}
            </span>
            <Badge variant="secondary" className="ml-auto">
              {t("onboarding.chat.online")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 p-4 max-h-80 overflow-y-auto">
            {content.messages
              .slice(0, visibleMessages)
              .map((message: ChatMessage, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-purple-600 text-white ml-4"
                        : "bg-gray-100 text-gray-800 mr-4"
                    }`}
                  >
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {message.text}
                    </pre>
                  </div>
                </motion.div>
              ))}
            {visibleMessages < content.messages.length && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg mr-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ActionsStep = ({
  content,
  t,
}: {
  content: ActionsContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) => (
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {t("onboarding.actions.agentsTakingAction")}
      </h3>
    </div>
    <div className="space-y-4">
      {content.actions.map((action: Action, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.4 }}
        >
          <Card className="surface-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 gradient-feature-3 rounded-lg text-white">
                  <RocketIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {action.agent}{" "}
                    {t("onboarding.agents.financeAgent").includes("وكيل")
                      ? "وكيل"
                      : "Agent"}
                  </div>
                  <div className="text-sm text-gray-600">{action.action}</div>
                </div>
                <Badge
                  variant={
                    action.status === "completed" || action.status === "مكتمل"
                      ? "default"
                      : "secondary"
                  }
                >
                  {action.status === "completed" ||
                  action.status === "مكتمل" ? (
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                  ) : null}
                  {action.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

const ResultsStep = ({
  content,
  t,
}: {
  content: ResultsContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) => (
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {t("onboarding.results.immediateResults")}
      </h3>
      <p className="text-gray-600">{t("onboarding.results.seeImpact")}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {content.metrics.map((metric: Metric, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="surface-white text-center">
            <CardContent className="p-6">
              <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">{metric.label}</div>
              {metric.trend === "up" && (
                <TrendingUpIcon className="h-5 w-5 text-green-500 mx-auto mt-2" />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const t = useTranslations();
  const locale = useLocale();

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: t("onboarding.connectStore.title"),
      description: t("onboarding.connectStore.description"),
      duration: 3500,
      content: {
        type: "store-connect",
        storeName: t("onboarding.connectStore.storeName"),
        progress: 0,
      },
    },
    {
      id: 2,
      title: t("onboarding.analysis.title"),
      description: t("onboarding.analysis.description"),
      duration: 4500,
      content: {
        type: "analysis",
        items: [
          t("onboarding.analysis.analyzing", { count: "1,247" }),
          t("onboarding.analysis.processing"),
          t("onboarding.analysis.identifying"),
          t("onboarding.analysis.setting"),
        ],
      },
    },
    {
      id: 3,
      title: t("onboarding.agents.title"),
      description: t("onboarding.agents.description"),
      duration: 5000,
      content: {
        type: "agents-intro",
        agents: [
          {
            name: t("onboarding.agents.financeAgent"),
            status: t("onboarding.agents.active"),
            icon: <DollarSignIcon className="h-5 w-5" />,
          },
          {
            name: t("onboarding.agents.inventoryAgent"),
            status: t("onboarding.agents.active"),
            icon: <PackageIcon className="h-5 w-5" />,
          },
          {
            name: t("onboarding.agents.pricingAgent"),
            status: t("onboarding.agents.active"),
            icon: <TagIcon className="h-5 w-5" />,
          },
          {
            name: t("onboarding.agents.logisticsAgent"),
            status: t("onboarding.agents.active"),
            icon: <TruckIcon className="h-5 w-5" />,
          },
          {
            name: t("onboarding.agents.promotionsAgent"),
            status: t("onboarding.agents.active"),
            icon: <ZapIcon className="h-5 w-5" />,
          },
        ],
      },
    },
    {
      id: 4,
      title: t("onboarding.insights.title"),
      description: t("onboarding.insights.description"),
      duration: 4500,
      content: {
        type: "insights",
        insights: [
          {
            title: t("onboarding.insights.inventoryAlert"),
            urgency: locale === "ar" ? "عالية" : "high",
            message: t("onboarding.insights.inventoryAlertMsg"),
          },
          {
            title: t("onboarding.insights.pricingOpportunity"),
            urgency: locale === "ar" ? "متوسطة" : "medium",
            message: t("onboarding.insights.pricingOpportunityMsg"),
          },
          {
            title: t("onboarding.insights.seasonalTrend"),
            urgency: locale === "ar" ? "منخفضة" : "low",
            message: t("onboarding.insights.seasonalTrendMsg"),
          },
        ],
      },
    },
    {
      id: 5,
      title: t("onboarding.chat.title"),
      description: t("onboarding.chat.description"),
      duration: 6000,
      content: {
        type: "chat-demo",
        messages: [
          {
            type: "user",
            text:
              locale === "ar"
                ? "ما هي أفضل منتجاتي هذا الشهر؟"
                : "What are my best performing products this month?",
          },
          {
            type: "ai",
            text:
              locale === "ar"
                ? "أفضل ٣ منتجات لك هي:\n١. سترة شتوية (٢،٣٤٠ ريال إيرادات)\n٢. كنزة دافئة (١،٨٩٠ ريال إيرادات)\n٣. طماق حراري (١،٦٥٠ ريال إيرادات)\n\nالسترة الشتوية لها هامش ربح ٣٤٪ وترتفع بنسبة ٢٣٪ مقارنة بالشهر الماضي."
                : "Your top 3 products are:\n1. Winter Parka ($2,340 revenue)\n2. Cozy Sweater ($1,890 revenue)\n3. Thermal Leggings ($1,650 revenue)\n\nWinter Parka has a 34% profit margin and is trending up 23% vs last month.",
          },
          {
            type: "user",
            text:
              locale === "ar"
                ? "هل يجب أن أزيد سعر السترة الشتوية؟"
                : "Should I increase the price of Winter Parka?",
          },
          {
            type: "ai",
            text:
              locale === "ar"
                ? "نعم! بناءً على اتجاهات الطلب وتحليل المنافسين، يمكنك زيادة السعر بنسبة ١٢-١٥٪ دون التأثير على المبيعات. هذا يمكن أن يزيد الربح الشهري بمقدار ٢٨٠ ريال."
                : "Yes! Based on demand trends and competitor analysis, you can increase the price by 12-15% without affecting sales. This could boost monthly profit by $280.",
          },
        ],
      },
    },
    {
      id: 6,
      title: t("onboarding.actions.title"),
      description: t("onboarding.actions.description"),
      duration: 4500,
      content: {
        type: "actions",
        actions: [
          {
            agent: locale === "ar" ? "المخزون" : "Inventory",
            action:
              locale === "ar"
                ? "أعاد طلب ٥٠ سترة شتوية من المورد"
                : "Reordered 50 Winter Parkas from supplier",
            status: locale === "ar" ? "مكتمل" : "completed",
          },
          {
            agent: locale === "ar" ? "التسعير" : "Pricing",
            action:
              locale === "ar"
                ? "حدّث أسعار ٣ منتجات بناءً على تحليل السوق"
                : "Updated 3 product prices based on market analysis",
            status: locale === "ar" ? "مكتمل" : "completed",
          },
          {
            agent: locale === "ar" ? "العروض الترويجية" : "Promotions",
            action:
              locale === "ar"
                ? "أنشأ تخفيض سريع للمنتجات الصيفية بطيئة الحركة"
                : "Created flash sale for slow-moving summer items",
            status: locale === "ar" ? "قيد التنفيذ" : "in-progress",
          },
        ],
      },
    },
    {
      id: 7,
      title: t("onboarding.results.title"),
      description: t("onboarding.results.description"),
      duration: 5000,
      content: {
        type: "results",
        metrics: [
          {
            label: t("onboarding.results.revenueIncrease"),
            value: locale === "ar" ? "+١٨٪" : "+18%",
            trend: "up",
            color: "text-green-600",
          },
          {
            label: t("onboarding.results.timeSaved"),
            value: locale === "ar" ? "١٢ساعة/أسبوع" : "12hrs/week",
            trend: "neutral",
            color: "text-blue-600",
          },
          {
            label: t("onboarding.results.profitMargin"),
            value: locale === "ar" ? "+٣.٢٪" : "+3.2%",
            trend: "up",
            color: "text-purple-600",
          },
          {
            label: t("onboarding.results.inventoryEfficiency"),
            value: locale === "ar" ? "+٢٤٪" : "+24%",
            trend: "up",
            color: "text-orange-600",
          },
        ],
      },
    },
  ];

  useEffect(() => {
    if (isPlaying && currentStep < onboardingSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, onboardingSteps[currentStep].duration);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying, onboardingSteps]);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (step: OnboardingStep) => {
    switch (step.content.type) {
      case "store-connect":
        return (
          <StoreConnectStep content={step.content} isActive={isPlaying} t={t} />
        );
      case "analysis":
        return (
          <AnalysisStep content={step.content} isActive={isPlaying} t={t} />
        );
      case "agents-intro":
        return <AgentsIntroStep content={step.content} t={t} />;
      case "insights":
        return <InsightsStep content={step.content} t={t} />;
      case "chat-demo":
        return <ChatDemoStep content={step.content} t={t} />;
      case "actions":
        return <ActionsStep content={step.content} t={t} />;
      case "results":
        return <ResultsStep content={step.content} t={t} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 surface-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`}>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{t("nav.exitDemo")}</span>
            </Button>
          </Link>
          <WowLogo size="standard" variant="primary" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="gradient-success"
            onClick={() =>
              window.open("https://accounts.getwow.ai/waitlist", "_blank")
            }
          >
            <StarIcon className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">{t("nav.startFreeTrial")}</span>
            <span className="sm:hidden">{t("nav.signUp")}</span>
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="px-4 py-3 bg-white/50">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={onboardingSteps.length}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center px-4 py-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center items-center text-center h-full"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3"
            >
              {onboardingSteps[currentStep].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl"
            >
              {onboardingSteps[currentStep].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 flex items-center justify-center w-full max-w-4xl"
            >
              {renderStepContent(onboardingSteps[currentStep])}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="surface-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
            size="sm"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t("onboarding.previous")}</span>
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2"
              size="sm"
            >
              {isPlaying ? t("onboarding.pause") : t("onboarding.play")}
            </Button>
            <span className="text-sm text-gray-500">
              {currentStep + 1} {locale === "ar" ? "من" : "of"}{" "}
              {onboardingSteps.length}
            </span>
          </div>

          {currentStep < onboardingSteps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 gradient-feature-2"
              size="sm"
            >
              <span className="hidden sm:inline">{t("onboarding.next")}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="flex items-center gap-2 gradient-success"
              size="sm"
              onClick={() =>
                window.open("https://accounts.getwow.ai/waitlist", "_blank")
              }
            >
              <StarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                {t("onboarding.getStarted")}
              </span>
              <span className="sm:hidden">{t("common.start")}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Final CTA Overlay */}
      {currentStep === onboardingSteps.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute inset-0 flex items-center justify-center p-4 z-10"
          style={{ background: 'var(--surface-overlay)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl"
          >
            <SparklesIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t("onboarding.finalCta.title")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("onboarding.finalCta.description")}
            </p>
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full text-lg gradient-feature-2"
                onClick={() =>
                  window.open("https://accounts.getwow.ai/waitlist", "_blank")
                }
              >
                <SparklesIcon className="mr-2 h-5 w-5" />
                {t("onboarding.finalCta.startFreeTrial")}
              </Button>
              <div className="flex gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    window.open(
                      "https://accounts.getwow.ai/waitlist/login",
                      "_blank",
                    )
                  }
                >
                  {t("onboarding.finalCta.login")}
                </Button>
                <Link href={`/${locale}`} className="flex-1">
                  <Button size="lg" variant="ghost" className="w-full">
                    {t("onboarding.finalCta.exitDemo")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
