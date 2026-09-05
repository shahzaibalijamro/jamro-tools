export const cylinderUnits = {
  inches: { label: "Cubic Inches", abbr: "in³" },
  cm: { label: "Cubic Centimeters", abbr: "cm³" },
  meters: { label: "Cubic Meters", abbr: "m³" },
  feet: { label: "Cubic Feet", abbr: "ft³" },
  mm: { label: "Cubic Millimeters", abbr: "mm³" },
} as const;

export function calculateCylinder(radius: number, height: number) {
  const r = radius || 0;
  const h = height || 0;
  if (r <= 0 || h <= 0) return { volume: 0, baseArea: 0, lateralArea: 0, basePercent: 50, lateralPercent: 50, ratio: "--" };
  const oneBaseArea = Math.PI * r ** 2;
  const lateralArea = 2 * Math.PI * r * h;
  const totalSurface = oneBaseArea * 2 + lateralArea;
  return { volume: oneBaseArea * h, baseArea: oneBaseArea * 2, lateralArea, basePercent: oneBaseArea * 2 / totalSurface * 100, lateralPercent: lateralArea / totalSurface * 100, ratio: `${Math.round(oneBaseArea / lateralArea * 100)}%` };
}
