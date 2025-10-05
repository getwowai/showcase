import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Asset Index - WOW AI",
    description:
      "Complete inventory of all WOW AI brand assets with usage recommendations",
  };
}

export default function AssetIndexPage({ params }: Props) {
  const { locale } = params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${locale}/brand`}>
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Brand Assets
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            WOW AI Asset Index
          </h1>
          <p className="text-lg text-gray-600">
            Complete inventory of all brand assets with usage recommendations
            and file locations.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Logo Files */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Logo Files
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Primary Logos
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          File
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Size
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Usage
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Format
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                          logos/primary/wow-ai-primary-logo.svg
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          200x60px
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Main brand logo, 90% of applications
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          SVG
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                          logos/primary/wow-ai-primary-logo.png
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          400x120px
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Web use, presentations, general purpose
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          PNG
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                          logos/primary/wow-ai-primary-logo-300dpi.png
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          1200x360px
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Print materials, high-res displays
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          PNG (300 DPI)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Secondary Logos
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          File
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Size
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Usage
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Format
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Logo Sizes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          File
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Size
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Usage
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Format
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                          logos/sizes/wow-ai-hero-200px.svg
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          200x60px
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Homepage headers, hero sections
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          SVG
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                          logos/sizes/wow-ai-header-120px.svg
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          120x40px
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Navigation, page headers
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          SVG
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                          logos/sizes/wow-ai-standard-80px.svg
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          80x30px
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Content areas, sidebars, cards
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          SVG
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                          logos/sizes/wow-ai-small-50px.svg
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          50x20px
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Footer, mobile navigation
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          SVG
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Icon Files */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Icon Files
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        File
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Size
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Usage
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Format
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                        icons/app/wow-ai-app-icon-64px.svg
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        64x64px
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        iOS/Android apps, social media avatars
                      </td>
                      <td className="border border-gray-300 px-4 py-2">SVG</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                        icons/standard/wow-ai-standard-icon-32px.svg
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        32x32px
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        UI elements, toolbar buttons
                      </td>
                      <td className="border border-gray-300 px-4 py-2">SVG</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                        icons/favicon/wow-ai-favicon-16px.svg
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        16x16px
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Browser tab, bookmarks
                      </td>
                      <td className="border border-gray-300 px-4 py-2">SVG</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Documentation Files */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Documentation Files
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Guidelines
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span className="font-mono text-sm">
                      brand-assets/README.md
                    </span>
                    <Link href={`/${locale}/brand`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span className="font-mono text-sm">
                      variants/README.md
                    </span>
                    <Link href={`/${locale}/brand`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Reference
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span className="font-mono text-sm">README.md</span>
                    <Button size="sm" variant="outline" disabled>
                      Static
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Matrix */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Usage Matrix
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  By Application Type
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Web Development
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <strong>Header/Navigation:</strong>{" "}
                        logos/sizes/wow-ai-header-120px.svg
                      </li>
                      <li>
                        <strong>Hero Section:</strong>{" "}
                        logos/sizes/wow-ai-hero-200px.svg
                      </li>
                      <li>
                        <strong>Content Areas:</strong>{" "}
                        logos/sizes/wow-ai-standard-80px.svg
                      </li>
                      <li>
                        <strong>Footer:</strong>{" "}
                        logos/sizes/wow-ai-small-50px.svg
                      </li>
                      <li>
                        <strong>Favicon:</strong>{" "}
                        icons/favicon/wow-ai-favicon-16px.svg
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Mobile Apps
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <strong>App Icon:</strong>{" "}
                        icons/app/wow-ai-app-icon-64px.svg
                      </li>
                      <li>
                        <strong>UI Elements:</strong>{" "}
                        icons/standard/wow-ai-standard-icon-32px.svg
                      </li>
                      <li>
                        <strong>Splash Screen:</strong>{" "}
                        logos/primary/wow-ai-primary-logo.svg
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  By Size Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Large Displays (200px+)
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>logos/primary/wow-ai-primary-logo.svg</li>
                      <li>logos/primary/wow-ai-primary-logo.png</li>
                      <li>logos/primary/wow-ai-primary-logo-300dpi.png</li>
                      <li>logos/sizes/wow-ai-hero-200px.svg</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Medium Displays (80-200px)
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>logos/sizes/wow-ai-header-120px.svg</li>
                      <li>logos/sizes/wow-ai-standard-80px.svg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Export Requirements */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Export Requirements
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  For Web Use
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • All files are provided in SVG format for scalability
                  </li>
                  <li>• Use as-is for modern browsers</li>
                  <li>• Convert to PNG for older browser support</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  For Print Use
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Export SVGs to PDF at 300 DPI</li>
                  <li>• Use CMYK color space for professional printing</li>
                  <li>• Maintain original proportions</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  For Mobile Apps
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • Export app icon to multiple sizes (16, 32, 64, 128, 256,
                    512px)
                  </li>
                  <li>• Use PNG format with transparency</li>
                  <li>• Follow platform-specific guidelines</li>
                </ul>
              </div>
            </div>
          </section>

          {/* File Naming Convention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              File Naming Convention
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                All files follow this pattern:
              </p>
              <div className="bg-gray-800 text-green-400 p-4 rounded text-sm font-mono mb-4">
                wow-ai-[category]-[variant]-[size].svg
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Examples:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-mono">
                    <li>wow-ai-primary-logo.svg</li>
                    <li>wow-ai-hero-200px.svg</li>
                    <li>wow-ai-app-icon-64px.svg</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Categories:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• primary (logo variant)</li>
                    <li>• hero, header, standard, small (sizes)</li>
                    <li>• app, standard, favicon (icon types)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Version Control */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Version Control
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Current Version
                  </h4>
                  <p className="text-gray-600">1.0</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Last Updated
                  </h4>
                  <p className="text-gray-600">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Source</h4>
                  <p className="text-gray-600">
                    Extracted from design-iterations/v1-soft-charcoal.svg
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            WOW AI Asset Index • Version 1.0 • Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
