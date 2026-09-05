import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import PercentageCalculator from "./percentage-calculator";
import MortgageCalculator from "./mortgage-calculator";
import IncomeTaxCalculator from "./income-tax-calculator";
import BasicCalculator from "./basic-calculator";
import ScientificCalculator from "./scientific-calculator";

vi.mock("next/image", () => ({ default: () => null }));

describe("percentage workflow", () => {
  it("calculates all three modes, preserves per-mode state, and validates zero denominators", async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);
    const first = () => screen.getByLabelText("Percentage");
    const second = () => screen.getByLabelText("Number");
    await user.type(first(), "25");
    await user.type(second(), "200");
    await user.click(screen.getByRole("button", { name: /Calculate/ }));
    expect(screen.getByText("25% of 200 = 50")).toBeVisible();

    await user.click(screen.getByRole("tab", { name: "What percent?" }));
    await user.type(screen.getByLabelText("First number"), "50");
    await user.type(screen.getByLabelText("Second number"), "200");
    await user.click(screen.getByRole("button", { name: /Calculate/ }));
    expect(screen.getByText("50 is 25% of 200")).toBeVisible();

    await user.clear(screen.getByLabelText("Second number"));
    await user.type(screen.getByLabelText("Second number"), "0");
    await user.click(screen.getByRole("button", { name: /Calculate/ }));
    expect(screen.getByText("The second number cannot be zero.")).toBeVisible();

    const percentTab = screen.getByRole("tab", { name: "What percent?" });
    percentTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Find the whole" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "% of a number" })).toHaveFocus();
    expect(screen.getByLabelText("Percentage")).toHaveValue(25);
  });

  it("clears stale results for blank and non-finite input", async () => {
    const user = userEvent.setup();
    render(<PercentageCalculator />);
    await user.click(screen.getByRole("button", { name: /Calculate/ }));
    expect(screen.getAllByText(/Enter a valid/)).toHaveLength(2);
    fireEvent.change(screen.getByLabelText("Percentage"), { target: { value: "Infinity" } });
    fireEvent.change(screen.getByLabelText("Number"), { target: { value: "2" } });
    await user.click(screen.getByRole("button", { name: /Calculate/ }));
    expect(screen.queryByText(/Infinity% of/)).not.toBeInTheDocument();
  });
});

describe("mortgage workflow", () => {
  it("renders the captured vector, synchronizes down payment, and opens amortization", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    expect(screen.getByText("$2275.44")).toBeVisible();
    expect(screen.getByText("$459,160")).toBeVisible();
    expect(screen.getByText("$819,160")).toBeVisible();
    await user.clear(screen.getByLabelText("Down Payment (%)"));
    await user.type(screen.getByLabelText("Down Payment (%)"), "25");
    expect(screen.getByLabelText("Down Payment ($)")).toHaveValue(112500);
    await user.clear(screen.getByLabelText("Interest Rate"));
    await user.type(screen.getByLabelText("Interest Rate"), "0");
    expect(screen.getByText("$937.50")).toBeVisible();
    await user.click(screen.getByRole("button", { name: /View Full Amortization Schedule/ }));
    expect(screen.getByRole("heading", { name: /Amortization Schedule/ })).toBeVisible();
    expect(screen.getByText("360 payments")).toBeVisible();
  });

  it("handles zero financed principal", async () => {
    const user = userEvent.setup();
    render(<MortgageCalculator />);
    await user.clear(screen.getByLabelText("Down Payment ($)"));
    await user.type(screen.getByLabelText("Down Payment ($)"), "450000");
    expect(screen.getByText("$0.00")).toBeVisible();
  });
});

describe("version-sensitive tax workflow", () => {
  it("shows the current year and responds to status/deduction thresholds", async () => {
    const user = userEvent.setup();
    render(<IncomeTaxCalculator />);
    expect(screen.getByText("Estimated 2026 federal tax")).toBeVisible();
    expect(screen.getByText("$6,350")).toBeVisible();
    await user.selectOptions(screen.getByLabelText("Filing status"), "mfj");
    expect(screen.getByText("$3,920")).toBeVisible();
    await user.click(screen.getByRole("checkbox", { name: "Use itemized deduction" }));
    await user.type(screen.getByLabelText("Itemized deductions"), "40000");
    expect(screen.getByText("$2,984")).toBeVisible();
  });
});

describe("storage-backed calculator workflows", () => {
  beforeEach(() => localStorage.clear());

  it("uses keyboard entry, appends basic history, restores it, and clears it", async () => {
    const user = userEvent.setup();
    localStorage.setItem("jamro_basic_calc_history", JSON.stringify([{ expression: "9 + 1", result: "10" }]));
    render(<BasicCalculator />);
    expect(await screen.findByText("9 + 1 =")).toBeVisible();
    await user.keyboard("2+3{Enter}");
    await waitFor(() => expect(JSON.parse(localStorage.getItem("jamro_basic_calc_history") ?? "[]")[0]).toMatchObject({ expression: "2 + 3", result: "5" }));
    await user.click(screen.getAllByRole("button", { name: "Clear" }).at(-1)!);
    expect(localStorage.getItem("jamro_basic_calc_history")).toBeNull();
  });

  it("falls back from malformed basic history", async () => {
    localStorage.setItem("jamro_basic_calc_history", "not json");
    render(<BasicCalculator />);
    expect(await screen.findByText(/No history yet/)).toBeVisible();
  });

  it("uses keyboard entry and isolated scientific history", async () => {
    const user = userEvent.setup();
    localStorage.setItem("jamro_scientific_calc_history", JSON.stringify([{ expression: "2^3", result: "8" }]));
    render(<ScientificCalculator />);
    expect(await screen.findByText("2^3 =")).toBeVisible();
    await user.keyboard("{Escape}2^3{Enter}");
    await waitFor(() => expect(JSON.parse(localStorage.getItem("jamro_scientific_calc_history") ?? "[]")[0]).toEqual({ expression: "2^3", result: "8" }));
    expect(localStorage.getItem("jamro_basic_calc_history")).toBeNull();
  });
});
