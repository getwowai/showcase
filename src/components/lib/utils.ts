import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag && GA_ID) {
    window.gtag("config", GA_ID, {
      page_path: url,
      page_location: window.location.href,
    });
  }
};
