import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductAccordion } from "@/components/pdp/ProductAccordion";
import type { ProductSpecSection } from "@/types/product";

const SPECS: ProductSpecSection[] = [
  { title: "Technical specifications", items: ["Power: 1500W", "Voltage: 220–240 V"] },
  { title: "Dimensions & weight", items: ["Weight: 4.2 kg"] },
  { title: "Product information", items: ["Warranty: 2 years"] },
];

function setup() {
  const user = userEvent.setup();
  render(
    <ProductAccordion
      specs={SPECS}
      productName="Octopus Countertop Blender"
      manualUrl="/downloads/octopus-countertop-blender-manual.pdf"
    />
  );
  return { user };
}

const getHeader = (name: string) => screen.getByRole("button", { name });

describe("ProductAccordion", () => {
  it("renders every section collapsed by default", () => {
    setup();

    for (const { title } of SPECS) {
      expect(getHeader(title)).toHaveAttribute("aria-expanded", "false");
    }
    expect(screen.queryByText("Power: 1500W")).not.toBeVisible();
  });

  it("expands and collapses a section on click", async () => {
    const { user } = setup();
    const header = getHeader("Technical specifications");

    await user.click(header);
    expect(header).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Power: 1500W")).toBeVisible();

    await user.click(header);
    expect(header).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Power: 1500W")).not.toBeVisible();
  });

  it("allows multiple sections to be open at the same time", async () => {
    const { user } = setup();

    await user.click(getHeader("Technical specifications"));
    await user.click(getHeader("Dimensions & weight"));

    expect(getHeader("Technical specifications")).toHaveAttribute("aria-expanded", "true");
    expect(getHeader("Dimensions & weight")).toHaveAttribute("aria-expanded", "true");
    expect(getHeader("Product information")).toHaveAttribute("aria-expanded", "false");
  });

  it("wires aria-controls to a labelled region", async () => {
    const { user } = setup();

    for (const [idx, { title }] of SPECS.entries()) {
      const header = getHeader(title);
      const controlsId = header.getAttribute("aria-controls");

      expect(controlsId).toBe(`spec-content-${idx}`);
      expect(header).toHaveAttribute("id", `spec-header-${idx}`);

      const panel = document.getElementById(controlsId as string);
      expect(panel).not.toBeNull();
      expect(panel).toHaveAttribute("role", "region");
      expect(panel).toHaveAttribute("aria-labelledby", header.id);
    }

    // Il pannello resta nel DOM (aria-controls valido) anche da chiuso
    await user.click(getHeader("Technical specifications"));
    expect(document.getElementById("spec-content-0")).toBeVisible();
  });

  it("toggles with the Enter key", async () => {
    const { user } = setup();
    const header = getHeader("Technical specifications");

    await user.tab();
    expect(header).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(header).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Power: 1500W")).toBeVisible();

    await user.keyboard("{Enter}");
    expect(header).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles with the Space key", async () => {
    const { user } = setup();
    const header = getHeader("Dimensions & weight");

    header.focus();
    expect(header).toHaveFocus();

    await user.keyboard(" ");
    expect(header).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Weight: 4.2 kg")).toBeVisible();

    await user.keyboard(" ");
    expect(header).toHaveAttribute("aria-expanded", "false");
  });

  it("moves focus across headers with Tab", async () => {
    const { user } = setup();

    await user.tab();
    expect(getHeader("Technical specifications")).toHaveFocus();
    await user.tab();
    expect(getHeader("Dimensions & weight")).toHaveFocus();
    await user.tab();
    expect(getHeader("Product information")).toHaveFocus();
  });

  it("exposes an accessible manual download link", () => {
    setup();

    const link = screen.getByRole("link", {
      name: "Download Octopus Countertop Blender User Manual (PDF)",
    });
    expect(link).toHaveAttribute("href", "/downloads/octopus-countertop-blender-manual.pdf");
  });
});
