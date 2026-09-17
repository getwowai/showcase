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
 * A tab title and link preview that contradict the page defeat the point of the
 * variant, since search results and shared links are exactly how people arrive
 * at getwow.ai.
 *
 * This currently produces the same output as the parent layout, which reads the
 * same `brandHandoff` namespace now that this variant is DEFAULT_VARIANT. It is
 * kept rather than deleted so that /{locale}/brand-handoff stays correctly
 * described on its own terms — the direct route should not silently inherit
 * whatever the default variant happens to be next.
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
