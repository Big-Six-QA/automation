import { World, setWorldConstructor } from '@cucumber/cucumber';
import { Page, Browser, chromium } from '@playwright/test';

export class CustomWorld extends World {
  private page!: Page;
  private browser!: Browser;

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  getPage(): Page {
    return this.page;
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld); 