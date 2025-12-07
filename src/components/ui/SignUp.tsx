import { useState, useEffect, useMemo } from "react";
import { Loader2, CheckCircle } from "lucide-react";
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

export const SignUp = ({
  showPromoText = false,
}: {
  showPromoText?: boolean;
}) => {
  const t = useTranslations("signupMinimal");
  const tHome = useTranslations("homepage");
  const tWaiting = useTranslations("waitingList");
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
  });
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    storeName: false,
    phoneNumber: false,
    password: false,
    platform: false,
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
    return t("signUp");
  }, [loading, t]);

  useEffect(() => {
    const { email, name, storeName, phoneNumber, password, platform } =
      signUpParams;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 8;
    const hasCountryCode = phoneNumber.trim().startsWith("+");
    // Validate phone number: must include country code (+) and 9-15 digits
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
    setMissingFields(missing);

    if (
      isValidEmail &&
      isValidPassword &&
      name.trim() &&
      storeName.trim() &&
      isValidPhone &&
      platform
    ) {
      setIsSignUpDisabled(false);
    } else {
      setIsSignUpDisabled(true);
    }
  }, [signUpParams, touched, t]);

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
    // Note: This event is tracked with Mixpanel's auto-generated anonymous distinct_id
    // The main app will call mixpanel.alias(userId) and mixpanel.identify(userId) after signup
    // to connect this anonymous profile to the authenticated user
    trackEvent("signup_landing_attempted", {
      platform: signUpParams.platform,
      locale,
      has_store_name: !!signUpParams.storeName,
      has_phone_number: !!signUpParams.phoneNumber,
      country_code: countryCodeForTracking || undefined,
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
        },
      });

      if (response?.status === "complete" && response.createdSessionId) {
        // Track successful signup
        // Note: This event is tracked with Mixpanel's auto-generated anonymous distinct_id
        // The main app will call mixpanel.alias(userId) and mixpanel.identify(userId) after signup
        // to connect this anonymous profile to the authenticated user
        trackEvent("signup_landing_success", {
          platform: signUpParams.platform,
          locale,
          has_store_name: !!signUpParams.storeName,
          has_phone_number: !!signUpParams.phoneNumber,
          country_code: countryCodeForTracking || undefined,
        });

        // Redirect to signup success page for conversion tracking
        // Pass locale as query param so the page can detect user's language
        window.location.href = `/signup-success?locale=${locale}`;
      }
    } catch (err: unknown) {
      // Determine error type
      let errorType = "unknown";
      let errorMessage = t("genericError");

      if (err instanceof Error) {
        if (err.message.includes("already signed")) {
          errorType = "user_already_exists";
          // Track failed signup due to existing user
          trackEvent("signup_landing_failed", {
            error_type: errorType,
            error_message: "User already exists",
            platform: signUpParams.platform,
            locale,
            has_store_name: !!signUpParams.storeName,
            has_phone_number: !!signUpParams.phoneNumber,
            country_code: countryCodeForTracking || undefined,
          });

          // User already exists, send to sign-in page with UTM parameters
          const signInUrl = new URL(`${baseUrl}/sign-in`);
          signInUrl.searchParams.set("utm_source", "showcase");
          signInUrl.searchParams.set("utm_medium", "signup");
          signInUrl.searchParams.set("utm_campaign", "showcase-signup");
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
      trackEvent("signup_landing_failed", {
        error_type: errorType,
        error_message: err instanceof Error ? err.message : "Unknown error",
        platform: signUpParams.platform,
        locale,
        has_store_name: !!signUpParams.storeName,
        has_phone_number: !!signUpParams.phoneNumber,
        country_code: countryCodeForTracking || undefined,
      });

      // Capture error in Sentry with context
      Sentry.captureException(err, {
        tags: {
          component: "SignUp",
          locale: locale,
        },
        contexts: {
          signup: {
            email: signUpParams.email,
            platform: signUpParams.platform,
            hasStoreName: !!signUpParams.storeName,
            hasPhoneNumber: !!signUpParams.phoneNumber,
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
      aria-label={t("signUp")}
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

      {/* Promo text under button */}
      {showPromoText && (
        <div className="mt-3 text-center">
          <p
            className="text-base md:text-lg font-bold text-white [&_del]:opacity-80 [&_del]:text-white [&_del]:decoration-2"
            dangerouslySetInnerHTML={{
              __html: tWaiting.raw("finalCtaTitle"),
            }}
          />
        </div>
      )}

      {error && (
        <Toast title={error} open={open} setOpen={setOpen} variant="error" />
      )}

      {/* Benefits badges */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {[
          tHome("freeTrialBadge"),
          tHome("noCreditCardBadge"),
          tHome("setupInMinutesBadge"),
        ].map((benefit, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm"
          >
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-white font-medium">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Social proof banner */}
      <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-gray-800 font-medium">
            {tHome("socialProofTagline")}
          </span>
        </div>
      </div>

      <div
        className="text-sm text-center text-white font-bold mt-4"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {t("alreadyCustomer")}{" "}
        <a
          href="https://app.getwow.ai/sign-in"
          className="font-bold text-white hover:underline"
        >
          {t("signInLink")}
        </a>
      </div>
    </form>
  );
};
