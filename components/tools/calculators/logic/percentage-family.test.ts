import { describe, expect, it } from "vitest";

import {
  calculatePercentageChange,
  calculatePercentageDecrease,
  calculatePercentageDifference,
  calculatePercentageError,
  calculatePercentageIncrease,
  formatPercentageNumber,
} from "./percentage-family";

type Calculator = (first: string, second: string) => ReturnType<typeof calculatePercentageIncrease>;

const resultOf = (calculator: Calculator, first: string, second: string) => {
  const calculation = calculator(first, second);
  expect(calculation.errors).toEqual({});
  expect(calculation.result).not.toBeNull();
  return calculation.result!;
};

describe("percentage increase", () => {
  it.each([
    ["100", "125", "success", 25, 25, 125],
    ["2.5", "3", "success", 20, 0.5, 120],
    ["42", "42", "no-change", 0, 0, 100],
    ["125", "100", "direction-mismatch", 20, 25, 80],
    ["100", "250", "success", 150, 150, 250],
  ])("calculates %s to %s", (first, second, state, percentage, amount, ratio) => {
    const result = resultOf(calculatePercentageIncrease, first, second);
    expect(result).toMatchObject({ state, percentage });
    expect(result.metrics.map(({ value }) => value)).toEqual([amount, ratio]);
  });

  it("links opposite direction to Decrease", () => {
    expect(resultOf(calculatePercentageIncrease, "125", "100").counterpartHref).toBe("/tools/calculators/math/percentage-decrease-calculator");
  });
});

describe("percentage decrease", () => {
  it.each([
    ["200", "150", "success", 25, 50, 75],
    ["2.5", "2", "success", 20, 0.5, 80],
    ["42", "42", "no-change", 0, 0, 100],
    ["100", "125", "direction-mismatch", 25, 25, 125],
    ["100", "0", "success", 100, 100, 0],
  ])("calculates %s to %s", (first, second, state, percentage, amount, retained) => {
    const result = resultOf(calculatePercentageDecrease, first, second);
    expect(result).toMatchObject({ state, percentage });
    expect(result.metrics.map(({ value }) => value)).toEqual([amount, retained]);
  });

  it("links opposite direction to Increase", () => {
    expect(resultOf(calculatePercentageDecrease, "100", "125").counterpartHref).toBe("/tools/calculators/math/percentage-increase-calculator");
  });
});

describe("percentage change", () => {
  it.each([
    ["80", "100", 25, 20, 20, "increase"],
    ["100", "80", -20, -20, 20, "decrease"],
    ["2.5", "3", 20, 0.5, 0.5, "increase"],
    ["42", "42", 0, 0, 0, "equal"],
    ["1", "0", -100, -1, 1, "decrease"],
  ])("calculates %s to %s", (first, second, percentage, signed, absolute, direction) => {
    const result = resultOf(calculatePercentageChange, first, second);
    expect(result).toMatchObject({ percentage, direction });
    expect(result.metrics.map(({ value }) => value)).toEqual([signed, absolute]);
  });

  it("uses different bases for reversals", () => {
    expect(resultOf(calculatePercentageChange, "100", "120").percentage).toBe(20);
    expect(resultOf(calculatePercentageChange, "120", "100").percentage).toBeCloseTo(-16.666666666666668, 12);
  });
});

