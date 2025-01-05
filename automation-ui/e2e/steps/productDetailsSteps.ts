import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { World } from '../support/world';

const baseURL = 'https://www.saucedemo.com/';
const username = 'standard_user';
const password = 'secret_sauce';

Given('I am logged in as a standard user for productDetails', async function (this: World) {
  await this.page.goto(baseURL);
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', password);
  await this.page.click('#login-button');
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);
});

When('I open the product details page for the first product', async function (this: World) {
  this.productName = (await this.page.locator('.inventory_item_name').first().textContent()) || '';
  this.productDescription = (await this.page.locator('.inventory_item_desc').first().textContent()) || '';
  this.productPrice = (await this.page.locator('.inventory_item_price').first().textContent()) || '';
  await this.page.click('.inventory_item a');
});

Then('the product name, description, and price should match the inventory page', async function (this: World) {
  const detailName = await this.page.locator('.inventory_details_name').textContent();
  const detailDescription = await this.page.locator('.inventory_details_desc').textContent();
  const detailPrice = await this.page.locator('.inventory_details_price').textContent();
  expect(detailName).toBe(this.productName);
  expect(detailDescription).toBe(this.productDescription);
  expect(detailPrice).toBe(this.productPrice);
});

When('I click the "Back to Products" button', async function (this: World) {
  await this.page.click('#back-to-products');
});

Then('I should be redirected to the inventory page in productDetails', async function (this: World) {
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);
});

When('I click the "Add to Cart" button', async function (this: World) {
  await this.page.click('.btn_inventory');
});

Then('the cart badge should display 1 item for productDetails', async function (this: World) {
  const cartBadge = this.page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
});

When('I click the cart icon', async function (this: World) {
  await this.page.click('.shopping_cart_link');
});

Then('I should be redirected to the cart page', async function (this: World) {
  await expect(this.page).toHaveURL(`${baseURL}cart.html`);
});

Then('the product should be visible in the cart', async function (this: World) {
  const cartItemName = await this.page.locator('.inventory_item_name').textContent();
  expect(cartItemName).not.toBeNull();
});
