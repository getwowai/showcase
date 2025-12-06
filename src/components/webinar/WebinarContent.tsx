import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export function WebinarContent() {
  const t = useTranslations("webinar.content");

  const benefits = [
    t("benefits.strategy"),
    t("benefits.sequencing"),
    t("benefits.timing"),
    t("benefits.aiTool"),
  ];

  return (
    <div className="bg-[#2F3A4E] text-white rounded-lg p-8 md:p-12 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">{t("dontWaste")}</h2>
        <p className="text-2xl md:text-3xl text-[#B8D1FF]">{t("startNow")}</p>
      </div>

      <div className="h-px bg-gray-600 my-8" />

      <div className="space-y-6">
        <p className="text-lg md:text-xl leading-relaxed">{t("description")}</p>

        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-6 h-6 text-[#AEDF1A] flex-shrink-0 mt-1" />
              <span className="text-base md:text-lg">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
