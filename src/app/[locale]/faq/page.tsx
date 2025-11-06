"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const t = useTranslations("faq");
  const locale = useLocale();

  const questions = [
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "q8",
    "q9",
  ] as const;

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
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              fontWeight: "bold",
            }}
          >
            {t("title")}
          </h1>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {questions.map((qKey, index) => {
              const question = t(`questions.${qKey}.question`);
              const answer = t(`questions.${qKey}.answer`);

              // Only q2 has items and summary
              const items =
                qKey === "q2"
                  ? (t.raw(`questions.${qKey}.items`) as string[])
                  : undefined;
              const summary =
                qKey === "q2" ? t(`questions.${qKey}.summary`) : undefined;

              return (
                <div
                  key={qKey}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                      fontWeight: "600",
                      color: "#1a1a1a",
                    }}
                  >
                    {index + 1}. {question}
                  </h2>
                  <p
                    style={{
                      color: "#4a4a4a",
                      marginBottom: items ? "1rem" : "0",
                    }}
                  >
                    {answer}
                  </p>
                  {items && items.length > 0 && (
                    <ul
                      style={{
                        marginLeft: "1.5rem",
                        marginTop: "0.5rem",
                        marginBottom: summary ? "1rem" : "0",
                        color: "#4a4a4a",
                      }}
                    >
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{ marginBottom: "0.5rem" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {summary && (
                    <p
                      style={{
                        color: "#4a4a4a",
                        fontStyle: "italic",
                        marginTop: "0.5rem",
                      }}
                    >
                      {summary}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
