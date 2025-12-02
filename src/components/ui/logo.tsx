import React from "react";
import Image from "next/image";
import { cn } from "@/components/lib/utils";

interface WowLogoProps {
  size?: "hero" | "header" | "standard" | "small" | "favicon";
  className?: string;
}

export const WowLogo: React.FC<WowLogoProps> = ({
  size = "standard",
  className,
}) => {
  const getLogoPath = () => {
    switch (size) {
      case "hero":
      case "header":
      case "standard":
      case "small":
        return `/brand-assets/logos/primary/wow-ai-primary-logo.svg`;
      case "favicon":
        return `/brand-assets/icons/favicon/wow-ai-favicon-16px.svg`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "hero":
        return "h-28 md:h-44 w-auto";
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

  const getDimensions = () => {
    switch (size) {
      case "hero":
        return { width: 320, height: 140 };
      case "header":
        return { width: 200, height: 90 };
      case "standard":
        return { width: 160, height: 70 };
      case "small":
        return { width: 120, height: 50 };
      case "favicon":
        return { width: 32, height: 32 };
      default:
        return { width: 160, height: 70 };
    }
  };

  const { width, height } = getDimensions();

  return (
    <Image
      src={getLogoPath()}
      alt="WOW AI"
      width={width}
      height={height}
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
        <Image
          src="/brand-assets/icons/standard/wow-ai-standard-icon-32px.svg"
          alt="WOW AI Icon"
          width={64}
          height={64}
          className="w-full h-full p-1"
        />
      </div>
    );
  }

  return (
    <Image
      src="/brand-assets/icons/standard/wow-ai-standard-icon-32px.svg"
      alt="WOW AI Icon"
      width={64}
      height={64}
      className={cn(getSizeClasses(), className)}
    />
  );
};

export default WowLogo;
