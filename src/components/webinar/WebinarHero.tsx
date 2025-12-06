import { useTranslations } from "next-intl";

export function WebinarHero() {
  const t = useTranslations("webinar.hero");

  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold text-[#21314d] leading-tight">
        {t("title")}
      </h1>

      <p className="text-2xl md:text-3xl text-[#21314d] leading-tight">
        {t("subtitle")}
      </p>

      <div className="inline-block bg-white px-6 py-3 rounded-lg">
        <p className="text-lg md:text-xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded">
          {t("liveNotice")}
        </p>
      </div>
    </div>
  );
}
