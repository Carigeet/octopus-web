import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryInfo } from "@/types/product";

export interface ExploreCategoriesProps {
  categories: CategoryInfo[];
}

export function ExploreCategories({ categories }: ExploreCategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-14">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark mb-6 sm:mb-8">
        Explore all categories
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/#${cat.slug}`}
            className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-[32px]"
          >
            {/* Centered Image inside Square Rounded Tile */}
            <div className="w-full aspect-square rounded-[32px] bg-[#F9F9F9] p-6 sm:p-8 flex items-center justify-center border border-neutral-200/60 shadow-xs transition-all duration-300 group-hover:shadow-md">
              <div className="relative w-full h-full max-h-36 sm:max-h-48">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1200px) 25vw, (min-width: 810px) 33vw, 50vw"
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Label below tile */}
            <span className="font-semibold text-sm sm:text-base text-neutral-dark group-hover:text-brand-red transition-colors pt-4 text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ExploreCategories;
