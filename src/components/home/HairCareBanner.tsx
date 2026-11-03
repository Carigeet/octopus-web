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
    <section className="w-full max-w-[402px] md:max-w-none xl:max-w-none mx-auto h-[707.87px] min-h-[707.87px] md:h-auto md:min-h-[450px] xl:min-h-[560px] pt-[80px] pb-[40px] px-[16px] md:p-0 xl:p-0 relative overflow-hidden bg-[#DCC1A7] xl:bg-[#D9BBA0] flex flex-col items-center justify-start md:block xl:block">
      {/* Background Image: bottom-centered on mobile, shifted right on tablet, full cover on desktop */}
      <div className="absolute bottom-0 inset-x-0 h-[430px] md:inset-y-0 md:right-0 md:left-auto w-full md:w-[82%] xl:w-[85%] md:h-full translate-x-0 md:translate-x-16 xl:translate-x-8 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_100%)]">
        <Image
          src="/images/banners/hair-dryer-banner.png"
          alt={title}
          fill
          sizes="100vw"
          className="object-cover object-right-bottom md:object-right xl:object-right"
        />
      </div>

      {/* Grid container: allineato con la griglia 1106px su desktop */}
      <div className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-0 md:px-0 xl:px-0 relative z-10 md:min-h-[450px] xl:min-h-[560px] flex flex-col md:flex-row xl:flex-row items-center justify-start">
        <div className="w-full max-w-[340px] md:max-w-[330px] xl:max-w-md pl-0 md:pl-0 xl:pl-[80px] flex flex-col items-center text-center md:items-start md:text-left xl:items-start xl:text-left mx-auto md:mx-0 py-0 md:py-14 xl:py-16 rounded-2xl">
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-[#000000] mb-3 sm:mb-4 leading-tight max-w-[280px] xl:max-w-[360px]">
            {title === "Octopus Ionic Hair Dryer" ? (
              <>
                Octopus Ionic
                <br className="xl:hidden" />
                {" "}Hair Dryer
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-sm sm:text-base xl:text-lg text-[#000000]/85 leading-relaxed mb-6 sm:mb-8 max-w-[310px] md:max-w-[290px] xl:max-w-[360px]">
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
