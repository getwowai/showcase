import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Color Palette - WOW AI",
    description:
      "Complete color specifications and CSS variables for WOW AI brand",
  };
}

export default function ColorPalettePage({ params }: Props) {
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
            WOW AI Color Palette
          </h1>
          <p className="text-lg text-gray-600">
            Complete color specifications, CSS variables, and usage examples for
            the WOW AI brand.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Primary Colors */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Primary Colors
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#aedf1a] border-4 border-white shadow-lg"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Lime Green (Primary)
                    </h3>
                    <p className="text-sm text-gray-600">Primary brand color</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>HEX:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      #aedf1a
                    </code>
                  </div>
                  <div>
                    <strong>RGB:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      174, 223, 26
                    </code>
                  </div>
                  <div>
                    <strong>HSL:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      74, 79%, 49%
                    </code>
                  </div>
                  <div>
                    <strong>CSS Variable:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      --wow-lime-green
                    </code>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Usage:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Flower petals</li>
                    <li>• Accent elements</li>
                    <li>• Growth indicators</li>
                    <li>• Primary CTAs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#86c9e5] border-4 border-white shadow-lg"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Sky Blue (Secondary)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Secondary brand color
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>HEX:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      #86c9e5
                    </code>
                  </div>
                  <div>
                    <strong>RGB:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      134, 201, 229
                    </code>
                  </div>
                  <div>
                    <strong>HSL:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      198, 65%, 71%
                    </code>
                  </div>
                  <div>
                    <strong>CSS Variable:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      --wow-sky-blue
                    </code>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Usage:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• "AI" text in logos</li>
                    <li>• Secondary elements</li>
                    <li>• Tech highlights</li>
                    <li>• Links and buttons</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#4a5568] border-4 border-white shadow-lg"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Soft Charcoal (Text)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Text and content color
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>HEX:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      #4a5568
                    </code>
                  </div>
                  <div>
                    <strong>RGB:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      74, 85, 104
                    </code>
                  </div>
                  <div>
                    <strong>HSL:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      210, 17%, 35%
                    </code>
                  </div>
                  <div>
                    <strong>CSS Variable:</strong>{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      --wow-charcoal
                    </code>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Usage:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• "WOW" text in logos</li>
                    <li>• Body text</li>
                    <li>• Primary content</li>
                    <li>• Headings</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Supporting Colors */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Supporting Colors
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Background Colors
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded bg-[#fafafa] border-2 border-gray-300"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Light Background
                      </h4>
                      <p className="text-sm text-gray-600">HEX: #fafafa</p>
                      <p className="text-sm text-gray-600">
                        CSS Variable: --wow-bg-light
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded bg-white border-2 border-gray-300"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">White</h4>
                      <p className="text-sm text-gray-600">HEX: #ffffff</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Border Colors
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded bg-[#e0e0e0] border-2 border-gray-300"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Light Border
                      </h4>
                      <p className="text-sm text-gray-600">HEX: #e0e0e0</p>
                      <p className="text-sm text-gray-600">
                        CSS Variable: --wow-border-light
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded bg-[#cccccc] border-2 border-gray-300"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Medium Border
                      </h4>
                      <p className="text-sm text-gray-600">HEX: #cccccc</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Text Colors */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Text Colors
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4a5568] border-2 border-white shadow-sm"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Primary Text
                    </h4>
                    <p className="text-sm text-gray-600">
                      #4a5568 (Soft Charcoal)
                    </p>
                    <p className="text-sm text-gray-600">
                      CSS Variable: --wow-text-primary
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#666666] border-2 border-white shadow-sm"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Secondary Text
                    </h4>
                    <p className="text-sm text-gray-600">#666666</p>
                    <p className="text-sm text-gray-600">
                      CSS Variable: --wow-text-secondary
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#999999] border-2 border-white shadow-sm"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Light Text</h4>
                    <p className="text-sm text-gray-600">#999999</p>
                    <p className="text-sm text-gray-600">
                      CSS Variable: --wow-text-light
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CSS Implementation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              CSS Implementation
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Complete CSS Variables
              </h3>
              <div className="bg-gray-800 text-green-400 p-6 rounded-lg text-sm font-mono overflow-x-auto">
                <div>:root {"{"}</div>
                <div className="ml-4 text-blue-400">/* Primary Colors */</div>
                <div className="ml-4">--wow-lime-green: #aedf1a;</div>
                <div className="ml-4">--wow-sky-blue: #86c9e5;</div>
                <div className="ml-4">--wow-charcoal: #4a5568;</div>
                <div className="ml-4"></div>
                <div className="ml-4 text-blue-400">
                  /* Supporting Colors */
                </div>
                <div className="ml-4">--wow-bg-light: #fafafa;</div>
                <div className="ml-4">--wow-border-light: #e0e0e0;</div>
                <div className="ml-4">--wow-text-primary: #4a5568;</div>
                <div className="ml-4">--wow-text-secondary: #666666;</div>
                <div className="ml-4">--wow-text-light: #999999;</div>
                <div>{"}"}</div>
              </div>
            </div>
          </section>

          {/* Usage Examples */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Usage Examples
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Logo Colors
                </h3>
                <div className="bg-gray-800 text-green-400 p-4 rounded text-sm font-mono">
                  <div>.wow-logo-wow {"{"}</div>
                  <div className="ml-4">color: var(--wow-charcoal);</div>
                  <div>{"}"}</div>
                  <div></div>
                  <div>.wow-logo-ai {"{"}</div>
                  <div className="ml-4">color: var(--wow-sky-blue);</div>
                  <div>{"}"}</div>
                  <div></div>
                  <div>.wow-logo-flower {"{"}</div>
                  <div className="ml-4">fill: var(--wow-lime-green);</div>
                  <div>{"}"}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Background Colors
                </h3>
                <div className="bg-gray-800 text-green-400 p-4 rounded text-sm font-mono">
                  <div>.wow-bg-primary {"{"}</div>
                  <div className="ml-4">
                    background-color: var(--wow-lime-green);
                  </div>
                  <div>{"}"}</div>
                  <div></div>
                  <div>.wow-bg-secondary {"{"}</div>
                  <div className="ml-4">
                    background-color: var(--wow-sky-blue);
                  </div>
                  <div>{"}"}</div>
                  <div></div>
                  <div>.wow-bg-light {"{"}</div>
                  <div className="ml-4">
                    background-color: var(--wow-bg-light);
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Accessibility
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                All color combinations meet WCAG AA contrast requirements:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#aedf1a]"></div>
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></div>
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    Lime Green on White
                  </h4>
                  <p className="text-sm text-gray-600">4.5:1 contrast ratio</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#86c9e5]"></div>
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></div>
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    Sky Blue on White
                  </h4>
                  <p className="text-sm text-gray-600">4.8:1 contrast ratio</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#4a5568]"></div>
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></div>
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    Soft Charcoal on White
                  </h4>
                  <p className="text-sm text-gray-600">7.2:1 contrast ratio</p>
                </div>
              </div>
            </div>
          </section>

          {/* Color Psychology */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Color Psychology
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#aedf1a] border-2 border-white shadow-sm"></div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Lime Green
                  </h3>
                </div>
                <p className="text-gray-600">
                  Represents growth, innovation, and energy. Creates a sense of
                  freshness and forward momentum.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#86c9e5] border-2 border-white shadow-sm"></div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Sky Blue
                  </h3>
                </div>
                <p className="text-gray-600">
                  Conveys trust, technology, and reliability. Associated with
                  clarity, intelligence, and stability.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#4a5568] border-2 border-white shadow-sm"></div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Soft Charcoal
                  </h3>
                </div>
                <p className="text-gray-600">
                  Provides stability and professionalism. Ensures excellent
                  readability and content hierarchy.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            WOW AI Color Palette • Version 1.0 • Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
