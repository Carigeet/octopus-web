import React from "react";
import { Button } from "@/components/common/Button";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  ctaText = "Explore all products",
  ctaHref,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-8 sm:mb-10 min-[1200px]:mb-12 max-w-3xl mx-auto px-4 ${className}`.trim()}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#000000] mb-3 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-neutral-muted max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          {subtitle}
        </p>
      )}
      {ctaText && (
        <div className="flex justify-center">
          <Button
            href={ctaHref || `/#${title.toLowerCase().replace(/\s+/g, "-")}`}
            variant="outline"
            size="sm"
            className="border-neutral-300 text-[#000000] hover:bg-neutral-50 px-5 py-2 text-xs sm:text-sm font-medium shadow-2xs"
          >
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );
}

export default SectionHeader;

