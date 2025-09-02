"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      // Replace the locale in the current pathname
      const segments = pathname.split("/");
      segments[1] = newLocale; // Replace the locale segment
      const newPath = segments.join("/");

      router.push(newPath);
    });
  };

  const currentLocale = params.locale as string;
  const otherLanguage = languages.find((lang) => lang.code !== currentLocale);

  if (!otherLanguage) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => switchLanguage(otherLanguage.code)}
      disabled={isPending}
      className="flex items-center gap-2 min-w-[120px]"
    >
      <Globe className="h-4 w-4" />
      <span>{otherLanguage.flag}</span>
      <span className="hidden sm:inline">{otherLanguage.name}</span>
    </Button>
  );
}
