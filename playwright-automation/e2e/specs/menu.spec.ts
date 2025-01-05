import { test, expect } from '@playwright/test';

test.describe('Sidebar Menu Functionality Tests', () => {
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

  // Test Case 1: Logout Functionality
  test('Logout functionality', async ({ page }) => {
    // Open the sidebar menu
    await page.click('#react-burger-menu-btn');

    // Click the "Logout" button
    await page.click('#logout_sidebar_link');

    // Verify user is redirected to the login page
    await expect(page).toHaveURL(baseURL);
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // Test Case 2: Verify "Reset App State" Functionality
  test('Verify "Reset App State" functionality', async ({ page }) => {
    // Add a product to the cart
    await page.click('.inventory_item button');

    // Open the sidebar menu
    await page.click('#react-burger-menu-btn');

    // Click the "Reset App State" button
    await page.click('#reset_sidebar_link');

    // Verify the cart is reset
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  });

  // Test Case 3: Verify Sidebar Menu Opens and Closes Properly
  test('Verify sidebar menu opens and closes properly', async ({ page }) => {
    // Open the sidebar menu
    await page.click('#react-burger-menu-btn');

    // Verify the sidebar menu is visible
    const sidebar = await page.locator('.bm-menu');
    await expect(sidebar).toBeVisible();

    // Close the sidebar menu
    await page.click('#react-burger-cross-btn');

    // Verify the sidebar menu is no longer visible
    await expect(sidebar).not.toBeVisible();
  });

  // Test Case 4: Verify Navigation to "All Items" from Sidebar Menu
  test('Verify navigation to "All Items" from sidebar menu', async ({ page }) => {
    // Open the sidebar menu
    await page.click('#react-burger-menu-btn');

    // Click on "All Items"
    await page.click('#inventory_sidebar_link');

    // Verify user is redirected to the inventory page
    await expect(page).toHaveURL(`${baseURL}inventory.html`);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
