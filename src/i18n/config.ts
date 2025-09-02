import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is valid, fallback to 'en' if not
  const validLocale =
    locale && locales.includes(locale as Locale) ? locale : "en";

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
