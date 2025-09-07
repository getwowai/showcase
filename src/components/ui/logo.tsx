import React from "react";
import { cn } from "@/components/lib/utils";

interface FlowerIconProps {
  size?: "micro" | "small" | "main";
  className?: string;
}

const FlowerIcon: React.FC<FlowerIconProps> = ({
  size = "main",
  className,
}) => {
  if (size === "micro") {
    return (
      <svg
        viewBox="-4 -4 8 8"
        className={cn("w-4 h-4", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="0" r="4" fill="#aedf1a" opacity="0.9" />
        <circle cx="0" cy="-3" r="2" fill="#86c9e5" opacity="0.8" />
        <circle cx="3" cy="0" r="2" fill="#86c9e5" opacity="0.8" />
        <circle cx="0" cy="3" r="2" fill="#86c9e5" opacity="0.8" />
        <circle cx="-3" cy="0" r="2" fill="#86c9e5" opacity="0.8" />
      </svg>
    );
  }

  if (size === "small") {
    return (
      <svg
        viewBox="-8 -8 16 16"
        className={cn("w-6 h-6", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="-6" r="3" fill="#aedf1a" opacity="0.8" />
        <circle cx="5" cy="-3" r="3" fill="#86c9e5" opacity="0.7" />
        <circle cx="5" cy="3" r="3" fill="#aedf1a" opacity="0.8" />
        <circle cx="0" cy="6" r="3" fill="#86c9e5" opacity="0.7" />
        <circle cx="-5" cy="3" r="3" fill="#aedf1a" opacity="0.8" />
        <circle cx="-5" cy="-3" r="3" fill="#86c9e5" opacity="0.7" />
        <circle cx="0" cy="0" r="5" fill="#aedf1a" opacity="0.9" />
      </svg>
    );
  }

  // main flower
  return (
    <svg
      viewBox="-30 -30 60 60"
      className={cn("w-8 h-8", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="0"
        cy="-10"
        rx="5"
        ry="20"
        fill="#aedf1a"
        opacity="0.75"
        transform="rotate(0)"
      />
      <ellipse
        cx="0"
        cy="-10"
        rx="8"
        ry="24"
        fill="#86c9e5"
        opacity="0.6"
        transform="rotate(50)"
      />
      <ellipse
        cx="0"
        cy="-10"
        rx="6"
        ry="18"
        fill="#aedf1a"
        opacity="0.85"
        transform="rotate(100)"
      />
      <ellipse
        cx="0"
        cy="-10"
        rx="9"
        ry="22"
        fill="#86c9e5"
        opacity="0.5"
        transform="rotate(150)"
      />
      <ellipse
        cx="0"
        cy="-10"
        rx="4"
        ry="16"
        fill="#aedf1a"
        opacity="0.9"
        transform="rotate(200)"
      />
      <ellipse
        cx="0"
        cy="-10"
        rx="7"
        ry="25"
        fill="#86c9e5"
        opacity="0.6"
        transform="rotate(250)"
      />
      <ellipse
        cx="0"
        cy="-10"
        rx="6"
        ry="19"
        fill="#aedf1a"
        opacity="0.7"
        transform="rotate(300)"
      />
      <circle cx="0" cy="0" r="8" fill="#aedf1a" opacity="0.85" />
    </svg>
  );
};

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
  const getSizeClasses = () => {
    switch (size) {
      case "hero":
        return {
          container: "gap-4",
          flower: "w-14 h-14",
          wow: "text-5xl font-black",
          ai: "text-5xl font-black",
          flowerSize: "main" as const,
        };
      case "header":
        return {
          container: "gap-2",
          flower: "w-8 h-8",
          wow: "text-3xl sm:text-4xl",
          ai: "text-3xl sm:text-4xl",
          flowerSize: "main" as const,
        };
      case "standard":
        return {
          container: "gap-2",
          flower: "w-6 h-6",
          wow: "text-xl sm:text-2xl",
          ai: "text-xl sm:text-2xl",
          flowerSize: "small" as const,
        };
      case "small":
        return {
          container: "gap-1",
          flower: "w-5 h-5",
          wow: "text-lg",
          ai: "text-lg",
          flowerSize: "small" as const,
        };
      case "favicon":
        return {
          container: "gap-0.5",
          flower: "w-4 h-4",
          wow: "text-sm",
          ai: "text-sm",
          flowerSize: "micro" as const,
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const isSecondary = variant === "secondary";

  return (
    <div className={cn("flex items-center", sizeClasses.container, className)}>
      <FlowerIcon
        size={sizeClasses.flowerSize}
        className={cn(sizeClasses.flower, size === "hero" && "scale-110")}
      />
      <div className="flex items-baseline">
        <span
          className={cn(
            "font-black",
            sizeClasses.wow,
            "text-[#4a5568]",
            size === "hero" ? "tracking-[-1.4px]" : "tracking-tight",
          )}
        >
          WOW
        </span>
        <span
          className={cn(
            "font-black",
            sizeClasses.ai,
            isSecondary ? "text-[#86c9e5] text-[1.2em]" : "text-[#86c9e5]",
            isSecondary && "ml-0.5",
            size === "hero" ? "tracking-[-0.3px]" : "tracking-tight",
          )}
        >
          {isSecondary ? ".AI" : "AI"}
        </span>
      </div>
    </div>
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
        return {
          icon: "w-16 h-16",
          bg: "w-16 h-16 rounded-xl",
          flower: "main" as const,
        };
      case "standard":
        return {
          icon: "w-8 h-8",
          bg: "w-8 h-8 rounded-lg",
          flower: "small" as const,
        };
      case "small":
        return {
          icon: "w-4 h-4",
          bg: "w-4 h-4 rounded",
          flower: "micro" as const,
        };
    }
  };

  const sizeClasses = getSizeClasses();

  if (background) {
    return (
      <div
        className={cn(
          "bg-[#86c9e5] flex items-center justify-center",
          sizeClasses.bg,
          className,
        )}
      >
        <FlowerIcon size={sizeClasses.flower} className={sizeClasses.icon} />
      </div>
    );
  }

  return (
    <FlowerIcon
      size={sizeClasses.flower}
      className={cn(sizeClasses.icon, className)}
    />
  );
};

export default WowLogo;
