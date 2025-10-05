import { ReactNode } from "react";

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

// Root layout now only handles the redirect
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
