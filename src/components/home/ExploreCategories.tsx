import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryInfo } from "@/types/product";

export interface ExploreCategoriesProps {
  categories: CategoryInfo[];
  className?: string;
}

export function ExploreCategories({ categories, className = "" }: ExploreCategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className={`w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 ${className}`.trim()}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#000000] mb-6 sm:mb-8">
        Explore all categories
      </h2>

      {/* Desktop Grid (>= 1200px): originale da specifiche Desktop */}
      <div className="hidden xl:grid grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/#${cat.slug}`}
            className="group rounded-3xl bg-neutral-light p-8 flex flex-col items-center justify-between aspect-square border border-border-subtle/60 transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <div className="relative w-full flex-1 flex items-center justify-center p-2">
              <div className="relative w-full h-full max-h-44">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="25vw"
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-108"
                />
              </div>
            </div>
            <span className="font-semibold text-base text-[#000000] transition-colors pt-3">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Tablet & Mobile Grid (< 1200px): Card 174.5x174.5, img 147.65x147.65, T60 R40 B60 L40, label fuori sotto */}
      <div className="grid xl:hidden grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/#${cat.slug}`}
            className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-3xl"
          >
            <div className="w-full aspect-square md:w-[174.5px] md:h-[174.5px] rounded-3xl bg-[#F9F9F9] pt-[60px] pr-[40px] pb-[60px] pl-[40px] gap-[40px] flex flex-col items-center justify-center border border-border-subtle/60 transition-all duration-300 group-hover:shadow-md overflow-hidden">
              <div className="relative w-[130px] h-[130px] md:w-[147.65px] md:h-[147.65px] shrink-0 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 768px) 148px, 130px"
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-108"
                />
              </div>
            </div>

            <span className="font-semibold text-sm sm:text-base text-[#000000] transition-colors mt-3 sm:mt-4 text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ExploreCategories;
