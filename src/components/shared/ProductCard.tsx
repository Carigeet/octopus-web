import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/common/Button";

export type ProductCardVariant =
  | "bestseller"
  | "large"
  | "medium-vertical"
  | "medium-horizontal"
  | "small"
  | "horizontal"
  | "vertical"
  | "featured";

export interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  className?: string;
  priority?: boolean;
  href?: string;
  lifestyleImage?: string;
}

export function ProductCard({
  product,
  variant = "bestseller",
  className = "",
  priority = false,
  href = "/products/countertop-blender",
  lifestyleImage,
}: ProductCardProps) {
  const formattedCategory = product.category.replace(/-/g, " ");
  const imageSource = lifestyleImage || product.image;

  // Normalize legacy/alias variants
  const activeVariant: "bestseller" | "large" | "medium-vertical" | "medium-horizontal" | "small" =
    variant === "horizontal"
      ? "bestseller"
      : variant === "featured"
      ? product.slug === "indoor-camera"
        ? "medium-vertical"
        : "large"
      : variant === "vertical"
      ? "small"
      : variant;

  // -------------------------------------------------------------
  // 1. BEST SELLER / CAROUSEL HORIZONTAL SPLIT
  // Dimensions from spec:
  // Desktop: 1048 × 589 px, p-10 (40px), gap 32px
  // Tablet:  688 × 413 px
  // Mobile:  320 × 512 px (stacked)
  // -------------------------------------------------------------
  if (activeVariant === "bestseller") {
    return (
      <article
        className={`group relative w-full max-w-[320px] min-[810px]:max-w-[688px] min-[1200px]:max-w-[1048px] min-h-[512px] min-[810px]:min-h-[413px] min-[1200px]:min-h-[589px] bg-[#F9F9F9] rounded-[32px] p-6 sm:p-8 min-[810px]:py-8 min-[810px]:pr-8 min-[810px]:pl-[80px] min-[1200px]:py-10 min-[1200px]:pr-10 min-[1200px]:pl-[80px] flex flex-col min-[810px]:flex-row items-center justify-between gap-6 min-[1200px]:gap-8 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Left: Text Block (max-w-[344px]) */}
        <div className="w-full min-[810px]:w-auto min-[810px]:max-w-[344px] flex flex-col items-start justify-center z-10 shrink-0">
          <span className="text-[#E51A24] text-sm font-medium tracking-wide mb-2 block uppercase">
            {formattedCategory}
          </span>
          <h3 className="text-2xl min-[1200px]:text-[28px] font-bold text-gray-950 tracking-tight mb-3 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
            {product.shortDescription}
          </p>
          <Button
            href={href}
            variant="primary"
            size="md"
            aria-label={`Learn more about ${product.name}`}
            className="px-6 py-2.5 font-semibold shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Right: Product Visual Slot (434 × 485.36 px target bounding box) */}
        <div className="relative w-full min-[810px]:w-[340px] min-[1200px]:w-[434px] h-[260px] min-[810px]:h-[350px] min-[1200px]:h-[485px] flex items-center justify-center">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 810px) 320px, (max-width: 1200px) 340px, 434px"
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 2. LARGE (Kettle 1.7 L / Category Highlight Banner)
  // Dimensions from spec:
  // Desktop: 1106 × 621 px (16:9 horizontal)
  // Tablet:  746 × 419.62 px
  // Mobile:  358 × 537 px (vertical)
  // -------------------------------------------------------------
  if (activeVariant === "large") {
    return (
      <article
        className={`group relative w-full max-w-[358px] min-[810px]:max-w-[746px] min-[1200px]:max-w-[1106px] min-h-[537px] min-[810px]:min-h-[420px] min-[1200px]:min-h-[621px] bg-[#F9F9F9] rounded-[32px] overflow-hidden flex flex-col min-[810px]:flex-row items-stretch justify-between border border-neutral-200/60 shadow-xs transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Left: Text Block */}
        <div className="p-6 sm:p-10 min-[1200px]:p-16 flex flex-col justify-center items-start min-[810px]:w-1/2 min-[1200px]:max-w-[420px] z-10">
          <span className="text-[#E51A24] text-sm font-medium tracking-wide mb-2 block uppercase">
            {formattedCategory}
          </span>
          <h3 className="text-2xl sm:text-3xl min-[1200px]:text-4xl font-bold text-gray-950 tracking-tight mb-3 sm:mb-4">
            {product.name}
          </h3>
          <p className="text-sm min-[1200px]:text-base text-gray-600 leading-relaxed mb-6 min-[1200px]:mb-8 max-w-[344px]">
            {product.shortDescription}
          </p>
          <Button
            href={href}
            variant="primary"
            size="md"
            aria-label={`Learn more about ${product.name}`}
            className="px-6 py-2.5 font-semibold shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Right: Product Visual Slot */}
        <div className="relative w-full min-[810px]:w-1/2 min-[1200px]:flex-1 min-h-[260px] min-[810px]:min-h-[380px] min-[1200px]:min-h-[480px] flex items-center justify-center p-4">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 810px) 358px, (max-width: 1200px) 373px, 550px"
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 3. MEDIUM VERTICAL (Spotlight: Blenders, Indoor Camera)
  // Dimensions from spec:
  // Desktop: 540 × 720 px (or 570 × 720 px)
  // Internal Padding: pt-16 px-20 pb-10, gap 32px
  // Tablet:  365 × 486.67 px
  // Mobile:  358 × 537 px
  // -------------------------------------------------------------
  if (activeVariant === "medium-vertical") {
    return (
      <article
        className={`group relative w-full max-w-[358px] min-[810px]:max-w-[365px] min-[1200px]:max-w-[570px] min-h-[537px] min-[810px]:min-h-[486px] min-[1200px]:min-h-[720px] bg-[#F9F9F9] rounded-[32px] pt-10 min-[810px]:pt-12 min-[1200px]:pt-16 px-6 sm:px-12 min-[1200px]:px-20 pb-8 min-[1200px]:pb-10 flex flex-col items-center text-center justify-between gap-8 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Top Text Block (max-w-[344px]) */}
        <div className="flex flex-col items-center max-w-[344px] z-10">
          <span className="text-[#E51A24] text-sm font-medium tracking-wide mb-2 block uppercase">
            {formattedCategory}
          </span>
          <h3 className="text-2xl font-bold text-gray-950 tracking-tight mb-3 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
            {product.shortDescription}
          </p>
          <Button
            href={href}
            variant="primary"
            size="md"
            aria-label={`Learn more about ${product.name}`}
            className="px-6 py-2.5 font-semibold shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Bottom Product Visual Slot */}
        <div className="relative w-full h-[260px] min-[810px]:h-[280px] min-[1200px]:h-[380px] flex items-center justify-center">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 810px) 358px, (max-width: 1200px) 365px, 434px"
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 4. MEDIUM HORIZONTAL (Stacked security cards: Outdoor Cam, Doorbell)
  // Dimensions from spec:
  // Desktop: 254 × 574 px
  // -------------------------------------------------------------
  if (activeVariant === "medium-horizontal") {
    return (
      <article
        className={`group relative w-full max-w-[574px] min-h-[254px] bg-[#F9F9F9] rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 min-[1200px]:gap-8 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Left: Text Block */}
        <div className="w-full sm:w-1/2 max-w-[300px] flex flex-col items-start justify-center z-10 shrink-0">
          <span className="text-[#E51A24] text-xs sm:text-sm font-medium tracking-wide mb-1.5 block uppercase">
            {formattedCategory}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
          <Button
            href={href}
            variant="primary"
            size="sm"
            aria-label={`Learn more about ${product.name}`}
            className="px-5 py-2 font-semibold shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Right: Product Visual Slot */}
        <div className="relative w-full sm:w-[180px] min-[1200px]:w-[200px] h-[140px] sm:h-[180px] flex items-center justify-center">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 810px) 200px, 200px"
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 5. SMALL (Accessories 3-column Grid)
  // Dimensions from spec:
  // Desktop: 450 × 614.7 px (~3:4 vertical stacked)
  // Tablet:  238 × 457 px
  // Mobile:  colonna fluida / stacked
  // -------------------------------------------------------------
  return (
    <article
      className={`group relative w-full max-w-[450px] min-h-[480px] min-[810px]:min-h-[457px] min-[1200px]:min-h-[614px] bg-[#F9F9F9] rounded-[32px] p-6 sm:p-8 min-[1200px]:p-10 flex flex-col items-center text-center justify-between border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
    >
      {/* Top Text Block (max-w-[344px]) */}
      <div className="flex flex-col items-center max-w-[344px] mb-6 z-10">
        <span className="text-[#E51A24] text-sm font-medium tracking-wide mb-2 block uppercase">
          {formattedCategory}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
          {product.shortDescription}
        </p>
        <Button
          href={href}
          variant="primary"
          size="md"
          aria-label={`Learn more about ${product.name}`}
          className="px-6 py-2.5 font-semibold shadow-xs"
        >
          Learn more
        </Button>
      </div>

      {/* Bottom Product Visual Slot */}
      <div className="relative w-full h-[220px] sm:h-[260px] min-[1200px]:h-[300px] flex items-center justify-center p-2">
        <Image
          src={imageSource}
          alt={product.name}
          fill
          sizes="(max-width: 810px) 300px, (max-width: 1200px) 238px, 450px"
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          priority={priority}
        />
      </div>
    </article>
  );
}

export default ProductCard;
