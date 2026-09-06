import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import PercentageChangeCalculator from "./percentage-change-calculator";
import PercentageDecreaseCalculator from "./percentage-decrease-calculator";
import PercentageDifferenceCalculator from "./percentage-difference-calculator";
import PercentageErrorCalculator from "./percentage-error-calculator";
import PercentageIncreaseCalculator from "./percentage-increase-calculator";

const calculators = [
  ["increase", PercentageIncreaseCalculator, "Original value", "New value"],
  ["decrease", PercentageDecreaseCalculator, "Original value", "New value"],
  ["change", PercentageChangeCalculator, "Original value", "New value"],
  ["difference", PercentageDifferenceCalculator, "First value", "Second value"],
  ["error", PercentageErrorCalculator, "Measured value", "Reference value"],
] as const;

describe("percentage family shared workspace", () => {
  it.each(calculators)("renders a blank accessible %s workspace and focuses the first invalid field", async (_mode, Component, firstLabel, secondLabel) => {
    const user = userEvent.setup();
    const { container } = render(<Component />);

    expect(screen.getByLabelText(firstLabel)).toHaveValue(null);
    expect(screen.getByLabelText(secondLabel)).toHaveValue(null);
    expect(screen.getByRole("button", { name: "Calculate" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Clear" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Ready when you are" })).toBeVisible();
    expect(container.querySelectorAll("[aria-live='polite']")).toHaveLength(1);
    expect(container.querySelector("img, svg, canvas")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByLabelText(firstLabel)).toHaveFocus();
    expect(screen.getByLabelText(firstLabel)).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("NaN")).not.toBeInTheDocument();
  });

  it.each(calculators)("submits %s with Enter, clears stale results on edit, and resets", async (mode, Component, firstLabel, secondLabel) => {
    const user = userEvent.setup();
    render(<Component />);
    const first = screen.getByLabelText(firstLabel);
    const second = screen.getByLabelText(secondLabel);
    const values = mode === "error" ? ["95", "100"] : mode === "difference" ? ["80", "100"] : ["100", "125"];

    await user.type(first, values[0]);
    await user.type(second, values[1]);
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("heading", { name: "Ready when you are" })).not.toBeInTheDocument();
    expect(screen.getByText(/^Source:/)).toBeVisible();

    await user.type(second, "0");
    expect(screen.getByRole("heading", { name: "Ready when you are" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(first).toHaveValue(null);
    expect(second).toHaveValue(null);
    expect(first).toHaveFocus();
  });

  it("renders valid Increase and Decrease results plus canonical counterpart links", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<PercentageIncreaseCalculator />);
    await user.type(screen.getByLabelText("Original value"), "100");
    await user.type(screen.getByLabelText("New value"), "250");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByRole("heading", { name: "150%" })).toBeVisible();
    expect(screen.getByText("Amount of increase")).toBeVisible();

    rerender(<PercentageDecreaseCalculator />);
    await user.clear(screen.getByLabelText("Original value"));
    await user.type(screen.getByLabelText("Original value"), "200");
    await user.clear(screen.getByLabelText("New value"));
    await user.type(screen.getByLabelText("New value"), "250");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    const link = screen.getByRole("link", { name: "Open Percentage Increase Calculator" });
    expect(link).toHaveAttribute("href", "/tools/calculators/math/percentage-increase-calculator");
    expect(screen.getByText(/percentage increase, not a percentage decrease/i)).toBeVisible();
  });

  it("renders signed Change, symmetric Difference, and the zero convention", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<PercentageChangeCalculator />);
    await user.type(screen.getByLabelText("Original value"), "100");
    await user.type(screen.getByLabelText("New value"), "80");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByRole("heading", { name: "-20%" })).toBeVisible();
    expect(screen.getByText(/20% decrease/i)).toBeVisible();
    unmount();

    render(<PercentageDifferenceCalculator />);
    await user.type(screen.getByLabelText("First value"), "80");
    await user.type(screen.getByLabelText("Second value"), "100");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByRole("heading", { name: "22.2222%" })).toBeVisible();
    const result = document.querySelector<HTMLElement>("[aria-live='polite']")!;
    expect(within(result).getByText("90")).toBeVisible();
    expect(within(result).getByText(/\(20 ÷ 90\) × 100 = 22\.222222%/)).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Clear" }));
    await user.type(screen.getByLabelText("First value"), "0");
    await user.type(screen.getByLabelText("Second value"), "0");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByText(/0 ÷ 0/)).toBeVisible();
  });

  it("accepts signed Error inputs and rejects its zero reference", async () => {
    const user = userEvent.setup();
    render(<PercentageErrorCalculator />);
    await user.type(screen.getByLabelText("Measured value"), "-95");
    await user.type(screen.getByLabelText("Reference value"), "-100");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByRole("heading", { name: "5%" })).toBeVisible();
    expect(screen.getByText(/measured value is 5 above/i)).toBeVisible();

    await user.clear(screen.getByLabelText("Reference value"));
    await user.type(screen.getByLabelText("Reference value"), "0");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByText("Enter a nonzero reference value.")).toBeVisible();
    expect(screen.getByLabelText("Reference value")).toHaveFocus();
  });

  it("rejects negative inputs in the four non-negative tools", async () => {
    const user = userEvent.setup();
    render(<PercentageDifferenceCalculator />);
    await user.type(screen.getByLabelText("First value"), "-1");
    await user.type(screen.getByLabelText("Second value"), "1");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByText("Enter a non-negative first value.")).toBeVisible();
  });
});
