"use client";

import { useFeatureFlagVariantKey } from "posthog-js/react";
import { useEffect } from "react";
import { useTracking } from "../tracking";

/**
 * Hook to get the current variant for an experiment
 * Automatically tracks experiment exposure
 *
 * @param experimentKey - The feature flag key from PostHog
 * @returns The variant key (e.g., 'control', 'variant-a', 'variant-b') or undefined if not loaded
 *
 * @example
 * ```tsx
 * const variant = useExperiment('hero-test');
 *
 * if (variant === 'control') return <HeroDefault />;
 * if (variant === 'signup-focused') return <HeroSignup />;
 * if (variant === 'demo-first') return <HeroDemoFirst />;
 * ```
 */
export const useExperiment = (experimentKey: string) => {
  const variant = useFeatureFlagVariantKey(experimentKey);
  const { trackEvent } = useTracking();

  // Track experiment exposure when variant is assigned
  useEffect(() => {
    if (variant) {
      trackEvent("experiment_exposure", {
        experiment_name: experimentKey,
        variant: variant,
      });
    }
  }, [experimentKey, variant, trackEvent]);

  return variant;
};

/**
 * Hook to check if a feature flag is enabled
 * Useful for simple on/off feature toggles (not experiments)
 *
 * @param flagKey - The feature flag key from PostHog
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
export const useFeatureFlag = (flagKey: string): boolean => {
  const variant = useFeatureFlagVariantKey(flagKey);
  return variant === true || variant === "true";
};
