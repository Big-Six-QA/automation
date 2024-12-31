import { test, expect } from "@playwright/test";

const UI_URL = "https://mern-hotel-booking-app-1wib.onrender.com";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("tharaka@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("SignIn successful !")).toBeVisible();
  // await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  // await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  // await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should not allow the user to sign in with incorrect credetials", async ({
  page,
}) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("tharaka@gmail.com");
  await page.locator("[name=password]").fill("12346");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Invalid Credentials")).toBeVisible();
});


test("should show the navigation bar after signIn ", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("tharaka@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("SignIn successful !")).toBeVisible();


  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});