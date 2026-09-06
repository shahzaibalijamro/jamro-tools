export type PercentageFamilyMode =
  | "increase"
  | "decrease"
  | "change"
  | "difference"
  | "error";

export type PercentageResultState =
  | "success"
  | "no-change"
  | "direction-mismatch"
  | "no-difference-convention";

export type PercentageDirection =
  | "increase"
  | "decrease"
  | "equal"
  | "above"
  | "below";

export interface PercentageMetric {
  label: string;
  value: number;
  suffix?: string;
}

export interface PercentageFamilyResult {
  state: PercentageResultState;
  percentage: number;
  interpretation: string;
  formula: string;
  steps: string[];
  metrics: PercentageMetric[];
  direction?: PercentageDirection;
  counterpartHref?: string;
  counterpartLabel?: string;
  conventionNote?: string;
}

export interface PercentageFamilyCalculation {
  result: PercentageFamilyResult | null;
  errors: {
    first?: string;
    second?: string;
    calculation?: string;
  };
}

export type PercentageFormatProfile = "headline" | "detail";

const INCREASE_HREF =
  "/tools/calculators/math/percentage-increase-calculator";
const DECREASE_HREF =
  "/tools/calculators/math/percentage-decrease-calculator";
const OVERFLOW_ERROR =
  "The result is too large to calculate. Enter smaller finite values.";

const FIELD_NAMES: Record<PercentageFamilyMode, [string, string]> = {
  increase: ["original value", "new value"],
  decrease: ["original value", "new value"],
  change: ["original value", "new value"],
  difference: ["first value", "second value"],
  error: ["measured value", "reference value"],
};

export function formatPercentageNumber(
  value: number,
  profile: PercentageFormatProfile,
  locale?: string,
): string {
  const normalized = Object.is(value, -0) ? 0 : value;
  if (!Number.isFinite(normalized)) return "";

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: profile === "headline" ? 4 : 6,
    useGrouping: true,
  }).format(normalized);
}

function parseInputs(
  mode: PercentageFamilyMode,
  firstInput: string,
  secondInput: string,
): { values?: [number, number]; errors: PercentageFamilyCalculation["errors"] } {
  const errors: PercentageFamilyCalculation["errors"] = {};
  const names = FIELD_NAMES[mode];
  const inputs = [firstInput, secondInput];
  const values: number[] = [];

  inputs.forEach((input, index) => {
    const key = index === 0 ? "first" : "second";
    const trimmed = input.trim();
    if (!trimmed) {
      errors[key] = `Enter a ${names[index]}.`;
      return;
    }

    const value = Number(trimmed);
    if (!Number.isFinite(value)) {
      errors[key] = `Enter a finite ${names[index]}.`;
      return;
    }

    if (mode !== "error" && value < 0) {
      errors[key] = `Enter a non-negative ${names[index]}.`;
      return;
    }

    values[index] = value;
  });

  if (!errors.first && !errors.second) {
    if (mode !== "difference" && mode !== "error" && values[0] === 0) {
      errors.first = "Enter an original value greater than zero.";
    }
    if (mode === "error" && values[1] === 0) {
      errors.second = "Enter a nonzero reference value.";
    }
  }

  return Object.keys(errors).length > 0
    ? { errors }
    : { values: values as [number, number], errors };
}

function overflow(): PercentageFamilyCalculation {
  return { result: null, errors: { calculation: OVERFLOW_ERROR } };
}

function hasNonFinite(values: number[]): boolean {
  return values.some((value) => !Number.isFinite(value));
}

function success(result: PercentageFamilyResult): PercentageFamilyCalculation {
  return { result, errors: {} };
}

