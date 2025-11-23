import { ReactNode } from "react";

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

// Root layout must include html and body tags
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}




