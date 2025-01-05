import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { World } from '../support/world';

const baseURL = 'https://www.saucedemo.com/';
const username = 'standard_user';
const password = 'secret_sauce';

Given('I am logged in as a standard user', async function (this: World) {
  await this.page.goto(baseURL);
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', password);
  await this.page.click('#login-button');
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);
});

When('I open the sidebar menu', async function (this: World) {
  await this.page.click('#react-burger-menu-btn');
});

When('I click the "Logout" button', async function (this: World) {
  await this.page.click('#logout_sidebar_link');
});

Then('I should be redirected to the login page', async function (this: World) {
  await expect(this.page).toHaveURL(baseURL);
  await expect(this.page.locator('#login-button')).toBeVisible();
});

When('I add a product to the cart for menu', async function (this: World) {
  await this.page.click('.inventory_item button');
});

When('I click the "Reset App State" button', async function (this: World) {
  await this.page.click('#reset_sidebar_link');
});

Then('the cart should be reset', async function (this: World) {
  const cartBadge = this.page.locator('.shopping_cart_badge');
  await expect(cartBadge).not.toBeVisible();
});

Then('the sidebar menu should be visible', async function (this: World) {
  const sidebar = this.page.locator('.bm-menu');
  await expect(sidebar).toBeVisible();
});

When('I close the sidebar menu', async function (this: World) {
  await this.page.click('#react-burger-cross-btn');
});

Then('the sidebar menu should not be visible', async function (this: World) {
  const sidebar = this.page.locator('.bm-menu');
  await expect(sidebar).not.toBeVisible();
});

When('I click on "All Items"', async function (this: World) {
  await this.page.click('#inventory_sidebar_link');
});

Then('I should be redirected to the inventory page', async function (this: World) {
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);
  await expect(this.page.locator('.inventory_list')).toBeVisible();
});
