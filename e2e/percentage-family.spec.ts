import { expect, test, type Page } from "@playwright/test";
import { resolve } from "node:path";

const axePath = resolve(process.cwd(), "node_modules/axe-core/axe.min.js");

const family = [
  "percentage-decrease-calculator",
  "percentage-difference-calculator",
  "percentage-change-calculator",
  "percentage-error-calculator",
  "percentage-increase-calculator",
] as const;

test.beforeEach(async ({ page }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname.includes("sanity")) throw new Error(`Forbidden Sanity request: ${url.href}`);
    if (["google.com", "googletagmanager.com", "google-analytics.com", "vercel-insights.com"].some((host) => url.hostname.includes(host))) {
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });
  page.on("pageerror", (error) => { throw error; });
});

test("discovers Percentage Difference and calculates the average-denominator result", async ({ page }) => {
  await page.goto("/");
  const search = page.getByLabel("Search tools", { exact: true }).first();
  await search.fill("Percentage Difference");
  await page.getByRole("option", { name: /Percentage Difference Calculator/ }).click();
  await expect(page).toHaveURL(/percentage-difference-calculator$/);
  await calculate(page, "First value", "80", "Second value", "100");
  await expect(page.getByRole("heading", { name: "22.2222%" })).toBeVisible();
  const workspace = page.locator("[data-percentage-family='difference']");
  await expect(workspace.getByText("Arithmetic mean", { exact: true })).toBeVisible();
  await expect(workspace.getByText("90", { exact: true })).toBeVisible();
  await expect(workspace.getByText(/\(20 ÷ 90\) × 100 = 22\.222222%/)).toBeVisible();
});

test("updated Decrease starts blank, has no workspace graphic, and routes mismatch to Increase", async ({ page }) => {
  await page.goto("/tools/calculators/math/percentage-decrease-calculator");
  await expect(page.getByLabel("Original value")).toHaveValue("");
  await expect(page.getByLabel("New value")).toHaveValue("");
  await expect(page.locator("[data-percentage-family='decrease'] img, [data-percentage-family='decrease'] svg, [data-percentage-family='decrease'] canvas")).toHaveCount(0);
  await calculate(page, "Original value", "200", "New value", "150");
  await expect(page.getByRole("heading", { name: "25%" })).toBeVisible();
  await page.getByLabel("New value").fill("250");
  await expect(page.getByRole("heading", { name: "Ready when you are" })).toBeVisible();
  await page.getByRole("button", { name: "Calculate" }).click();
  await page.getByRole("link", { name: "Open Percentage Increase Calculator" }).click();
  await expect(page).toHaveURL(/percentage-increase-calculator$/);
});

test("Change preserves signed direction and no calculator state across reload", async ({ page }) => {
  await page.goto("/tools/calculators/math/percentage-change-calculator");
  await calculate(page, "Original value", "100", "New value", "80");
  await expect(page.getByRole("heading", { name: "-20%" })).toBeVisible();
  await expect(page.getByText(/20% decrease/i)).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Original value")).toHaveValue("");
  await expect(page.getByLabel("New value")).toHaveValue("");
  await expect(page.getByRole("heading", { name: "Ready when you are" })).toBeVisible();
});

test("Error accepts signed inputs and owns its zero-reference error", async ({ page }) => {
  await page.goto("/tools/calculators/math/percentage-error-calculator");
  await calculate(page, "Measured value", "-95", "Reference value", "-100");
  await expect(page.getByRole("heading", { name: "5%" })).toBeVisible();
  await expect(page.getByText(/measured value is 5 above/i)).toBeVisible();
  await page.getByLabel("Reference value").fill("0");
  await page.getByRole("button", { name: "Calculate" }).click();
  await expect(page.getByText("Enter a nonzero reference value.")).toBeVisible();
  await expect(page.getByLabel("Reference value")).toBeFocused();
});