function calculateDirectional(
  mode: "increase" | "decrease",
  firstInput: string,
  secondInput: string,
  locale?: string,
): PercentageFamilyCalculation {
  const parsed = parseInputs(mode, firstInput, secondInput);
  if (!parsed.values) return { result: null, errors: parsed.errors };

  const [original, next] = parsed.values;
  const signedChange = next - original;
  const amount = Math.abs(signedChange);
  const percentage = (amount / original) * 100;
  const ratio = (next / original) * 100;
  if (hasNonFinite([signedChange, amount, percentage, ratio])) return overflow();

  const isEqual = next === original;
  const expectedDirection = mode === "increase" ? next > original : next < original;
  const actualDirection: "increase" | "decrease" =
    next > original ? "increase" : "decrease";
  const detail = (value: number) => formatPercentageNumber(value, "detail", locale);

  if (isEqual) {
    return success({
      state: "no-change",
      percentage: 0,
      direction: "equal",
      interpretation: "The new value equals the original value, so there is no change.",
      formula:
        mode === "increase"
          ? "((new value − original value) ÷ original value) × 100"
          : "((original value − new value) ÷ original value) × 100",
      steps: [
        `${detail(original)} − ${detail(next)} = 0`,
        `(0 ÷ ${detail(original)}) × 100 = 0%`,
      ],
      metrics: [
        { label: mode === "increase" ? "Amount of increase" : "Amount of decrease", value: 0 },
        { label: mode === "increase" ? "New value as % of original" : "Retained percentage", value: 100, suffix: "%" },
      ],
    });
  }

  const mismatch = !expectedDirection;
  const amountLabel = mismatch
    ? `Amount of ${actualDirection}`
    : mode === "increase"
      ? "Amount of increase"
      : "Amount of decrease";
  const formula =
    actualDirection === "increase"
      ? "((new value − original value) ÷ original value) × 100"
      : "((original value − new value) ÷ original value) × 100";

  return success({
    state: mismatch ? "direction-mismatch" : "success",
    percentage,
    direction: actualDirection,
    interpretation: mismatch
      ? `The new value is ${actualDirection === "increase" ? "higher" : "lower"} than the original value, so this is a percentage ${actualDirection}, not a percentage ${mode}.`
      : `The new value is ${detail(amount)} ${actualDirection === "increase" ? "above" : "below"} the original value, a ${detail(percentage)}% ${actualDirection}.`,
    formula,
    steps: [
      `${detail(actualDirection === "increase" ? next : original)} − ${detail(actualDirection === "increase" ? original : next)} = ${detail(amount)}`,
      `(${detail(amount)} ÷ ${detail(original)}) × 100 = ${detail(percentage)}%`,
    ],
    metrics: [
      { label: amountLabel, value: amount },
      {
        label: mode === "decrease" && !mismatch
          ? "Retained percentage"
          : "New value as % of original",
        value: ratio,
        suffix: "%",
      },
    ],
    counterpartHref: mismatch
      ? mode === "increase"
        ? DECREASE_HREF
        : INCREASE_HREF
      : undefined,
    counterpartLabel: mismatch
      ? mode === "increase"
        ? "Open Percentage Decrease Calculator"
        : "Open Percentage Increase Calculator"
      : undefined,
  });
}

export function calculatePercentageIncrease(
  original: string,
  next: string,
  locale?: string,
): PercentageFamilyCalculation {
  return calculateDirectional("increase", original, next, locale);
}

export function calculatePercentageDecrease(
  original: string,
  next: string,
  locale?: string,
): PercentageFamilyCalculation {
  return calculateDirectional("decrease", original, next, locale);
}

export function calculatePercentageChange(
  originalInput: string,
  nextInput: string,
  locale?: string,
): PercentageFamilyCalculation {
  const parsed = parseInputs("change", originalInput, nextInput);
  if (!parsed.values) return { result: null, errors: parsed.errors };

  const [original, next] = parsed.values;
  const signedChange = next - original;
  const absoluteChange = Math.abs(signedChange);
  const percentage = (signedChange / original) * 100;
  if (hasNonFinite([signedChange, absoluteChange, percentage])) return overflow();

  const direction: "increase" | "decrease" | "equal" =
    percentage > 0 ? "increase" : percentage < 0 ? "decrease" : "equal";
  const detail = (value: number) => formatPercentageNumber(value, "detail", locale);

  return success({
    state: direction === "equal" ? "no-change" : "success",
    percentage,
    direction,
    interpretation:
      direction === "equal"
        ? "The new value equals the original value, so there is no percentage change."
        : `The value ${direction === "increase" ? "increased" : "decreased"} by ${detail(absoluteChange)}, a ${detail(Math.abs(percentage))}% ${direction}.`,
    formula: "((new value − original value) ÷ original value) × 100",
    steps: [
      `${detail(next)} − ${detail(original)} = ${detail(signedChange)}`,
      `(${detail(signedChange)} ÷ ${detail(original)}) × 100 = ${detail(percentage)}%`,
    ],
    metrics: [
      { label: "Signed change", value: signedChange },
      { label: "Absolute change", value: absoluteChange },
    ],
  });
}

