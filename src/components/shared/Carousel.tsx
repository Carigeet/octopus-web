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

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 500;
    el.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 500;
    el.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
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

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Best Sellers Product Carousel"
    >
      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label="Scrollable list of best seller products"
        className="flex gap-[24px] overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 outline-none focus-visible:ring-2 focus-visible:ring-black [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pl-[max(16px,calc(50%-160px))] pr-[max(16px,calc(50%-160px))] min-[810px]:pl-[calc(50%-344px)] min-[810px]:pr-[calc(50%-344px)] min-[1200px]:pl-[calc(50%-524px)] min-[1200px]:pr-[calc(50%-524px)]"
      >
        {products.map((product, idx) => (
          <div
            key={product.id || product.slug}
            className="w-[320px] min-[810px]:w-[688px] min-[1200px]:w-[1048px] shrink-0 snap-center flex justify-center"
          >
            <ProductCard
              product={product}
              variant={cardVariant}
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls (Bottom Right as per Figma) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-end gap-3 pt-4 sm:pt-6">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous products"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200 bg-white text-neutral-dark hover:bg-neutral-100 active:bg-neutral-200 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer shadow-2xs"
        >
          <svg
            className="w-5 h-5"
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
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200 bg-white text-neutral-dark hover:bg-neutral-100 active:bg-neutral-200 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer shadow-2xs"
        >
          <svg
            className="w-5 h-5"
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
