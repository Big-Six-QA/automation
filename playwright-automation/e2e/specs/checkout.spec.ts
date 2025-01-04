import { test, expect } from "@playwright/test";

test.describe("Checkout Functionality Tests", () => {
  const baseURL = "https://www.saucedemo.com/";
  const username = "standard_user";
  const password = "secret_sauce";

  // Helper function to log in before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.fill("#user-name", username);
    await page.fill("#password", password);
    await page.click("#login-button");
    await expect(page).toHaveURL(`${baseURL}inventory.html`);

    // Add a product to the cart to prepare for checkout
    await page.click(".inventory_item button");
    await page.click(".shopping_cart_link");
    await expect(page).toHaveURL(`${baseURL}cart.html`);
  });

  // Test Case 1: Checkout Workflow
  test("Complete the checkout workflow successfully", async ({ page }) => {
    // Proceed to checkout
    await page.click("#checkout");
    await page.fill("#first-name", "John");
    await page.fill("#last-name", "Doe");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");

    // Verify checkout overview page
    const summaryHeader = page.locator(".summary_info");
    await expect(summaryHeader).toBeVisible();

    // Finish checkout
    await page.click("#finish");

    // Verify the success message
    const successMessage = page.locator(".complete-header");
    await expect(successMessage).toHaveText("Thank you for your order!");
  });

  // Test Case 2: Attempt Checkout with Missing Information
  test("Attempt checkout with missing information", async ({ page }) => {
    // Proceed to checkout
    await page.click("#checkout");

    // Leave fields empty and try to continue
    await page.click("#continue");

    // Verify error message for missing information
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("Error: First Name is required");

    // Fill only the first name and try again
    await page.fill("#first-name", "John");
    await page.click("#continue");

    await expect(errorMessage).toHaveText("Error: Last Name is required");
  });

  // Test Case 3: Verify Checkout Summary Contains Correct Product Details
  test("Verify checkout summary contains correct product details", async ({
    page,
  }) => {
    // Proceed to checkout
    await page.click("#checkout");
    await page.fill("#first-name", "John");
    await page.fill("#last-name", "Doe");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");

    // Verify product details in the summary
    const productName = await page
      .locator(".inventory_item_name")
      .textContent();
    const productPrice = await page.locator(".inventory_item_price") .textContent();

    // Replace with the actual product name
     expect(productName).toBe("Sauce Labs Backpack");
    // Replace with the actual price
    expect(productPrice).toBe("$29.99");
  });

  // Test Case 4: Verify Removing a Product from Checkout Overview
  test("Verify removing a product from the checkout overview page", async ({
    page,
  }) => {
    // Proceed to checkout
    await page.click("#checkout");
    await page.fill("#first-name", "John");
    await page.fill("#last-name", "Doe");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");

    // Verify product is listed in the checkout overview
    const productName = await page
      .locator(".inventory_item_name")
      .textContent();
    expect(productName).toBe("Sauce Labs Backpack"); // Replace with the actual product name

    // Remove the product from the checkout overview
    await page.click(".cart_button"); // Adjust selector if the button is different on the overview page

    // Verify the product is no longer listed
    const productCount = await page.locator(".inventory_item_name").count();
    expect(productCount).toBe(0); // No products should be listed after removal
  });
});
