import React from "react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      className="w-full relative aspect-[16/9] min-h-[500px] lg:min-h-[720px] max-h-[820px] overflow-hidden bg-neutral-900"
      aria-label="Octopus Ionic Hair Dryer Hero Showcase"
    >
      <Image
        src="/images/banners/hero-banner.png"
        alt="Octopus Ionic Hair Dryer engineered precision detail"
        fill
        priority={true}
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}

export default Hero;
