export interface CalculatorHistoryItem { expression: string; result: string }

export function evaluateBasicExpression(previousInput: string, currentInput: string) {
  const expression = previousInput + currentInput;
  try {
    const value = new Function(`return ${expression.replace("×", "*").replace("−", "-")}`)();
    return { expression, result: String(value), error: false };
  } catch {
    return { expression, result: "Error", error: true };
  }
}

export function parseCalculatorHistory(value: string | null): CalculatorHistoryItem[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed as CalculatorHistoryItem[] : [];
  } catch {
    return [];
  }
}

export function prependCalculatorHistory(history: CalculatorHistoryItem[], item: CalculatorHistoryItem) {
  return [item, ...history].slice(0, 10);
}
