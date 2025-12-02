import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return {
    title: "WOW AI Brand Assets - LLM Optimized",
    description:
      "Complete brand asset library with background-adaptive variants and AI design prompts. Optimized for modern web development and LLM-assisted design workflows.",
  };
}

export default async function BrandAssetsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            WOW AI Brand Assets
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete brand asset library optimized for modern web development,
            mobile apps, and AI-assisted design workflows. Features
            background-adaptive variants and comprehensive LLM prompts for
            consistent brand implementation.
          </p>
        </header>

        <div className="grid gap-8">
          {/* Primary Logos Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Primary Logos
            </h2>
            <div className="flex justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Primary Logo (Balanced Unity)
                </h3>
                <div className="bg-gray-50 p-8 rounded-lg">
                  <img
                    src="/brand-assets/logos/primary/wow-ai-primary-logo.svg"
                    alt="WOW AI Primary Logo"
                    className="max-w-full h-auto mx-auto scale-150"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Main brand logo for 90% of applications
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/brand-assets/logos/primary/wow-ai-primary-logo.png"
                    download="wow-ai-primary-logo.png"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PNG (400px)
                  </a>
                  <a
                    href="/brand-assets/logos/primary/wow-ai-primary-logo-300dpi.png"
                    download="wow-ai-primary-logo-300dpi.png"
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PNG (300 DPI)
                  </a>
                  <a
                    href="/brand-assets/logos/primary/wow-ai-primary-logo.svg"
                    download="wow-ai-primary-logo.svg"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download SVG
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Logo Resizing Guidelines */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Logo Resizing Guidelines
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  CSS-Based Resizing
                </h3>
                <p className="text-gray-600 mb-4">
                  Use the primary logo file and resize it with CSS classes. This
                  ensures consistent quality and design across all sizes.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Recommended CSS Classes:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">
                        h-28 md:h-44
                      </code>{" "}
                      - Hero size (large displays)
                    </li>
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">
                        h-12
                      </code>{" "}
                      - Header size (navigation)
                    </li>
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">h-8</code>{" "}
                      - Standard size (content areas)
                    </li>
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">h-6</code>{" "}
                      - Small size (footers, mobile)
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Usage Examples
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {`<img 
  src="/brand-assets/logos/primary/wow-ai-primary-logo.svg"
  alt="WOW AI"
  className="h-8 w-auto"
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Icon System Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Icon System
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  App Icon (64px)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="/brand-assets/icons/app/wow-ai-app-icon-64px.svg"
                    alt="WOW AI App Icon"
                    className="w-16 h-16 mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  iOS/Android apps, social media
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Standard Icon (32px)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="/brand-assets/icons/standard/wow-ai-standard-icon-32px.svg"
                    alt="WOW AI Standard Icon"
                    className="w-16 h-16 mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  UI elements, toolbar buttons
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Favicon (16px)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="/brand-assets/icons/favicon/wow-ai-favicon-16px.svg"
                    alt="WOW AI Favicon"
                    className="w-16 h-16 mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Browser tab, bookmarks
                </p>
              </div>
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Color Palette
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#aedf1a] border-2 border-white shadow-sm"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Lime Green (Primary)
                  </h3>
                  <p className="text-sm text-gray-600">#aedf1a</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#86c9e5] border-2 border-white shadow-sm"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Sky Blue (Secondary)
                  </h3>
                  <p className="text-sm text-gray-600">#86c9e5</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#4a5568] border-2 border-white shadow-sm"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Soft Charcoal (Text)
                  </h3>
                  <p className="text-sm text-gray-600">#4a5568</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Quick Reference
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                File Locations
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Logos</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">
                        /brand-assets/logos/primary/wow-ai-primary-logo.svg
                      </code>
                    </li>
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">
                        /brand-assets/logos/sizes/wow-ai-header-120px.svg
                      </code>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Icons</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">
                        /brand-assets/icons/favicon/wow-ai-favicon-16px.svg
                      </code>
                    </li>
                    <li>
                      <code className="bg-gray-200 px-2 py-1 rounded">
                        /brand-assets/icons/app/wow-ai-app-icon-64px.svg
                      </code>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
                Documentation
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <Link
                        href={`/${locale}/brand/asset-index`}
                        className="text-blue-600 hover:underline"
                      >
                        Asset Index
                      </Link>
                    </li>
                    <li>
                      <span className="text-gray-500">
                        Brand Guidelines (integrated above)
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <span className="text-gray-500">
                        Color Palette (see LLM prompt above)
                      </span>
                    </li>
                    <li>
                      <span className="text-gray-500">
                        Background Variants (see variants/README.md)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* LLM Design Assistant Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              🤖 LLM Design Assistant
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  AI-Optimized Brand Guidelines
                </h3>
                <p className="text-gray-600 mb-4">
                  Use this comprehensive prompt with AI design tools for
                  consistent WOW AI brand implementation across any project.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Copy this prompt for AI design tools:
                </h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`You are designing for WOW AI, an innovative AI technology company. Follow these brand guidelines:

BRAND IDENTITY:
- Company: WOW AI (AI technology solutions)
- Personality: Innovative, professional, approachable, growth-oriented
- Visual style: Modern, clean, organic with technological precision

COLOR PALETTE (use exactly these hex codes):
- Primary: #aedf1a (Lime Green) - for CTAs, highlights, primary elements
- Secondary: #86c9e5 (Sky Blue) - for secondary actions, accents
- Text: #4a5568 (Soft Charcoal) - for body text, navigation
- Backgrounds: White (#ffffff), Light Gray (#f8f9fa), or brand colors

LOGO USAGE:
- Primary logo: /brand-assets/logos/primary/wow-ai-primary-logo.svg
- Header logo: /brand-assets/logos/sizes/wow-ai-header-120px.svg
- App icon: /brand-assets/icons/app/wow-ai-app-icon-64px.svg
- Favicon: /brand-assets/icons/favicon/wow-ai-favicon-16px.svg
- UI icon: /brand-assets/icons/standard/wow-ai-standard-icon-32px.svg

BACKGROUND-ADAPTIVE VARIANTS:
- Light backgrounds: /brand-assets/variants/light-bg/
- Dark backgrounds: /brand-assets/variants/dark-bg/
- Lime green backgrounds: /brand-assets/variants/lime-bg/
- Sky blue backgrounds: /brand-assets/variants/blue-bg/
- White backgrounds: /brand-assets/variants/white-bg/

DESIGN RULES:
1. Always maintain 20px clear space around logo
2. Use appropriate background variant for contrast
3. Minimum logo width: 80px for readability
4. Typography: Arial, 900 weight, -1.8px letter-spacing for "WOW"
5. Flower symbol: 8 elliptical petals, alternating lime/blue colors
6. No shadows, gradients, or effects on logo
7. Maintain original proportions - never stretch or distort

IMPLEMENTATION:
- Web: Use SVG format for scalability
- Mobile: Use app icon for app stores, standard icon for UI
- Print: Use white background variant
- Dark mode: Use dark background variant
- Light mode: Use light background variant

When implementing, always reference the exact asset paths provided and ensure proper contrast ratios for accessibility.`}</pre>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    ✅ Quality Checklist
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Correct asset selected for use case
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Appropriate background variant chosen
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Minimum size requirements met
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Clear space maintained around logo
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Colors match brand palette
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Accessibility contrast ratios verified
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    🎯 Asset Selection Matrix
                  </h4>
                  <div className="text-sm">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="font-semibold">Use Case</div>
                      <div className="font-semibold">Asset</div>
                      <div className="font-semibold">Variant</div>

                      <div>Website Header</div>
                      <div>Header 120px</div>
                      <div>Match background</div>

                      <div>Mobile App</div>
                      <div>App Icon 64px</div>
                      <div>Built-in (blue)</div>

                      <div>UI Buttons</div>
                      <div>Standard 32px</div>
                      <div>Built-in (charcoal)</div>

                      <div>Browser Tab</div>
                      <div>Favicon 16px</div>
                      <div>Built-in (lime)</div>

                      <div>Print Materials</div>
                      <div>Primary Logo</div>
                      <div>White variant</div>

                      <div>Dark Mode</div>
                      <div>Primary Logo</div>
                      <div>Dark variant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            WOW AI Brand Assets • Version 2.0 - LLM Optimized • Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
