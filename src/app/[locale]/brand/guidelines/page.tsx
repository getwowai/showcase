import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Brand Guidelines - WOW AI",
    description: "Complete brand guidelines and usage rules for WOW AI",
  };
}

export default function BrandGuidelinesPage({ params }: Props) {
  const { locale } = params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${locale}/brand`}>
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Brand Assets
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            WOW AI Brand Guidelines
          </h1>
          <p className="text-lg text-gray-600">
            Complete brand guidelines and usage rules for maintaining consistent
            brand identity.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Brand Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Brand Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              WOW AI represents innovation, growth, and technological
              advancement. Our brand identity combines organic growth
              (represented by the flower symbol) with cutting-edge AI
              technology, creating a harmonious balance between nature and
              innovation.
            </p>
          </section>

          {/* Logo System */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Logo System
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Primary Logo: Balanced Unity
                </h3>
                <div className="mb-4">
                  <strong className="text-gray-700">Usage:</strong> Main brand
                  logo for 90% of applications
                  <br />
                  <strong className="text-gray-700">Best for:</strong> Headers,
                  business cards, general branding, marketing materials
                </div>
                <div className="bg-white p-4 rounded border">
                  <img
                    src="/brand-assets/logos/primary/wow-ai-primary-logo.svg"
                    alt="WOW AI Primary Logo"
                    className="max-w-xs mx-auto"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    The Primary Logo features:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Detailed flower symbol with layered petals</li>
                    <li>"WOW" in Soft Charcoal (#4a5568)</li>
                    <li>"AI" in Sky Blue (#86c9e5)</li>
                    <li>Balanced proportions for maximum readability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Secondary Logo: Enhanced Big .AI
                </h3>
                <div className="mb-4">
                  <strong className="text-gray-700">Usage:</strong> AI-focused
                  version for tech contexts
                  <br />
                  <strong className="text-gray-700">Best for:</strong> AI
                  marketing, hero sections, tech presentations, developer tools
                </div>
                <div className="bg-white p-4 rounded border">
                  <img
                    src="/brand-assets/logos/secondary/wow-ai-secondary-logo.svg"
                    alt="WOW AI Secondary Logo"
                    className="max-w-xs mx-auto"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    The Secondary Logo features:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Same detailed flower symbol</li>
                    <li>"WOW" in Soft Charcoal (#4a5568)</li>
                    <li>
                      ".AI" in larger Sky Blue (#86c9e5) with dot notation
                    </li>
                    <li>Emphasizes the AI technology aspect</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Color Palette
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Primary Colors
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#aedf1a] border-2 border-white shadow-sm"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Lime Green (Primary)
                      </h4>
                      <p className="text-sm text-gray-600">HEX: #aedf1a</p>
                      <p className="text-sm text-gray-600">RGB: 174, 223, 26</p>
                      <p className="text-sm text-gray-600">HSL: 74, 79%, 49%</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#86c9e5] border-2 border-white shadow-sm"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Sky Blue (Secondary)
                      </h4>
                      <p className="text-sm text-gray-600">HEX: #86c9e5</p>
                      <p className="text-sm text-gray-600">
                        RGB: 134, 201, 229
                      </p>
                      <p className="text-sm text-gray-600">
                        HSL: 198, 65%, 71%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#4a5568] border-2 border-white shadow-sm"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Soft Charcoal (Text)
                      </h4>
                      <p className="text-sm text-gray-600">HEX: #4a5568</p>
                      <p className="text-sm text-gray-600">RGB: 74, 85, 104</p>
                      <p className="text-sm text-gray-600">
                        HSL: 210, 17%, 35%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Supporting Colors
                </h3>
                <div className="space-y-3">
                  <div>
                    <strong className="text-gray-700">Background:</strong>{" "}
                    #fafafa (Light Gray)
                  </div>
                  <div>
                    <strong className="text-gray-700">Borders:</strong> #e0e0e0
                    (Light Border)
                  </div>
                  <div>
                    <strong className="text-gray-700">Secondary Text:</strong>{" "}
                    #666666 (Medium Gray)
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  CSS Variables
                </h3>
                <div className="bg-gray-800 text-green-400 p-4 rounded text-sm font-mono">
                  <div>:root {"{"}</div>
                  <div className="ml-4">--wow-lime-green: #aedf1a;</div>
                  <div className="ml-4">--wow-sky-blue: #86c9e5;</div>
                  <div className="ml-4">--wow-charcoal: #4a5568;</div>
                  <div className="ml-4">--wow-bg-light: #fafafa;</div>
                  <div className="ml-4">--wow-border-light: #e0e0e0;</div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Typography
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Primary Font
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <strong>Font Family:</strong> Arial, sans-serif
                  </li>
                  <li>
                    <strong>Weight:</strong> 900 (Black) for logo text
                  </li>
                  <li>
                    <strong>Letter Spacing:</strong>
                  </li>
                  <li className="ml-4">
                    • "WOW": -1.8px (tight spacing for impact)
                  </li>
                  <li className="ml-4">
                    • "AI": -0.5px (slightly tighter for cohesion)
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Usage Guidelines
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use Arial as the primary typeface for consistency</li>
                  <li>• Maintain font weights as specified in logo files</li>
                  <li>• Preserve letter spacing for brand recognition</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Usage Guidelines
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-green-700 mb-4">
                  DO
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li>✅ Use Primary Logo for 90% of applications</li>
                  <li>✅ Maintain minimum 20px clear space around logo</li>
                  <li>✅ Use simplified icons below 50px width</li>
                  <li>✅ Preserve original proportions and colors</li>
                  <li>✅ Use appropriate size variants for context</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-red-700 mb-4">
                  DON'T
                </h3>
                <ul className="space-y-2 text-red-700">
                  <li>❌ Stretch or distort proportions</li>
                  <li>❌ Change colors without approval</li>
                  <li>❌ Use detailed flower below 32px</li>
                  <li>❌ Add effects like shadows or gradients</li>
                  <li>❌ Modify the flower symbol design</li>
                  <li>❌ Use incorrect font weights or spacing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Clear Space Requirements */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Clear Space Requirements
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Minimum Clear Space
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <strong>Logo:</strong> Minimum 20px clear space on all
                      sides
                    </li>
                    <li>
                      <strong>Icons:</strong> Minimum 8px clear space on all
                      sides
                    </li>
                    <li>
                      <strong>Text:</strong> Minimum 10px clear space from other
                      elements
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Clear Space Calculation
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Use the height of the "WOW" text as the base unit</li>
                    <li>• Apply clear space proportionally to all sizes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* File Formats */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              File Formats
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Required Formats
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <strong>SVG:</strong> For web use, scalable graphics
                    </li>
                    <li>
                      <strong>PNG 24-bit:</strong> For transparent backgrounds
                    </li>
                    <li>
                      <strong>ICO:</strong> For favicon implementation
                    </li>
                    <li>
                      <strong>PDF:</strong> For print materials
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Export Guidelines
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Export each size individually for optimal quality</li>
                    <li>• Maintain transparency where specified</li>
                    <li>
                      • Use appropriate DPI for intended use (72 DPI for web,
                      300 DPI for print)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            WOW AI Brand Guidelines • Version 1.0 • Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
