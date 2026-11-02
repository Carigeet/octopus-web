import React from "react";
import Link from "next/link";
import { OctopusLogo } from "@/components/common/OctopusLogo";

export function Footer() {
  return (
    <footer className="w-full bg-[#D01A1F] text-white" aria-label="Global Footer">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-16">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 min-[810px]:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/20">
          {/* Brand Column (Left) */}
          <div className="min-[810px]:col-span-4 lg:col-span-5 flex flex-col items-start">
            <OctopusLogo
              variant="stacked"
              color="white"
              asLink={true}
              className="mb-4"
            />
          </div>

          {/* Navigation Columns (Right) */}
          <div className="min-[810px]:col-span-8 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Our Products Column (occupies 2 sub-columns on desktop/tablet) */}
            <div className="lg:col-span-2">
              <h2 className="text-white font-semibold text-base mb-4 tracking-tight">
                Our Products
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-sm text-white/85">
                <li>
                  <Link
                    href="/#kitchen"
                    className="hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                  >
                    Kitchen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#hair-care"
                    className="hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                  >
                    Hair Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#home-security"
                    className="hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                  >
                    Home Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#accessories"
                    className="hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Learn Column */}
            <div>
              <h2 className="text-white font-semibold text-base mb-4 tracking-tight">
                Learn
              </h2>
              <ul className="flex flex-col gap-2.5 text-sm text-white/85">
                <li>
                  <Link
                    href="/#where-to-buy"
                    className="hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                  >
                    Where to buy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact-us"
                    className="hover:text-white transition-colors py-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs md:text-sm text-white/80">
          <p>© Copyright 2026 Octopus - All rights reserved</p>
          <Link
            href="/#policies-terms"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md py-0.5"
          >
            Policies & Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
