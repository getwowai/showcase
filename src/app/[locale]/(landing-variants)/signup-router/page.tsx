"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useFeatureFlagVariantKey } from "posthog-js/react";
import { useTracking } from "@/experiments/tracking";

/**
 * Signup Landing Router
 *
 * This page uses PostHog feature flags to automatically route users
 * to the correct variant based on their assignment.
 *
 * Usage: Direct traffic to /[locale]/signup-router
 * PostHog will automatically assign a variant and route them.
 */
export default function SignupRouterPage() {
  const router = useRouter();
  const locale = useLocale();
  const variant = useFeatureFlagVariantKey("signup-landing-variant");
  const { trackEvent } = useTracking();

  useEffect(() => {
    if (!variant) return; // Wait for PostHog to load

    // Track that user was exposed to this experiment
    trackEvent("experiment_exposure", {
      experiment_name: "signup-variants-oct-2025",
      variant: variant,
      method: "posthog-feature-flag",
    });

    // Route based on variant assignment
    if (variant === "minimal") {
      router.push(`/${locale}/signup-minimal`);
    } else if (variant === "social-proof") {
      router.push(`/${locale}/signup-social-proof`);
    } else {
      // Control or any other variant → main landing
      router.push(`/${locale}`);
    }
  }, [variant, locale, router, trackEvent]);

  // Show loading state while PostHog assigns variant
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-[#86c9e5] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
