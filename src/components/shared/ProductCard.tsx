import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  href?: string;
}

export function ProductCard({
  product,
  className = "",
  priority = false,
  href = "/products/countertop-blender",
}: ProductCardProps) {
  const formattedCategory = product.category.replace(/-/g, " ");

  return (
    <article
      className={`group relative flex flex-col justify-between h-full rounded-2xl md:rounded-3xl bg-neutral-surface p-6 md:p-7 border border-border-subtle/70 transition-all duration-300 hover:shadow-md ${className}`.trim()}
    >
      <div>
        {/* Header: Badge & Category */}
        <div className="flex items-center justify-between gap-2 mb-4 min-h-[26px]">
          {product.bestSeller ? (
            <Badge variant="default">Best Seller</Badge>
          ) : (
            <span />
          )}
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted">
            {formattedCategory}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative w-full aspect-square sm:aspect-4/3 max-h-56 mb-5 overflow-hidden rounded-xl bg-white/70 flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1200px) 25vw, (min-width: 810px) 33vw, 100vw"
            className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105"
            priority={priority}
          />
        </div>

        {/* Product Details */}
        <h3 className="text-lg md:text-xl font-bold text-neutral-dark mb-2 tracking-tight group-hover:text-brand-red transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-muted line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Action / CTA */}
      <div className="pt-2">
        <Button
          href={href}
          variant="primary"
          size="sm"
          aria-label={`Learn more about ${product.name}`}
          className="w-full sm:w-auto"
        >
          Learn more
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;

