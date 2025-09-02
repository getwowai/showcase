import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WOW AI - Your AI-Powered Sala Co-Pilot",
  description:
    "Transform your e-commerce business with intelligent AI agents that work 24/7 to optimize your operations, boost profits, and provide instant insights.",
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

// Root layout now only handles the redirect
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
