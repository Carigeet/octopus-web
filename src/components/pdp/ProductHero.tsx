"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/common/Button";

export interface ProductHeroProps {
  product: Product;
  className?: string;
}

const COLOR_NAMES: Record<string, string> = {
  "#111827": "Black",
  "#1F2937": "Charcoal Black",
  "#FFFFFF": "White",
  "#E5E7EB": "Light Gray",
  "#B45309": "Copper",
  "#1E3A8A": "Navy Blue",
  "#047857": "Forest Green",
};

function getColorName(hex: string): string {
  const normalized = hex.toUpperCase();
  for (const [key, val] of Object.entries(COLOR_NAMES)) {
    if (key.toUpperCase() === normalized) return val;
  }
  return "Selected";
}

export function ProductHero({ product, className = "" }: ProductHeroProps) {
  const colors =
    product.colours && product.colours.length > 0
      ? product.colours
      : ["#111827"];

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

  const description = product.description || product.shortDescription;

  return (
    <section
      className={`w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-0 md:px-0 xl:px-0 pt-0 md:pt-32 xl:pt-36 pb-12 sm:pb-16 ${className}`.trim()}
      aria-label="Product Showcase"
    >
      <div className="flex flex-col md:flex-row xl:grid xl:grid-cols-12 items-center gap-8 md:gap-8 xl:gap-16">
        {/* Left Column: Neutral Isolated Product Showcase Box (Mobile: 390×590 from top, padding T164 R24 B164 L24, inner image 390×390 | Tablet: 476×634.44 | Desktop: col-span-7 min-h-[620px] p-16) */}
        <div className="w-full max-w-[390px] h-[590px] min-h-[590px] pt-[164px] pr-[24px] pb-[164px] pl-[24px] md:w-[476px] md:max-w-[476px] md:h-[634.44px] md:min-h-[634.44px] xl:col-span-7 xl:w-auto xl:max-w-none xl:h-auto xl:min-h-[620px] shrink-0 bg-[#F9F9F9] rounded-b-[24px] md:rounded-3xl xl:rounded-[32px] md:p-10 xl:p-16 flex items-center justify-center border-b md:border border-neutral-200/60 shadow-xs overflow-hidden">
          <div className="relative w-[390px] h-[390px] max-w-full shrink-0 md:w-full md:max-w-[380px] md:h-[480px] xl:max-w-[480px] xl:h-[540px]">
            <Image
              src={product.image || "/images/products/placeholder-800x800.png"}
              alt={product.name}
              fill
              preload
              sizes="(max-width: 768px) 390px, (max-width: 1200px) 476px, 540px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Column: Product Info & Buy Box (a destra della foto su tablet e desktop) */}
        <div className="w-full max-w-[358px] md:max-w-none mx-auto md:mx-0 px-0 flex-1 xl:col-span-5 flex flex-col justify-center items-start min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-3xl xl:text-5xl font-bold tracking-tight text-gray-950 mb-4 sm:mb-6 leading-[1.15]">
            {product.name}
          </h1>

          <p className="text-sm xl:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-lg">
            {description}
          </p>

          {/* Color Swatch */}
          <div className="mb-8">
            <span className="text-sm font-medium text-gray-900 mb-2.5 block">
              Colour - {getColorName(selectedColor)}
            </span>
            <div className="flex items-center gap-2.5">
              {colors.map((colorHex) => {
                const isSelected = selectedColor === colorHex;
                return (
                  <button
                    key={colorHex}
                    type="button"
                    onClick={() => setSelectedColor(colorHex)}
                    aria-label={`Colour: ${getColorName(colorHex)}${
                      isSelected ? " (selected)" : ""
                    }`}
                    aria-pressed={isSelected}
                    className={`w-8 h-8 rounded-full flex items-center justify-center p-0.5 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                      isSelected
                        ? "border-2 border-brand-red"
                        : "border border-transparent hover:scale-110"
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full ring-1 ring-black/10"
                      style={{ backgroundColor: colorHex }}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA */}
          <Button
            href="/#where-to-buy"
            variant="primary"
            size="md"
            className="w-full sm:max-w-xs py-3 px-8 text-base font-semibold shadow-xs"
          >
            Where to buy
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductHero;
