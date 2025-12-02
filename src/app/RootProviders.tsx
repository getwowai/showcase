"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import { NextIntlClientProvider } from "next-intl";
import { PostHogProvider } from "@/components/PostHogProvider";

interface Props {
  messages: Record<string, unknown>;
  locale: string;
  children: React.ReactNode;
}

const RootProviders = (props: Props) => {
  const { messages, locale, children } = props;

  const clerkLocalization = locale === "ar" ? arSA : undefined;

  return (
    <ClerkProvider
      localization={clerkLocalization}
      publishableKey={process.env.CLERK_PUBLISHABLE_KEY}
    >
      <PostHogProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </PostHogProvider>
    </ClerkProvider>
  );
};

export default RootProviders;
