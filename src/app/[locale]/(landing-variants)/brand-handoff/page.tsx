"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { useTracking } from "@/experiments/tracking";

import styles from "./brand-handoff.module.css";

const WEBINAR_URL = "https://www.wow-webinar.com";
const CONTACT_EMAIL = "hello@getwow.ai";

/** Distance past the hero at which the nav flips to its solid state. */
const NAV_FLIP_OFFSET = 80;
/** Per-sibling stagger for the scroll reveal. */
const REVEAL_STAGGER_MS = 70;

/**
 * Brand Handoff Variant — the WOW AI company page.
 *
 * Answers "what is getwow.ai?" for anyone arriving from a business card, an
 * @getwow.ai email, or a search for the company name — while the business
 * itself runs on wow-webinar.com.
 *
 * It exists because getwow.ai is primarily an identity domain rather than a
 * website: it carries the company's Google Workspace mail and is the SendGrid
 * sending domain for hello@getwow.ai. A redirect would retire the name and
 * leave that mismatch permanently unexplained, so the page states the
 * relationship instead: WOW AI is the company, WOW Webinar is its product.
 *
 * VISUAL PARITY: this is a port of the approved static design, and it adopts
 * the WOW Webinar landing's brand system wholesale — near-black and coral,
 * Fraunces display over Outfit body, the "WOW | ai" wordmark built the same way
 * as "WOW | webinar". Someone who has seen wow-webinar.com should recognise
 * this page as the same company before reading a word of it. Styles live in
 * ./brand-handoff.module.css; the fonts are registered in the locale layout.
 *
 * Distinct from the ai-native-products variant, which is a full investor
 * narrative with capabilities, founders and a closing CTA. This one is a single
 * scroll: who we are, what we make, where to go next.
 *
 * Bilingual via next-intl and RTL-aware — the arrows follow the reading
 * direction, the Arabic type scale is its own (Readex Pro needs more room than
 * Outfit), and logical properties are used throughout.
 *
 * Registered in src/lib/variant-config.ts and rendered from
 * src/app/[locale]/page.tsx when the resolved variant is "brand-handoff".
 * Route-scoped metadata lives in ./layout.tsx.
 */
