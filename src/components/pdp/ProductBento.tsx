import React from "react";
import Image from "next/image";
import { ProductFeature } from "@/types/product";

export interface ProductBentoProps {
  features?: ProductFeature[];
  className?: string;
}

export function ProductBento({ features = [], className = "" }: ProductBentoProps) {
  const f1 = features[0] || {
    title: "Precision Engineering",
    description: "Designed and tested for daily performance and long-lasting durability.",
    image: "/images/products/placeholder-800x800.png",
  };

  const f2 = features[1] || {
    title: "Intuitive Operation",
    description: "Effortless controls designed for seamless everyday use.",
    image: "/images/products/placeholder-800x800.png",
  };

  const f3 = features[2] || {
    title: "Smart Efficiency",
    description: "Engineered to deliver high output while optimizing energy consumption.",
    image: "/images/products/placeholder-800x800.png",
  };

  const f4 = features[3] || {
    title: "Modern Aesthetics",
    description: "Refined minimalist styling that complements modern home interiors.",
    image: "/images/products/placeholder-800x800.png",
  };

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`.trim()}>
      {/* ============================================================== */}
      {/* TABLET & DESKTOP BENTO LAYOUT (>= 768px) */}
      {/* ============================================================== */}
      <div className="hidden md:flex flex-col gap-4 xl:gap-6">
        {/* Row 1: Full-width Wide Split Card */}
        <article className="group bg-[#F9F9F9] rounded-[32px] overflow-hidden flex flex-row items-stretch justify-between border border-neutral-200/60 shadow-xs transition-all duration-300 hover:shadow-md min-h-[240px] xl:min-h-[290px]">
          <div className="flex-1 p-8 xl:p-12 flex flex-col justify-center max-w-lg z-10">
            <h3 className="text-xl xl:text-3xl font-bold text-gray-950 tracking-tight mb-3">
              {f1.title}
            </h3>
            <p className="text-sm xl:text-base text-gray-600 leading-relaxed">
              {f1.description}
            </p>
          </div>
          <div className="relative w-1/2 min-h-[240px] xl:min-h-[290px]">
            <Image
              src={f1.image || "/images/products/placeholder-800x800.png"}
              alt={f1.title}
              fill
              sizes="600px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </article>

        {/* Row 2: 2 Side-by-Side Cards */}
        <div className="grid grid-cols-2 gap-4 xl:gap-6 items-stretch">
          {/* Card 2 Left */}
          <article className="group bg-[#F9F9F9] rounded-[32px] overflow-hidden flex flex-col justify-between border border-neutral-200/60 shadow-xs transition-all duration-300 hover:shadow-md min-h-[380px] xl:min-h-[460px]">
            <div className="p-6 xl:p-10 z-10">
              <h3 className="text-lg xl:text-2xl font-bold text-gray-950 tracking-tight mb-2 xl:mb-3">
                {f2.title}
              </h3>
              <p className="text-xs xl:text-sm text-gray-600 leading-relaxed">
                {f2.description}
              </p>
            </div>
            <div className="relative w-full h-[220px] xl:h-[280px]">
              <Image
                src={f2.image || "/images/products/placeholder-800x800.png"}
                alt={f2.title}
                fill
                sizes="550px"
                className="object-contain object-bottom p-4 transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </article>

          {/* Card 3 Right */}
          <article className="group bg-[#EFE9E0] rounded-[32px] overflow-hidden flex flex-col justify-between border border-neutral-200/60 shadow-xs transition-all duration-300 hover:shadow-md min-h-[380px] xl:min-h-[460px]">
            <div className="p-6 xl:p-10 z-10">
              <h3 className="text-lg xl:text-2xl font-bold text-gray-950 tracking-tight mb-2 xl:mb-3">
                {f3.title}
              </h3>
              <p className="text-xs xl:text-sm text-gray-700 leading-relaxed">
                {f3.description}
              </p>
            </div>
            <div className="relative w-full h-[220px] xl:h-[280px]">
              <Image
                src={f3.image || "/images/products/placeholder-800x800.png"}
                alt={f3.title}
                fill
                sizes="550px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </article>
        </div>

        {/* Row 3: Full-width Wide Split Card */}
        <article className="group bg-[#F9F9F9] rounded-[32px] overflow-hidden flex flex-row items-stretch justify-between border border-neutral-200/60 shadow-xs transition-all duration-300 hover:shadow-md min-h-[240px] xl:min-h-[290px]">
          <div className="flex-1 p-8 xl:p-12 flex flex-col justify-center max-w-lg z-10">
            <h3 className="text-xl xl:text-3xl font-bold text-gray-950 tracking-tight mb-3">
              {f4.title}
            </h3>
            <p className="text-sm xl:text-base text-gray-600 leading-relaxed">
              {f4.description}
            </p>
          </div>
          <div className="relative w-1/2 min-h-[240px] xl:min-h-[290px]">
            <Image
              src={f4.image || "/images/products/placeholder-800x800.png"}
              alt={f4.title}
              fill
              sizes="600px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </article>
      </div>

      {/* ============================================================== */}
      {/* MOBILE STACKED LAYOUT (< 768px) */}
      {/* ============================================================== */}
      <div className="flex md:hidden flex-col items-center gap-6">
        {[f1, f2, f3, f4].map((feature, idx) => (
          <article
            key={feature.title}
            className={`group w-full max-w-[358px] h-[477.33px] min-h-[477.33px] rounded-[16px] overflow-hidden flex flex-col justify-between border border-neutral-200/60 shadow-xs transition-all duration-300 ${
              idx === 2 ? "bg-[#EFE9E0]" : "bg-[#F9F9F9]"
            }`}
          >
            <div className="pt-[40px] px-[24px] flex flex-col items-center text-center gap-2 z-10">
              <h3 className="text-xl font-bold text-gray-950 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="relative w-full flex-1 min-h-[240px]">
              <Image
                src={feature.image || "/images/products/placeholder-800x800.png"}
                alt={feature.title}
                fill
                sizes="358px"
                className={`transition-transform duration-500 ease-out group-hover:scale-105 ${
                  idx === 1
                    ? "object-contain object-bottom p-4"
                    : "object-cover object-center"
                }`}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ProductBento;
