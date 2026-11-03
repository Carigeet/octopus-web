import React from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";

export interface StoreBannerProps {
  className?: string;
}

export function StoreBanner({ className = "" }: StoreBannerProps) {
  return (
    <section
      className={`w-full bg-[#D01A1F] text-white relative overflow-hidden ${className}`.trim()}
      id="where-to-buy"
    >
      {/* Container aligned with site grid */}
      <div className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 flex flex-col md:flex-row items-center md:items-center justify-between md:min-h-[560px] xl:min-h-[620px] relative z-10 pt-16 sm:pt-20 pb-4 md:pb-0">
        {/* Left Column: Branding, Title & CTA (Centered on mobile, left-aligned on tablet/desktop) */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-lg z-10 py-2 md:py-16 mx-auto md:mx-0">
          <span className="text-white/95 text-lg sm:text-xl md:text-base font-normal mb-2 md:mb-1.5 tracking-wide">
            Find us at
          </span>
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-7 md:mb-8">
            <span className="text-4xl sm:text-4xl md:text-5xl tracking-tight lowercase leading-none xl:font-normal">
              <span className="font-light xl:font-normal">the</span>
              <span className="hidden xl:inline"> </span>
              <span className="font-bold xl:font-normal">warehouse</span>
            </span>
            <div className="inline-flex items-center justify-center bg-white px-2.5 py-1.5 xl:py-1 rounded-xl shadow-xs">
              <span className="text-[#D01A1F] font-extrabold xl:font-medium text-xl tracking-tighter italic leading-none">
                {"//"}
              </span>
            </div>
          </div>

          <Button
            href="#store-locator"
            variant="white"
            size="md"
            className="px-7 py-3.5 font-medium text-base text-[#000000] shadow-sm hover:bg-neutral-100 transition-colors"
          >
            Find your nearest store
          </Button>
        </div>
      </div>

      {/* Product Image: centrata sotto su mobile, a destra su tablet/desktop */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:absolute md:top-0 md:bottom-0 md:right-0 md:h-full md:w-[62%] lg:w-[60%] xl:w-[58%] pointer-events-none md:[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%)]">
        <Image
          src="/images/banners/warehouse.png"
          alt="Octopus kitchen appliances available at The Warehouse"
          fill
          sizes="(max-width: 810px) 100vw, 60vw"
          className="object-cover object-bottom md:object-right-bottom"
          priority={false}
        />
      </div>
    </section>
  );
}

export default StoreBanner;
