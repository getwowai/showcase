"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { ReactElement } from "react";

// Helper function to parse markdown bold (**text**) and render as JSX
function parseMarkdown(text: string) {
  const parts: (string | ReactElement)[] = [];
  let lastIndex = 0;
  const regex = /\*\*(.*?)\*\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the bold text
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

export default function TermsConditions() {
  const t = useTranslations("terms");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href={`/${locale}`}>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            {t("backToHome")}
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-20">
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "40px 20px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: "1.6",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {t("title")}
          </h1>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            {t("lastUpdated", {
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            })}
          </p>

          <section style={{ marginBottom: "2rem" }}>
            <p>{parseMarkdown(t("introduction"))}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("useOfService.title")}
            </h2>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("useOfService.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("accounts.title")}
            </h2>
            <p>{t("accounts.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t.raw("accounts.reasons").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("dataPrivacy.title")}
            </h2>
            <p>
              {t("dataPrivacy.description")}{" "}
              <Link
                href={`/${locale}/privacy`}
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                {locale === "ar"
                  ? "https://getwow.ai/ar/privacy"
                  : "https://getwow.ai/en/privacy"}
              </Link>
            </p>
            <p>{t("dataPrivacy.consent")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("paymentBilling.title")}
            </h2>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("paymentBilling.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("intellectualProperty.title")}
            </h2>
            <p>{t("intellectualProperty.description")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("thirdPartyServices.title")}
            </h2>
            <p>{t("thirdPartyServices.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("thirdPartyServices.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("thirdPartyServices.note")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("serviceAvailability.title")}
            </h2>
            <p>{t("serviceAvailability.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("serviceAvailability.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("serviceAvailability.reservation")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("limitationOfLiability.title")}
            </h2>
            <p>{t("limitationOfLiability.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("limitationOfLiability.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("limitationOfLiability.risk")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("termination.title")}
            </h2>
            <p>{t("termination.description")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("changesToTerms.title")}
            </h2>
            <p>{t("changesToTerms.description")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("contact.title")}
            </h2>
            <p>{t("contact.description")}</p>
            <p>
              <strong>{t("contact.email")}</strong>
            </p>
          </section>

          <footer
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid #e0e0e0",
              color: "#666",
              fontSize: "0.875rem",
            }}
          >
            <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
