export function evaluateScientificExpression(input: string, isDegrees: boolean): string | null {
  try {
    let expression = input
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/%/g, "/100");
    const radians = isDegrees ? " * (Math.PI / 180)" : "";
    expression = expression
      .replace(/sin\(([^)]+)\)/g, `Math.sin(($1)${radians})`)
      .replace(/cos\(([^)]+)\)/g, `Math.cos(($1)${radians})`)
      .replace(/tan\(([^)]+)\)/g, `Math.tan(($1)${radians})`)
      .replace(/log\(([^)]+)\)/g, "Math.log10($1)")
      .replace(/ln\(([^)]+)\)/g, "Math.log($1)")
      .replace(/√\(([^)]+)\)/g, "Math.sqrt($1)")
      .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)")
      .replace(/\^/g, "**");
    const result = new Function("Math", `return ${expression}`)(Math);
    if (Number.isNaN(result) || !Number.isFinite(result)) return null;
    return Number.parseFloat(result.toPrecision(15)).toString();
  } catch {
    return null;
  }
}
