"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Footer from "@/components/Footer";
import { WebinarHero } from "@/components/webinar/WebinarHero";
import { WebinarContent } from "@/components/webinar/WebinarContent";
import { WebinarRegistration } from "@/components/webinar/WebinarRegistration";
import { WebinarExperts } from "@/components/webinar/WebinarExperts";

export default function WebinarPage() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen bg-[#F4F8FF]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Language Switcher - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Header with Logo */}
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-center">
          <Image
            src="/waiting-landing/logo.png"
            alt="WOW AI"
            width={150}
            height={50}
            className="h-auto w-[150px] md:w-[180px]"
            priority
          />
        </div>
      </header>

      <main>
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl space-y-12">
          {/* Hero Section */}
          <section>
            <WebinarHero />
          </section>

          {/* Two Column Layout - Responsive to RTL */}
          <div
            className={`grid md:grid-cols-2 gap-8 ${isRTL ? "md:grid-flow-dense" : ""}`}
          >
            {/* Content Column */}
            <section className={isRTL ? "md:order-2" : ""}>
              <WebinarContent />
            </section>

            {/* Registration Form Column */}
            <section className={isRTL ? "md:order-1" : ""}>
              <WebinarRegistration locale={locale} />
            </section>
          </div>

          {/* Expert Section */}
          <section>
            <WebinarExperts locale={locale} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
