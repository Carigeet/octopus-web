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
            className="group rounded-3xl bg-neutral-light p-6 sm:p-8 flex flex-col items-center justify-between aspect-square border border-border-subtle/60 transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            {/* Centered Image */}
            <div className="relative w-full flex-1 flex items-center justify-center p-2">
              <div className="relative w-full h-full max-h-36 sm:max-h-44">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1200px) 25vw, (min-width: 810px) 33vw, 50vw"
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-108"
                />
              </div>
            </div>

            {/* Label below */}
            <span className="font-semibold text-sm sm:text-base text-neutral-dark group-hover:text-brand-red transition-colors pt-3">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ExploreCategories;