test("Difference exposes the zero convention and one-zero 200% result", async ({ page }) => {
  await page.goto("/tools/calculators/math/percentage-difference-calculator");
  await calculate(page, "First value", "0", "Second value", "0");
  await expect(page.getByRole("heading", { name: "0%" })).toBeVisible();
  await expect(page.locator("[data-percentage-family='difference']").getByText(/0 ÷ 0/).first()).toBeVisible();
  await page.getByLabel("Second value").fill("10");
  await page.getByRole("button", { name: "Calculate" }).click();
  await expect(page.getByRole("heading", { name: "200%" })).toBeVisible();
});

test("mobile keyboard workflow has no horizontal page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/tools/calculators/math/percentage-increase-calculator");
  await page.getByLabel("Original value").fill("2.5");
  await page.getByLabel("New value").fill("3");
  await page.getByLabel("New value").press("Enter");
  await expect(page.getByRole("heading", { name: "20%" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("workspace reflows across the required viewport and color-scheme matrix", async ({ page }) => {
  await page.goto("/tools/calculators/math/percentage-difference-calculator");
  await calculate(page, "First value", "123456789012345", "Second value", "1");

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);

    for (const dark of [false, true]) {
      await page.evaluate((enabled) => {
        document.documentElement.classList.toggle("dark", enabled);
      }, dark);

      await expect(page.getByLabel("First value")).toBeVisible();
      await expect(page.getByRole("button", { name: "Calculate" })).toBeVisible();
      await expect(page.locator("[data-result-state='success']")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  }
});

test("shared workspace introduces no serious or critical accessibility violations", async ({ page }) => {
  for (const slug of family) {
    await page.goto(`/tools/calculators/math/${slug}`);
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => {
      const axe = (window as typeof window & {
        axe: {
          run: (
            context: Document,
            options: { runOnly: { type: string; values: string[] } },
          ) => Promise<{ violations: Array<{ id: string; impact: string | null; nodes: unknown[] }> }>;
        };
      }).axe;
      const result = await axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
      });
      return result.violations
        .filter(({ impact }) => impact === "serious" || impact === "critical")
        .map(({ id, impact, nodes }) => ({ id, impact, nodeCount: nodes.length }));
    });

    expect(violations, `${slug} accessibility violations`).toEqual([]);
  }
});

test("all family routes and JSON-LD are healthy while a wrong category is not found", async ({ page }) => {
  for (const slug of family) {
    const response = await page.goto(`/tools/calculators/math/${slug}`);
    expect(response?.ok()).toBe(true);
    const blocks = await page.locator("script[type='application/ld+json']").allTextContents();
    expect(blocks).toHaveLength(1);
    const graph = JSON.parse(blocks[0])["@graph"] as Array<{ "@type": string }>;
    expect(graph.map((node) => node["@type"])).toEqual(["WebPage", "WebApplication", "BreadcrumbList", "FAQPage"]);
  }
  await page.goto("/tools/calculators/financial/percentage-increase-calculator");
  await expect(page.getByRole("heading", { name: "Oops! Tool Not Found" })).toBeVisible();
});

test("calculator values remain out of network URLs and payloads", async ({ page }) => {
  const leaked: string[] = [];
  page.on("request", (request) => {
    const traffic = `${decodeURIComponent(request.url())}\n${request.postData() ?? ""}`;
    if (traffic.includes("91827.314") || traffic.includes("7182.55")) leaked.push(traffic);
  });
  await page.goto("/tools/calculators/math/percentage-difference-calculator");
  await calculate(page, "First value", "91827.314", "Second value", "7182.55");
  await expect(page.locator("[data-result-state='success']")).toBeVisible();
  await page.waitForTimeout(250);
  expect(leaked).toEqual([]);
});

async function calculate(page: Page, firstLabel: string, first: string, secondLabel: string, second: string) {
  await page.getByLabel(firstLabel).fill(first);
  await page.getByLabel(secondLabel).fill(second);
  await page.getByRole("button", { name: "Calculate" }).click();
}
