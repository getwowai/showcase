"use client";

import { useLocale } from "next-intl";
import { getMixpanel } from "@/lib/mixpanel";

/**
 * Custom hook for i18n-aware event tracking
 * Automatically includes locale in all tracked events
 */
export const useTracking = () => {
  const locale = useLocale();
  const mixpanel = getMixpanel();

  return {
    /**
     * Track a custom event with automatic locale inclusion
     */
    trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
      if (!mixpanel) return;

      mixpanel.track(eventName, {
        ...properties,
        locale, // Always include locale for segmentation
      });
    },

    /**
     * Track a page view (use this instead of automatic capture for i18n)
     */
    trackPageView: (
      pagePath?: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel) return;

      mixpanel.track("Page View", {
        ...properties,
        page_url: pagePath || window.location.href,
        page_title: document.title,
        locale,
      });
    },

    /**
     * Track a conversion event
     */
    trackConversion: (
      conversionName: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel) return;

      mixpanel.track(conversionName, {
        ...properties,
        locale,
        conversion: true,
      });
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth: (percentage: 25 | 50 | 75 | 100) => {
      if (!mixpanel) return;

      mixpanel.track("scroll_depth", {
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
      if (!mixpanel) return;

      mixpanel.track("cta_clicked", {
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
      if (!mixpanel) return;

      mixpanel.track("feature_interaction", {
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

  // Signup Journey
  SIGNUP_LANDING_ATTEMPTED: "signup_landing_attempted",
  SIGNUP_LANDING_SUCCESS: "signup_landing_success",
  SIGNUP_LANDING_FAILED: "signup_landing_failed",
  SIGNUP_LANDING_REDIRECTED: "signup_landing_redirected",

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
