"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface WebinarFormProps {
  locale: string;
}

export function WebinarForm({ locale }: WebinarFormProps) {
  const t = useTranslations("webinar.form");
  const tCommon = useTranslations("signupMinimal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Submit to external endpoint
      await fetch(
        "https://signup.getwow.ai/december-webinar-registration44578761",
        {
          method: "POST",
          body: formData,
        },
      );

      // Redirect to our success page
      window.location.href = `/${locale}/webinar-registration-success`;
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still redirect even if there's an error
      window.location.href = `/${locale}/webinar-registration-success`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Input
        type="text"
        name="name"
        placeholder={t("name")}
        className={locale === "ar" ? "text-right" : "text-left"}
        required
      />

      <Input
        type="email"
        name="email"
        placeholder={t("email")}
        className={locale === "ar" ? "text-right" : "text-left"}
        required
      />

      <Input
        type="tel"
        name="phone"
        placeholder={t("phone")}
        className={locale === "ar" ? "text-right" : "text-left"}
        required
      />

      <Input
        type="text"
        name="store_name"
        placeholder={t("storeName")}
        className={locale === "ar" ? "text-right" : "text-left"}
        required
      />

      <Select
        name="platform"
        className={locale === "ar" ? "text-right" : "text-left"}
        required
      >
        <option value="">{t("platform")}</option>
        <option value="salla">{tCommon("platform_1")}</option>
        <option value="shopify">{tCommon("platform_2")}</option>
        <option value="zid">{tCommon("platform_3")}</option>
      </Select>

      <Select
        name="avg_orders"
        className={locale === "ar" ? "text-right" : "text-left"}
        required
      >
        <option value="">{t("avgOrders")}</option>
        <option value="less-10">{t("avgOrdersOptions.less10")}</option>
        <option value="10-50">{t("avgOrdersOptions.between10_50")}</option>
        <option value="more-50">{t("avgOrdersOptions.more50")}</option>
      </Select>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#AEDF1A] hover:bg-[#9EC615] text-[#303C0A] font-semibold text-lg py-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
