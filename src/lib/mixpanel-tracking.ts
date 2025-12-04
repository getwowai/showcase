"use client";

import { useLocale } from "next-intl";
import { getMixpanel } from "@/lib/mixpanel";

/**
 * Custom hook for i18n-aware Mixpanel event tracking
 * Automatically includes locale in all tracked events
 */
export const useMixpanelTracking = () => {
  const locale = useLocale();
  const mixpanel = getMixpanel();

  return {
    /**
     * Track a custom event with automatic locale inclusion
     */
    trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
      if (!mixpanel || typeof mixpanel.track !== "function") return;

      try {
        mixpanel.track(eventName, {
          ...properties,
          locale, // Always include locale for segmentation
        });
      } catch (error) {
        console.warn("Failed to track Mixpanel event:", error);
      }
    },

    /**
     * Track a page view
     */
    trackPageView: (
      pagePath?: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel || typeof mixpanel.track !== "function") return;

      try {
        mixpanel.track("Page View", {
          ...properties,
          page_url: pagePath || window.location.href,
          page_title: document.title,
          locale,
        });
      } catch (error) {
        console.warn("Failed to track Mixpanel page view:", error);
      }
    },

    /**
     * Track a conversion event
     */
    trackConversion: (
      conversionType: string,
      conversionValue?: number,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel || typeof mixpanel.track !== "function") return;

      try {
        mixpanel.track("Conversion", {
          ...properties,
          "Conversion Type": conversionType,
          "Conversion Value": conversionValue,
          locale,
        });
      } catch (error) {
        console.warn("Failed to track Mixpanel conversion:", error);
      }
    },

    /**
     * Track a sign up event
     */
    trackSignUp: (
      userId: string,
      email: string,
      signupMethod: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel) return;

      mixpanel.track("Sign Up", {
        ...properties,
        user_id: userId,
        email,
        signup_method: signupMethod,
        locale,
      });
    },

    /**
     * Track a sign in event
     */
    trackSignIn: (
      userId: string,
      loginMethod: string,
      success: boolean,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel) return;

      mixpanel.track("Sign In", {
        ...properties,
        user_id: userId,
        login_method: loginMethod,
        success,
        locale,
      });
    },

    /**
     * Track a search event
     */
    trackSearch: (
      searchQuery: string,
      resultsCount?: number,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel) return;

      mixpanel.track("Search", {
        ...properties,
        search_query: searchQuery,
        results_count: resultsCount,
        locale,
      });
    },

    /**
     * Track an error event
     */
    trackError: (
      errorType: string,
      errorMessage: string,
      errorCode?: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel) return;

      mixpanel.track("Error", {
        ...properties,
        error_type: errorType,
        error_message: errorMessage,
        error_code: errorCode,
        page_url: window.location.href,
        locale,
      });
    },

    /**
     * Track a purchase event
     */
    trackPurchase: (
      userId: string,
      transactionId: string,
      revenue: number,
      currency: string,
      properties?: Record<string, unknown>,
    ) => {
      if (!mixpanel) return;

      mixpanel.track("Purchase", {
        ...properties,
        user_id: userId,
        transaction_id: transactionId,
        revenue,
        currency,
        locale,
      });
    },
  };
};
