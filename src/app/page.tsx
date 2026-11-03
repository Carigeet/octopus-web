import type { Metadata } from "next";
import {
  getAllProducts,
  getBestSellers,
  getCategories,
} from "@/lib/products";
import { Product } from "@/types/product";
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
  const [allProducts, defaultBestSellers, categories] = await Promise.all([
    getAllProducts(),
    getBestSellers(),
    getCategories(),
  ]);

  // Helper product lookups by slug
  const findProduct = (slug: string) => allProducts.find((p) => p.slug === slug);

  // Best sellers ordered sequence (da mockup Figma: 1° Air Fryer 5.7 L, 2° Indoor Camera)
  const orderedBestSellers = [
    findProduct("air-fryer-5-7l"),
    findProduct("indoor-camera"),
    findProduct("ionic-hair-dryer"),
    findProduct("countertop-blender"),
    findProduct("kettle-1-7l"),
  ].filter(Boolean) as Product[];

  const bestSellersList =
    orderedBestSellers.length > 0 ? orderedBestSellers : defaultBestSellers;

  // Kitchen section products
  const kettle = findProduct("kettle-1-7l");
  const portableBlender = findProduct("portable-blender");
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
    <div className="w-full flex flex-col flex-1">
      {/* 1. Full-Bleed Macro Hero (da 1.png con navbar overlay) */}
      <Hero />

      {/* 2. Best Sellers Section con Air Fryer 5.7 L al 1° posto e Indoor Camera al 2° */}
      <BestSellers products={bestSellersList} />

      {/* 3. Kitchen Bento Grid Section (distacco superiore 60px su desktop, padding superiore 80px su tablet/mobile) */}
      <section
        id="kitchen"
        className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 pt-[80px] xl:pt-0 xl:mt-[60px] mb-[60px] md:mb-[90px] xl:mb-[120px]"
      >
        <SectionHeader
          title="Kitchen"
          subtitle="Powerful appliances for everyday cooking"
          ctaText="Explore all products"
          ctaHref="/products/countertop-blender"
        />

        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Top Featured Card: Kettle 1.7 L con lifestyle reale versato */}
          {kettle && (
            <ProductCard
              product={kettle}
              variant="large"
              lifestyleImage="/images/products/kettle-lifestyle.png"
              priority={false}
            />
          )}

          {/* Bottom 2 Vertical Cards: Portable Blender & Countertop Blender */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-4 xl:gap-6">
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

      {/* 4. Hair Care Interstitial Banner (distacco inferiore 180px su desktop prima di Home Security) */}
      <div
        id="hair-care"
        className="w-full mb-[80px] md:mb-[120px] xl:mb-[180px]"
      >
        <HairCareBanner product={hairDryer} />
      </div>

      {/* 5. Home Security Section (respiro 180px sopra da Hair Care) */}
      <section
        id="home-security"
        className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0"
      >
        <SectionHeader
          title="Home Security"
          subtitle="Home feels safer when you're always in the loop"
          ctaText="Explore all products"
          ctaHref="/products/indoor-camera"
        />

        {/* Desktop Bento Grid (>= 1200px): Asymmetric 50/50 Split */}
        <div className="hidden xl:grid xl:grid-cols-2 gap-6 items-stretch">
          {/* Left Column: Indoor Camera su mensola in legno */}
          <div className="w-full h-full xl:w-[540px] xl:h-[720px]">
            {indoorCam && (
              <ProductCard
                product={indoorCam}
                variant="medium-vertical"
                lifestyleImage="/images/products/indoor-cam-shelf.png"
                className="h-full"
              />
            )}
          </div>

          {/* Right Column: Outdoor Camera & Video Doorbell (titoli naturali su due righe) */}
          <div className="w-full flex flex-col gap-6 justify-between h-full xl:w-[540px] xl:h-[720px]">
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

        {/* Tablet & Mobile Layout (< 1200px, da Mockup Figma): Card Large sopra + 2 Card verticali affiancate sotto */}
        <div className="flex xl:hidden flex-col gap-4 sm:gap-6">
          {/* Top Card Large: Indoor Camera su mensola in legno (746x420 su tablet) */}
          {indoorCam && (
            <ProductCard
              product={indoorCam}
              variant="large"
              lifestyleImage="/images/products/indoor-cam-shelf.png"
            />
          )}

          {/* Bottom 2 Vertical Cards: Outdoor Camera & Video Doorbell */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
            {outdoorCam && (
              <ProductCard
                product={outdoorCam}
                variant="medium-vertical"
              />
            )}
            {doorbell && (
              <ProductCard
                product={doorbell}
                variant="medium-vertical"
              />
            )}
          </div>
        </div>
      </section>

      {/* 6. Accessories 3-Column Section (spaziatura 120px sopra e 120px sotto verso Explore all categories) */}
      <section
        id="accessories"
        className="w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 mt-[64px] md:mt-[90px] xl:mt-[120px] mb-[64px] md:mb-[90px] xl:mb-[120px]"
      >
        <SectionHeader
          title="Accessories"
          subtitle="The little things that make everything work better"
          ctaText="Explore all products"
          ctaHref="/products/power-bank-10000"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-4 xl:gap-6">
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

      {/* 7. Explore All Categories */}
      <ExploreCategories categories={categories} />

      {/* 8. Store Locator Banner (distacco superiore 180px su desktop rispetto alla griglia categorie) */}
      <StoreBanner className="mt-[80px] md:mt-[120px] xl:mt-[180px]" />
    </div>
  );
}
