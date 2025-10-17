import posthog from "posthog-js";

/**
 * Initialize PostHog for client-side analytics and experiments
 * Call this once in your app, typically in a provider or layout
 */
export const initPostHog = () => {
  if (typeof window === "undefined") return;

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!apiKey) {
    console.warn("PostHog API key not found. Tracking disabled.");
    return;
  }

  if (posthog.__loaded) return; // Already initialized

  posthog.init(apiKey, {
    api_host: apiHost || "https://app.posthog.com",
    // Disable automatic pageview capture - we'll do this manually for i18n
    capture_pageview: false,
    // Disable automatic pageleave capture
    capture_pageleave: false,
    // Enable session recording for experiment analysis
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-private]",
    },
    // Enable feature flags
    advanced_disable_decide: false,
    // Debug in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        posthog.debug();
        console.log("PostHog initialized in debug mode");
      }
    },
    // Persistence
    persistence: "localStorage+cookie",
    // Cross-subdomain tracking
    cross_subdomain_cookie: false,
  });
};

/**
 * Get the PostHog instance
 * Use this to access PostHog methods throughout your app
 */
export const getPostHog = () => {
  if (typeof window === "undefined") return null;
  return posthog;
};

/**
 * Identify a user with PostHog
 * Call this when a user signs up or logs in
 */
export const identifyUser = (
  userId: string,
  userProperties?: Record<string, unknown>,
) => {
  if (typeof window === "undefined") return;
  posthog.identify(userId, userProperties);
};

/**
 * Reset PostHog (call on logout)
 */
export const resetPostHog = () => {
  if (typeof window === "undefined") return;
  posthog.reset();
};
