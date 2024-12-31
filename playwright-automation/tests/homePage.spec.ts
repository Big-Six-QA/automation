import { test, expect } from "@playwright/test";

const UI_URL = "https://mern-hotel-booking-app-1wib.onrender.com";

test("should display homepage Header and Footer", async ({ page }) => {
  await page.goto(UI_URL);
  // Header
  await expect(
    page.getByRole("link", {
      name: /mernholidays\.com/i,
    })
  ).toBeVisible();

  await expect(
    page.getByRole("link", {
      name: /sign in/i,
    })
  ).toBeVisible();

  // Footer

  await expect(page.getByText(/privacy policy/i)).toBeVisible();
  await expect(page.getByText(/terms of service/i)).toBeVisible();
});
test("should display homepage Body ", async ({ page }) => {
  await page.goto(UI_URL);
  // Search Bar
  await expect(page.getByPlaceholder("where are you going ?")).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: /search/i,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: /clear/i,
    })
  ).toBeVisible();
});
