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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px] relative z-10 pt-14 sm:pt-20 pb-8 md:pb-0">
        {/* Left Column: Branding, Title & CTA */}
        <div className="flex flex-col items-start max-w-lg z-10 py-6 md:py-16">
          <span className="text-white/95 text-sm sm:text-base font-normal mb-1.5 tracking-wide">
            Find us at
          </span>
          <div className="flex items-center gap-2.5 mb-8">
            <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight lowercase">
              the warehouse
            </span>
            <div className="inline-flex items-center justify-center bg-white px-2.5 py-1 rounded-xl shadow-xs">
              <span className="text-[#D01A1F] font-medium text-xl tracking-tighter italic leading-none">
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

      {/* Right Product Image: grande, copre tutto a destra e tocca il fondo attaccato al footer */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:absolute md:top-0 md:bottom-0 md:right-0 md:h-full md:w-[62%] lg:w-[60%] xl:w-[58%] pointer-events-none md:[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%)]">
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
