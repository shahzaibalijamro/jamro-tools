"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

import {
  calculatePercentageFamily,
  formatPercentageNumber,
  type PercentageFamilyCalculation,
  type PercentageFamilyMode,
} from "../logic/percentage-family";

interface WorkspaceConfig {
  firstLabel: string;
  secondLabel: string;
  guidance: string;
  resultLabel: string;
  sourceLabel: string;
  sourceHref: string;
  inputNote: string;
}

const CONFIGS: Record<PercentageFamilyMode, WorkspaceConfig> = {
  increase: {
    firstLabel: "Original value",
    secondLabel: "New value",
    guidance: "Enter an original value and a higher new value to calculate the percentage increase.",
    resultLabel: "Percentage increase",
    sourceLabel: "OpenStax Prealgebra 2e, Section 6.2",
    sourceHref: "https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent",
    inputNote: "Use non-negative values in the same unit. The original value must be greater than zero.",
  },
  decrease: {
    firstLabel: "Original value",
    secondLabel: "New value",
    guidance: "Enter an original value and a lower new value to calculate the percentage decrease.",
    resultLabel: "Percentage decrease",
    sourceLabel: "OpenStax Prealgebra 2e, Section 6.2",
    sourceHref: "https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent",
    inputNote: "Use non-negative values in the same unit. The original value must be greater than zero.",
  },
  change: {
    firstLabel: "Original value",
    secondLabel: "New value",
    guidance: "Enter an original value and a new value to calculate their signed percentage change.",
    resultLabel: "Percentage change",
    sourceLabel: "OpenStax Principles of Financial Accounting, Appendix A",
    sourceHref: "https://openstax.org/books/principles-financial-accounting/pages/a-financial-statement-analysis",
    inputNote: "Use non-negative values in the same unit. The original value must be greater than zero.",
  },
  difference: {
    firstLabel: "First value",
    secondLabel: "Second value",
    guidance: "Enter two values to compare their absolute difference relative to their average.",
    resultLabel: "Percentage difference",
    sourceLabel: "NIST Dataplot PERCDIF reference",
    sourceHref: "https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/percdif.htm",
    inputNote: "Use non-negative values in the same unit. Input order does not affect the result.",
  },
  error: {
    firstLabel: "Measured value",
    secondLabel: "Reference value",
    guidance: "Enter a measured value and a designated reference value to calculate percentage error.",
    resultLabel: "Percentage error",
    sourceLabel: "NIST DLMF Section 3.1(v), Error Measures",
    sourceHref: "https://dlmf.nist.gov/3.1",
    inputNote: "Signed values are allowed. The reference value must be nonzero, and both values should use the same unit.",
  },
};

const EMPTY_CALCULATION: PercentageFamilyCalculation = { result: null, errors: {} };

