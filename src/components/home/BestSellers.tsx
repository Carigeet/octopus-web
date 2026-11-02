import React from "react";
import { Product } from "@/types/product";
import { Carousel } from "@/components/shared/Carousel";

export interface BestSellersProps {
  products: Product[];
  className?: string;
}

export function BestSellers({ products, className = "" }: BestSellersProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      className={`w-full pt-14 sm:pt-20 pb-8 sm:pb-12 overflow-hidden ${className}`.trim()}
      aria-label="Best Sellers Carousel"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark">
          Best sellers
        </h2>
      </div>
      <Carousel products={products} cardVariant="bestseller" />
    </section>
  );
}

export default BestSellers;

