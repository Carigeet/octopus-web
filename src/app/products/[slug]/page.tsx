import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProducts,
  getProductBySlug,
  getBestSellers,
} from "@/lib/products";
import { ProductHero } from "@/components/pdp/ProductHero";
import { ProductBento } from "@/components/pdp/ProductBento";
import { ProductAccordion } from "@/components/pdp/ProductAccordion";
import { Carousel } from "@/components/shared/Carousel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Octopus",
      description: "The requested Octopus product could not be found.",
    };
  }

  const description = product.description || product.shortDescription;

  return {
    title: `${product.name} | Octopus`,
    description,
    openGraph: {
      title: `${product.name} | Octopus`,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Cross-sell products: other bestsellers excluding the current product
  const bestSellers = await getBestSellers();
  const crossSellProducts = bestSellers.filter((p) => p.slug !== product.slug);

  // Dynamic lifestyle imagery per product with contextual fallbacks
  const lifestyleTop =
    product.lifestyleImages?.top ||
    (product.category === "hair-care"
      ? "/images/banners/hero-hair-dryer.png"
      : product.category === "kitchen"
      ? "/images/products/kettle-lifestyle.png"
      : "/images/banners/placeholder-1600x900.png");

  const lifestyleBottom =
    product.lifestyleImages?.bottom ||
    (product.category === "hair-care"
      ? "/images/banners/hair-dryer-banner.png"
      : "/images/banners/placeholder-1600x900.png");

  return (
    <div className="w-full flex flex-col flex-1 xl:pb-16">
      {/* 1. Buy Box / Product Hero */}
      <ProductHero product={product} />

      {/* 2. Lifestyle & Bento Feature Section */}
      <section
        className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 py-8 sm:py-12"
        aria-label="Features and Lifestyle"
      >
        {/* Visual lifestyle 1 (Mobile: w 358px × h 477.33px, radius 16px) */}
        <div className="w-full max-w-[358px] h-[477.33px] min-h-[477.33px] md:max-w-none md:h-auto mx-auto rounded-[16px] md:rounded-3xl xl:rounded-[32px] overflow-hidden relative md:aspect-[16/10] xl:aspect-[16/9] md:min-h-[420px] xl:min-h-[620px] mb-6 md:mb-12 shadow-xs border border-neutral-200/60 bg-[#F9F9F9]">
          <Image
            src={lifestyleTop}
            alt={`${product.name} lifestyle showcase`}
            fill
            sizes="(max-width: 768px) 358px, (max-width: 1200px) 746px, 1106px"
            className="object-cover object-center"
          />
        </div>

        {/* Feature Bento Grid */}
        <ProductBento features={product.features} />

        {/* Visual lifestyle 2 (Mobile: w 358px × h 477.33px, radius 16px) */}
        <div className="w-full max-w-[358px] h-[477.33px] min-h-[477.33px] md:max-w-none md:h-auto mx-auto rounded-[16px] md:rounded-3xl xl:rounded-[32px] overflow-hidden relative md:aspect-[16/10] xl:aspect-[16/9] md:min-h-[420px] xl:min-h-[620px] mt-6 md:mt-12 shadow-xs border border-neutral-200/60 bg-[#F9F9F9]">
          <Image
            src={lifestyleBottom}
            alt={`${product.name} ambient detail`}
            fill
            sizes="(max-width: 768px) 358px, (max-width: 1200px) 746px, 1106px"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* 3. Accordion & Downloads Section */}
      <section
        className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 pt-8 sm:pt-12 pb-[80px] xl:py-12"
        aria-label="Product Specifications and Manuals"
      >
        <ProductAccordion
          specs={product.specs}
          productName={product.name}
          manualUrl={`/downloads/octopus-${product.slug}-manual.pdf`}
        />
      </section>

      {/* 4. Cross-sell Best Sellers Carousel */}
      <section
        className="w-full pt-0 xl:pt-12 pb-[80px] xl:pb-12 overflow-hidden"
        aria-label="Related Best Sellers"
      >
        <div className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark">
            Best sellers
          </h2>
        </div>
        <Carousel products={crossSellProducts} cardVariant="cross-sell" />
      </section>
    </div>
  );
}
