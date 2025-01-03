import { test, expect } from '@playwright/test';

test.describe('Inventory Page Tests', () => {
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

  test('Verify sorting products by price (Low to High)', async ({ page }) => {
    // Sort products by "Low to High"
    await page.selectOption('.product_sort_container', 'lohi');

    // Fetch all prices and validate sorting
    const prices = await page.$$eval('.inventory_item_price', elements =>
      elements.map(el => parseFloat(el.textContent!.replace('$', '')))
    );
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('Verify sorting products by name (A to Z)', async ({ page }) => {
    // Sort products by "A to Z"
    await page.selectOption('.product_sort_container', 'az');

    // Fetch all product names and validate sorting
    const productNames = await page.$$eval('.inventory_item_name', elements =>
      elements.map(el => el.textContent!.trim())
    );
    expect(productNames).toEqual([...productNames].sort());
  });

  test('Verify sorting products by name (Z to A)', async ({ page }) => {
    // Sort products by "Z to A"
    await page.selectOption('.product_sort_container', 'za');

    // Fetch all product names and validate sorting
    const productNames = await page.$$eval('.inventory_item_name', elements =>
      elements.map(el => el.textContent!.trim())
    );
    expect(productNames).toEqual([...productNames].sort().reverse());
  });

  test('Test product prices match between inventory and details page', async ({ page }) => {
    // Get the price and name of the first product
    const productPrice = await page.locator('.inventory_item_price').first().textContent();
    const productName = await page.locator('.inventory_item_name').first().textContent();

    // Click the first product to open the details page
    await page.click('.inventory_item a');

    // Verify the price and name match between inventory and details page
    const detailPrice = await page.locator('.inventory_details_price').textContent();
    const detailName = await page.locator('.inventory_details_name').textContent();
    expect(detailPrice).toBe(productPrice);
    expect(detailName).toBe(productName);
  });
});
