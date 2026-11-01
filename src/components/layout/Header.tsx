"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { OctopusLogo } from "@/components/common/OctopusLogo";
import { Button } from "@/components/common/Button";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Kitchen", href: "/#kitchen" },
  { label: "Home Security", href: "/#home-security" },
  { label: "Hair Care", href: "/#hair-care" },
  { label: "Accessories", href: "/#accessories" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Close drawer on window resize above 810px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 810) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll and manage keyboard navigation when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Focus close button on open
      setTimeout(() => closeBtnRef.current?.focus(), 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
          triggerRef.current?.focus();
        }

        // Basic Focus Trap inside drawer
        if (e.key === "Tab" && drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo: Mark alone on mobile (< 810px), Mark + Text on tablet/desktop (>= 810px) */}
        <div className="flex items-center">
          <div className="block min-[810px]:hidden">
            <OctopusLogo variant="mark" />
          </div>
          <div className="hidden min-[810px]:block">
            <OctopusLogo variant="full" />
          </div>
        </div>

        {/* Desktop / Tablet Navigation Links (>= 810px) */}
        <nav
          className="hidden min-[810px]:flex items-center gap-5 min-[1200px]:gap-9"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm min-[1200px]:text-base font-medium text-neutral-dark hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md px-1.5 py-0.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button Desktop / Tablet (>= 810px) */}
        <div className="hidden min-[810px]:flex items-center">
          <Button
            href="/#where-to-buy"
            variant="primary"
            size="md"
            className="text-xs min-[1200px]:text-sm"
          >
            Where to buy
          </Button>
        </div>

        {/* Mobile Hamburger Trigger (< 810px) */}
        <div className="flex min-[810px]:hidden items-center">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-drawer"
            aria-label="Open navigation menu"
            className="p-2 text-neutral-dark hover:text-brand-red rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            {/* Standard 24px 2-line hamburger icon matching Figma DS */}
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (< 810px) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 min-[810px]:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          id="mobile-drawer"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer Content Panel */}
          <div
            ref={drawerRef}
            className="fixed inset-x-0 top-0 bg-white border-b border-gray-200 shadow-2xl p-6 transition-all duration-300 ease-out animate-in slide-in-from-top flex flex-col max-h-[90vh] overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <OctopusLogo variant="mark" asLink={false} />
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="p-2 -mr-2 text-neutral-dark hover:text-brand-red rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col py-6" aria-label="Mobile Navigation Links">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="py-3 text-lg font-medium text-neutral-dark hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg px-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Bottom Full-Width CTA */}
            <div className="pt-4 border-t border-gray-100">
              <Button
                href="/#where-to-buy"
                variant="primary"
                fullWidth
                size="lg"
                onClick={closeMenu}
              >
                Where to buy
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

