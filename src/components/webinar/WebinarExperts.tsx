import { useTranslations } from "next-intl";
import Image from "next/image";

interface WebinarExpertsProps {
  locale: string;
}

export function WebinarExperts({ locale }: WebinarExpertsProps) {
  const t = useTranslations("webinar.experts");
  const isRTL = locale === "ar";

  return (
    <section className="bg-[#DBE6FA] py-12 rounded-lg">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#21314d] text-center mb-12">
          {t("title")}
        </h2>

        {/* Expert Card */}
        <div className="bg-[#D0DDF2] rounded-lg p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            {/* Expert Info - Takes 3 columns */}
            <div
              className={`md:col-span-3 space-y-4 ${isRTL ? "text-right md:order-1" : "text-left"}`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#21314d]">
                {t("sherif.name")}
              </h3>
              <p className="text-lg font-semibold text-[#21314d]">
                {t("sherif.title")}
              </p>
              <p className="text-base md:text-lg text-[#21314d] leading-relaxed">
                {t("sherif.description")}
              </p>
            </div>

            {/* Expert Photo - Takes 1 column */}
            <div
              className={`md:col-span-1 flex justify-center ${isRTL ? "md:order-2" : ""}`}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
                <Image
                  src="/sherif.png"
                  alt={t("sherif.name")}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
