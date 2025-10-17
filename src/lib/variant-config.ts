/**
 * Landing Page Variant Configuration
 *
 * This utility handles variant selection with fallback priority:
 * 1. Environment variable override (for testing/development)
 * 2. PostHog feature flag (for production experiments)
 * 3. Default fallback
 */

export type LandingVariant = "minimal" | "control" | "social-proof";

export interface VariantConfig {
  /** The variant to show on the main landing page */
  variant: LandingVariant | null;
  /** Whether the variant was set via environment override */
  isOverridden: boolean;
  /** The source of the variant decision */
  source: "env" | "posthog" | "fallback";
}

/**
 * Get the landing page variant configuration
 *
 * Priority order:
 * 1. NEXT_PUBLIC_DEFAULT_LANDING_VARIANT (if NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE is true)
 * 2. PostHog feature flag result
 * 3. Default fallback ('control')
 */
export function getVariantConfig(
  posthogVariant?: string | null,
): VariantConfig {
  // Check if we should force override with environment variable
  const forceOverride =
    process.env.NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE === "true";
  const envVariant = process.env.NEXT_PUBLIC_DEFAULT_LANDING_VARIANT as
    | LandingVariant
    | undefined;

  if (forceOverride && envVariant) {
    return {
      variant: envVariant,
      isOverridden: true,
      source: "env",
    };
  }

  // Use PostHog variant if available
  if (
    posthogVariant &&
    ["minimal", "control", "social-proof"].includes(posthogVariant)
  ) {
    return {
      variant: posthogVariant as LandingVariant,
      isOverridden: false,
      source: "posthog",
    };
  }

  // Fallback to environment variable if PostHog is not available
  if (envVariant) {
    return {
      variant: envVariant,
      isOverridden: false,
      source: "env",
    };
  }

  // Default fallback
  return {
    variant: "control",
    isOverridden: false,
    source: "fallback",
  };
}

/**
 * Get available variants for validation
 */
export function getAvailableVariants(): LandingVariant[] {
  return ["minimal", "control", "social-proof"];
}

/**
 * Check if a variant is valid
 */
export function isValidVariant(variant: string): variant is LandingVariant {
  return getAvailableVariants().includes(variant as LandingVariant);
}

/**
 * Get variant configuration for debugging
 */
export function getVariantDebugInfo(posthogVariant?: string | null) {
  const config = getVariantConfig(posthogVariant);

  return {
    ...config,
    environment: {
      forceOverride: process.env.NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE === "true",
      envVariant: process.env.NEXT_PUBLIC_DEFAULT_LANDING_VARIANT,
      posthogVariant,
    },
  };
}
