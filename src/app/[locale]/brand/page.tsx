import type { Metadata } from "next";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "WOW AI Brand Assets",
    description:
      "Complete brand asset library for WOW AI including logos, icons, colors, and usage guidelines",
  };
}

export default function BrandAssetsPage({ params }: Props) {
  const { locale } = params;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            WOW AI Brand Assets
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete brand asset library including logos, icons, colors, and
            usage guidelines. All assets are production-ready and optimized for
            web, print, and mobile use.
          </p>
        </header>

        <div className="grid gap-8">
          {/* Primary Logos Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Primary Logos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Primary Logo (Balanced Unity)
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <img
                    src="/brand-assets/logos/primary/wow-ai-primary-logo.svg"
                    alt="WOW AI Primary Logo"
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Main brand logo for 90% of applications
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Secondary Logo (Enhanced Big .AI)
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <img
                    src="/brand-assets/logos/secondary/wow-ai-secondary-logo.svg"
                    alt="WOW AI Secondary Logo"
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  AI-focused version for tech contexts
                </p>
              </div>
            </div>
          </section>

          {/* Logo Sizes Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Logo Sizes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Hero (200px)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="/brand-assets/logos/sizes/wow-ai-hero-200px.svg"
                    alt="WOW AI Hero Logo"
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Homepage headers, hero sections
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Header (120px)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="/brand-assets/logos/sizes/wow-ai-header-120px.svg"
                    alt="WOW AI Header Logo"
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Navigation, page headers
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Standard (80px)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="/brand-assets/logos/sizes/wow-ai-standard-80px.svg"
                    alt="WOW AI Standard Logo"
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Content areas, sidebars, cards
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Small (50px)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img
                    src="/brand-assets/logos/sizes/wow-ai-small-50px.svg"
                    alt="WOW AI Small Logo"
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Footer, mobile navigation
                </p>
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

          {/* Usage Guidelines Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Usage Guidelines
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-green-700 mb-4">
                  DO
                </h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✅ Use Primary Logo for 90% of applications</li>
                  <li>✅ Maintain minimum 20px clear space around logo</li>
                  <li>✅ Use simplified icons below 50px width</li>
                  <li>✅ Preserve original proportions and colors</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-red-700 mb-4">
                  DON'T
                </h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>❌ Stretch or distort proportions</li>
                  <li>❌ Change colors without approval</li>
                  <li>❌ Use detailed flower below 32px</li>
                  <li>❌ Add effects like shadows or gradients</li>
                </ul>
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
                      <a
                        href="/brand-assets/guidelines/BRAND_GUIDELINES.md"
                        className="text-blue-600 hover:underline"
                      >
                        Brand Guidelines
                      </a>
                    </li>
                    <li>
                      <a
                        href="/brand-assets/guidelines/COLOR_PALETTE.md"
                        className="text-blue-600 hover:underline"
                      >
                        Color Palette
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <a
                        href="/brand-assets/ASSET_INDEX.md"
                        className="text-blue-600 hover:underline"
                      >
                        Asset Index
                      </a>
                    </li>
                    <li>
                      <a
                        href="/brand-assets/ASSET_PREVIEW.html"
                        className="text-blue-600 hover:underline"
                      >
                        HTML Preview
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            WOW AI Brand Assets • Version 1.0 • Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
