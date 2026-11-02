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
    <section className="w-full relative overflow-hidden bg-[#D9BBA0]">
      {/* Background Image: full bleed edge-to-edge */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/banners/hair-dryer-banner.png"
          alt={title}
          fill
          sizes="100vw"
          className="object-cover object-right"
          priority={false}
        />
      </div>

      {/* Grid container: allinea il testo con la griglia del sito e padding sinistro 80px */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 min-h-[440px] md:min-h-[500px] lg:min-h-[560px] flex items-center">
        <div className="max-w-lg lg:max-w-xl pl-0 sm:pl-6 min-[810px]:pl-12 min-[1200px]:pl-[80px] flex flex-col items-start py-12 md:py-16 bg-gradient-to-r from-[#D9BBA0]/85 via-[#D9BBA0]/40 to-transparent md:bg-none rounded-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#000000] mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#000000]/85 leading-relaxed mb-6 sm:mb-8 max-w-[360px]">
            {description}
          </p>
          <Button
            href={targetHref}
            variant="primary"
            size="md"
            aria-label={`Learn more about ${title}`}
            className="px-7 py-3 shadow-xs font-semibold"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HairCareBanner;
