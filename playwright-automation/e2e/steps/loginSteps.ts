import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { World } from '../support/world';

// Set timeout for all steps
setDefaultTimeout(60000);

const baseURL = 'https://www.saucedemo.com/';

Given('I am on the login page', async function (this: World) {
  await this.page.goto(baseURL);
});

When('I enter valid username and password', async function (this: World) {
  await this.page.fill('#user-name', 'standard_user');
  await this.page.fill('#password', 'secret_sauce');
});

When('I enter invalid username and password', async function (this: World) {
  await this.page.fill('#user-name', 'invalid_user');
  await this.page.fill('#password', 'invalid_password');
});

When('I enter locked-out username and password', async function (this: World) {
  try {
    await this.page.waitForSelector('#user-name');
    await this.page.fill('#user-name', 'locked_out_user');
    await this.page.waitForSelector('#password');
    await this.page.fill('#password', 'secret_sauce');
  } catch (error) {
    console.error('Error in locked-out user login:', error);
    throw error;
  }
});

When('I click the login button', async function (this: World) {
  await this.page.waitForSelector('#login-button');
  await this.page.click('#login-button');
});

Then('I should be redirected to the inventory page after login', async function (this: World) {
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);
});

Then('I should see an error message saying {string}', async function (this: World, errorMessage: string) {
  const errorLocator = this.page.locator('[data-test="error"]');
  await expect(errorLocator).toBeVisible({ timeout: 10000 });
  await expect(errorLocator).toHaveText(errorMessage);
});

When('I click the login button without entering any credentials', async function (this: World) {
  await this.page.waitForSelector('#login-button');
  await this.page.click('#login-button');
});

When('I enter a valid username but no password', async function (this: World) {
  await this.page.waitForSelector('#user-name');
  await this.page.fill('#user-name', 'standard_user');
});
