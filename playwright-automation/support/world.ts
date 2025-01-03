import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';

export class World {
  browser!: Browser;
  page!: Page;
  shared: { [key: string]: any } = {};
  productName?: string;
  productDescription?: string;
  productPrice?: string;

  async openBrowser() {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(World);
