import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: navigation.push }) }));
vi.mock("@/components/ui/safe-link", () => ({ SafeLink: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a> }));

describe("header search and navigation", () => {
  beforeEach(() => {
    navigation.push.mockReset();
    document.documentElement.classList.remove("dark");
  });

  it("searches only implemented tools, handles empty/no-result, and navigates by keyboard", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const search = screen.getAllByLabelText("Search tools", { selector: "input" })[0];
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.type(search, "MoRtGaGe");
    const listbox = screen.getAllByRole("listbox", { name: "Search results" })[0];
    expect(within(listbox).getByRole("option", { name: /Mortgage Calculator/ })).toBeVisible();
    await user.keyboard("{Enter}");
    expect(navigation.push).toHaveBeenCalledWith("/tools/calculators/financial/mortgage-calculator");
    await user.type(search, "zzzz-no-tool");
    expect(screen.getAllByText(/No tools found/)[0]).toBeVisible();
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveStyle({ pointerEvents: "auto" });
    await user.click(screen.getByRole("button", { name: "Close navigation menu" }));
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveStyle({ pointerEvents: "none" });
  });
});

describe("theme persistence", () => {
  beforeEach(() => document.documentElement.classList.remove("dark"));
  it("restores a saved theme and persists toggles", async () => {
    const user = userEvent.setup();
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    render(<SiteHeader />);
    await waitFor(() => expect(screen.getAllByRole("button", { name: "Toggle dark mode" })[0]).toHaveAttribute("aria-label", "Toggle dark mode"));
    await user.click(screen.getAllByRole("button", { name: "Toggle dark mode" })[0]);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("uses the root system-preference initialization when storage is absent", async () => {
    document.documentElement.classList.add("dark");
    render(<SiteHeader />);
    await waitFor(() => expect(screen.getAllByText("Light Mode")).not.toHaveLength(0));
  });
});
