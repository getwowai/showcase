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

export default function DataDeletion() {
  const t = useTranslations("dataDeletion");
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
              {t("howToRequest.title")}
            </h2>
            <p>{t("howToRequest.description")}</p>
            <ol style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("howToRequest.steps")
                .map((step: string, index: number) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    {parseMarkdown(step)}
                  </li>
                ))}
            </ol>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("whatWillBeDeleted.title")}
            </h2>
            <p>{t("whatWillBeDeleted.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("whatWillBeDeleted.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{parseMarkdown(t("whatWillBeDeleted.note"))}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("processingTime.title")}
            </h2>
            <p>{parseMarkdown(t("processingTime.description"))}</p>
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
