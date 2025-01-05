import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { World } from "../support/world";

const baseURL = "https://www.saucedemo.com/";
const username = "standard_user";
const password = "secret_sauce";

Given("I am logged in as a standard user with a product in the cart for checkout", async function (this: World) {
  await this.page.goto(baseURL);
  await this.page.fill("#user-name", username);
  await this.page.fill("#password", password);
  await this.page.click("#login-button");
  await expect(this.page).toHaveURL(`${baseURL}inventory.html`);

  // Add a product to the cart
  await this.page.click(".inventory_item button");
  await this.page.click(".shopping_cart_link");
  await expect(this.page).toHaveURL(`${baseURL}cart.html`);
});

When("I proceed to checkout with valid information", async function (this: World) {
  await this.page.click("#checkout");
  await this.page.fill("#first-name", "John");
  await this.page.fill("#last-name", "Doe");
  await this.page.fill("#postal-code", "12345");
  await this.page.click("#continue");
  await this.page.click("#finish");
});

Then("I should see the order completion message", async function (this: World) {
  const successMessage = await this.page.locator(".complete-header");
  await expect(successMessage).toHaveText("Thank you for your order!");
});

When("I proceed to checkout without providing required information", async function (this: World) {
  await this.page.click("#checkout");
  await this.page.click("#continue");
});

Then("I should see error messages for missing fields", async function (this: World) {
  const errorMessage = await this.page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Error: First Name is required");
});

When("I proceed to checkout and reach the summary page", async function (this: World) {
  await this.page.click("#checkout");
  await this.page.fill("#first-name", "John");
  await this.page.fill("#last-name", "Doe");
  await this.page.fill("#postal-code", "12345");
  await this.page.click("#continue");
});

Then("the summary should display the correct product name and price", async function (this: World) {
  const productName = await this.page.locator(".inventory_item_name").textContent();
  const productPrice = await this.page.locator(".inventory_item_price").textContent();
  expect(productName).toBe("Sauce Labs Backpack"); // Replace with the actual product name
  expect(productPrice).toBe("$29.99"); // Replace with the actual price
});

When("I proceed to checkout and remove a product from the overview page", async function (this: World) {
  await this.page.click("#checkout");
  await this.page.fill("#first-name", "John");
  await this.page.fill("#last-name", "Doe");
  await this.page.fill("#postal-code", "12345");
  await this.page.click("#continue");
  await this.page.click(".cart_button"); // Adjust selector for the "Remove" button
});

Then("the product should no longer be listed in the summary", async function (this: World) {
  const productCount = await this.page.locator(".inventory_item_name").count();
  expect(productCount).toBe(0);
});
