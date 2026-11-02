import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Octopus | Premium Home & Lifestyle Appliances",
    template: "%s | Octopus",
  },
  description:
    "Discover Octopus innovative kitchen appliances, smart home security, salon-quality hair care, and everyday accessories.",
  metadataBase: new URL("https://octopus-web.vercel.app"),
  openGraph: {
    title: "Octopus | Premium Home & Lifestyle Appliances",
    description:
      "Discover Octopus innovative kitchen appliances, smart home security, salon-quality hair care, and everyday accessories.",
    url: "https://octopus-web.vercel.app",
    siteName: "Octopus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/banners/hero-hair-dryer.png",
        width: 1200,
        height: 630,
        alt: "Octopus Lifestyle & Home Appliances",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Octopus | Premium Home & Lifestyle Appliances",
    description:
      "Discover Octopus innovative kitchen appliances, smart home security, salon-quality hair care, and everyday accessories.",
    images: ["/images/banners/hero-hair-dryer.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white text-neutral-dark selection:bg-brand-red selection:text-white"
      >
        <Header />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
