import React from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";

export function Hero() {
  return (
    <section
      className="w-full relative aspect-[16/9] min-h-[500px] md:min-h-[560px] xl:min-h-[720px] max-h-[820px] overflow-hidden bg-[#E3C8B0] flex flex-col items-center justify-start text-center"
      aria-label="Octopus Ionic Hair Dryer Hero Showcase"
    >
      <Image
        src="/images/banners/hero-macro.png"
        alt="Octopus Ionic Hair Dryer"
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Floating Center Content: posizionato nello spazio vuoto tra la navbar e la testa della persona */}
      <div className="relative z-10 flex flex-col items-center max-w-xl px-4 pt-[80px] sm:pt-[84px] md:pt-[90px] xl:pt-[104px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-[#000000] mb-1.5 sm:mb-2 md:mb-2.5 xl:mb-3">
          Octopus Hair Dryer
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-snug sm:leading-relaxed mb-3 sm:mb-4 xl:mb-6 max-w-[280px] sm:max-w-sm md:max-w-md">
          Dry your hair faster and with less frizz with this powerful ionic hair dryer
        </p>
        <Button
          href="/products/ionic-hair-dryer"
          variant="primary"
          size="md"
          className="px-5 py-2 sm:px-6 sm:py-2.5 xl:px-7 xl:py-3 text-xs sm:text-sm xl:text-base font-semibold shadow-xs"
        >
          Learn more
        </Button>
      </div>
    </section>
  );
}

export default Hero;
