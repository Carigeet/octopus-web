"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { ProductCard, ProductCardVariant } from "@/components/shared/ProductCard";

export interface CarouselProps {
  products: Product[];
  className?: string;
  cardVariant?: ProductCardVariant;
}

export function Carousel({
  products,
  className = "",
  cardVariant = "bestseller",
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);

    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability, products]);

  const getStep = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const firstChild = el.firstElementChild as HTMLElement | null;
    return firstChild ? firstChild.offsetWidth + 32 : 720;
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  if (!products || products.length === 0) return null;

  const isCrossSell = cardVariant === "cross-sell";

  const trackPaddingClasses = isCrossSell
    ? "w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 scroll-pl-4 md:scroll-pl-0 xl:scroll-pl-0"
    : "w-full pl-4 md:pl-[max(1rem,calc(50%-373px))] xl:pl-[max(1rem,calc(50%-553px))] pr-4 md:pr-[max(1rem,calc(50%-373px))] xl:pr-[max(1rem,calc(50%-553px))] scroll-pl-4 md:scroll-pl-[max(1rem,calc(50%-373px))] xl:scroll-pl-[max(1rem,calc(50%-553px))]";

  const slideClasses = isCrossSell
    ? "w-[220px] sm:w-[240px] xl:w-[260px] shrink-0 snap-start flex justify-center"
    : "w-[320px] md:w-[688px] xl:w-[1106px] shrink-0 snap-start flex justify-center";

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Best Sellers Product Carousel"
    >
      {/* Scrollable Track - removed scroll-smooth to prevent Safari animation collision */}
      <div
        ref={scrollRef}
        tabIndex={0}
        role="group"
        aria-label="Scrollable list of best seller products"
        className={`flex gap-[32px] overflow-x-auto snap-x snap-mandatory pb-4 outline-none focus-visible:ring-2 focus-visible:ring-black [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${trackPaddingClasses}`}
      >
        {products.map((product) => (
          <div
            key={product.id || product.slug}
            className={slideClasses}
          >
            <ProductCard
              product={product}
              variant={cardVariant}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls (Bottom Right as per Figma) */}
      <div className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 flex items-center justify-end gap-3 pt-4 sm:pt-6">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous products"
          className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-dark hover:bg-neutral-100 active:bg-neutral-200 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer shadow-xs select-none touch-manipulation"
        >
          <svg
            className="w-5 h-5 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next products"
          className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-dark hover:bg-neutral-100 active:bg-neutral-200 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer shadow-xs select-none touch-manipulation"
        >
          <svg
            className="w-5 h-5 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
