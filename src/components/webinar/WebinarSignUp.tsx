"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useSignUp } from "@clerk/clerk-react";
import * as Sentry from "@sentry/nextjs";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import { useMixpanelTracking } from "@/lib/mixpanel-tracking";

const normalizePhoneNumber = (value: string) =>
  value.replace(/[\s-]/g, "").replace(/[^\d+]/g, "");

const extractCountryCode = (normalizedPhone: string) => {
  const match = normalizedPhone.match(/^(\+\d{1,3})/);
  return match ? match[1] : "";
};

const isPhoneNumberValid = (value: string) => {
  const stripped = value.replace(/[\s-]/g, "");
  if (!stripped.startsWith("+")) return false;
  const digits = stripped.slice(1).replace(/\D/g, "");
  return /^\d{9,15}$/.test(digits);
};

export const WebinarSignUp = () => {
  const t = useTranslations("signupMinimal");
  const tWebinar = useTranslations("webinar.form");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { trackEvent } = useMixpanelTracking();

  const { signUp, isLoaded } = useSignUp();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const [signUpParams, setSignUpParams] = useState({
    email: "",
    name: "",
    storeName: "",
    phoneNumber: "",
    password: "",
    platform: "",
    avgOrders: "", // Additional field for webinar
  });
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    storeName: false,
    phoneNumber: false,
    password: false,
    platform: false,
    avgOrders: false,
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  // Memoize button text to prevent flickering
  const buttonText = useMemo(() => {
    if (loading) return t("creatingAccount");
    return tWebinar("submit");
  }, [loading, t, tWebinar]);

  useEffect(() => {
    const {
      email,
      name,
      storeName,
      phoneNumber,
      password,
      platform,
      avgOrders,
    } = signUpParams;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 8;
    const hasCountryCode = phoneNumber.trim().startsWith("+");
    const isValidPhone = isPhoneNumberValid(phoneNumber);

    // Update field errors
    const errors = {
      email: touched.email && email && !isValidEmail ? t("invalidEmail") : "",
      phoneNumber:
        touched.phoneNumber && phoneNumber
          ? !hasCountryCode
            ? t("phoneCountryCodeError")
            : !isValidPhone
              ? t("invalidPhone")
              : ""
          : "",
      password:
        touched.password && password && !isValidPassword
          ? t("passwordHint")
          : "",
    };
    setFieldErrors(errors);

    // Track missing fields
    const missing: string[] = [];
    if (!email) missing.push(t("enterYourEmail"));
    else if (!isValidEmail) missing.push(t("enterYourEmail") + " (valid)");
    if (!name.trim()) missing.push(t("name"));
    if (!storeName.trim()) missing.push(t("storeName"));
    if (!phoneNumber) missing.push(t("phoneNumberWithWtsup"));
    else if (!hasCountryCode) missing.push(t("phoneCountryCodeError"));
    else if (!isValidPhone)
      missing.push(t("phoneNumberWithWtsup") + " (valid)");
    if (!password) missing.push(t("password"));
    else if (!isValidPassword) missing.push(t("password") + " (8+ chars)");
    if (!platform) missing.push(t("choosePlatform"));
    if (!avgOrders) missing.push(tWebinar("avgOrders"));
    setMissingFields(missing);

    if (
      isValidEmail &&
      isValidPassword &&
      name.trim() &&
      storeName.trim() &&
      isValidPhone &&
      platform &&
      avgOrders
    ) {
      setIsSignUpDisabled(false);
    } else {
      setIsSignUpDisabled(true);
    }
  }, [signUpParams, touched, t, tWebinar]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setSignUpParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Submit to webinar endpoint in the background
  const submitToWebinarEndpoint = async () => {
    try {
      const formData = new FormData();
      formData.append("name", signUpParams.name);
      formData.append("email", signUpParams.email);
      formData.append("phone", normalizePhoneNumber(signUpParams.phoneNumber));
      formData.append("store_name", signUpParams.storeName);
      formData.append("platform", signUpParams.platform);
      formData.append("avg_orders", signUpParams.avgOrders);

      await fetch(
        "https://signup.getwow.ai/december-webinar-registration44578761",
        {
          method: "POST",
          body: formData,
        },
      );
    } catch (error) {
      // Log error but don't block the signup flow
      console.error("Error submitting to webinar endpoint:", error);
      Sentry.captureException(error, {
        tags: {
          component: "WebinarSignUp",
          action: "webinar_endpoint_submission",
        },
      });
    }
  };

  const handleSignUpClick = async () => {
    if (isLoaded && !signUp) return;
    setLoading(true);
    setError(undefined);

    const baseUrl =
      process.env.NEXT_PUBLIC_WOW_APP_URL ?? "https://app.getwow.ai";

    const normalizedPhoneNumber = normalizePhoneNumber(
      signUpParams.phoneNumber,
    );
    const countryCodeForTracking = extractCountryCode(normalizedPhoneNumber);

    // Track signup attempt
    trackEvent("webinar_signup_attempted", {
      platform: signUpParams.platform,
      locale,
      has_store_name: !!signUpParams.storeName,
      has_phone_number: !!signUpParams.phoneNumber,
      country_code: countryCodeForTracking || undefined,
      avg_orders: signUpParams.avgOrders,
    });

    try {
      const response = await signUp?.create({
        emailAddress: signUpParams.email,
        password: signUpParams.password,
        unsafeMetadata: {
          firstName: signUpParams.name,
          storeName: signUpParams.storeName,
          phoneNumber: normalizedPhoneNumber,
          platform: signUpParams.platform,
          avgOrders: signUpParams.avgOrders,
          webinarRegistration: true,
        },
      });

      if (response?.status === "complete" && response.createdSessionId) {
        // Track successful signup
        trackEvent("webinar_signup_success", {
          platform: signUpParams.platform,
          locale,
          has_store_name: !!signUpParams.storeName,
          has_phone_number: !!signUpParams.phoneNumber,
          country_code: countryCodeForTracking || undefined,
          avg_orders: signUpParams.avgOrders,
        });

        // Submit to webinar endpoint in the background (don't await)
        submitToWebinarEndpoint();

        // Redirect to webinar success page
        window.location.href = `/${locale}/webinar-registration-success`;
      }
    } catch (err: unknown) {
      // Determine error type
      let errorType = "unknown";
      let errorMessage = t("genericError");

      if (err instanceof Error) {
        if (err.message.includes("already signed")) {
          errorType = "user_already_exists";
          // Track failed signup due to existing user
          trackEvent("webinar_signup_failed", {
            error_type: errorType,
            error_message: "User already exists",
            platform: signUpParams.platform,
            locale,
            has_store_name: !!signUpParams.storeName,
            has_phone_number: !!signUpParams.phoneNumber,
            country_code: countryCodeForTracking || undefined,
            avg_orders: signUpParams.avgOrders,
          });

          // Submit to webinar endpoint even for existing users
          await submitToWebinarEndpoint();

          // User already exists, send to sign-in page with UTM parameters
          const signInUrl = new URL(`${baseUrl}/sign-in`);
          signInUrl.searchParams.set("utm_source", "webinar");
          signInUrl.searchParams.set("utm_medium", "signup");
          signInUrl.searchParams.set("utm_campaign", "webinar-signup");
          window.location.href = signInUrl.toString();
          return;
        } else if (err.message.includes("password")) {
          errorType = "password_error";
          errorMessage = t("passwordError");
        } else if (err.message.includes("email")) {
          errorType = "email_error";
          errorMessage = t("emailError");
        } else {
          errorType = "validation_error";
        }
      }

      // Track failed signup
      trackEvent("webinar_signup_failed", {
        error_type: errorType,
        error_message: err instanceof Error ? err.message : "Unknown error",
        platform: signUpParams.platform,
        locale,
        has_store_name: !!signUpParams.storeName,
        has_phone_number: !!signUpParams.phoneNumber,
        country_code: countryCodeForTracking || undefined,
        avg_orders: signUpParams.avgOrders,
      });

      // Capture error in Sentry with context
      Sentry.captureException(err, {
        tags: {
          component: "WebinarSignUp",
          locale: locale,
        },
        contexts: {
          signup: {
            email: signUpParams.email,
            platform: signUpParams.platform,
            hasStoreName: !!signUpParams.storeName,
            hasPhoneNumber: !!signUpParams.phoneNumber,
            avgOrders: signUpParams.avgOrders,
          },
        },
      });

      setError(errorMessage);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isSignUpDisabled && !loading) {
          handleSignUpClick();
        }
      }}
      className="flex flex-col gap-3"
      aria-label={tWebinar("submit")}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 space-y-1">
          <Input
            type="email"
            placeholder={`${t("enterYourEmail")} *`}
            required
            className="text-lg h-14 w-full"
            name="email"
            onChange={handleInputChange}
            onBlur={() => handleBlur("email")}
            aria-label={t("enterYourEmail")}
            aria-invalid={!!fieldErrors.email ? "true" : undefined}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p
              id="email-error"
              className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 font-medium"
            >
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="flex-1">
          <Input
            type="text"
            placeholder={`${t("name")} *`}
            required
            className="text-lg h-14 w-full"
            name="name"
            onChange={handleInputChange}
            onBlur={() => handleBlur("name")}
            aria-label={t("name")}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={`${t("storeName")} *`}
            required
            className="text-lg h-14 w-full"
            name="storeName"
            onChange={handleInputChange}
            aria-label={t("storeName")}
          />
        </div>

        <div className="flex-1 space-y-1">
          <Input
            type="tel"
            placeholder={`${t("phoneNumberWithWtsup")} *`}
            required
            className={`text-lg h-14 w-full ${isRTL ? "placeholder:text-right" : ""}`}
            name="phoneNumber"
            value={signUpParams.phoneNumber}
            onChange={handleInputChange}
            onBlur={() => handleBlur("phoneNumber")}
            aria-label={t("phoneNumberWithWtsup")}
            dir="ltr"
            inputMode="tel"
            aria-invalid={!!fieldErrors.phoneNumber ? "true" : undefined}
            aria-describedby={
              fieldErrors.phoneNumber ? "phone-error" : undefined
            }
          />
          {fieldErrors.phoneNumber && (
            <p
              id="phone-error"
              className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 font-medium"
            >
              {fieldErrors.phoneNumber}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 space-y-1">
          <Input
            type="password"
            placeholder={`${t("password")} *`}
            required
            minLength={8}
            className="text-lg h-14 w-full"
            name="password"
            onChange={handleInputChange}
            onBlur={() => handleBlur("password")}
            aria-label={t("password")}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
            aria-invalid={!!fieldErrors.password ? "true" : undefined}
          />
          {fieldErrors.password && (
            <p
              id="password-error"
              className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2 font-medium"
            >
              {fieldErrors.password}
            </p>
          )}
        </div>
        <div className="flex-1">
          <Select
            onChange={handleInputChange}
            name="platform"
            className="w-full h-14 text-lg"
            required
            aria-label={t("choosePlatform")}
          >
            <option value="">{t("choosePlatform")} *</option>
            <option value="salla">{t("platform_1")}</option>
            <option value="shopify">{t("platform_2")}</option>
            <option value="zid">{t("platform_3")}</option>
          </Select>
        </div>
      </div>

      {/* Additional webinar-specific field */}
      <div className="flex-1">
        <Select
          onChange={handleInputChange}
          name="avgOrders"
          className="w-full h-14 text-lg"
          required
          aria-label={tWebinar("avgOrders")}
        >
          <option value="">{tWebinar("avgOrders")} *</option>
          <option value="less-10">{tWebinar("avgOrdersOptions.less10")}</option>
          <option value="10-50">
            {tWebinar("avgOrdersOptions.between10_50")}
          </option>
          <option value="more-50">{tWebinar("avgOrdersOptions.more50")}</option>
        </Select>
      </div>

      <div className="relative">
        <Button
          type="button"
          onClick={() => {
            if (isSignUpDisabled && !loading) {
              setShowTooltip(true);
              setTimeout(() => setShowTooltip(false), 3000);
            } else if (!isSignUpDisabled && !loading) {
              handleSignUpClick();
            }
          }}
          disabled={loading}
          size="lg"
          className="
    w-full h-14 px-6
    bg-[#aedf1a] text-black font-bold text-lg
    border-2 border-[#aedf1a]
    hover:bg-[#9bc917] hover:border-[#9bc917]
    shadow-lg hover:shadow-xl transform hover:scale-105
    transition-all rounded-[12px]
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:hover:scale-100
    cursor-pointer
  "
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>{buttonText}</span>
            </>
          ) : (
            buttonText
          )}
        </Button>

        {/* Tooltip for missing fields */}
        {showTooltip && missingFields.length > 0 && (
          <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                      bg-gray-900 text-white rounded-lg py-3 px-4
                      shadow-xl z-50 w-[80%]"
          >
            <div className="font-semibold mb-2 text-base">
              {isRTL ? "يرجى ملء:" : "Please fill:"}
            </div>
            <ul className="space-y-1.5">
              {missingFields.map((field, index) => (
                <li key={index} className="text-sm">
                  • {field}
                </li>
              ))}
            </ul>
            {/* Arrow pointing down */}
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2
                        border-8 border-transparent border-t-gray-900"
            />
          </div>
        )}
      </div>

      {error && (
        <Toast title={error} open={open} setOpen={setOpen} variant="error" />
      )}
    </form>
  );
};
