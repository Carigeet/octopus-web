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

      {/* 3. Kitchen Bento Grid Section (distacco superiore 60px su desktop, 44px tablet, 32px mobile) */}
      <section
        id="kitchen"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 mt-[32px] min-[810px]:mt-[44px] min-[1200px]:mt-[60px] mb-[60px] min-[810px]:mb-[90px] min-[1200px]:mb-[120px]"
      >
        <SectionHeader
          title="Kitchen"
          subtitle="Powerful appliances for everyday cooking"
          ctaText="Explore all products"
          ctaHref="/#kitchen"
        />

        <div className="flex flex-col gap-6">
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

      {/* 4. Hair Care Interstitial Banner (distacco inferiore 180px su desktop prima di Home Security) */}
      <div
        id="hair-care"
        className="w-full mb-[80px] min-[810px]:mb-[120px] min-[1200px]:mb-[180px]"
      >
        <HairCareBanner product={hairDryer} />
      </div>

      {/* 5. Home Security Asymmetric Bento Grid Section (respiro 180px sopra da Hair Care) */}
      <section
        id="home-security"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12"
      >
        <SectionHeader
          title="Home Security"
          subtitle="Home feels safer when you're always in the loop"
          ctaText="Explore all products"
          ctaHref="/#home-security"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left Column: Indoor Camera su mensola in legno */}
          <div className="w-full h-full">
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
          <div className="w-full flex flex-col gap-6 justify-between h-full">
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

      {/* 6. Accessories 3-Column Section (spaziatura 120px sopra e 120px sotto verso Explore all categories) */}
      <section
        id="accessories"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 mt-[64px] min-[810px]:mt-[90px] min-[1200px]:mt-[120px] mb-[64px] min-[810px]:mb-[90px] min-[1200px]:mb-[120px]"
      >
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

      {/* 7. Explore All Categories */}
      <ExploreCategories categories={categories} />

      {/* 8. Store Locator Banner (distacco superiore 180px su desktop rispetto alla griglia categorie) */}
      <StoreBanner className="mt-[80px] min-[810px]:mt-[120px] min-[1200px]:mt-[180px]" />
    </div>
  );
}
