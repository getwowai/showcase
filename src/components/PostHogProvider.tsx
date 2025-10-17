"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, Suspense } from "react";
import { initPostHog, getPostHog } from "@/lib/posthog";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * PostHog Provider Component
 * Wraps your app to provide PostHog context and handle tracking
 *
 * Note: This component must be used INSIDE NextIntlClientProvider
 * to have access to locale context
 */
function PostHogProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize PostHog on mount
  useEffect(() => {
    initPostHog();
  }, []);

  // Track page views on route changes
  // Locale is extracted from pathname (e.g., /en/page or /ar/page)
  useEffect(() => {
    const posthog = getPostHog();
    if (!posthog) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // Extract locale from pathname (format: /[locale]/...)
    const locale = pathname.split("/")[1] || "en";

    posthog.capture("$pageview", {
      $current_url: url,
      locale,
      $set: { language: locale },
    });
  }, [pathname, searchParams]);

  const posthog = getPostHog();

  if (!posthog) {
    // PostHog not initialized (SSR or missing config)
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <PostHogProviderInner>{children}</PostHogProviderInner>
    </Suspense>
  );
}
