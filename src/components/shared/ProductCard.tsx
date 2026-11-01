import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/common/Button";

export type ProductCardVariant = "horizontal" | "vertical" | "featured";

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
  variant = "horizontal",
  className = "",
  priority = false,
  href = "/products/countertop-blender",
  lifestyleImage,
}: ProductCardProps) {
  const formattedCategory = product.category.replace(/-/g, " ");
  const imageSource = lifestyleImage || product.image;

  // 1. Featured Variant (Kettle lifestyle or Indoor camera shelf)
  if (variant === "featured") {
    const isVerticalFeatured = product.slug === "indoor-camera";

    if (isVerticalFeatured) {
      return (
        <article
          className={`group relative rounded-3xl md:rounded-[32px] overflow-hidden bg-[#c8b5a7] flex flex-col justify-between h-full border border-neutral-300/40 shadow-xs ${className}`.trim()}
        >
          {/* Top text block */}
          <div className="p-8 sm:p-10 md:p-12 text-center flex flex-col items-center z-10">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark mb-3">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base text-neutral-dark/85 leading-relaxed max-w-sm mb-6">
              {product.shortDescription}
            </p>
            <Button
              href={href}
              variant="primary"
              size="sm"
              aria-label={`Learn more about ${product.name}`}
              className="px-6 py-2.5 shadow-xs"
            >
              Learn more
            </Button>
          </div>

          {/* Bottom image block */}
          <div className="relative w-full aspect-4/3 sm:aspect-square min-h-[300px] overflow-hidden">
            <Image
              src={imageSource}
              alt={product.name}
              fill
              sizes="(min-width: 1200px) 40vw, (min-width: 810px) 50vw, 100vw"
              className="object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-103"
              priority={priority}
            />
          </div>
        </article>
      );
    }

    // Horizontal Featured (e.g. Kettle 1.7 L)
    return (
      <article
        className={`group relative rounded-3xl md:rounded-[32px] overflow-hidden bg-[#efe3dc] flex flex-col md:flex-row items-stretch justify-between border border-neutral-200 shadow-xs ${className}`.trim()}
      >
        {/* Left text block */}
        <div className="p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center items-start md:w-5/12 z-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-dark mb-3 sm:mb-4">
            {product.name}
          </h3>
          <p className="text-sm sm:text-base text-neutral-dark/85 leading-relaxed mb-6 sm:mb-8 max-w-sm">
            {product.shortDescription}
          </p>
          <Button
            href={href}
            variant="primary"
            size="sm"
            aria-label={`Learn more about ${product.name}`}
            className="px-6 py-2.5 shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Right lifestyle image */}
        <div className="relative w-full md:w-7/12 min-h-[280px] sm:min-h-[340px] md:min-h-[400px] overflow-hidden">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(min-width: 1200px) 60vw, (min-width: 810px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // 2. Vertical Variant (Kitchen Blenders, Accessories)
  if (variant === "vertical") {
    return (
      <article
        className={`group relative rounded-3xl md:rounded-[32px] bg-neutral-light p-8 sm:p-10 flex flex-col justify-between items-center text-center overflow-hidden border border-border-subtle/60 shadow-2xs transition-shadow duration-300 hover:shadow-md h-full ${className}`.trim()}
      >
        {/* Top Text & CTA */}
        <div className="flex flex-col items-center max-w-xs mb-6">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-dark mb-2.5">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-muted leading-relaxed mb-6 line-clamp-2">
            {product.shortDescription}
          </p>
          <Button
            href={href}
            variant="primary"
            size="sm"
            aria-label={`Learn more about ${product.name}`}
            className="px-6 py-2 shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Bottom Isolated Product Image */}
        <div className="relative w-full aspect-square max-h-64 sm:max-h-72 flex items-center justify-center p-2">
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(min-width: 1200px) 30vw, (min-width: 810px) 50vw, 100vw"
            className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>
      </article>
    );
  }

  // 3. Horizontal Variant (Best Sellers Carousel, Home Security right column)
  return (
    <article
      className={`group relative rounded-3xl md:rounded-[32px] bg-neutral-light p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden border border-border-subtle/60 shadow-2xs transition-shadow duration-300 hover:shadow-md ${className}`.trim()}
    >
      {/* Left Text Block */}
      <div className="flex flex-col items-start justify-center sm:w-1/2 z-10">
        <span className="text-brand-red text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 block">
          {formattedCategory}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark mb-3 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm sm:text-base text-neutral-muted leading-relaxed mb-6 max-w-sm line-clamp-3">
          {product.shortDescription}
        </p>
        <Button
          href={href}
          variant="primary"
          size="sm"
          aria-label={`Learn more about ${product.name}`}
          className="px-6 py-2.5 shadow-xs"
        >
          Learn more
        </Button>
      </div>

      {/* Right Product Image */}
      <div className="relative w-full sm:w-1/2 aspect-square max-h-64 sm:max-h-72 flex items-center justify-center p-2">
        <Image
          src={imageSource}
          alt={product.name}
          fill
          sizes="(min-width: 1200px) 35vw, (min-width: 810px) 50vw, 100vw"
          className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105"
          priority={priority}
        />
      </div>
    </article>
  );
}

export default ProductCard;
