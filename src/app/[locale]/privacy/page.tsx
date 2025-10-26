"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  const t = useTranslations("privacy");
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
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("introduction.title")}
            </h2>
            <p>{t("introduction.content")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("informationWeCollect.title")}
            </h2>
            <p>{t("informationWeCollect.description")}</p>

            <h3
              style={{
                fontSize: "1.25rem",
                marginTop: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              {t("informationWeCollect.storeInfo.title")}
            </h3>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("informationWeCollect.storeInfo.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>

            <h3
              style={{
                fontSize: "1.25rem",
                marginTop: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              {t("informationWeCollect.customerData.title")}
            </h3>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("informationWeCollect.customerData.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>

            <h3
              style={{
                fontSize: "1.25rem",
                marginTop: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              {t("informationWeCollect.productData.title")}
            </h3>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("informationWeCollect.productData.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>

            <h3
              style={{
                fontSize: "1.25rem",
                marginTop: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              {t("informationWeCollect.marketingData.title")}
            </h3>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("informationWeCollect.marketingData.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("howWeUse.title")}
            </h2>
            <p>{t("howWeUse.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t.raw("howWeUse.items").map((item: string, index: number) => (
                <li key={index}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("dataSecurity.title")}
            </h2>
            <p>{t("dataSecurity.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("dataSecurity.measures")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("dataSecurity.retention")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("dataSharing.title")}
            </h2>
            <p>{t("dataSharing.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("dataSharing.circumstances")
                .map((item: string, index: number) => (
                  <li key={index}>
                    <strong>{item}</strong>
                  </li>
                ))}
            </ul>
            <p>{t("dataSharing.shopifySync")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("yourRights.title")}
            </h2>
            <p>{t("yourRights.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t.raw("yourRights.rights").map((item: string, index: number) => (
                <li key={index}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
            <p>{t("yourRights.contact")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("dataRetention.title")}
            </h2>
            <p>{t("dataRetention.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("dataRetention.process")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("marketing.title")}
            </h2>
            <p>{t("marketing.withConsent")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("marketing.communications")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("marketing.optOut")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("marketing.optOutMethods")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("marketing.note")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("compliance.title")}
            </h2>
            <p>{t("compliance.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("compliance.regulations")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("cookies.title")}
            </h2>
            <p>{t("cookies.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t.raw("cookies.purposes").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t("cookies.control")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("thirdParty.title")}
            </h2>
            <p>{t("thirdParty.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("thirdParty.services")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("thirdParty.review")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("changes.title")}
            </h2>
            <p>{t("changes.description")}</p>
            <ul style={{ marginLeft: "1.5rem" }}>
              {t
                .raw("changes.notifications")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("changes.acceptance")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              {t("contact.title")}
            </h2>
            <p>{t("contact.description")}</p>
            <ul style={{ listStyle: "none", marginLeft: "0", padding: "0" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>{t("contact.email")}</strong>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>{t("contact.website")}</strong>
              </li>
            </ul>
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
