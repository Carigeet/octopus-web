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

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12">
      <div className="relative w-full rounded-3xl md:rounded-[32px] overflow-hidden bg-[#dcb89f] flex flex-col md:flex-row items-stretch justify-between shadow-xs border border-neutral-300/40">
        {/* Left Text Block */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center items-start md:w-5/12 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-dark mb-4 sm:mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-dark/85 leading-relaxed mb-6 sm:mb-8 max-w-sm">
            {description}
          </p>
          <Button
            href="/products/countertop-blender"
            variant="primary"
            size="md"
            aria-label={`Learn more about ${title}`}
            className="px-7 py-3 shadow-xs"
          >
            Learn more
          </Button>
        </div>

        {/* Right Lifestyle Image */}
        <div className="relative w-full md:w-7/12 min-h-[300px] sm:min-h-[380px] md:min-h-[460px] overflow-hidden">
          <Image
            src="/images/banners/placeholder-1600x900.png"
            alt={title}
            fill
            sizes="(min-width: 1200px) 58vw, (min-width: 810px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

export default HairCareBanner;
