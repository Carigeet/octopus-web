import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://octopus-web.vercel.app";
const SITE_TITLE = "Octopus | Premium Home & Lifestyle Appliances";
const SITE_DESCRIPTION =
  "Discover Octopus innovative kitchen appliances, smart home security, salon-quality hair care, and everyday accessories.";
const SITE_OG_IMAGE = "/images/banners/hero-hair-dryer.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Octopus",
  title: {
    default: SITE_TITLE,
    template: "%s | Octopus",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Octopus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1600,
        height: 900,
        alt: "Octopus Ionic Hair Dryer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
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
