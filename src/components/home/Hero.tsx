import React from "react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      className="w-full relative aspect-[16/9] md:aspect-[21/9] min-h-[480px] max-h-[720px] overflow-hidden bg-neutral-900"
      aria-label="Octopus Ionic Hair Dryer Hero Showcase"
    >
      <Image
        src="/images/banners/hero-macro.png"
        alt="Octopus Ionic Hair Dryer engineered precision detail"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}

export default Hero;
