import { test, expect } from "@playwright/test";

const UI_URL = "https://mern-hotel-booking-app-1wib.onrender.com"

test("should allow the user to sign up with correct values", async ({ page }) => {
    const testEmail = `test_register_${
      Math.floor(Math.random() * 9000) + 10000
    }@test.com`;
    await page.goto(UI_URL);
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Create an acount here" }).click();
  
    await expect(
      page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();
  
    await page.locator("[name=firstName]").fill("testFirstName");
    await page.locator("[name=lastName]").fill("testLastName");
    await page.locator("[name=email]").fill(testEmail);
    await page.locator("[name=password]").fill("12345");
    await page.locator("[name=confirmPassword]").fill("12345");
  
    await page.getByRole("button", { name: "Create Account" }).click();
  
    await expect(page.getByText("registration success")).toBeVisible();
  
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
  });

test("should not allow  user to sign up existing email", async ({ page }) => {
   
    await page.goto(UI_URL);
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Create an acount here" }).click();
  
    await expect(
      page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();
  
    await page.locator("[name=firstName]").fill("testFirstName");
    await page.locator("[name=lastName]").fill("testLastName");
    await page.locator("[name=email]").fill("tharaka@gmail.com");
    await page.locator("[name=password]").fill("12345");
    await page.locator("[name=confirmPassword]").fill("12345");
  
    await page.getByRole("button", { name: "Create Account" }).click();
  
    await expect(page.getByText("User alredy exists")).toBeVisible();
 
  });