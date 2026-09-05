import { expect, test, type Page } from "@playwright/test";

const remoteHosts = ["sanity.io", "sanity-cdn.com", "google-analytics.com", "googletagmanager.com", "vercel-insights.com"];
const expectedConsoleErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname.includes("sanity")) throw new Error(`Forbidden Sanity request: ${url.href}`);
    if (remoteHosts.some((host) => url.hostname.includes(host)) || url.hostname.includes("google.com")) {
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });
  page.on("pageerror", (error) => { throw error; });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const expected = expectedConsoleErrors.get(page) ?? [];
    const matchingIndex = expected.findIndex((fragment) => message.text().includes(fragment));
    if (matchingIndex >= 0) {
      expected.splice(matchingIndex, 1);
      return;
    }
    throw new Error(`Unexpected browser console error: ${message.text()}`);
  });
});

test("critical public routes render meaningful content", async ({ page }) => {
  const routes = [
    ["/", /Every Web Utility|Every tool you need/],
    ["/tools", "Explore All Tools"],
    ["/tools/calculators", "Calculators"],
    ["/tools/calculators/math/percentage-calculator", "Percentage Calculator"],
    ["/tools/calculators/financial/mortgage-calculator", "Mortgage Calculator"],
    ["/blog", "Jamro Tools Blog"],
    ["/contact", "Get in Touch"],
  ] as const;
  for (const [path, heading] of routes) {
    const response = await page.goto(path);
    expect(response?.ok(), `${path} should return a successful response`).toBe(true);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { name: heading, level: 1 })).toBeVisible();
    await expect(page.getByText("Page Not Found")).toHaveCount(0);
  }
});

test("header discovery reaches the implemented mortgage route", async ({ page }) => {
  await page.goto("/");
  const search = page.getByLabel("Search tools", { exact: true }).first();
  await search.fill("mortgage");
  await expect(page.getByRole("option", { name: /Mortgage Calculator/ })).toBeVisible();
  await search.press("Enter");
  await expect(page).toHaveURL(/\/tools\/calculators\/financial\/mortgage-calculator$/);
  await expect(page.getByRole("heading", { name: "Mortgage Calculator", level: 1 })).toBeVisible();
});

test("percentage workflow calculates and validates", async ({ page }) => {
  await page.goto("/tools/calculators/math/percentage-calculator");
  await page.getByLabel("Percentage", { exact: true }).fill("25");
  await page.getByLabel("Number", { exact: true }).fill("200");
  await page.getByRole("button", { name: "Calculate" }).click();
  await expect(page.getByText("25% of 200 = 50")).toBeVisible();
  await page.getByRole("tab", { name: "What percent?" }).click();
  await page.getByLabel("First number").fill("50");
  await page.getByLabel("Second number").fill("0");
  await page.getByRole("button", { name: "Calculate" }).click();
  await expect(page.getByText("The second number cannot be zero.")).toBeVisible();
});

test("mortgage workflow preserves the captured payment and opens its schedule", async ({ page }) => {
  await page.goto("/tools/calculators/financial/mortgage-calculator");
  await page.getByLabel("Home Price").fill("450000");
  await page.getByLabel("Down Payment ($)").fill("90000");
  await page.getByLabel("Interest Rate").fill("6.5");
  await page.getByLabel("Loan Term").selectOption("30");
  await expect(page.getByText("$2275.44")).toBeVisible();
  await expect(page.getByText("$459,160")).toBeVisible();
  await expect(page.getByText("$819,160")).toBeVisible();
  await page.getByRole("button", { name: /View Full Amortization Schedule/ }).click();
  await expect(page.getByRole("heading", { name: /Amortization Schedule/ })).toBeVisible();
  await expect(page.getByText("360 payments")).toBeVisible();
});

test("theme preference persists across reload", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle dark mode" }).first();
  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
});

test("fixture-backed blog opens a stable invented post", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByText("A Fictional Guide to Mortgage Estimates")).toBeVisible();
  await expect(page.getByRole("button", { name: "Calculators" })).toBeVisible();
  await page.getByText("A Fictional Guide to Mortgage Estimates").click();
  await expect(page).toHaveURL(/\/blog\/fixture-mortgage-guide$/);
  await expect(page.getByRole("heading", { name: "A Fictional Guide to Mortgage Estimates", level: 1 })).toBeVisible();
});

test("contact success, route validation, and UI failure stay local", async ({ page, request }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send Message/ }).click();
  await expect(page.getByLabel("Full Name")).toBeFocused();

  await page.route("**/api/contact", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    await route.continue();
  }, { times: 1 });
  await fillContact(page);
  const successSubmission = page.getByRole("button", { name: /Send Message/ }).click();
  await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
  await successSubmission;
  await expect(page.getByRole("button", { name: /Sent!/ })).toBeVisible();

  const validation = await request.post("/api/contact", { data: {} });
  expect(validation.status()).toBe(400);
  expect(await validation.json()).toEqual({ error: "All fields are required" });

  await page.reload();
  await page.route("**/api/contact", (route) => route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "Internal Server Error" }) }));
  expectedConsoleErrors.set(page, ["Failed to load resource: the server responded with a status of 500"]);
  await fillContact(page);
  const dialogHandled = page.waitForEvent("dialog").then(async (alert) => {
    expect(alert.message()).toBe("Failed to send message. Please try again.");
    await alert.accept();
  });
  await Promise.all([
    dialogHandled,
    page.getByRole("button", { name: /Send Message/ }).click(),
  ]);
  await expect(page.getByRole("button", { name: /Send Message/ })).toBeEnabled();
});

async function fillContact(page: Page) {
  await page.getByLabel("Full Name").fill("Avery Example");
  await page.getByLabel("Email Address").fill("avery@example.test");
  await page.getByLabel("Subject").fill("Fixture question");
  await page.getByLabel("Message").fill("This is an invented automated-test message.");
}