export function calculatePercentageDifference(
  firstInput: string,
  secondInput: string,
  locale?: string,
): PercentageFamilyCalculation {
  const parsed = parseInputs("difference", firstInput, secondInput);
  if (!parsed.values) return { result: null, errors: parsed.errors };

  const [first, second] = parsed.values;
  const absoluteDifference = Math.abs(first - second);
  const sum = first + second;
  const mean = sum / 2;
  if (hasNonFinite([absoluteDifference, sum, mean])) return overflow();
  const detail = (value: number) => formatPercentageNumber(value, "detail", locale);

  if (first === 0 && second === 0) {
    return success({
      state: "no-difference-convention",
      percentage: 0,
      direction: "equal",
      interpretation: "Both values are identical, so their percentage difference is 0%.",
      conventionNote: "For two zero values, Jamro Tools reports 0% by convention instead of evaluating the undefined expression 0 ÷ 0.",
      formula: "|value 1 − value 2| ÷ ((value 1 + value 2) ÷ 2) × 100",
      steps: ["|0 − 0| = 0", "Both values are zero, so the 0% product convention applies."],
      metrics: [
        { label: "Absolute difference", value: 0 },
        { label: "Arithmetic mean", value: 0 },
      ],
    });
  }

  const percentage = (absoluteDifference / mean) * 100;
  if (!Number.isFinite(percentage)) return overflow();

  return success({
    state: absoluteDifference === 0 ? "no-change" : "success",
    percentage,
    direction: absoluteDifference === 0 ? "equal" : undefined,
    interpretation:
      absoluteDifference === 0
        ? "The two values are identical, so there is no percentage difference."
        : `The values differ by ${detail(absoluteDifference)}, which is ${detail(percentage)}% of their arithmetic mean.`,
    formula: "|value 1 − value 2| ÷ ((value 1 + value 2) ÷ 2) × 100",
    steps: [
      `|${detail(first)} − ${detail(second)}| = ${detail(absoluteDifference)}`,
      `(${detail(first)} + ${detail(second)}) ÷ 2 = ${detail(mean)}`,
      `(${detail(absoluteDifference)} ÷ ${detail(mean)}) × 100 = ${detail(percentage)}%`,
    ],
    metrics: [
      { label: "Absolute difference", value: absoluteDifference },
      { label: "Arithmetic mean", value: mean },
    ],
  });
}

export function calculatePercentageError(
  measuredInput: string,
  referenceInput: string,
  locale?: string,
): PercentageFamilyCalculation {
  const parsed = parseInputs("error", measuredInput, referenceInput);
  if (!parsed.values) return { result: null, errors: parsed.errors };

  const [measured, reference] = parsed.values;
  const signedError = measured - reference;
  const absoluteError = Math.abs(signedError);
  const absoluteReference = Math.abs(reference);
  const percentage = (absoluteError / absoluteReference) * 100;
  if (hasNonFinite([signedError, absoluteError, absoluteReference, percentage])) return overflow();

  const direction: "above" | "below" | "equal" =
    signedError > 0 ? "above" : signedError < 0 ? "below" : "equal";
  const detail = (value: number) => formatPercentageNumber(value, "detail", locale);

  return success({
    state: "success",
    percentage,
    direction,
    interpretation:
      direction === "equal"
        ? "The measured value equals the reference value."
        : `The measured value is ${detail(absoluteError)} ${direction} the reference value. The designated reference is the comparison point; this calculator does not determine whether it is trustworthy.`,
    formula: "|measured value − reference value| ÷ |reference value| × 100",
    steps: [
      `${detail(measured)} − ${detail(reference)} = ${detail(signedError)}`,
      `|${detail(signedError)}| = ${detail(absoluteError)}`,
      `(${detail(absoluteError)} ÷ |${detail(reference)}|) × 100 = ${detail(percentage)}%`,
    ],
    metrics: [
      { label: "Signed error", value: signedError },
      { label: "Absolute error", value: absoluteError },
    ],
  });
}

export function calculatePercentageFamily(
  mode: PercentageFamilyMode,
  first: string,
  second: string,
  locale?: string,
): PercentageFamilyCalculation {
  switch (mode) {
    case "increase":
      return calculatePercentageIncrease(first, second, locale);
    case "decrease":
      return calculatePercentageDecrease(first, second, locale);
    case "change":
      return calculatePercentageChange(first, second, locale);
    case "difference":
      return calculatePercentageDifference(first, second, locale);
    case "error":
      return calculatePercentageError(first, second, locale);
  }
}
