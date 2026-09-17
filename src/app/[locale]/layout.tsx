import { ReactNode } from "react";
import { notFound } from "next/navigation";
import RootProviders from "../RootProviders";
import { getMessages, getTranslations } from "next-intl/server";
import { locales, type Locale } from "../../i18n/config";

import {
  Inter,
  JetBrains_Mono,
  Noto_Sans_Arabic,
  Fraunces,
  Outfit,
  Readex_Pro,
} from "next/font/google";

import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * WOW brand typeface trio, shared with the WOW Webinar landing
 * (wow-webinars/services/landing/app/fonts.ts) so the two properties read as
 * one company: Fraunces for display, Outfit for body and UI, Readex Pro for
 * Arabic — the one family of the three with real Arabic coverage.
 *
 * Declared here rather than in the variant that uses them because variants are
 * selected client-side and can render either at /{locale}/{variant} or at
 * /{locale} through the variant system; only this layout covers both.
 *
 * Fraunces carries an optical-size axis, so `axes: ["opsz"]` is requested and
 * `font-optical-sizing: auto` keeps large headings refining as they scale.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});
const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});
const readexPro = Readex_Pro({
  variable: "--font-arabic-display",
  subsets: ["arabic", "latin"],
  display: "swap",
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Default metadata for everything under /{locale}.
 *
 * Read from the `brandHandoff` namespace because that variant is now
 * DEFAULT_VARIANT (src/lib/variant-config.ts) — what a cold visitor to
 * getwow.ai actually gets. It used to build the title from `homepage`, which
 * still holds the older e-commerce Co-Pilot pitch and is the body copy of the
 * `control` variant; search results and shared links were describing a page
 * nobody is served.
 *
 * Variant selection happens client-side (Mixpanel) while metadata is generated
 * on the server, so the two cannot see each other — this tracks the default by
 * hand. Changing DEFAULT_VARIANT means revisiting the namespace here.
 */
export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brandHandoff" });

  const title = t("metaTitle");
  const description = t("metaDescription");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getwow.ai";
  const ogImage = `${siteUrl}/brand-assets/logos/primary/wow-ai-primary-logo.png`;

  return {
    title,
    description,
    icons: {
      // The WOW mark: black rounded square, white W — the same icon the WOW
      // Webinar landing ships, so a tab from either property is recognisably
      // the same company. public/favicon.svg is the source of truth; the .ico
      // and apple-touch-icon.png are generated from it by
      // scripts/generate-favicon.js (`pnpm generate:favicon`).
      //
      // Declared here rather than through the app/icon.svg file convention
      // because that convention and this `icons` field both emit <link> tags,
      // and the duplicate is easy to reintroduce by accident.
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: "WOW AI",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "WOW AI" }],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <RootProviders messages={messages} locale={locale}>
      <div
        className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable} ${fraunces.variable} ${outfit.variable} ${readexPro.variable} antialiased ${
          locale === "ar" ? "font-arabic" : ""
        }`}
      >
        {children}
      </div>
    </RootProviders>
  );
}
