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
  // Desktop: 1048 × 589 px, p-10 (pl-[80px]), gap-8
  // Tablet: 688 × 413 px
  // Mobile: 320 × 512 px, testo centrato in alto, padding T40 R24 L24, gap 24px
  // -------------------------------------------------------------
  if (activeVariant === "bestseller") {
    return (
      <article
        className={`group relative w-full max-w-[320px] md:max-w-[688px] xl:max-w-[1048px] min-h-[512px] md:min-h-[413px] md:h-[413px] xl:min-h-[589px] xl:h-[589px] bg-[#F9F9F9] rounded-[24px] md:rounded-[32px] xl:rounded-[32px] pt-[40px] px-[24px] pb-6 md:py-8 md:pl-10 md:pr-8 xl:p-10 xl:pl-[80px] flex flex-col md:flex-row xl:flex-row items-center justify-between gap-[24px] md:gap-6 xl:gap-8 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Top on Mobile (Centered) / Left on Tablet & Desktop: Text Block with Category Tag */}
        <div className="w-full md:w-auto md:max-w-[344px] xl:max-w-[344px] flex flex-col items-center text-center md:items-start md:text-left xl:items-start xl:text-left justify-center z-10 shrink-0">
          <span className="text-[#E51A24] text-sm font-medium tracking-wide mb-2 block uppercase">
            {formattedCategory}
          </span>
          <h3 className="text-2xl xl:text-[28px] font-bold text-gray-950 tracking-tight mb-3 line-clamp-2">
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

        {/* Right / Bottom: Product Visual Slot */}
        <div className="relative w-full md:w-[320px] xl:w-[434px] h-[240px] md:h-[340px] xl:h-[485px] max-h-[485px] flex items-center justify-center">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 280px, (max-width: 1200px) 340px, 434px"
            className="object-contain max-h-[485px] p-2 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 2. LARGE (Kettle 1.7 L / Category Highlight Banner / Tablet Indoor Cam)
  // NO category tag. Supporta lifestyleImage full-bleed.
  // Desktop: 1106 × 621 px, flex-row, pl-[80px] sul testo
  // Tablet: 746 × 420 px
  // Mobile: 358 × 477.33 px, radius 16px, padding T40 R24 L24, gap 24px, testo centrato in alto
  // -------------------------------------------------------------
  if (activeVariant === "large") {
    if (lifestyleImage) {
      return (
        <article
          className={`group relative w-full max-w-[358px] md:max-w-[746px] xl:max-w-[1106px] mx-auto h-[477.33px] min-h-[477.33px] md:min-h-[420px] md:h-[420px] xl:h-[621px] xl:min-h-[621px] rounded-[16px] md:rounded-[32px] xl:rounded-[32px] overflow-hidden flex flex-col md:flex-row xl:flex-row items-center md:items-stretch justify-start md:justify-between shadow-xs border border-neutral-200/60 transition-all duration-300 hover:shadow-md ${className}`.trim()}
        >
          {/* Background Lifestyle Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={lifestyleImage}
              alt={product.name}
              fill
              sizes="(min-width: 1200px) 1106px, (min-width: 768px) 746px, 358px"
              className="object-cover object-bottom md:object-center"
              priority={priority}
            />
          </div>

          {/* Top Center on Mobile / Left on Tablet & Desktop: Text Block */}
          <div className="relative z-10 w-full pt-[40px] px-[24px] pb-6 md:py-8 md:pl-10 md:pr-6 xl:py-10 xl:pl-[80px] xl:pr-10 flex flex-col justify-start md:justify-center items-center text-center md:items-start md:text-left xl:items-start xl:text-left md:w-1/2 xl:max-w-[460px]">
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-[#000000] tracking-tight mb-2 md:mb-3 xl:mb-4">
              {product.name}
            </h3>
            <p className="text-sm xl:text-base text-gray-800 leading-relaxed mb-5 md:mb-6 xl:mb-8 max-w-[310px] md:max-w-[344px]">
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
        className={`group relative w-full max-w-[358px] md:max-w-[746px] xl:max-w-[1106px] mx-auto h-[477.33px] min-h-[477.33px] md:min-h-[420px] md:h-[420px] xl:h-[621px] xl:min-h-[621px] bg-[#F9F9F9] rounded-[16px] md:rounded-[32px] xl:rounded-[32px] pt-[40px] px-[24px] pb-6 md:p-0 overflow-hidden flex flex-col md:flex-row xl:flex-row items-center md:items-stretch justify-between gap-[24px] md:gap-0 border border-neutral-200/60 shadow-xs transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Top Center on Mobile / Left on Tablet & Desktop: Text Block */}
        <div className="w-full md:py-8 md:pl-10 md:pr-6 xl:py-10 xl:pl-[80px] xl:pr-10 flex flex-col justify-center items-center text-center md:items-start md:text-left xl:items-start xl:text-left md:w-1/2 xl:max-w-[460px] z-10">
          <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-gray-950 tracking-tight mb-2 md:mb-3 xl:mb-4">
            {product.name}
          </h3>
          <p className="text-sm xl:text-base text-gray-600 leading-relaxed mb-5 md:mb-6 xl:mb-8 max-w-[310px] md:max-w-[344px]">
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

        {/* Right / Bottom: Product Visual Slot */}
        <div className="relative w-full flex-1 md:w-1/2 xl:flex-1 min-h-[200px] md:min-h-[360px] xl:min-h-[480px] flex items-center justify-center p-2 md:p-4">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 310px, (max-width: 1200px) 373px, 550px"
            className="object-contain p-2 md:p-4 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 3. MEDIUM VERTICAL (Indoor Camera shelf / Blenders / Secondary cards)
  // NO category tag. Supporta lifestyleImage full-bleed per Indoor Camera.
  // Desktop: 540 × 720 px, padding px-[80px] (Blenders) / Indoor Camera (540 × 720)
  // Tablet: 365 × 487 px (img 298×298)
  // Mobile: 358 × 537 px, padding T40 R24 L24, gap 24px, testo centrato in alto
  // -------------------------------------------------------------
  if (activeVariant === "medium-vertical") {
    if (lifestyleImage) {
      return (
        <article
          className={`group relative w-full max-w-[358px] md:max-w-[365px] xl:max-w-[540px] xl:w-[540px] mx-auto min-h-[477.33px] md:min-h-[487px] md:h-[487px] xl:min-h-[720px] xl:h-[720px] rounded-[16px] md:rounded-[32px] xl:rounded-[32px] overflow-hidden flex flex-col items-center text-center justify-between shadow-xs border border-neutral-200/60 transition-all duration-300 hover:shadow-md ${className}`.trim()}
        >
          {/* Background Full-bleed Lifestyle Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={lifestyleImage}
              alt={product.name}
              fill
              sizes="(min-width: 1200px) 540px, (min-width: 768px) 365px, 358px"
              className="object-cover object-center"
              priority={priority}
            />
          </div>

          {/* Centered Top Text Block */}
          <div className="relative z-10 pt-[40px] px-[24px] md:pt-10 md:px-8 xl:pt-16 xl:px-14 flex flex-col items-center text-center max-w-[380px]">
            <h3 className="text-2xl xl:text-3xl font-bold text-gray-950 tracking-tight mb-3">
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
          <div className="relative w-full h-[220px] md:h-[240px] xl:h-[380px] pointer-events-none" />
        </article>
      );
    }

    return (
      <article
        className={`group relative w-full max-w-[358px] md:max-w-[365px] xl:max-w-[540px] xl:w-[540px] mx-auto min-h-[537px] md:min-h-[487px] xl:min-h-[720px] xl:h-[720px] bg-[#F9F9F9] rounded-[24px] md:rounded-[32px] xl:rounded-[32px] pt-[40px] px-[24px] pb-6 md:pt-8 md:px-6 md:pb-4 xl:pt-16 xl:px-[80px] xl:pb-10 flex flex-col items-center text-center justify-between xl:justify-start gap-[24px] md:gap-0 xl:gap-[60px] border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Top Text Block (centrato in alto, senza tag di categoria) */}
        <div className="flex flex-col items-center text-center max-w-[344px] z-10 shrink-0">
          <h3 className="text-2xl font-bold text-[#000000] tracking-tight mb-2 md:mb-2 xl:mb-3 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-5 md:mb-4 xl:mb-6 line-clamp-2">
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

        {/* Bottom Product Visual Slot (Tablet: 298 × 298 px, Desktop: flex-1 min-h-[380px] p-2) */}
        <div className="relative w-[260px] h-[260px] md:w-[298px] md:h-[298px] xl:w-full xl:h-auto xl:flex-1 xl:min-h-[380px] shrink-0 flex items-center justify-center mx-auto">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 260px, (max-width: 1200px) 298px, 434px"
            className="object-contain xl:p-2 transition-transform duration-500 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // 4. MEDIUM HORIZONTAL (Outdoor Camera, Doorbell - Desktop only)
  // NO category tag. Titolo a capo naturalmente su 2 righe (no line-clamp).
  // Desktop: 540 × 348 px (2 sovrapposte a destra nel bento Home Security)
  // -------------------------------------------------------------
  if (activeVariant === "medium-horizontal") {
    return (
      <article
        className={`group relative w-full xl:w-[540px] min-h-[254px] xl:h-[348px] bg-[#F9F9F9] rounded-[24px] md:rounded-[32px] xl:rounded-[32px] pt-[40px] px-[24px] pb-6 sm:p-8 xl:p-8 flex flex-col sm:flex-row xl:flex-row items-center text-center sm:text-left xl:text-left justify-between gap-[24px] xl:gap-8 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
      >
        {/* Left: Text Block (senza tag di categoria, titolo su due righe) */}
        <div className="w-full sm:w-1/2 max-w-[340px] flex flex-col items-center sm:items-start xl:items-start justify-center z-10 shrink-0">
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
        <div className="relative w-full sm:w-[180px] xl:w-[200px] h-[160px] sm:h-[180px] flex items-center justify-center">
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
  // Mobile (< 768px): Titolo, descrizione e CTA in alto al centro (padding T40 R24 L24, gap 24px), immagine in basso.
  // Tablet (768 - 1199px): Immagine in alto, testo in basso (238 × 457 px, p-5)
  // Desktop (>= 1200px): 3 colonne affiancate, max-w-[450px], min-h-[520px], p-8
  // -------------------------------------------------------------
  return (
    <article
      className={`group relative w-full max-w-[358px] md:max-w-[238px] xl:max-w-[450px] mx-auto min-h-[510px] md:min-h-[457px] md:h-[457px] xl:min-h-[520px] xl:h-[520px] bg-[#F9F9F9] rounded-[24px] md:rounded-[32px] xl:rounded-[32px] pt-[40px] px-[24px] pb-6 md:p-5 xl:p-8 flex flex-col justify-between items-center text-center md:items-start md:text-left xl:items-start xl:text-left gap-[24px] md:gap-0 xl:gap-0 border border-neutral-200/60 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${className}`.trim()}
    >
      {/* Product Visual Slot: Bottom on Mobile (order-2), Top on Tablet/Desktop (md:order-1) */}
      <div className="order-2 md:order-1 relative w-full h-[240px] md:h-[180px] xl:h-[250px] flex items-center justify-center md:mb-4">
        <Image
          src={imageSource}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 260px, (max-width: 1200px) 238px, 450px"
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          priority={priority}
        />
      </div>

      {/* Text Block: Top Centered on Mobile (order-1), Bottom Left on Tablet/Desktop (md:order-2) */}
      <div className="order-1 md:order-2 w-full flex flex-col items-center text-center md:items-start md:text-left xl:items-start xl:text-left z-10">
        <h3 className="text-2xl md:text-base xl:text-2xl font-bold text-gray-950 tracking-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm md:text-xs xl:text-sm text-gray-600 leading-relaxed mb-5 md:mb-4 xl:mb-6 line-clamp-2">
          {product.shortDescription}
        </p>
        <Button
          href={targetHref}
          variant="primary"
          size="md"
          aria-label={`Learn more about ${product.name}`}
          className="px-6 py-2.5 md:px-4 md:py-1.5 xl:px-6 xl:py-2.5 text-sm md:text-xs xl:text-sm font-semibold shadow-xs"
        >
          Learn more
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
