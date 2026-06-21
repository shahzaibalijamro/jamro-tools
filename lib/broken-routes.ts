const VALID_ROUTES = new Set([
  "/",
  "/about",
  "/admin",
  "/admin/dashboard/blogs",
  "/admin/dashboard/queries",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/tools",
  "/tools/calculators",
  "/tools/text-tools",
  "/tools/calculators/text-tools/word-counter",
  "/tools/calculators/financial/mortgage-calculator",
  "/tools/calculators/math/scientific-calculator",
  "/tools/calculators/math/basic-calculator",
  "/tools/calculators/math/cylinder-volume-calculator",
  "/tools/calculators/math/percentage-decrease-calculator",
  "/tools/calculators/math/triple-integral-calculator",
  "/tools/calculators/date-time/age-difference-calculator",
  "/tools/calculators/educational/middle-school-gpa-calculator",
  "/tools/calculators/educational/apush-score-calculator",
]);

const VALID_PATTERNS = [
  /^\/blog\/[^/]+$/,
  /^\/tools\/calculators\/[^/]+$/,
  /^\/tools\/calculators\/[^/]+\/[^/]+$/,
];

export function isValidRoute(href: string): boolean {
  if (href.startsWith("#")) return true;
  if (href.startsWith("http://") || href.startsWith("https://")) return true;

  const normalized = href.split("?")[0].split("#")[0];
  if (normalized.endsWith("/") && normalized !== "/") {
    const withoutTrailing = normalized.slice(0, -1);
    if (VALID_ROUTES.has(withoutTrailing)) return true;
    return VALID_PATTERNS.some((p) => p.test(withoutTrailing));
  }

  if (VALID_ROUTES.has(normalized)) return true;
  return VALID_PATTERNS.some((p) => p.test(normalized));
}
