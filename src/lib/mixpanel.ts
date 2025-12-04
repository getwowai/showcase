import mixpanel from "mixpanel-browser";

/**
 * Initialize Mixpanel for client-side analytics
 * Call this once in your app, typically in a provider or layout
 *
 * IMPORTANT: This landing page tracks users ANONYMOUSLY.
 * - Mixpanel auto-generates an anonymous distinct_id for each visitor
 * - We do NOT call mixpanel.identify() or mixpanel.alias() in this codebase
 * - After successful signup, the main app will call:
 *   1. mixpanel.alias(userId) - to connect anonymous profile to authenticated user
 *   2. mixpanel.identify(userId) - to identify future events
 * - This allows us to track the full user journey from anonymous landing page to authenticated app
 */
export const initMixpanel = () => {
  if (typeof window === "undefined") return;

  const token =
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ||
    "bb45473ca9d564e395e228ba33b1a4ed";

  if (!token) {
    console.warn("Mixpanel token not found. Tracking disabled.");
    return;
  }

  // Initialize Mixpanel with feature flags enabled (safe to call multiple times)
  // Note: We don't set a distinct_id, so Mixpanel auto-generates an anonymous one
  mixpanel.init(token, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage",
    autocapture: true,
    record_sessions_percent: 100,
    flags: true, // Enable feature flags
  });
};

/**
 * Get the Mixpanel instance
 * Use this to access Mixpanel methods throughout your app
 *
 * To get the current anonymous distinct_id (for debugging):
 * const mixpanel = getMixpanel();
 * const distinctId = mixpanel?.get_distinct_id();
 */
export const getMixpanel = () => {
  if (typeof window === "undefined") return null;
  return mixpanel;
};

/**
 * Identify a user with Mixpanel
 *
 * ⚠️ DO NOT USE IN THIS CODEBASE ⚠️
 *
 * This function exists for reference only. We track users ANONYMOUSLY on the landing page.
 * The main app will handle alias/identify after successful signup:
 * 1. mixpanel.alias(userId) - connects anonymous profile to authenticated user
 * 2. mixpanel.identify(userId) - identifies future events
 *
 * This allows tracking the full journey from anonymous landing page to authenticated app.
 */
export const identifyUser = (
  userId: string,
  userProperties?: Record<string, unknown>,
) => {
  if (typeof window === "undefined") return;
  mixpanel.identify(userId);
  if (userProperties) {
    mixpanel.people.set(userProperties);
  }
};

/**
 * Reset Mixpanel (call on logout)
 */
export const resetMixpanel = () => {
  if (typeof window === "undefined") return;
  mixpanel.reset();
};

/**
 * Get feature flag variant value
 * @param flagKey - The feature flag key
 * @param fallback - Fallback value if flag is not available
 * @returns Promise resolving to the variant value
 */
export const getFeatureFlagVariant = async (
  flagKey: string,
  fallback: string = "control",
): Promise<string> => {
  if (typeof window === "undefined") return fallback;
  const mixpanel = getMixpanel();
  if (!mixpanel || !mixpanel.flags) return fallback;

  try {
    const variant = await mixpanel.flags.get_variant_value(flagKey, fallback);
    return variant || fallback;
  } catch (error) {
    console.warn(`Failed to get feature flag ${flagKey}:`, error);
    return fallback;
  }
};

/**
 * Check if a feature flag is enabled
 * @param flagKey - The feature flag key
 * @param fallback - Fallback value if flag is not available
 * @returns Promise resolving to boolean
 */
export const isFeatureFlagEnabled = async (
  flagKey: string,
  fallback: boolean = false,
): Promise<boolean> => {
  if (typeof window === "undefined") return fallback;
  const mixpanel = getMixpanel();
  if (!mixpanel || !mixpanel.flags) return fallback;

  try {
    const enabled = await mixpanel.flags.is_enabled(flagKey, fallback);
    return enabled;
  } catch (error) {
    console.warn(`Failed to check feature flag ${flagKey}:`, error);
    return fallback;
  }
};
