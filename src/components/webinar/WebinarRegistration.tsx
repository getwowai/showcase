"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { WebinarSignUp } from "./WebinarSignUp";

interface WebinarRegistrationProps {
  locale: string;
}

export function WebinarRegistration({ locale }: WebinarRegistrationProps) {
  const t = useTranslations("webinar.registration");
  const isRTL = locale === "ar";
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [webinarDate, setWebinarDate] = useState<string | null>(null);
  const [webinarTime, setWebinarTime] = useState<string | null>(null);

  // Get datetime from environment variable
  const webinarDatetime = process.env.NEXT_PUBLIC_WEBINAR_DATETIME;

  useEffect(() => {
    if (!webinarDatetime) {
      setWebinarDate(null);
      setWebinarTime(null);
      return;
    }

    const targetDate = new Date(webinarDatetime);

    if (isRTL) {
      // Arabic: Gregorian calendar explicitly (ar-SA defaults to Islamic calendar)
      const dateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      // Format: "الثلاثاء ٢ ديسمبر"
      setWebinarDate(dateFormatter.format(targetDate));

      // Time format: "٣ ظهراً – توقيت الرياض"
      const timeFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
        hour: "numeric",
        dayPeriod: "short",
        timeZone: "Asia/Riyadh",
      });
      const timeString = timeFormatter.format(targetDate);
      setWebinarTime(`${timeString} – توقيت الرياض`);
    } else {
      // English: Standard Gregorian formatting
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      });

      setWebinarDate(dateFormatter.format(targetDate));
      setWebinarTime(timeFormatter.format(targetDate));
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [webinarDatetime, isRTL]);

  return (
    <div className="bg-white rounded-lg p-8 md:p-12 space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#21314d] text-center">
        {t("title")}
      </h2>

      {/* Date and Time with Icons or Fallback Message */}
      {webinarDate && webinarTime ? (
        <div className="flex flex-col items-center gap-4">
          <div
            className={`flex items-center gap-3 text-lg md:text-xl font-semibold text-[#21314d] ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Calendar className="w-6 h-6 text-[#AEDF1A]" />
            <span>{webinarDate}</span>
          </div>
          <div
            className={`flex items-center gap-3 text-lg md:text-xl font-semibold text-[#21314d] ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Clock className="w-6 h-6 text-[#AEDF1A]" />
            <span>{webinarTime}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-lg md:text-xl text-gray-600">{t("noScheduled")}</p>
        </div>
      )}

      <WebinarSignUp />

      {/* Countdown Timer - Only show if webinar is scheduled */}
      {webinarDate && webinarTime && (
        <div
          className={`flex justify-center gap-4 md:gap-8 text-center ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="space-y-2">
            <div className="text-3xl md:text-5xl font-bold text-[#21314d]">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-600">{t("day")}</div>
          </div>
          <div className="text-3xl md:text-5xl font-bold text-[#21314d] flex items-center">
            :
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-5xl font-bold text-[#21314d]">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-600">{t("hour")}</div>
          </div>
          <div className="text-3xl md:text-5xl font-bold text-[#21314d] flex items-center">
            :
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-5xl font-bold text-[#21314d]">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-600">
              {t("minute")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
