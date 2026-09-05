export function evaluateIntegrand(expression: string, x: number, y: number, z: number): number {
  try {
    const sanitized = expression.replace(/\^/g, "**").replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan").replace(/log/g, "Math.log").replace(/exp/g, "Math.exp").replace(/sqrt/g, "Math.sqrt").replace(/abs/g, "Math.abs").replace(/pi/gi, "Math.PI").replace(/e(?![xp])/gi, "Math.E");
    return new Function("x", "y", "z", `return ${sanitized};`)(x, y, z);
  } catch { return Number.NaN; }
}

export function calculateTripleIntegral(expression: string, x1: number, x2: number, y1: number, y2: number, z1: number, z2: number, steps = 20) {
  const dx = (x2 - x1) / steps;
  const dy = (y2 - y1) / steps;
  const dz = (z2 - z1) / steps;
  let sum = 0;
  for (let i = 0; i < steps; i += 1) for (let j = 0; j < steps; j += 1) for (let k = 0; k < steps; k += 1) {
    const value = evaluateIntegrand(expression, x1 + (i + 0.5) * dx, y1 + (j + 0.5) * dy, z1 + (k + 0.5) * dz);
    if (!Number.isNaN(value)) sum += value * dx * dy * dz;
  }
  return sum;
}
