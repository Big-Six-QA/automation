import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { World } from '../support/world';

const baseURL = 'https://www.saucedemo.com/';
const username = 'standard_user';
const password = 'secret_sauce';

Given('I am logged in as a standard user for inventory', async function (this: World) {
  await this.page.goto(baseURL);
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', password);
  await this.page.click('#login-button');
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);
});

When('I sort products by {string}', async function (this: World, sortOption: string) {
  const optionMap: { [key: string]: string } = {
    'Price (Low to High)': 'lohi',
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za',
  };
  await this.page.selectOption('.product_sort_container', optionMap[sortOption]);
});

Then('the products should be displayed in ascending order of price', async function (this: World) {
  const prices = await this.page.$$eval('.inventory_item_price', elements =>
    elements.map(el => parseFloat(el.textContent!.replace('$', '')))
  );
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

Then('the products should be displayed in alphabetical order', async function (this: World) {
  const productNames = await this.page.$$eval('.inventory_item_name', elements =>
    elements.map(el => el.textContent!.trim())
  );
  expect(productNames).toEqual([...productNames].sort());
});

Then('the products should be displayed in reverse alphabetical order', async function (this: World) {
  const productNames = await this.page.$$eval('.inventory_item_name', elements =>
    elements.map(el => el.textContent!.trim())
  );
  expect(productNames).toEqual([...productNames].sort().reverse());
});

When('I check the price and name of the first product', async function (this: World) {
  this.shared.productPrice = await this.page.locator('.inventory_item_price').first().textContent();
  this.shared.productName = await this.page.locator('.inventory_item_name').first().textContent();
});

When('I navigate to the product\'s details page', async function (this: World) {
  await this.page.click('.inventory_item a');
});

Then('the price and name on the details page should match those on the inventory page', async function (this: World) {
  const detailPrice = await this.page.locator('.inventory_details_price').textContent();
  const detailName = await this.page.locator('.inventory_details_name').textContent();
  expect(detailPrice).toBe(this.shared.productPrice);
  expect(detailName).toBe(this.shared.productName);
});