describe("percentage difference", () => {
  it.each([
    ["80", "100", 22.22222222222222, 20, 90],
    ["100", "80", 22.22222222222222, 20, 90],
    ["50", "70", 33.33333333333333, 20, 60],
    ["2.5", "3", 18.181818181818183, 0.5, 2.75],
    ["0", "10", 200, 10, 5],
  ])("calculates %s and %s", (first, second, percentage, difference, mean) => {
    const result = resultOf(calculatePercentageDifference, first, second);
    expect(result.percentage).toBeCloseTo(percentage, 12);
    expect(result.metrics.map(({ value }) => value)).toEqual([difference, mean]);
  });

  it("uses the explicit zero/zero convention", () => {
    expect(resultOf(calculatePercentageDifference, "0", "0")).toMatchObject({
      state: "no-difference-convention",
      percentage: 0,
      conventionNote: expect.stringContaining("0 ÷ 0"),
    });
  });

  it.each([["0", "9"], ["2.5", "3"], ["80", "100"]])("is symmetric for %s and %s", (first, second) => {
    expect(resultOf(calculatePercentageDifference, first, second).percentage).toBe(resultOf(calculatePercentageDifference, second, first).percentage);
  });
});

describe("percentage error", () => {
  it.each([
    ["95", "100", 5, -5, 5, "below"],
    ["105", "100", 5, 5, 5, "above"],
    ["100", "100", 0, 0, 0, "equal"],
    ["-95", "-100", 5, 5, 5, "above"],
    ["-90", "100", 190, -190, 190, "below"],
    ["2.5", "2", 25, 0.5, 0.5, "above"],
  ])("calculates measured %s against %s", (measured, reference, percentage, signed, absolute, direction) => {
    const result = resultOf(calculatePercentageError, measured, reference);
    expect(result).toMatchObject({ percentage, direction });
    expect(result.metrics.map(({ value }) => value)).toEqual([signed, absolute]);
    expect(result.percentage).toBeGreaterThanOrEqual(0);
  });
});

describe("shared validation and formatting", () => {
  const nonNegativeCalculators: Calculator[] = [
    calculatePercentageIncrease,
    calculatePercentageDecrease,
    calculatePercentageChange,
    calculatePercentageDifference,
  ];

  it.each(["", "   ", "bad", "NaN", "Infinity", "-Infinity"])("rejects malformed first input %j", (input) => {
    for (const calculator of nonNegativeCalculators) {
      expect(calculator(input, "2").result).toBeNull();
      expect(calculator(input, "2").errors.first).toBeTruthy();
    }
  });

  it("validates each field and each denominator rule", () => {
    for (const calculator of nonNegativeCalculators) {
      expect(calculator("1", "-1").errors.second).toContain("non-negative");
    }
    expect(calculatePercentageIncrease("0", "1").errors.first).toContain("greater than zero");
    expect(calculatePercentageDecrease("0", "0").errors.first).toContain("greater than zero");
    expect(calculatePercentageChange("0", "1").errors.first).toContain("greater than zero");
    expect(calculatePercentageError("10", "0").errors.second).toContain("nonzero");
  });

  it("accepts whitespace, decimals, scientific notation, and signed error inputs", () => {
    expect(resultOf(calculatePercentageIncrease, " 1e2 ", "1.25e2").percentage).toBe(25);
    expect(resultOf(calculatePercentageError, " -95 ", " -100 ").percentage).toBe(5);
  });

  it("protects against non-finite intermediate results", () => {
    expect(calculatePercentageIncrease("1e-308", "1e308").errors.calculation).toContain("smaller");
    expect(calculatePercentageDifference("1e308", "1e308").errors.calculation).toContain("smaller");
    expect(calculatePercentageError("1e308", "-1e308").errors.calculation).toContain("smaller");
  });

  it("formats without early rounding, forced zeros, or visible negative zero", () => {
    expect(formatPercentageNumber(22.222222222, "headline", "en-US")).toBe("22.2222");
    expect(formatPercentageNumber(22.222222222, "detail", "en-US")).toBe("22.222222");
    expect(formatPercentageNumber(12, "detail", "en-US")).toBe("12");
    expect(formatPercentageNumber(1200.5, "detail", "en-US")).toBe("1,200.5");
    expect(formatPercentageNumber(-0, "headline", "en-US")).toBe("0");
    expect(formatPercentageNumber(1200.5, "detail", "de-DE")).toBe("1.200,5");
  });
});
