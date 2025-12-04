"use client";

import { useEffect, Suspense } from "react";
import {
  initMixpanel,
  getMixpanel,
  MIXPANEL_READY_EVENT,
} from "@/lib/mixpanel";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Mixpanel Provider Component
 * Wraps your app to initialize Mixpanel and handle tracking
 *
 * Note: This component must be used INSIDE NextIntlClientProvider
 * to have access to locale context
 */
function MixpanelProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize Mixpanel on mount
  useEffect(() => {
    initMixpanel();
  }, []);

  // Fire a test event once on initial page load to verify tracking
  useEffect(() => {
    const sendTestEvent = () => {
      const mixpanel = getMixpanel();
      if (!mixpanel || typeof mixpanel.track !== "function") return false;

      try {
        const url =
          window.location.pathname +
          (window.location.search ? `?${window.location.search}` : "");

        mixpanel.track("showcase_test_page_load", {
          page_url: url,
          page_title: document.title,
          timestamp: new Date().toISOString(),
        });
        return true;
      } catch (error) {
        console.warn("Failed to send Mixpanel test event:", error);
        return false;
      }
    };

    if (sendTestEvent()) return;

    const handleReady = () => {
      const success = sendTestEvent();
      if (success) {
        window.removeEventListener(MIXPANEL_READY_EVENT, handleReady);
      }
    };

    window.addEventListener(MIXPANEL_READY_EVENT, handleReady);

    return () => {
      window.removeEventListener(MIXPANEL_READY_EVENT, handleReady);
    };
  }, []);

  // Track page views on route changes
  // Locale is extracted from pathname (e.g., /en/page or /ar/page)
  useEffect(() => {
    const mixpanel = getMixpanel();
    if (!mixpanel || typeof mixpanel.track !== "function") return;

    try {
      const url =
        pathname + (searchParams?.toString() ? `?${searchParams}` : "");

      // Extract locale from pathname (format: /[locale]/...)
      const locale = pathname.split("/")[1] || "en";

      mixpanel.track("Page View", {
        page_url: url,
        page_title: document.title,
        locale,
      });
    } catch (error) {
      console.warn("Failed to track Mixpanel page view:", error);
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <MixpanelProviderInner>{children}</MixpanelProviderInner>
    </Suspense>
  );
}
