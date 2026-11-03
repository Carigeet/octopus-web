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

  // Close drawer on window resize above 768px (tablet & desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
      setTimeout(() => closeBtnRef.current?.focus(), 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
          triggerRef.current?.focus();
        }

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
    <>
      <header className="fixed top-5 inset-x-0 z-50 w-full max-w-[746px] xl:max-w-[1106px] mx-auto px-4 md:px-0 xl:px-0 pointer-events-none">
        <div className="w-full pointer-events-auto flex items-center justify-between min-h-[56px] px-6 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-black/5 transition-all">
          {/* Brand Logo: Compact mark on mobile (< 768px), full logo on tablet/desktop */}
          <div className="flex items-center my-auto leading-none xl:flex xl:items-center">
            <div className="flex items-center my-auto md:hidden">
              <OctopusLogo variant="mark" className="my-auto" />
            </div>
            <div className="hidden md:flex xl:flex items-center my-auto">
              <OctopusLogo variant="full" className="my-auto" />
            </div>
          </div>

          {/* Desktop / Tablet Navigation Links & CTA Group (>= 768px) */}
          <div className="hidden md:flex xl:flex items-center my-auto gap-6 lg:gap-8 xl:gap-8">
            <nav
              className="flex items-center my-auto gap-6 lg:gap-8 xl:gap-8"
              aria-label="Main Navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center my-auto text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md leading-none py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              href="/#where-to-buy"
              variant="primary"
              size="sm"
              className="my-auto px-5 py-2 text-sm font-semibold shadow-xs leading-none"
            >
              Where to buy
            </Button>
          </div>

          {/* Mobile Hamburger Trigger (< 768px) */}
          <div className="flex md:hidden items-center my-auto">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
              aria-label="Open navigation menu"
              className="p-1.5 text-neutral-800 hover:text-brand-red rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
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
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Modal (< 768px) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex items-start justify-center pt-6 px-4"
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

          {/* Floating Drawer Card */}
          <div
            ref={drawerRef}
            className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl border border-black/10 shadow-2xl rounded-3xl p-6 transition-all duration-300 ease-out animate-in zoom-in-95 flex flex-col max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <OctopusLogo variant="full" asLink={false} />
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="p-2 -mr-2 text-neutral-dark hover:text-brand-red rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
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
            <nav className="flex flex-col py-4" aria-label="Mobile Navigation Links">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="py-3 text-base font-semibold text-neutral-dark hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg px-2 border-b border-gray-50 last:border-none"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Action CTA */}
            <div className="pt-4 border-t border-gray-100">
              <Button
                href="/#where-to-buy"
                variant="primary"
                fullWidth
                size="md"
                onClick={closeMenu}
              >
                Where to buy
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
