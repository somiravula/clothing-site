import { expect, test } from "@playwright/test";

const USER_NAME = "Playwright User";
const USER_PASSWORD = "Playwright@123";

test("main flow: login -> select product -> select size -> add to bag -> cart contains product", async ({
  page,
}) => {
  const email = `playwright.${Date.now()}@example.com`;

  // Protected routes should redirect to login.
  await page.goto("/products");
  await expect(page).toHaveURL(/\/login/);

  // Sign up with a unique account for deterministic flow.
  await page.getByRole("button", { name: "Create an account" }).click();
  await page.getByPlaceholder("Alex Stella").fill(USER_NAME);
  await page.getByPlaceholder("name@company.com").fill(email);
  await page.getByPlaceholder("••••••••").fill(USER_PASSWORD);

  await Promise.all([
    page.waitForURL(/\/products/, { timeout: 15000 }),
    page.getByRole("button", { name: "Create Account" }).first().click(),
  ]);
  await expect(page).toHaveURL(/\/products/);

  // Open a product details page.
  await page
    .getByRole("link", { name: "Classic Heavyweight Tee" })
    .first()
    .click();
  await expect(page).toHaveURL(/\/products\//);

  // Select size and add to bag.
  const selectedSize = "M";
  await page.getByRole("button", { name: selectedSize }).first().click();
  await page.getByRole("button", { name: /Add to Bag/i }).click();

  // Go to cart and verify product presence.
  await expect(page.getByRole("link", { name: "Open cart" })).toContainText("1");
  await Promise.all([
    page.waitForURL(/\/cart$/, { timeout: 15000 }),
    page.getByRole("link", { name: "Open cart" }).click(),
  ]);
  const cartMain = page.locator("main");
  await expect(cartMain.getByRole("heading", { name: /Bag/i })).toBeVisible();
  await expect(
    cartMain.getByRole("heading", { name: "Classic Heavyweight Tee" }),
  ).toBeVisible();
  await expect(cartMain.getByText(`Size: ${selectedSize}`, { exact: true })).toBeVisible();
});
