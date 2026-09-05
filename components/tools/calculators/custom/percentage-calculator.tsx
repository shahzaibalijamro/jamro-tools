"use client";

import { useId, useRef, useState } from "react";
import { calculatePercentage, formatPercentageNumber as formatNumber, type PercentageMode as Mode, type PercentageResult as CalculationResult } from "../logic/percentage-calculator";

interface ModeValues {
  first: string;
  second: string;
}

const modes: Array<{
  id: Mode;
  label: string;
  prompt: string;
  firstLabel: string;
  secondLabel: string;
  firstPlaceholder: string;
  secondPlaceholder: string;
}> = [
  {
    id: "of",
    label: "% of a number",
    prompt: "What is X% of Y?",
    firstLabel: "Percentage",
    secondLabel: "Number",
    firstPlaceholder: "e.g., 20",
    secondPlaceholder: "e.g., 500",
  },
  {
    id: "percent",
    label: "What percent?",
    prompt: "X is what percentage of Y?",
    firstLabel: "First number",
    secondLabel: "Second number",
    firstPlaceholder: "e.g., 50",
    secondPlaceholder: "e.g., 200",
  },
  {
    id: "whole",
    label: "Find the whole",
    prompt: "X is Y% of what number?",
    firstLabel: "Number",
    secondLabel: "Percentage",
    firstPlaceholder: "e.g., 50",
    secondPlaceholder: "e.g., 25",
  },
];

const emptyValues: Record<Mode, ModeValues> = {
  of: { first: "", second: "" },
  percent: { first: "", second: "" },
  whole: { first: "", second: "" },
};

export default function PercentageCalculator() {
  const [activeMode, setActiveMode] = useState<Mode>("of");
  const [values, setValues] = useState<Record<Mode, ModeValues>>(emptyValues);
  const [results, setResults] = useState<Record<Mode, CalculationResult | null>>({
    of: null,
    percent: null,
    whole: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ModeValues, string>>>({});
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const activeConfig = modes.find((mode) => mode.id === activeMode) ?? modes[0];
  const activeValues = values[activeMode];
  const activeResult = results[activeMode];

  function selectMode(mode: Mode) {
    setActiveMode(mode);
    setErrors({});
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % modes.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + modes.length) % modes.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = modes.length - 1;
    else return;

    event.preventDefault();
    selectMode(modes[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  function updateValue(field: keyof ModeValues, value: string) {
    setValues((current) => ({
      ...current,
      [activeMode]: { ...current[activeMode], [field]: value },
    }));
    setResults((current) => ({ ...current, [activeMode]: null }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function calculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { result, errors: nextErrors } = calculatePercentage(activeMode, activeValues.first, activeValues.second);
    setErrors(nextErrors);
    setResults((current) => ({ ...current, [activeMode]: result }));
  }

  return (
    <section
      data-tool-workspace
      className="mb-[48px] overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-[0_16px_44px_rgba(17,28,45,0.08)] dark:bg-surface-container-low"
      aria-label="Percentage calculator"
    >
      <div
        role="tablist"
        aria-label="Percentage calculation type"
        className="grid grid-cols-1 gap-[4px] border-b border-outline-variant bg-surface-container-low p-[8px] sm:grid-cols-3"
      >
        {modes.map((mode, index) => {
          const selected = mode.id === activeMode;
          return (
            <button
              key={mode.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${baseId}-${mode.id}-tab`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-${mode.id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectMode(mode.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`min-h-[44px] rounded-lg px-[16px] py-[10px] text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                selected
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-${activeMode}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-${activeMode}-tab`}
        className="grid grid-cols-1 lg:grid-cols-2"
      >
        <form onSubmit={calculate} className="space-y-[20px] p-[24px] sm:p-[32px]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
              Calculate a percentage
            </p>
            <h2 className="mt-[8px] text-[24px] font-semibold leading-tight text-on-surface">
              {activeConfig.prompt}
            </h2>
          </div>

          <CalculatorInput
            id={`${baseId}-${activeMode}-first`}
            label={activeConfig.firstLabel}
            placeholder={activeConfig.firstPlaceholder}
            value={activeValues.first}
            error={errors.first}
            onChange={(value) => updateValue("first", value)}
          />
          <CalculatorInput
            id={`${baseId}-${activeMode}-second`}
            label={activeConfig.secondLabel}
            placeholder={activeConfig.secondPlaceholder}
            value={activeValues.second}
            error={errors.second}
            onChange={(value) => updateValue("second", value)}
          />

          <button
            type="submit"
            className="min-h-[48px] w-full rounded-lg bg-primary px-[24px] py-[12px] text-[15px] font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px"
          >
            Calculate
          </button>
        </form>

        <div className="border-t border-outline-variant bg-surface-container-low p-[24px] sm:p-[32px] lg:border-l lg:border-t-0">
          <div
            aria-live="polite"
            aria-atomic="true"
            className="flex min-h-[330px] h-full flex-col justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-[24px] shadow-sm dark:bg-surface-container"
          >
            {activeResult ? (
              <>
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
                  Result
                </p>
                <p className="mt-[8px] font-mono text-[34px] font-bold leading-tight tracking-[-0.03em] text-on-surface [font-variant-numeric:tabular-nums] sm:text-[40px]">
                  {formatNumber(activeResult.value)}{activeMode === "percent" ? "%" : ""}
                </p>
                <p className="mt-[12px] text-[16px] font-semibold leading-[1.5] text-on-surface">
                  {activeResult.headline}
                </p>
                <div className="my-[20px] h-px bg-outline-variant" />
                <p className="text-[13px] font-bold text-on-surface">Calculation</p>
                <p className="mt-[6px] font-mono text-[13px] text-primary">
                  {activeResult.formula}
                </p>
                <ol className="mt-[12px] space-y-[6px] text-[14px] leading-[1.5] text-on-surface-variant">
                  {activeResult.steps.map((step, index) => (
                    <li key={step}>
                      <span className="font-semibold text-on-surface">Step {index + 1}:</span> {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-[16px] text-[14px] leading-[1.5] text-on-surface-variant">
                  {activeResult.explanation}
                </p>
              </>
            ) : (
              <div className="text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[38px] text-primary" aria-hidden="true">
                  calculate
                </span>
                <p className="mt-[12px] text-[16px] font-semibold text-on-surface">
                  Your result will appear here
                </p>
                <p className="mt-[6px] text-[14px]">Enter both values, then choose Calculate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CalculatorInput({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-semibold text-on-surface">
        {label}
      </label>
      <input
        id={id}
        type="number"
        step="any"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-[8px] min-h-[48px] w-full rounded-lg border bg-surface-container-lowest px-[14px] py-[11px] text-[16px] text-on-surface outline-none transition-shadow placeholder:text-on-surface-variant/65 focus:ring-2 focus:ring-primary/30 dark:bg-background ${
          error ? "border-error" : "border-outline-variant focus:border-primary"
        }`}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-[6px] text-[13px] font-medium text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
