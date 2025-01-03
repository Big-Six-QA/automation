import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { World } from "../support/world";

const baseURL = "https://www.saucedemo.com/";
const username = "standard_user";
const password = "secret_sauce";

Given("I am logged in as a standard user for cart", async function (this: World) {
  await this.page.goto(baseURL);
  await this.page.fill("#user-name", username);
  await this.page.fill("#password", password);
  await this.page.click("#login-button");
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);
});

Given("I am logged in as a standard user for cart with a product in the cart", async function (this: World) {
  await this.page.goto(baseURL);
  await this.page.fill("#user-name", username);
  await this.page.fill("#password", password);
  await this.page.click("#login-button");
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);

  // Add a product to the cart
  await this.page.click(".inventory_item button");
});

When("I add a product to the cart", async function (this: World) {
  await this.page.click(".inventory_item button");
});

Then("the cart badge should display 1 item", async function (this: World) {
  const cartBadge = this.page.locator(".shopping_cart_badge");
  await expect(cartBadge).toHaveText("1");
});

When("I remove the product from the cart", async function (this: World) {
  await this.page.click(".shopping_cart_link");
  await this.page.click(".cart_button");
});

Then("the cart badge should no longer be visible", async function (this: World) {
  const cartBadge = this.page.locator(".shopping_cart_badge");
  await expect(cartBadge).not.toBeVisible();
});

When("I add multiple products to the cart", async function (this: World) {
  const addButtons = await this.page.$$(".inventory_item button");
  await addButtons[0].click();
  await addButtons[1].click();
});

Then("the cart badge should display the correct count", async function (this: World) {
  const cartBadge = this.page.locator(".shopping_cart_badge");
  await expect(cartBadge).toHaveText("2");
});

When("I navigate back to the inventory page", async function (this: World) {
  await this.page.click(".shopping_cart_link");
  await this.page.click("#continue-shopping");
});

Then("the cart badge should still display 1 item", async function (this: World) {
  const cartBadge = this.page.locator(".shopping_cart_badge");
  await expect(cartBadge).toHaveText("1");
});
