import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Header mobile drawer", () => {
  it("opens with aria-expanded=true and closes on Escape returning focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", "mobile-drawer");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Mobile Navigation" })).toHaveAttribute(
      "id",
      "mobile-drawer"
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveFocus()
    );

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("closes through the labelled close button", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    await user.click(screen.getByRole("button", { name: "Close navigation menu" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
