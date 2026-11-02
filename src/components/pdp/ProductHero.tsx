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
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-28 sm:pt-32 min-[1200px]:pt-36 pb-12 sm:pb-16 ${className}`.trim()}
      aria-label="Product Showcase"
    >
      <div className="grid grid-cols-1 min-[1200px]:grid-cols-12 gap-8 min-[1200px]:gap-16 items-center">
        {/* Left Column: Neutral Isolated Product Showcase Box */}
        <div className="min-[1200px]:col-span-7 bg-[#F9F9F9] rounded-3xl min-[1200px]:rounded-[32px] p-8 sm:p-12 min-[1200px]:p-16 flex items-center justify-center min-h-[440px] sm:min-h-[520px] min-[1200px]:min-h-[620px] border border-neutral-200/60 shadow-xs">
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] min-[1200px]:max-w-[480px] h-[380px] sm:h-[460px] min-[1200px]:h-[540px]">
            <Image
              src={product.image || "/images/products/placeholder-800x800.png"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 810px) 340px, (max-width: 1200px) 460px, 540px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Column: Product Info & Buy Box */}
        <div className="min-[1200px]:col-span-5 flex flex-col justify-center items-start">
          <h1 className="text-3xl sm:text-4xl min-[1200px]:text-5xl font-bold tracking-tight text-gray-950 mb-4 sm:mb-6 leading-[1.15]">
            {product.name}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-lg">
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
