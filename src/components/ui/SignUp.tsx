import { useState, useEffect, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useSignUp } from "@clerk/clerk-react";
import * as Sentry from "@sentry/nextjs";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";
import countryCodesData from "@/lib/country-codes.json";

export const SignUp = () => {
  const t = useTranslations("signupMinimal");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const { signUp, isLoaded } = useSignUp();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const [countryCode, setCountryCode] = useState("+966"); // Default to Saudi Arabia
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
    // Validate phone number: must be 9-15 digits (allowing for various formats)
    const isValidPhone = /^\d{9,15}$/.test(phoneNumber);

    // Update field errors
    const errors = {
      email: touched.email && email && !isValidEmail ? t("invalidEmail") : "",
      phoneNumber:
        touched.phoneNumber && phoneNumber && !isValidPhone
          ? t("invalidPhone")
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

    // Combine country code with phone number
    const fullPhoneNumber = `${countryCode}${signUpParams.phoneNumber}`;

    try {
      const response = await signUp?.create({
        emailAddress: signUpParams.email,
        password: signUpParams.password,
        unsafeMetadata: {
          firstName: signUpParams.name,
          storeName: signUpParams.storeName,
          phoneNumber: fullPhoneNumber,
          platform: signUpParams.platform,
        },
      });

      if (response?.status === "complete" && response.createdSessionId) {
        // User is automatically signed in, redirect to app with UTM parameters
        const redirectUrl = new URL(baseUrl);
        redirectUrl.searchParams.set("utm_source", "showcase");
        redirectUrl.searchParams.set("utm_medium", "signup");
        redirectUrl.searchParams.set("utm_campaign", "showcase-signup");
        window.location.href = redirectUrl.toString();
      }
    } catch (err: unknown) {
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

      if (err instanceof Error) {
        if (err.message.includes("already signed")) {
          // User already exists, send to sign-in page with UTM parameters
          const signInUrl = new URL(`${baseUrl}/sign-in`);
          signInUrl.searchParams.set("utm_source", "showcase");
          signInUrl.searchParams.set("utm_medium", "signup");
          signInUrl.searchParams.set("utm_campaign", "showcase-signup");
          window.location.href = signInUrl.toString();
          return;
        }
        // Map common Clerk errors to user-friendly messages
        const errorMessage = err.message.includes("password")
          ? t("passwordError")
          : err.message.includes("email")
            ? t("emailError")
            : t("genericError");
        setError(errorMessage);
      } else {
        setError(t("genericError"));
      }
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
              className="text-sm text-red-600 px-1 font-medium"
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
          <div
            className={`flex gap-2 w-full ${isRTL ? "flex-row-reverse" : "flex-row"}`}
          >
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-28 text-base h-14"
              aria-label={t("countryCode")}
              dir="ltr"
            >
              {countryCodesData.countries
                .sort((a, b) => a.code.localeCompare(b.code))
                .map((country) => (
                  <option key={country.name} value={country.code}>
                    {country.code}
                  </option>
                ))}
            </Select>
            <Input
              type="tel"
              placeholder={`${isRTL ? "5xxxxxxxx" : "5xxxxxxxx"} *`}
              required
              className="text-lg h-14 flex-1"
              name="phoneNumber"
              value={signUpParams.phoneNumber}
              onChange={handleInputChange}
              onBlur={() => handleBlur("phoneNumber")}
              aria-label={t("phoneNumberWithWtsup")}
              dir="ltr"
              pattern="[0-9]{9,15}"
              aria-invalid={!!fieldErrors.phoneNumber ? "true" : undefined}
              aria-describedby={
                fieldErrors.phoneNumber ? "phone-error" : undefined
              }
            />
          </div>
          {fieldErrors.phoneNumber && (
            <p
              id="phone-error"
              className="text-sm text-red-600 px-1 font-medium"
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
              className="text-sm text-red-600 px-1 font-medium"
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

      {error && (
        <Toast title={error} open={open} setOpen={setOpen} variant="error" />
      )}
    </form>
  );
};