export function PercentageFamilyWorkspace({ mode }: { mode: PercentageFamilyMode }) {
  const config = CONFIGS[mode];
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [calculation, setCalculation] = useState(EMPTY_CALCULATION);
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const firstErrorId = `${mode}-first-error`;
  const secondErrorId = `${mode}-second-error`;
  const noteId = `${mode}-input-note`;

  function edit(which: "first" | "second", value: string) {
    if (which === "first") setFirst(value);
    else setSecond(value);
    setCalculation(EMPTY_CALCULATION);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextCalculation = calculatePercentageFamily(mode, first, second);
    setCalculation(nextCalculation);
    if (nextCalculation.errors.first) firstRef.current?.focus();
    else if (nextCalculation.errors.second) secondRef.current?.focus();
  }

  function clear() {
    setFirst("");
    setSecond("");
    setCalculation(EMPTY_CALCULATION);
    firstRef.current?.focus();
  }

  const result = calculation.result;
  const resultStatus = !result
    ? ""
    : result.state === "direction-mismatch"
      ? `Actual: ${result.direction}`
      : result.direction
        ? `Result: ${result.direction}`
        : "Result: calculated";

  return (
    <section
      data-tool-workspace
      data-percentage-family={mode}
      className="grid min-w-0 grid-cols-1 gap-[24px] lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)]"
    >
      <form
        onSubmit={submit}
        noValidate
        className="min-w-0 rounded-xl border border-outline-variant bg-surface-container-lowest p-[20px] shadow-sm dark:bg-surface-container-low sm:p-[24px]"
      >
        <h2 className="text-[22px] font-bold leading-tight text-on-surface">Enter values</h2>
        <p id={noteId} className="mt-[8px] text-[14px] leading-[1.55] text-on-surface-variant">{config.inputNote}</p>

        <div className="mt-[20px] space-y-[18px]">
          <div>
            <label htmlFor={`${mode}-first`} className="block text-[14px] font-semibold text-on-surface">{config.firstLabel}</label>
            <input
              ref={firstRef}
              id={`${mode}-first`}
              name="firstValue"
              type="number"
              step="any"
              inputMode="decimal"
              autoComplete="off"
              value={first}
              onChange={(event) => edit("first", event.target.value)}
              aria-invalid={Boolean(calculation.errors.first)}
              aria-describedby={calculation.errors.first ? firstErrorId : noteId}
              className="mt-[7px] min-h-[48px] w-full min-w-0 rounded-lg border border-outline bg-surface-container-low px-[14px] py-[11px] text-[16px] text-on-surface outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 dark:bg-surface-container"
            />
            {calculation.errors.first ? <p id={firstErrorId} className="mt-[6px] text-[14px] font-medium leading-snug text-error">{calculation.errors.first}</p> : null}
          </div>

          <div>
            <label htmlFor={`${mode}-second`} className="block text-[14px] font-semibold text-on-surface">{config.secondLabel}</label>
            <input
              ref={secondRef}
              id={`${mode}-second`}
              name="secondValue"
              type="number"
              step="any"
              inputMode="decimal"
              autoComplete="off"
              value={second}
              onChange={(event) => edit("second", event.target.value)}
              aria-invalid={Boolean(calculation.errors.second)}
              aria-describedby={calculation.errors.second ? secondErrorId : noteId}
              className="mt-[7px] min-h-[48px] w-full min-w-0 rounded-lg border border-outline bg-surface-container-low px-[14px] py-[11px] text-[16px] text-on-surface outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 dark:bg-surface-container"
            />
            {calculation.errors.second ? <p id={secondErrorId} className="mt-[6px] text-[14px] font-medium leading-snug text-error">{calculation.errors.second}</p> : null}
          </div>
        </div>

        <div className="mt-[24px] grid grid-cols-1 gap-[10px] sm:grid-cols-2">
          <button type="submit" className="min-h-[48px] cursor-pointer rounded-full bg-primary px-[20px] py-[12px] text-[15px] font-bold text-on-primary outline-none transition-colors hover:bg-primary-container focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest">Calculate</button>
          <button type="button" onClick={clear} className="min-h-[48px] cursor-pointer rounded-full border border-outline px-[20px] py-[12px] text-[15px] font-bold text-on-surface outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest">Clear</button>
        </div>
      </form>

      <section
        aria-live="polite"
        aria-atomic="true"
        data-result-state={result?.state ?? (calculation.errors.calculation ? "error" : "empty")}
        className="min-w-0 rounded-xl border border-outline-variant bg-surface-container p-[20px] shadow-sm sm:p-[28px]"
      >
        {calculation.errors.calculation ? (
          <div className="flex min-h-[260px] flex-col justify-center">
            <h2 className="text-[22px] font-bold text-on-surface">Calculation unavailable</h2>
            <p className="mt-[10px] text-[16px] leading-relaxed text-error">{calculation.errors.calculation}</p>
          </div>
        ) : result ? (
          <div className="min-w-0">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-primary">{config.resultLabel}</p>
            <h2 className="mt-[8px] max-w-full break-words text-[clamp(2.25rem,10vw,3.75rem)] font-bold leading-none tracking-[-0.04em] text-on-surface [overflow-wrap:anywhere]">{formatPercentageNumber(result.percentage, "headline")}%</h2>
            <p className="mt-[8px] text-[15px] font-semibold capitalize text-primary">{resultStatus}</p>
            <p className="mt-[16px] max-w-[65ch] text-[16px] leading-[1.65] text-on-surface-variant">{result.interpretation}</p>
            {result.conventionNote ? <p className="mt-[12px] rounded-lg border border-outline-variant bg-surface-container-lowest p-[12px] text-[14px] leading-[1.55] text-on-surface-variant dark:bg-surface-container-low">{result.conventionNote}</p> : null}

            <dl className="mt-[24px] grid min-w-0 grid-cols-1 gap-[12px] sm:grid-cols-2">
              {result.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0 rounded-lg bg-surface-container-lowest p-[14px] dark:bg-surface-container-low">
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.05em] text-on-surface-variant">{metric.label}</dt>
                  <dd className="mt-[5px] break-words text-[22px] font-bold tabular-nums text-on-surface [overflow-wrap:anywhere]">{formatPercentageNumber(metric.value, "detail")}{metric.suffix}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-[24px] min-w-0 border-t border-outline-variant pt-[20px]">
              <h3 className="text-[17px] font-bold text-on-surface">Formula and working</h3>
              <p className="mt-[10px] break-words rounded-lg bg-surface-container-lowest px-[12px] py-[10px] font-mono text-[13px] leading-relaxed text-primary [overflow-wrap:anywhere] dark:bg-surface-container-low">{result.formula}</p>
              <ol className="mt-[12px] list-decimal space-y-[6px] pl-[22px] text-[14px] leading-[1.55] text-on-surface-variant">
                {result.steps.map((step) => <li key={step} className="break-words [overflow-wrap:anywhere]">{step}</li>)}
              </ol>
            </div>

            {result.counterpartHref && result.counterpartLabel ? (
              <Link href={result.counterpartHref} className="mt-[20px] inline-flex min-h-[44px] items-center rounded-lg border border-primary px-[14px] py-[10px] text-[14px] font-bold text-primary outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{result.counterpartLabel}</Link>
            ) : null}
          </div>
        ) : (
          <div className="flex min-h-[260px] flex-col justify-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-primary">Your result</p>
            <h2 className="mt-[8px] text-[28px] font-bold leading-tight text-on-surface">Ready when you are</h2>
            <p className="mt-[10px] max-w-[48ch] text-[16px] leading-[1.65] text-on-surface-variant">{config.guidance}</p>
          </div>
        )}

        <p className="mt-[24px] border-t border-outline-variant pt-[16px] text-[13px] leading-[1.55] text-on-surface-variant">
          Source: <a className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" href={config.sourceHref}>{config.sourceLabel}</a>. Calculations stay in this browser tab and are not saved or sent by this tool.
        </p>
      </section>
    </section>
  );
}
