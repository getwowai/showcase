import React from "react";
import { cn } from "@/components/lib/utils";

interface WowLogoProps {
  size?: "hero" | "header" | "standard" | "small" | "favicon";
  variant?: "primary" | "secondary";
  className?: string;
}

export const WowLogo: React.FC<WowLogoProps> = ({
  size = "standard",
  variant = "primary",
  className,
}) => {
  const getLogoPath = () => {
    const baseVariant = variant === "secondary" ? "secondary" : "primary";
    
    switch (size) {
      case "hero":
        return `/brand-assets/logos/sizes/wow-ai-hero-200px.svg`;
      case "header":
        return `/brand-assets/logos/sizes/wow-ai-header-120px.svg`;
      case "standard":
        return `/brand-assets/logos/sizes/wow-ai-standard-80px.svg`;
      case "small":
        return `/brand-assets/logos/sizes/wow-ai-small-50px.svg`;
      case "favicon":
        return `/brand-assets/icons/favicon/wow-ai-favicon-16px.svg`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "hero":
        return "h-20 md:h-28 w-auto";
      case "header":
        return "h-12 w-auto";
      case "standard":
        return "h-8 w-auto";
      case "small":
        return "h-6 w-auto";
      case "favicon":
        return "h-4 w-auto";
    }
  };

  return (
    <img
      src={getLogoPath()}
      alt="WOW AI"
      className={cn(getSizeClasses(), className)}
      style={{ minWidth: "80px" }}
    />
  );
};

// Icon-only version for app icons and favicons
interface WowIconProps {
  size?: "large" | "standard" | "small";
  background?: boolean;
  className?: string;
}

export const WowIcon: React.FC<WowIconProps> = ({
  size = "standard",
  background = false,
  className,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "large":
        return "w-16 h-16";
      case "standard":
        return "w-8 h-8";
      case "small":
        return "w-4 h-4";
    }
  };

  if (background) {
    return (
      <div
        className={cn(
          "bg-[#86c9e5] flex items-center justify-center rounded-lg",
          getSizeClasses(),
          className,
        )}
      >
        <img
          src="/brand-assets/icons/standard/wow-ai-standard-icon-32px.svg"
          alt="WOW AI Icon"
          className="w-full h-full p-1"
        />
      </div>
    );
  }

  return (
    <img
      src="/brand-assets/icons/standard/wow-ai-standard-icon-32px.svg"
      alt="WOW AI Icon"
      className={cn(getSizeClasses(), className)}
    />
  );
};

export default WowLogo;
