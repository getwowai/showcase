import { ReactNode } from "react";
import { notFound } from "next/navigation";
import RootProviders from "../RootProviders";
import { getMessages, getTranslations } from "next-intl/server";
import { locales, type Locale } from "../../i18n/config";

import { Inter, JetBrains_Mono, Noto_Sans_Arabic } from "next/font/google";

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

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "homepage" });

  const title = `${t("title")} - ${t("subtitle")}`;
  const description = t("description");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getwow.ai";
  const ogImage = `${siteUrl}/brand-assets/logos/primary/wow-ai-primary-logo.png`;

  return {
    title,
    description,
    icons: {
      icon: "/brand-assets/icons/standard/wow-ai-standard-icon-32px.svg",
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
  const { locale } = params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <RootProviders messages={messages} locale={locale}>
      <div
        className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable} antialiased ${
          locale === "ar" ? "font-arabic" : ""
        }`}
      >
        {children}
      </div>
    </RootProviders>
  );
}