export default function BrandHandoffPage() {
  const t = useTranslations("brandHandoff");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { trackEvent } = useTracking();

  const router = useRouter();
  const pathname = usePathname();
  const [isSwitching, startSwitching] = useTransition();

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    trackEvent("variant_viewed", { variant: "brand-handoff", locale });
  }, [trackEvent, locale]);

  /* Nav goes solid once the hero has scrolled past — the transparent state is
     only legible over the black hero. */
  useEffect(() => {
    const onScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? 0;
      setIsScrolled(window.scrollY > heroHeight - NAV_FLIP_OFFSET);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll reveal. Driven by class toggles rather than per-element React state
     because the elements are static markup and the observer runs once per
     element — re-rendering the page on every intersection would cost more than
     the effect saves. Each element is delayed by its index among its revealing
     siblings, which is what gives the steps their cascade. */
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(`.${styles.rv}`),
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add(styles.in));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter((child) =>
                child.classList.contains(styles.rv),
              )
            : [];

          el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * REVEAL_STAGGER_MS}ms`;
          el.classList.add(styles.in);
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const track = (event: string, destination: string) =>
    trackEvent(event, { variant: "brand-handoff", destination, locale });

  const switchLanguage = () => {
    const nextLocale = isRTL ? "en" : "ar";
    trackEvent("language_switched", {
      variant: "brand-handoff",
      from: locale,
      to: nextLocale,
    });

    startSwitching(() => {
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      router.push(segments.join("/"));
    });
  };

  /* Decorative: the arrow points along the reading direction, and is hidden
     from assistive tech so the link text is read on its own. */
  const arrow = isRTL ? "←" : "→";
  const arrowGlyph = <span aria-hidden="true">{arrow}</span>;

  /* Rich-text tags shared by the headline and product copy. `ltr` isolates a
     Latin product name inside Arabic so bidi cannot reorder it. */
  const tags = {
    nw: (chunks: ReactNode) => <span className={styles.nw}>{chunks}</span>,
    hl: (chunks: ReactNode) => <span className={styles.hl}>{chunks}</span>,
    ltr: (chunks: ReactNode) => (
      <span className={`${styles.ltr} ${styles.nw}`}>{chunks}</span>
    ),
    strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  };

  const steps = [
    { tone: styles.tCoral, icon: "🖥️", key: "step1" },
    { tone: styles.tPurple, icon: "🎨", key: "step2" },
    { tone: styles.tGreen, icon: "💬", key: "step3" },
    { tone: styles.tBlue, icon: "📹", key: "step4" },
    { tone: styles.tOrange, icon: "📩", key: "step5" },
    { tone: styles.tGray, icon: "📈", key: "step6" },
  ] as const;

  /* The wordmark is a logotype, not copy: "WOW" in the heavy face, a hairline
     rule, then the property name. Same construction as the WOW Webinar mark. */
  const wordmark = (property: string) => (
    <>
      <span className={styles.wmWow}>WOW</span>
      <span className={styles.wmSep} />
      <span className={styles.wmSub}>{property}</span>
    </>
  );

  return (
    <div
      ref={pageRef}
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${styles.page} ${isRTL ? `${styles.ar} ${styles.rtl}` : ""}`}
    >
      <header className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={`${styles.container} ${styles.navInner}`}>
          <a href="#top" className={styles.wm} aria-label={t("homeLabel")}>
            {wordmark("ai")}
          </a>

          <nav className={styles.navLinks} aria-label={t("primaryNavLabel")}>
            <a href="#product">{t("navProduct")}</a>
            <a href="#contact">{t("navContact")}</a>
          </nav>

          <div className={styles.navActions}>
            <button
              type="button"
              className={styles.lang}
              onClick={switchLanguage}
              disabled={isSwitching}
              aria-label={t("langSwitchLabel")}
            >
              {t("langSwitch")}
            </button>
            <a
              className={`${styles.btn} ${styles.btnWhite} ${styles.btnSm}`}
              href={WEBINAR_URL}
              onClick={() => track("nav_cta_clicked", WEBINAR_URL)}
            >
              {t("navCta")} {arrowGlyph}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ===== Hero ===== */}
        <section className={styles.hero} id="top" ref={heroRef}>
          <div className={styles.container}>
            <div className={`${styles.heroTag} ${styles.rv}`}>
              <span className={styles.heroTagDot} />
              <span>{t("heroTag")}</span>
            </div>

            <h1 className={`${styles.heroTitle} ${styles.rv}`}>
              {t.rich("heroTitle", tags)}
            </h1>

            <p className={`${styles.heroSub} ${styles.rv}`}>
              {t("heroSubtitle")}
            </p>

            <div className={`${styles.heroCta} ${styles.rv}`}>
              <a
                className={`${styles.btn} ${styles.btnAccent}`}
                href={WEBINAR_URL}
                onClick={() => track("hero_cta_clicked", WEBINAR_URL)}
              >
                {t("heroCtaPrimary")} {arrowGlyph}
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#contact">
                {t("heroCtaSecondary")}
              </a>
            </div>

            <div className={`${styles.heroMeta} ${styles.rv}`}>
              <span>{t("backedBy")}</span>
              <Image
                src="/500_Global_Logo_White.svg"
                alt="500 Global"
                width={140}
                height={48}
              />
            </div>
          </div>
          <div className={styles.heroBar} />
        </section>

        {/* ===== Product ===== */}
        <section className={styles.product} id="product">
          <div className={`${styles.container} ${styles.productGrid}`}>
            <div className={styles.productCopy}>
              <span className={`${styles.label} ${styles.rv}`}>
                {t("productLabel")}
              </span>
              <h2 className={`${styles.h2} ${styles.rv}`}>
                {t.rich("productTitle", tags)}
              </h2>
              <p className={`${styles.lead} ${styles.rv}`}>
                {t.rich("productBody1", tags)}
              </p>
              <p className={`${styles.lead} ${styles.rv}`}>
                {t("productBody2")}
              </p>
              <ul className={`${styles.checks} ${styles.rv}`}>
                <li>{t("check1")}</li>
                <li>{t("check2")}</li>
                <li>{t("check3")}</li>
                <li>{t("check4")}</li>
              </ul>
              <a
                className={`${styles.btn} ${styles.btnPrimary} ${styles.rv}`}
                href={WEBINAR_URL}
                onClick={() => track("product_cta_clicked", WEBINAR_URL)}
              >
                {t("productCta")} {arrowGlyph}
              </a>
            </div>

            <div
              className={`${styles.pipeWrap} ${styles.rv}`}
              aria-label={t("pipelineLabel")}
            >
              <span className={styles.pipeDeco} aria-hidden="true" />
              <div className={styles.pipe}>
                <div className={styles.pipeHead}>
                  <span className={`${styles.wm} ${styles.wmSm}`}>
                    {wordmark("webinar")}
                  </span>
                  <span className={styles.live}>
                    <i className={styles.liveDot} />
                    <span>{t("pipelineTag")}</span>
                  </span>
                </div>

                <ol className={styles.steps}>
                  {steps.map(({ tone, icon, key }) => (
                    <li key={key} className={`${styles.step} ${styles.rv}`}>
                      <span
                        className={`${styles.ico} ${tone}`}
                        aria-hidden="true"
                      >
                        {icon}
                      </span>
                      <span className={styles.stepTxt}>
                        <b>{t(`${key}Title`)}</b>
                        <span>{t(`${key}Desc`)}</span>
                      </span>
                      <span className={styles.ok} aria-hidden="true">
                        ✓
                      </span>
                    </li>
                  ))}
                </ol>

                <div className={styles.pipeOut}>
                  <span>
                    <span>{t("pipelineOutput")}</span>
                    <small>{t("pipelineOutputDesc")}</small>
                  </span>
                  <span className={styles.pipeOutArrow} aria-hidden="true">
                    {arrow}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section className={styles.contact} id="contact">
          <div className={`${styles.container} ${styles.contactGrid}`}>
            <div>
              <span className={`${styles.label} ${styles.rv}`}>
                {t("contactLabel")}
              </span>
              <h2 className={`${styles.h2} ${styles.rv}`}>
                {t("contactTitle")}
              </h2>
              <p className={`${styles.lead} ${styles.rv}`}>
                {t("contactSubtitle")}
              </p>
              <a
                className={`${styles.mail} ${styles.rv}`}
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => track("contact_clicked", CONTACT_EMAIL)}
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className={`${styles.backed} ${styles.rv}`}>
              <span className={styles.role}>{t("backedBy")}</span>
              <Image
                src="/500_Global_Logo_White.svg"
                alt="500 Global"
                width={140}
                height={48}
              />
              <p>{t("backedNote")}</p>
            </div>
          </div>

          <footer className={styles.footer}>
            <div className={`${styles.container} ${styles.foot}`}>
              <a
                href="#top"
                className={`${styles.wm} ${styles.wmSm} ${styles.wmLight}`}
                aria-label={t("homeLabel")}
              >
                {wordmark("ai")}
              </a>
              <span>{t("footer")}</span>
              <div className={styles.footLinks}>
                <a
                  href={WEBINAR_URL}
                  onClick={() => track("footer_link_clicked", WEBINAR_URL)}
                >
                  wow-webinar.com
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() => track("footer_link_clicked", CONTACT_EMAIL)}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
