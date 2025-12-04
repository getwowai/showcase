"use client";

import { useEffect } from "react";
import {
  useMixpanelFeatureFlag,
  useMixpanelFeatureFlagEnabled,
} from "./useMixpanelFeatureFlag";
import { useTracking } from "../tracking";

/**
 * Hook to get the current variant for an experiment
 * Automatically tracks experiment exposure
 *
 * @param experimentKey - The feature flag key from Mixpanel
 * @param fallback - Fallback variant if flag is not available
 * @returns The variant key (e.g., 'control', 'variant-a', 'variant-b')
 *
 * @example
 * ```tsx
 * const variant = useExperiment('hero-test', 'control');
 *
 * if (variant === 'control') return <HeroDefault />;
 * if (variant === 'signup-focused') return <HeroSignup />;
 * if (variant === 'demo-first') return <HeroDemoFirst />;
 * ```
 */
export const useExperiment = (
  experimentKey: string,
  fallback: string = "control",
) => {
  const variant = useMixpanelFeatureFlag(experimentKey, fallback);
  const { trackEvent } = useTracking();

  // Track experiment exposure when variant is assigned
  useEffect(() => {
    if (variant && variant !== fallback) {
      trackEvent("experiment_exposure", {
        experiment_name: experimentKey,
        variant: variant,
      });
    }
  }, [experimentKey, variant, fallback, trackEvent]);

  return variant;
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
 * const showNewFeature = useFeatureFlag('new-pricing-section');
 *
 * return (
 *   <>
 *     {showNewFeature && <PricingSection />}
 *   </>
 * )
 * ```
 */
export const useFeatureFlag = (
  flagKey: string,
  fallback: boolean = false,
): boolean => {
  return useMixpanelFeatureFlagEnabled(flagKey, fallback);
};
