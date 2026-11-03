import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Carousel } from "@/components/shared/Carousel";
import type { Product } from "@/types/product";

// Isola il Carousel dalla UI della card (next/image, next/link, ecc.)
vi.mock("@/components/shared/ProductCard", () => ({
  ProductCard: ({ product }: { product: Product }) => (
    <article data-testid="slide">{product.name}</article>
  ),
}));

const PRODUCTS: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: `prod-${i}`,
  slug: `product-${i}`,
  name: `Product ${i}`,
  category: "kitchen",
  shortDescription: `Short description ${i}`,
  image: "/images/products/placeholder-800x800.png",
  bestSeller: true,
}));

// jsdom non calcola il layout: simuliamo una track di 1000px con 3000px di contenuto
const CLIENT_WIDTH = 1000;
const SCROLL_WIDTH = 3000;
const STEP = 500 + 32; // larghezza slide + gap
const MAX_SCROLL = SCROLL_WIDTH - CLIENT_WIDTH;

let scrollLeft = 0;
const scrollBy = vi.fn();
const saved: Array<[object, string, PropertyDescriptor | undefined]> = [];

function mockLayout() {
  const defs: Array<[object, string, PropertyDescriptor]> = [
    [
      Element.prototype,
      "scrollLeft",
      { configurable: true, get: () => scrollLeft, set: (v: number) => (scrollLeft = v) },
    ],
    [Element.prototype, "scrollWidth", { configurable: true, get: () => SCROLL_WIDTH }],
    [Element.prototype, "clientWidth", { configurable: true, get: () => CLIENT_WIDTH }],
    // In jsdom offsetWidth è definito su HTMLElement.prototype
    [HTMLElement.prototype, "offsetWidth", { configurable: true, get: () => 500 }],
  ];
  for (const [target, key, def] of defs) {
    saved.push([target, key, Object.getOwnPropertyDescriptor(target, key)]);
    Object.defineProperty(target, key, def);
  }
  Element.prototype.scrollBy = scrollBy as unknown as Element["scrollBy"];
}

function restoreLayout() {
  for (const [target, key, def] of saved) {
    if (def) Object.defineProperty(target, key, def);
    else delete (target as Record<string, unknown>)[key];
  }
  saved.length = 0;
  delete (Element.prototype as unknown as Record<string, unknown>).scrollBy;
}

const track = () => screen.getByRole("group", { name: "Scrollable list of best seller products" });
const prev = () => screen.getByRole("button", { name: "Previous products" });
const next = () => screen.getByRole("button", { name: "Next products" });

/** Simula lo scroll nativo (frecce, trackpad o swipe) e notifica il componente */
function scrollTo(position: number) {
  act(() => {
    scrollLeft = position;
    fireEvent.scroll(track());
  });
}

describe("Carousel", () => {
  beforeEach(() => {
    scrollLeft = 0;
    scrollBy.mockClear();
    mockLayout();
  });
  afterEach(restoreLayout);

  it("renders all slides inside an accessible region", () => {
    render(<Carousel products={PRODUCTS} />);
    expect(screen.getByRole("region", { name: "Best Sellers Product Carousel" })).toBeInTheDocument();
    expect(screen.getAllByTestId("slide")).toHaveLength(PRODUCTS.length);
  });

  it("renders nothing without products", () => {
    const { container } = render(<Carousel products={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("disables Previous at the start of the track", () => {
    render(<Carousel products={PRODUCTS} />);
    expect(prev()).toBeDisabled();
    expect(next()).toBeEnabled();
  });

  it("scrolls by one slide (+ gap) with Next and Previous", () => {
    render(<Carousel products={PRODUCTS} />);

    fireEvent.click(next());
    expect(scrollBy).toHaveBeenLastCalledWith({ left: STEP, behavior: "smooth" });

    scrollTo(600);
    fireEvent.click(prev());
    expect(scrollBy).toHaveBeenLastCalledWith({ left: -STEP, behavior: "smooth" });
  });

  it("enables both arrows in the middle of the track", () => {
    render(<Carousel products={PRODUCTS} />);
    scrollTo(800);
    expect(prev()).toBeEnabled();
    expect(next()).toBeEnabled();
  });

  it("disables Next at the end of the track and recovers when scrolling back", () => {
    render(<Carousel products={PRODUCTS} />);

    scrollTo(MAX_SCROLL);
    expect(next()).toBeDisabled();
    expect(prev()).toBeEnabled();

    scrollTo(0);
    expect(prev()).toBeDisabled();
    expect(next()).toBeEnabled();
  });

  it("supports keyboard navigation with ArrowLeft / ArrowRight", () => {
    render(<Carousel products={PRODUCTS} />);

    track().focus();
    expect(track()).toHaveFocus();

    fireEvent.keyDown(track(), { key: "ArrowRight" });
    expect(scrollBy).toHaveBeenLastCalledWith({ left: STEP, behavior: "smooth" });

    fireEvent.keyDown(track(), { key: "ArrowLeft" });
    expect(scrollBy).toHaveBeenLastCalledWith({ left: -STEP, behavior: "smooth" });
  });

  it("keeps the arrows in sync after touch swipes", () => {
    // Lo swipe è nativo (overflow-x + scroll-snap): gli eventi touch + lo scroll
    // risultante devono aggiornare lo stato disabilitato delle frecce.
    render(<Carousel products={PRODUCTS} />);
    expect(prev()).toBeDisabled();

    fireEvent.touchStart(track(), { touches: [{ clientX: 300, clientY: 100 }] });
    fireEvent.touchMove(track(), { touches: [{ clientX: 100, clientY: 100 }] });
    scrollTo(200);
    fireEvent.touchEnd(track(), { changedTouches: [{ clientX: 100, clientY: 100 }] });
    expect(prev()).toBeEnabled();

    fireEvent.touchStart(track(), { touches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchMove(track(), { touches: [{ clientX: 300, clientY: 100 }] });
    scrollTo(0);
    fireEvent.touchEnd(track(), { changedTouches: [{ clientX: 300, clientY: 100 }] });
    expect(prev()).toBeDisabled();
  });

  it("is touch-friendly and keyboard-visible", () => {
    render(<Carousel products={PRODUCTS} />);

    expect(track()).toHaveClass("overflow-x-auto", "snap-x", "snap-mandatory", "focus-visible:ring-2");
    for (const button of [prev(), next()]) {
      expect(button).toHaveClass("touch-manipulation", "focus-visible:ring-2");
    }
  });
});
