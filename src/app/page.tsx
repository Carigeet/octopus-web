import type { Metadata } from "next";
import {
  getAllProducts,
  getBestSellers,
  getCategories,
} from "@/lib/products";
import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductCard } from "@/components/shared/ProductCard";
import { HairCareBanner } from "@/components/home/HairCareBanner";
import { ExploreCategories } from "@/components/home/ExploreCategories";
import { StoreBanner } from "@/components/home/StoreBanner";

export const metadata: Metadata = {
  title: "Octopus | Innovative Products for Everyday Living",
  description:
    "Explore Octopus premium ionic hair dryers, kitchen appliances, smart security cameras, and mobile accessories designed for modern living.",
};

export default async function Home() {
  const [allProducts, bestSellers, categories] = await Promise.all([
    getAllProducts(),
    getBestSellers(),
    getCategories(),
  ]);

  // Helper product lookups by slug
  const findProduct = (slug: string) => allProducts.find((p) => p.slug === slug);

  // Kitchen section products
  const kettle = findProduct("kettle-1-7l");
  const portableBlender = findProduct("portable-blender") || findProduct("countertop-blender");
  const countertopBlender = findProduct("countertop-blender");

  // Hair care banner product
  const hairDryer = findProduct("ionic-hair-dryer");

  // Home security section products
  const indoorCam = findProduct("indoor-camera");
  const outdoorCam = findProduct("outdoor-camera");
  const doorbell = findProduct("video-doorbell");

  // Accessories section products
  const powerBank = findProduct("power-bank-10000");
  const powerBoard = findProduct("power-board-usb");
  const magneticStation = findProduct("magnetic-charging-station");

  return (
    <div className="w-full flex flex-col flex-1 pb-16">
      {/* 1. Full-Bleed Macro Hero (da 1.png) */}
      <Hero />

      {/* 2. Best Sellers Section with Horizontal Carousel (da 1.png) */}
      <BestSellers products={bestSellers} />

      {/* 3. Kitchen Bento Grid Section (da 1.png & 2.png) */}
      <section id="kitchen" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12">
        <SectionHeader
          title="Kitchen"
          subtitle="Powerful appliances for everyday cooking"
          ctaText="Explore all products"
          ctaHref="/#kitchen"
        />

        <div className="flex flex-col gap-6">
          {/* Top Featured Card: Kettle 1.7 L */}
          {kettle && (
            <ProductCard
              product={kettle}
              variant="large"
              priority={false}
            />
          )}

          {/* Bottom 2 Vertical Cards: Portable Blender & Countertop Blender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portableBlender && (
              <ProductCard
                product={portableBlender}
                variant="medium-vertical"
              />
            )}
            {countertopBlender && (
              <ProductCard
                product={countertopBlender}
                variant="medium-vertical"
              />
            )}
          </div>
        </div>
      </section>

      {/* 4. Hair Care Interstitial Banner (da 3.png) */}
      <div id="hair-care">
        <HairCareBanner product={hairDryer} />
      </div>

      {/* 5. Home Security Asymmetric Bento Grid Section (da 3.png) */}
      <section id="home-security" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12">
        <SectionHeader
          title="Home Security"
          subtitle="Home feels safer when you're always in the loop"
          ctaText="Explore all products"
          ctaHref="/#home-security"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (Full-height featured card): Indoor Camera */}
          <div className="lg:col-span-5 h-full">
            {indoorCam && (
              <ProductCard
                product={indoorCam}
                variant="medium-vertical"
                className="h-full"
              />
            )}
          </div>

          {/* Right Column (2 stacked horizontal cards): Outdoor Camera & Video Doorbell */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            {outdoorCam && (
              <ProductCard
                product={outdoorCam}
                variant="medium-horizontal"
                className="flex-1"
              />
            )}
            {doorbell && (
              <ProductCard
                product={doorbell}
                variant="medium-horizontal"
                className="flex-1"
              />
            )}
          </div>
        </div>
      </section>

      {/* 6. Accessories 3-Column Section (da 4.png) */}
      <section id="accessories" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12">
        <SectionHeader
          title="Accessories"
          subtitle="The little things that make everything work better"
          ctaText="Explore all products"
          ctaHref="/#accessories"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {powerBank && (
            <ProductCard
              product={powerBank}
              variant="small"
            />
          )}
          {powerBoard && (
            <ProductCard
              product={powerBoard}
              variant="small"
            />
          )}
          {magneticStation && (
            <ProductCard
              product={magneticStation}
              variant="small"
            />
          )}
        </div>
      </section>

      {/* 7. Explore All Categories (da 4.png) */}
      <ExploreCategories categories={categories} />

      {/* 8. Store Locator Banner (da 4.png) */}
      <StoreBanner />
    </div>
  );
}
