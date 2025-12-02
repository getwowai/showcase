import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSignUp } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/button";

export const SignUp = () => {
  const t = useTranslations("signupMinimal");

  const router = useRouter();
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

  useEffect(() => {
    const { email, name, storeName, phoneNumber, password, platform } =
      signUpParams;
    if (email && name && storeName && phoneNumber && password && platform) {
      setIsSignUpDisabled(false);
    }
  }, [signUpParams]);
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

  const handleSignUpClick = async () => {
    if (isLoaded && !signUp) return;
    setLoading(true);
    const url =
      `${process.env.NEXT_PUBLIC_WOW_APP_URL}/sign-in` ||
      "https://app.getwow.ai/sign-in";
    try {
      const response = await signUp?.create({
        emailAddress: signUpParams.email,
        password: signUpParams.password,
        firstName: signUpParams.name,
      });

      if (response?.status === "complete" && response.createdUserId) {
        router.push(url);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("already signed")) {
          router.push(url);
        }
        setError(err.message); // safe because we know it's an Error
      } else {
        // fallback if it's not an Error object
        setError(String(err));
      }

      setOpen(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder={t("enterYourEmail")}
          required
          className="text-lg h-14 w-full"
          name="email"
          onChange={handleInputChange}
        />

        <Input
          type="text"
          placeholder={t("name")}
          required
          className="text-lg h-14 w-full"
          name="name"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder={t("storeName")}
          required
          className="text-lg h-14 w-full"
          name="storeName"
          onChange={handleInputChange}
        />

        <Input
          type="text"
          placeholder={t("phoneNumberWithWtsup")}
          required
          className="text-lg h-14 w-full"
          name="phoneNumber"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="password"
          placeholder={t("password")}
          required
          className="text-lg h-14 w-full"
          name="password"
          onChange={handleInputChange}
        />
        <Select onChange={handleInputChange} name="platform" className="w-full">
          <option value="">{t("choosePlatform")}</option>
          <option value="salla">{t("platform_1")}</option>
          <option value="shopify">{t("platform_2")}</option>
          <option value="zid">{t("platform_3")}</option>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          disabled={isSignUpDisabled || loading}
          size="lg"
          className="
    w-full h-14 px-6
    bg-[#95BF47] text-white font-bold text-lg
    border-2 border-[#95BF47]
    hover:bg-white hover:text-[#5E8E3E]
    shadow-lg hover:shadow-xl transform hover:scale-105
    transition-all rounded-[12px]
    flex items-center justify-center gap-2
    cursor-pointer
  "
          onClick={handleSignUpClick}
        >
          {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
          <span className={loading ? "opacity-70" : ""}>{t("signUp")}</span>
        </Button>

        <div id="clerk-captcha"></div>
      </div>

      {error && (
        <Toast title={error} open={open} setOpen={setOpen} variant="error" />
      )}
    </div>
  );
};
