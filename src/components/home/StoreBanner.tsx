import React from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";

export function StoreBanner() {
  return (
    <section className="w-full bg-brand-red text-white py-14 sm:py-20 overflow-hidden" id="where-to-buy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Column: Branding, Title & CTA */}
        <div className="flex flex-col items-start max-w-lg z-10">
          <span className="text-white/90 text-sm sm:text-base font-medium mb-1">
            Find us at
          </span>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              the warehouse
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white/90 tracking-tighter">
              {"//"}
            </span>
          </div>

          <Button
            href="#store-locator"
            variant="white"
            size="md"
            className="px-6 py-3 font-semibold shadow-xs"
          >
            Find your nearest store
          </Button>
        </div>

        {/* Right Column: Products Display */}
        <div className="relative w-full md:w-7/12 min-h-[260px] sm:min-h-[340px] md:min-h-[380px] flex items-center justify-center">
          <Image
            src="/images/banners/warehouse.png"
            alt="Octopus kitchen appliances available at The Warehouse"
            fill
            sizes="(min-width: 1200px) 50vw, (min-width: 810px) 50vw, 100vw"
            className="object-contain object-center md:object-right"
          />
        </div>
      </div>
    </section>
  );
}

export default StoreBanner;
