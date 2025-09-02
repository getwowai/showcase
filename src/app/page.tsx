"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

const powerfulFeatures = [
  {
    icon: <MessageCirclePlusIcon className="h-6 w-6" />,
    title: "AI Chat Assistant",
    description: "Get instant answers about your business",
    color: "from-blue-500 to-cyan-500",
    demo: {
      type: "chat",
      messages: [
        { type: "user", text: "What are my top products this month?" },
        {
          type: "ai",
          text: "Top 3 Products:\n1. Winter Parka - $12,450 (↑23%)\n2. Cozy Sweater - $8,920 (↑18%)\n3. Thermal Boots - $6,780 (↑31%)\n\nTotal revenue: $28,150 this month",
        },
      ],
      metrics: [
        { label: "Revenue", value: "$28,150", change: "+23%", positive: true },
        { label: "Orders", value: "247", change: "+18%", positive: true },
      ],
    },
  },
  {
    icon: <ChartColumnIncreasingIcon className="h-6 w-6" />,
    title: "Daily Insights",
    description: "Smart business intelligence delivered daily",
    color: "from-purple-500 to-pink-500",
    demo: {
      type: "insights",
      insight: {
        title: "Revenue Opportunity Detected",
        priority: "high",
        impact: "+$4,230 potential",
        description: "Winter collection performing 34% above forecast",
      },
      actions: [
        "✓ Increase winter inventory by 25%",
        "✓ Launch targeted winter campaign",
        "⏳ Optimize pricing for peak demand",
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
    title: "Live Agent Intelligence Center",
    description: "5 AI agents optimizing your business 24/7",
    color: "from-green-500 to-emerald-500",
    demo: {
      type: "dashboard",
      agents: [
        {
          name: "Finance",
          status: "active",
          score: 95,
          action: "Optimized 12 prices",
        },
        {
          name: "Inventory",
          status: "working",
          score: 88,
          action: "Reordered 5 products",
        },
        {
          name: "Pricing",
          status: "active",
          score: 92,
          action: "Found 3 opportunities",
        },
        {
          name: "Logistics",
          status: "active",
          score: 97,
          action: "Optimized shipping",
        },
        {
          name: "Promotions",
          status: "active",
          score: 90,
          action: "Created flash sale",
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
    title: "Smart Inventory",
    description: "Automated restocking and demand prediction",
    color: "from-orange-500 to-red-500",
    demo: {
      type: "inventory",
      alerts: [
        {
          product: "Winter Parka",
          stock: 3,
          demand: "High",
          action: "Reorder 50 units",
          urgent: true,
        },
        {
          product: "Thermal Gloves",
          stock: 8,
          demand: "Medium",
          action: "Reorder 25 units",
          urgent: false,
        },
      ],
      predictions: [
        { week: "This Week", demand: 145, stock: 120, status: "critical" },
        { week: "Next Week", demand: 167, stock: 200, status: "optimal" },
      ],
      automated: "12 orders placed automatically this month",
    },
  },
  {
    icon: <DollarSignIcon className="h-6 w-6" />,
    title: "Profit Optimizer",
    description: "AI-powered margin and pricing optimization",
    color: "from-indigo-500 to-purple-500",
    demo: {
      type: "finance",
      metrics: [
        {
          label: "Gross Margin",
          value: "34.2%",
          change: "+2.3%",
          target: "35%",
        },
        {
          label: "Net Profit",
          value: "$18,450",
          change: "+15%",
          target: "$20K",
        },
        { label: "AOV", value: "$127", change: "+8%", target: "$130" },
      ],
      opportunities: [
        {
          action: "Increase Winter Parka price",
          impact: "+$890/month",
          confidence: "94%",
        },
        {
          action: "Bundle slow-moving items",
          impact: "+$340/month",
          confidence: "87%",
        },
      ],
    },
  },
  {
    icon: <ZapIcon className="h-6 w-6" />,
    title: "Smart Promotions",
    description: "AI creates and optimizes promotional campaigns",
    color: "from-yellow-500 to-orange-500",
    demo: {
      type: "promotions",
      campaigns: [
        {
          name: "Winter Flash Sale",
          status: "live",
          performance: "+23% conversion",
          revenue: "$3,240",
          remaining: "2d 14h",
        },
        {
          name: "Bundle Boost",
          status: "scheduled",
          prediction: "+18% AOV",
          target: "$2,100",
          starts: "Tomorrow 9AM",
        },
      ],
      aiGenerated: "3 campaigns created automatically this week",
    },
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "E-commerce Manager",
    company: "Urban Threads",
    quote:
      "WOW AI transformed how we manage our store. The insights are incredible.",
    avatar: "👩‍💼",
  },
  {
    name: "Marcus Rodriguez",
    role: "Store Owner",
    company: "Tech Haven",
    quote: "I save 10+ hours per week with the automated agents. Game changer.",
    avatar: "👨‍💻",
  },
  {
    name: "Emily Davis",
    role: "Operations Director",
    company: "Fashion Forward",
    quote: "The pricing agent increased our margins by 15% in just 2 months.",
    avatar: "👩‍🔬",
  },
];

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
                      ? "bg-purple-600 text-white"
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
                  <Badge className="bg-green-100 text-green-800">
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
                <div className="font-bold text-lg text-purple-600">
                  {value as string}
                </div>
                <div className="text-xs text-gray-600 capitalize">{key}</div>
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
                    agent.status === "active"
                      ? "bg-green-500"
                      : agent.status === "working"
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
                  <div className="text-xs text-gray-500">Score</div>
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
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{alert.product}</div>
                    <div className="text-sm text-gray-600">
                      Stock: {alert.stock} • Demand: {alert.demand}
                    </div>
                  </div>
                  <Badge
                    className={
                      alert.urgent
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
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
                  <div className="text-xs text-green-600">{metric.change}</div>
                  <div className="text-xs text-gray-500">
                    Target: {metric.target}
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
                    <div className="text-green-600 font-bold">{opp.impact}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
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
                    campaign.status === "live"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }
                >
                  {campaign.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Performance</div>
                  <div className="font-medium">
                    {campaign.performance || campaign.prediction}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Revenue</div>
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
            className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center"
          >
            <div className="text-sm text-purple-700 font-medium">
              {demo.aiGenerated}
            </div>
          </motion.div>
        </div>
      );

    default:
      return (
        <div className="p-8 text-center text-gray-500">Demo loading...</div>
      );
  }
};

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % powerfulFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <SparklesIcon className="h-8 w-8 text-purple-600" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                WOW AI
              </h1>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RocketIcon className="h-8 w-8 text-blue-600" />
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6"
            >
              Your AI-Powered Sala Co-Pilot
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Transform your e-commerce business with intelligent AI agents that
              work 24/7 to optimize your operations, boost profits, and provide
              instant insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <RocketIcon className="mr-2 h-5 w-5" />
                  See It In Action
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transform hover:scale-105 transition-all"
                onClick={() => window.open("https://getwow.ai", "_blank")}
              >
                <SparklesIcon className="mr-2 h-5 w-5" />
                Sign Up for WOW AI
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
            <Card className="overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${powerfulFeatures[currentFeature].color} text-white shadow-lg`}
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
                          ? "bg-purple-600 w-8"
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
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-40 right-16 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-cyan-200 rounded-full opacity-50 animate-pulse delay-2000" />
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
              Powerful AI Agents at Your Service
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each agent specializes in a different aspect of your business,
              working together to optimize your entire operation.
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
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
                    >
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
                            ✓ Instant AI insights with data
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
                            {feature.demo.summary?.revenue} revenue impact
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "inventory" && (
                        <div>
                          <div className="font-medium mb-1">
                            📦 Smart restocking alerts
                          </div>
                          <div className="text-green-600">
                            {feature.demo.automated}
                          </div>
                        </div>
                      )}
                      {feature.demo.type === "finance" && (
                        <div>
                          <div className="font-medium mb-1">
                            💰 Profit optimization
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
              Why Store Owners Love WOW AI
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <TrendingUpIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Increase Revenue
              </h3>
              <p className="text-gray-600">
                Our AI agents identify opportunities to boost sales, optimize
                pricing, and create targeted promotions that drive results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <BrainIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Save Time
              </h3>
              <p className="text-gray-600">
                Automate repetitive tasks and get instant insights. Focus on
                growing your business while AI handles the heavy lifting.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <CheckCircleIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Make Better Decisions
              </h3>
              <p className="text-gray-600">
                Get data-driven recommendations and insights that help you make
                smarter business decisions with confidence.
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
              Trusted by E-commerce Leaders
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                    <p className="text-gray-700 mb-4 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <div className="font-bold text-gray-800">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Transform Your Store?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of store owners who have already experienced the
              WOW factor. See how fast you can get started.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <RocketIcon className="mr-3 h-6 w-6" />
                  Experience the Magic
                  <ArrowRightIcon className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
              <Badge variant="secondary" className="px-3 py-1">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                Free 14-day trial
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                No credit card required
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <CheckCircleIcon className="mr-1 h-4 w-4" />
                Setup in 2 minutes
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



