"use client";

import React, { useState } from "react";
import { ProductSpecSection } from "@/types/product";

export interface ProductAccordionProps {
  specs?: ProductSpecSection[];
  manualUrl?: string;
  productName?: string;
  className?: string;
}

export function ProductAccordion({
  specs = [],
  manualUrl = "#",
  productName = "Product",
  className = "",
}: ProductAccordionProps) {
  // All items (including "Technical specifications") are closed by default
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Filter out any "Downloads" if already present in specs to handle separately in the downloads card
  const accordionSections = specs.filter(
    (s) => s.title.toLowerCase() !== "downloads"
  );
  const downloadSection = specs.find(
    (s) => s.title.toLowerCase() === "downloads"
  );

  return (
    <div
      className={`w-full flex flex-col gap-3 xl:gap-4 ${className}`.trim()}
    >
      {/* 1. Accordion dei Dettagli Specifiche */}
      <div className="w-full bg-[#F9F9F9] rounded-3xl xl:rounded-[32px] p-6 sm:p-8 xl:p-10 border border-neutral-200/60 shadow-xs">
        <div className="divide-y divide-gray-200/80">
          {accordionSections.map((section, idx) => {
            const isOpen = openIndices.has(idx);
            const headerId = `spec-header-${idx}`;
            const contentId = `spec-content-${idx}`;

            return (
              <div key={section.title} className="py-2 first:pt-0 last:pb-0">
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleSection(idx)}
                    className="w-full flex items-center justify-between py-3 text-left font-bold text-gray-950 text-base sm:text-lg hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg cursor-pointer"
                  >
                    <span>{section.title}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ease-out shrink-0 ml-4 ${
                        isOpen ? "rotate-180 text-brand-red" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 17 10" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  hidden={!isOpen}
                  className={`${isOpen ? "block" : "hidden"} pt-1 pb-4`}
                >
                  <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5">
                        <span className="text-gray-400 font-bold select-none leading-tight mt-0.5">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Sezione Downloads separata ma uguale (gap 16px da desktop) */}
      <div className="w-full bg-[#F9F9F9] rounded-3xl xl:rounded-[32px] p-6 sm:p-8 xl:p-10 border border-neutral-200/60 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="font-bold text-gray-950 text-base sm:text-lg">
            Downloads
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {downloadSection && downloadSection.items.length > 0 ? (
              downloadSection.items.map((item, idx) => (
                <a
                  key={idx}
                  href={manualUrl}
                  download={`${productName.toLowerCase().replace(/\s+/g, "-")}-manual.pdf`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-red transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md px-1.5 py-0.5 cursor-pointer"
                  aria-label={`Download ${item}`}
                >
                  <svg
                    className="w-4 h-4 text-gray-500 group-hover:text-brand-red transition-colors shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{item}</span>
                </a>
              ))
            ) : (
              <a
                href={manualUrl}
                download={`${productName.toLowerCase().replace(/\s+/g, "-")}-manual.pdf`}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-red transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md px-1.5 py-0.5 cursor-pointer"
                aria-label={`Download ${productName} User Manual (PDF)`}
              >
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-brand-red transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>User manual</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAccordion;
