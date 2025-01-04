import { test, expect } from '@playwright/test';

test.describe('Product Details Page Tests', () => {
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

  // Test Case 1: Verify Product Details Page
  test('Verify product details page displays correct product information', async ({ page }) => {
    // Get the name, description, and price of the first product
    const productName = await page.locator('.inventory_item_name').first().textContent();
    const productDescription = await page.locator('.inventory_item_desc').first().textContent();
    const productPrice = await page.locator('.inventory_item_price').first().textContent();

    // Click the first product to open the details page
    await page.click('.inventory_item a');

    // Verify product details on the details page
    const detailName = await page.locator('.inventory_details_name').textContent();
    const detailDescription = await page.locator('.inventory_details_desc').textContent();
    const detailPrice = await page.locator('.inventory_details_price').textContent();
    expect(detailName).toBe(productName);
    expect(detailDescription).toBe(productDescription);
    expect(detailPrice).toBe(productPrice);
  });

  // Test Case 2: Test "Back to Products" Button from Product Details
  test('Verify "Back to Products" button navigates to inventory page', async ({ page }) => {
    // Open product details page
    await page.click('.inventory_item a');

    // Click the "Back to Products" button
    await page.click('#back-to-products');

    // Verify that the user is redirected to the inventory page
    await expect(page).toHaveURL(`${baseURL}inventory.html`);
  });

  // Test Case 3: Verify Add to Cart Button on Product Details Page
  test('Verify "Add to Cart" button on product details page', async ({ page }) => {
    // Open product details page
    await page.click('.inventory_item a');

    // Click the "Add to Cart" button
    await page.click('.btn_inventory');

    // Verify cart badge shows 1 item
    const cartBadge =  page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  //Test Case 4: Verify Navigation to Cart from Product Details Page
  test('Verify navigation to cart from product details page', async ({ page }) => {
    // Open product details page
    await page.click('.inventory_item a');
  
    // Click the "Add to Cart" button
    await page.click('.btn_inventory');
  
    // Click on the cart icon to navigate to the cart page
    await page.click('.shopping_cart_link');
  
    // Verify the cart page is loaded
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  
    // Verify the product added is present in the cart
    const cartItemName = await page.locator('.inventory_item_name').textContent();
    expect(cartItemName).not.toBeNull(); // Ensure a product is in the cart
  });
  
});
