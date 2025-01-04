import { test, expect } from '@playwright/test';

test.describe('Login Functionality Tests', () => {
  const baseURL = 'https://www.saucedemo.com/';

  // Test Case 1: Valid Login
  test('Valid login', async ({ page }) => {
    await page.goto(baseURL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify user is redirected to the inventory page
    await expect(page).toHaveURL(`${baseURL}inventory.html`);
  });

  // Test Case 2: Invalid Login
  test('Invalid login', async ({ page }) => {
    await page.goto(baseURL);
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');

    // Verify error message is displayed
    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  // Test Case 3: Locked-Out User Login
  test('Locked-out user login', async ({ page }) => {
    await page.goto(baseURL);
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify error message for locked-out user
    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  // Test Case 4: Verify Error Messages for Invalid Credentials
  test('Verify error messages for invalid credentials', async ({ page }) => {
    await page.goto(baseURL);

    // Test with empty username and password
    await page.click('#login-button');
    let errorMessage =  page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username is required');

    // Test with empty password
    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');
    errorMessage =  page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Password is required');
  });
});
