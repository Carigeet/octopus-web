import { test, expect } from "@playwright/test";

test.describe("Homepage -> Countertop Blender PDP", () => {
  test("naviga dalla card, cambia colore ed espande le specifiche tecniche", async ({
    page,
  }) => {
    // 1. Atterraggio sulla Homepage
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Octopus Hair Dryer" })
    ).toBeVisible();

    // 2. Click su "Learn more" della card Countertop Blender (sezione Kitchen)
    const learnMore = page
      .locator("#kitchen")
      .getByRole("link", {
        name: "Learn more about Octopus Countertop Blender",
      });
    await learnMore.scrollIntoViewIfNeeded();
    await expect(learnMore).toBeVisible();
    await learnMore.click();

    // 3. Render della PDP
    await expect(page).toHaveURL(/\/products\/countertop-blender$/);
    await expect(page).toHaveTitle(/Octopus Countertop Blender/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Octopus Countertop Blender",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Where to buy" }).first()
    ).toBeVisible();

    // 4. Selettore colore
    await expect(page.getByText("Colour - Black")).toBeVisible();
    const lightGray = page.getByRole("button", { name: /Colour: Light Gray/ });
    await lightGray.click();
    await expect(lightGray).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("Colour - Light Gray")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Colour: Black/ })
    ).toHaveAttribute("aria-pressed", "false");

    // 5. Accordion specifiche tecniche
    const specs = page.getByRole("button", { name: "Technical specifications" });
    await specs.scrollIntoViewIfNeeded();
    await expect(specs).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText("Power: 1500W")).toBeHidden();

    await specs.click();
    await expect(specs).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Power: 1500W")).toBeVisible();

    await specs.click();
    await expect(specs).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText("Power: 1500W")).toBeHidden();
  });
});
