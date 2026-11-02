import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/common/Button";

export interface HairCareBannerProps {
  product?: Product | null;
}

export function HairCareBanner({ product }: HairCareBannerProps) {
  const title = product?.name || "Octopus Ionic Hair Dryer";
  const description =
    product?.shortDescription ||
    "Dry your hair faster and with less frizz with this powerful ionic hair dryer";
  const targetHref = product ? `/products/${product.slug}` : "/products/ionic-hair-dryer";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12">
      <div className="relative w-full rounded-[32px] overflow-hidden bg-[#D9BBA0] min-h-[440px] md:min-h-[500px] flex items-center shadow-xs border border-neutral-300/40">
        {/* Background Image of model with hair dryer positioned on the right */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/banners/hair-dryer-banner.png"
            alt={title}
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover object-right"
            priority={false}
          />
        </div>

        {/* Left Text Content */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-lg flex flex-col items-start bg-gradient-to-r from-[#D9BBA0]/80 via-[#D9BBA0]/40 to-transparent md:bg-none rounded-[32px]">
          <span className="text-[#E51A24] text-sm font-semibold tracking-wide mb-2 uppercase">
            Hair Care
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-dark mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-dark/85 leading-relaxed mb-6 sm:mb-8">
            {description}
          </p>
          <Button
            href={targetHref}
            variant="primary"
            size="md"
            aria-label={`Learn more about ${title}`}
            className="px-7 py-3 shadow-xs"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HairCareBanner;
