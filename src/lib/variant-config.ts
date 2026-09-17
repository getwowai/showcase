/**
 * Landing Page Variant Configuration
 *
 * This utility handles variant selection with fallback priority:
 * 1. Environment variable override (for testing/development)
 * 2. Mixpanel feature flag (for production experiments)
 * 3. Default fallback ('brand-handoff')
 *
 * The default is 'brand-handoff': getwow.ai is the company's identity domain —
 * it carries Google Workspace mail and is the SendGrid sending domain for
 * hello@getwow.ai — so the page a cold visitor should land on is the one that
 * says what WOW AI is and where WOW Webinar lives. 'control' is the older
 * e-commerce Co-Pilot pitch and no longer describes the business.
 */

export type LandingVariant =
  | "minimal"
  | "minimal-plus"
  | "control"
  | "social-proof"
  | "waiting-list"
  | "ai-native-products"
  | "brand-handoff";

/** Variant served when neither an env override nor a Mixpanel flag applies. */
export const DEFAULT_VARIANT: LandingVariant = "brand-handoff";

export interface VariantConfig {
  /** The variant to show on the main landing page */
  variant: LandingVariant | null;
  /** Whether the variant was set via environment override */
  isOverridden: boolean;
  /** The source of the variant decision */
  source: "env" | "mixpanel" | "fallback";
}

/**
 * Get the landing page variant configuration
 *
 * Priority order:
 * 1. NEXT_PUBLIC_DEFAULT_LANDING_VARIANT (if NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE is true)
 * 2. Mixpanel feature flag result
 * 3. Default fallback (DEFAULT_VARIANT)
 */
export function getVariantConfig(
  mixpanelVariant?: string | boolean | null,
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

  // Use Mixpanel variant if available and valid
  if (
    mixpanelVariant &&
    typeof mixpanelVariant === "string" &&
    getAvailableVariants().includes(mixpanelVariant as LandingVariant)
  ) {
    return {
      variant: mixpanelVariant as LandingVariant,
      isOverridden: false,
      source: "mixpanel",
    };
  }

  // Fallback to environment variable if Mixpanel is not available
  if (envVariant) {
    return {
      variant: envVariant,
      isOverridden: false,
      source: "env",
    };
  }

  // Default fallback
  return {
    variant: DEFAULT_VARIANT,
    isOverridden: false,
    source: "fallback",
  };
}

/**
 * Get available variants for validation.
 *
 * This is the one list: the Mixpanel allowlist in getVariantConfig reads it
 * too. Previously the two were separate literals, which is how 'brand-handoff'
 * came to be a valid LandingVariant that a Mixpanel flag could never actually
 * select.
 */
export function getAvailableVariants(): LandingVariant[] {
  return [
    "minimal",
    "minimal-plus",
    "control",
    "social-proof",
    "waiting-list",
    "ai-native-products",
    "brand-handoff",
  ];
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
export function getVariantDebugInfo(mixpanelVariant?: string | boolean | null) {
  const config = getVariantConfig(mixpanelVariant);

  return {
    ...config,
    environment: {
      forceOverride: process.env.NEXT_PUBLIC_FORCE_VARIANT_OVERRIDE === "true",
      envVariant: process.env.NEXT_PUBLIC_DEFAULT_LANDING_VARIANT,
      mixpanelVariant,
    },
  };
}
