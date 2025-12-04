import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://getwow.ai";

  // Define all your localized routes
  const locales = ["en", "ar"];
  const routes = [
    "",
    "/brand",
    "/brand/asset-index",
    "/contact-us",
    "/data-deletion",
    "/faq",
    "/onboarding",
    "/privacy",
    "/terms-conditions",
  ];

  // Generate sitemap entries for all locale + route combinations
  const localizedRoutes = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  // Add the signup-success page (no locale)
  const additionalRoutes = [
    {
      url: `${baseUrl}/signup-success`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ];

  return [...localizedRoutes, ...additionalRoutes];
}
