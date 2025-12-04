"use client";

import { useState, useEffect } from "react";
import {
  getMixpanel,
  getFeatureFlagVariant,
  isFeatureFlagEnabled,
} from "@/lib/mixpanel";

/**
 * Hook to get the current variant for a Mixpanel feature flag
 * Similar to PostHog's useFeatureFlagVariantKey (migrated to Mixpanel)
 *
 * @param flagKey - The feature flag key from Mixpanel
 * @param fallback - Fallback value if flag is not available
 * @returns The variant key (e.g., 'control', 'variant-a', 'variant-b') or fallback
 *
 * @example
 * ```tsx
 * const variant = useMixpanelFeatureFlag('hero-test', 'control');
 *
 * if (variant === 'control') return <HeroDefault />;
 * if (variant === 'signup-focused') return <HeroSignup />;
 * ```
 */
export const useMixpanelFeatureFlag = (
  flagKey: string,
  fallback: string = "control",
): string => {
  const [variant, setVariant] = useState<string>(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVariant = async () => {
      const mixpanel = getMixpanel();
      if (!mixpanel || !mixpanel.flags) {
        setVariant(fallback);
        setIsLoading(false);
        return;
      }

      try {
        const flagValue = await getFeatureFlagVariant(flagKey, fallback);
        setVariant(flagValue);
      } catch (error) {
        console.warn(`Failed to load feature flag ${flagKey}:`, error);
        setVariant(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    loadVariant();
  }, [flagKey, fallback]);

  return isLoading ? fallback : variant;
};

/**
 * Hook to check if a feature flag is enabled
 * Useful for simple on/off feature toggles (not experiments)
 *
 * @param flagKey - The feature flag key from Mixpanel
 * @param fallback - Fallback value if flag is not available
 * @returns boolean indicating if the flag is enabled
 *
 * @example
 * ```tsx
 * const showNewFeature = useMixpanelFeatureFlagEnabled('new-pricing-section');
 *
 * return (
 *   <>
 *     {showNewFeature && <PricingSection />}
 *   </>
 * )
 * ```
 */
export const useMixpanelFeatureFlagEnabled = (
  flagKey: string,
  fallback: boolean = false,
): boolean => {
  const [enabled, setEnabled] = useState<boolean>(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFlag = async () => {
      const mixpanel = getMixpanel();
      if (!mixpanel || !mixpanel.flags) {
        setEnabled(fallback);
        setIsLoading(false);
        return;
      }

      try {
        const flagValue = await isFeatureFlagEnabled(flagKey, fallback);
        setEnabled(flagValue);
      } catch (error) {
        console.warn(`Failed to load feature flag ${flagKey}:`, error);
        setEnabled(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    loadFlag();
  }, [flagKey, fallback]);

  return isLoading ? fallback : enabled;
};
