import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Button } from "@/components/common/Button";

export type ProductCardVariant =
  | "bestseller"
  | "large"
  | "medium-vertical"
  | "medium-horizontal"
  | "small"
  | "cross-sell"
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
  href,
  lifestyleImage,
}: ProductCardProps) {
  const targetHref = href || `/products/${product.slug}`;
  const formattedCategory = product.category.replace(/-/g, " ");
  const imageSource = lifestyleImage || product.image;

  // Normalize legacy/alias variants
  const activeVariant:
    | "bestseller"
    | "large"
    | "medium-vertical"
    | "medium-horizontal"
    | "small"
    | "cross-sell" =
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
  // Tag rosso di categoria SOLO ED ESCLUSIVAMENTE in questa sezione.
  // Dimensioni da matrice: Desktop 1048 × 514 px, pl-[80px] su desktop, gap 32px
  // -------------------------------------------------------------
  if (activeVariant === "bestseller") {
    return (
      <article
        className={`group relative w-full max-w-[320px] min-[810px]:max-w-[688px] min-[1200px]:max-w-[1048px] min-h-[512px] min-[810px]:min-h-[413px] min-[1200px]:min-h-[514px] min-[1200px]:h-[514px] bg-[#F9F9F9] rounded-[32px] p-6 sm:p-8 min-[810px]:py-8 min-[810px]:pl-12 min-[810px]:pr-8 min-[1200px]:py-10 min-[1200px]:pl-[80px] min-[1200px]:pr-10 flex flex-col min-[810px]:flex-row items-center justify-between gap-6 min-[1200px]:gap-8 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Left: Text Block (max-w-[344px]) with Category Tag */}
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
            href={targetHref}
            variant="primary"
            size="md"
            aria-label={`Learn more about ${product.name}`}
            className="px-6 py-2.5 font-semibold shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Right: Product Visual Slot (calibrato max-h-[380px] per eliminare vuoti) */}
        <div className="relative w-full min-[810px]:w-[340px] min-[1200px]:w-[434px] h-[260px] min-[810px]:h-[340px] min-[1200px]:h-[380px] max-h-[380px] flex items-center justify-center">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 810px) 320px, (max-width: 1200px) 340px, 434px"
            className="object-contain max-h-[380px] p-2 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 2. LARGE (Kettle 1.7 L / Category Highlight Banner)
  // NO category tag. Supporta lifestyleImage full-bleed.
  // Desktop padding: pt/pb 40px, pl 64px.
  // -------------------------------------------------------------
  if (activeVariant === "large") {
    if (lifestyleImage) {
      return (
        <article
          className={`group relative w-full min-h-[537px] min-[810px]:min-h-[420px] min-[1200px]:min-h-[621px] rounded-[32px] overflow-hidden flex flex-col min-[810px]:flex-row items-stretch justify-between shadow-xs border border-neutral-200/60 transition-all duration-300 hover:shadow-md ${className}`.trim()}
        >
          {/* Background Lifestyle Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={lifestyleImage}
              alt={product.name}
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover object-center"
              priority={priority}
            />
          </div>

          {/* Left: Text Block (senza tag di categoria - desktop: pt/pb 40px, pl 80px) */}
          <div className="relative z-10 p-6 sm:p-10 min-[810px]:py-10 min-[810px]:pl-12 min-[810px]:pr-8 min-[1200px]:py-10 min-[1200px]:pl-[80px] min-[1200px]:pr-10 flex flex-col justify-center items-start min-[810px]:w-1/2 min-[1200px]:max-w-[460px]">
            <h3 className="text-2xl sm:text-3xl min-[1200px]:text-4xl font-bold text-[#000000] tracking-tight mb-3 sm:mb-4">
              {product.name}
            </h3>
            <p className="text-sm min-[1200px]:text-base text-gray-800 leading-relaxed mb-6 min-[1200px]:mb-8 max-w-[344px]">
              {product.shortDescription}
            </p>
            <Button
              href={targetHref}
              variant="primary"
              size="md"
              aria-label={`Learn more about ${product.name}`}
              className="px-6 py-2.5 font-semibold shadow-xs"
            >
              Learn more
            </Button>
          </div>
        </article>
      );
    }

    return (
      <article
        className={`group relative w-full min-h-[537px] min-[810px]:min-h-[420px] min-[1200px]:min-h-[621px] bg-[#F9F9F9] rounded-[32px] overflow-hidden flex flex-col min-[810px]:flex-row items-stretch justify-between border border-neutral-200/60 shadow-xs transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Left: Text Block (desktop: pt/pb 40px, pl 80px) */}
        <div className="p-6 sm:p-10 min-[810px]:py-10 min-[810px]:pl-12 min-[810px]:pr-8 min-[1200px]:py-10 min-[1200px]:pl-[80px] min-[1200px]:pr-10 flex flex-col justify-center items-start min-[810px]:w-1/2 min-[1200px]:max-w-[460px] z-10">
          <h3 className="text-2xl sm:text-3xl min-[1200px]:text-4xl font-bold text-gray-950 tracking-tight mb-3 sm:mb-4">
            {product.name}
          </h3>
          <p className="text-sm min-[1200px]:text-base text-gray-600 leading-relaxed mb-6 min-[1200px]:mb-8 max-w-[344px]">
            {product.shortDescription}
          </p>
          <Button
            href={targetHref}
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
  // 3. MEDIUM VERTICAL (Indoor Camera shelf / Blenders)
  // NO category tag. Supporta lifestyleImage full-bleed per Indoor Camera.
  // -------------------------------------------------------------
  if (activeVariant === "medium-vertical") {
    if (lifestyleImage) {
      return (
        <article
          className={`group relative w-full min-h-[537px] min-[810px]:min-h-[486px] min-[1200px]:min-h-[720px] rounded-[32px] overflow-hidden flex flex-col items-center text-center justify-between shadow-xs border border-neutral-200/60 transition-all duration-300 hover:shadow-md ${className}`.trim()}
        >
          {/* Background Full-bleed Lifestyle Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={lifestyleImage}
              alt={product.name}
              fill
              sizes="(min-width: 1200px) 570px, 100vw"
              className="object-cover object-center"
              priority={priority}
            />
          </div>

          {/* Centered Top Text Block (senza stacchi artificiali né tag di categoria) */}
          <div className="relative z-10 pt-10 min-[810px]:pt-12 min-[1200px]:pt-16 px-6 sm:px-10 min-[1200px]:px-14 flex flex-col items-center max-w-[380px]">
            <h3 className="text-2xl min-[1200px]:text-3xl font-bold text-gray-950 tracking-tight mb-3">
              {product.name}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              {product.shortDescription}
            </p>
            <Button
              href={targetHref}
              variant="primary"
              size="md"
              aria-label={`Learn more about ${product.name}`}
              className="px-6 py-2.5 font-semibold shadow-xs"
            >
              Learn more
            </Button>
          </div>

          {/* Spacer to keep camera on shelf clear */}
          <div className="relative w-full h-[280px] min-[1200px]:h-[380px] pointer-events-none" />
        </article>
      );
    }

    return (
      <article
        className={`group relative w-full min-h-[537px] min-[810px]:min-h-[486px] min-[1200px]:min-h-[720px] bg-[#F9F9F9] rounded-[32px] pt-10 min-[810px]:pt-12 min-[1200px]:pt-16 px-6 sm:px-10 min-[810px]:px-12 min-[1200px]:px-[80px] pb-8 min-[1200px]:pb-10 flex flex-col items-center text-center justify-start gap-8 min-[810px]:gap-10 min-[1200px]:gap-[60px] border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Top Text Block (senza tag di categoria) */}
        <div className="flex flex-col items-center max-w-[344px] z-10 shrink-0">
          <h3 className="text-2xl font-bold text-[#000000] tracking-tight mb-3 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
            {product.shortDescription}
          </p>
          <Button
            href={targetHref}
            variant="primary"
            size="md"
            aria-label={`Learn more about ${product.name}`}
            className="px-6 py-2.5 font-semibold shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Bottom Product Visual Slot */}
        <div className="relative w-full flex-1 min-h-[260px] min-[810px]:min-h-[280px] min-[1200px]:min-h-[380px] flex items-center justify-center">
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
  // 4. MEDIUM HORIZONTAL (Outdoor Camera, Doorbell)
  // NO category tag. Titolo a capo naturalmente su 2 righe (no line-clamp).
  // -------------------------------------------------------------
  if (activeVariant === "medium-horizontal") {
    return (
      <article
        className={`group relative w-full min-h-[254px] bg-[#F9F9F9] rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 min-[1200px]:gap-8 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Left: Text Block (senza tag di categoria, titolo su due righe) */}
        <div className="w-full sm:w-1/2 max-w-[340px] flex flex-col items-start justify-center z-10 shrink-0">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
          <Button
            href={targetHref}
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
  // 5. CROSS-SELL (PDP Bottom Carousel - Vertical Minimal Card)
  // -------------------------------------------------------------
  if (activeVariant === "cross-sell") {
    return (
      <Link
        href={targetHref}
        className={`group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-2xl ${className}`.trim()}
        aria-label={product.name}
      >
        <div className="relative w-full aspect-square bg-[#F9F9F9] rounded-2xl p-6 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="260px"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-brand-red transition-colors mb-1 line-clamp-1">
          {product.name}
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
      </Link>
    );
  }

  // -------------------------------------------------------------
  // 6. SMALL (Accessories 3-column Grid)
  // NO category tag. Immagine in alto, testo allineato a sinistra in basso.
  // Dimensioni compatte e calibrate per evitare vuoti.
  // -------------------------------------------------------------
  return (
    <article
      className={`group relative w-full max-w-[450px] min-h-[460px] min-[810px]:min-h-[440px] min-[1200px]:min-h-[520px] min-[1200px]:h-[520px] bg-[#F9F9F9] rounded-[32px] p-6 sm:p-8 min-[1200px]:p-8 flex flex-col justify-between items-start border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
    >
      {/* Top Product Visual Slot */}
      <div className="relative w-full h-[200px] min-[810px]:h-[190px] min-[1200px]:h-[250px] flex items-center justify-center mb-4">
        <Image
          src={imageSource}
          alt={product.name}
          fill
          sizes="(max-width: 810px) 300px, (max-width: 1200px) 238px, 450px"
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          priority={priority}
        />
      </div>

      {/* Bottom Text Block (allineato a sinistra, senza tag di categoria) */}
      <div className="w-full flex flex-col items-start z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
          {product.shortDescription}
        </p>
        <Button
          href={targetHref}
          variant="primary"
          size="md"
          aria-label={`Learn more about ${product.name}`}
          className="px-6 py-2.5 font-semibold shadow-xs"
        >
          Learn more
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
