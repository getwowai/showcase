"use client";

import { useLocale } from "next-intl";
import { getPostHog } from "@/lib/posthog";

/**
 * Custom hook for i18n-aware event tracking
 * Automatically includes locale in all tracked events
 */
export const useTracking = () => {
  const locale = useLocale();
  const posthog = getPostHog();

  return {
    /**
     * Track a custom event with automatic locale inclusion
     */
    trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
      if (!posthog) return;

      posthog.capture(eventName, {
        ...properties,
        locale, // Always include locale for segmentation
        $set: { language: locale }, // Set user property for targeting
      });
    },

    /**
     * Track a page view (use this instead of automatic capture for i18n)
     */
    trackPageView: (pagePath?: string, properties?: Record<string, unknown>) => {
      if (!posthog) return;

      posthog.capture("$pageview", {
        ...properties,
        locale,
        $current_url: pagePath || window.location.href,
        $set: { language: locale },
      });
    },

    /**
     * Track a conversion event
     */
    trackConversion: (
      conversionName: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!posthog) return;

      posthog.capture(conversionName, {
        ...properties,
        locale,
        conversion: true,
        $set: { language: locale },
      });
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth: (percentage: 25 | 50 | 75 | 100) => {
      if (!posthog) return;

      posthog.capture("scroll_depth", {
        locale,
        percentage,
        page: window.location.pathname,
      });
    },

    /**
     * Track CTA clicks
     */
    trackCTAClick: (
      ctaName: string,
      ctaLocation: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!posthog) return;

      posthog.capture("cta_clicked", {
        ...properties,
        locale,
        cta_name: ctaName,
        cta_location: ctaLocation,
        page: window.location.pathname,
      });
    },

    /**
     * Track feature interaction
     */
    trackFeatureInteraction: (
      featureName: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!posthog) return;

      posthog.capture("feature_interaction", {
        ...properties,
        locale,
        feature: featureName,
        page: window.location.pathname,
      });
    },
  };
};

/**
 * Standard event names for consistency
 * Use these constants to avoid typos and maintain consistency
 */
export const EVENTS = {
  // Page views
  LANDING_PAGE_VIEWED: "landing_page_viewed",
  DEMO_PAGE_VIEWED: "demo_page_viewed",
  ONBOARDING_PAGE_VIEWED: "onboarding_page_viewed",

  // Hero interactions
  HERO_CTA_CLICKED: "hero_cta_clicked",
  HERO_SECONDARY_CTA_CLICKED: "hero_secondary_cta_clicked",

  // Feature interactions
  FEATURE_EXPLORED: "feature_explored",
  FEATURE_DEMO_STARTED: "feature_demo_started",
  FEATURE_DEMO_COMPLETED: "feature_demo_completed",

  // Conversions
  WAITLIST_JOINED: "waitlist_joined",
  DEMO_REQUESTED: "demo_requested",
  SIGNUP_INITIATED: "signup_initiated",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",

  // Engagement
  SCROLL_DEPTH: "scroll_depth",
  VIDEO_PLAYED: "video_played",
  VIDEO_COMPLETED: "video_completed",
  TESTIMONIAL_VIEWED: "testimonial_viewed",

  // Navigation
  LANGUAGE_SWITCHED: "language_switched",
  EXTERNAL_LINK_CLICKED: "external_link_clicked",
} as const;

/**
 * Standard property names for consistency
 */
export const PROPERTIES = {
  VARIANT: "variant",
  EXPERIMENT_NAME: "experiment_name",
  CTA_TEXT: "cta_text",
  CTA_LOCATION: "cta_location",
  FEATURE_NAME: "feature_name",
  SCROLL_PERCENTAGE: "scroll_percentage",
  FROM_LANGUAGE: "from_language",
  TO_LANGUAGE: "to_language",
} as const;
