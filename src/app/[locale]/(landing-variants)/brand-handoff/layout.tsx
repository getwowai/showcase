import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface BrandHandoffLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Route-scoped metadata for the brand-handoff variant.
 *
 * The variant page itself is a client component, so it cannot export metadata.
 * Without this layout the route inherits `generateMetadata` from
 * app/[locale]/layout.tsx, which builds the title from the `homepage`
 * namespace — still the old e-commerce copy ("Boost your store's sales…").
 * A tab title and link preview that contradict the page defeat the point of
 * the variant, since search results and shared links are exactly how people
 * arrive at getwow.ai.
 *
 * NOTE this only covers direct visits to /{locale}/brand-handoff. When the
 * variant is served at / through the variant system, metadata still comes from
 * the layout above, because variant selection happens client-side (Mixpanel)
 * while metadata is generated on the server — the two cannot see each other.
 * Promoting this variant to the default therefore also means updating
 * `homepage.title` / `homepage.subtitle` in messages/{en,ar}.json.
 */
export async function generateMetadata({
  params,
}: BrandHandoffLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brandHandoff" });

  const title = t("metaTitle");
  const description = t("metaDescription");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getwow.ai";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/brand-handoff`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BrandHandoffLayout({
  children,
}: BrandHandoffLayoutProps) {
  return children;
}
