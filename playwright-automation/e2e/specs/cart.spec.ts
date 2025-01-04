import { test, expect } from '@playwright/test';

test.describe('Cart Functionality Tests', () => {
  const baseURL = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  // Helper function to log in before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
    await expect(page).toHaveURL(`${baseURL}inventory.html`);
  });

  // Test Case 1: Add Product to Cart
  test('Add product to cart', async ({ page }) => {
    // Add the first product to the cart
    await page.click('.inventory_item button');

    // Verify the cart badge shows 1 item
    const cartBadge =  page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  // Test Case 2: Remove Product from Cart
  test('Remove product from cart', async ({ page }) => {
    // Add the first product to the cart
    await page.click('.inventory_item button');

    // Go to the cart page
    await page.click('.shopping_cart_link');

    // Remove the product from the cart
    await page.click('.cart_button');

    // Verify the cart badge is no longer visible
    const cartBadge =  page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  });

  // Test Case 3: Test Cart Badge Count Increases on Adding Products
  test('Cart badge count increases on adding products', async ({ page }) => {
    // Add multiple products to the cart
    const addButtons = await page.$$('.inventory_item button');
    await addButtons[0].click();
    await addButtons[1].click();

    // Verify the cart badge shows the correct count
    const cartBadge =  page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');
  });

  // Test Case 4: Test Cart Persists When Navigating Back to Inventory
  test('Cart persists when navigating back to inventory', async ({ page }) => {
    // Add a product to the cart
    await page.click('.inventory_item button');

    // Go to the cart page
    await page.click('.shopping_cart_link');

    // Navigate back to the inventory page
    await page.click('#continue-shopping');

    // Verify the cart badge still shows 1 item
    const cartBadge =  page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });
});
