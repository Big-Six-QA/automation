import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';
import { AllureRuntime } from 'allure-js-commons';

export class World extends CucumberWorld {
  browser!: Browser;
  page!: Page;
  shared: { [key: string]: any } = {};
  productName?: string;
  productDescription?: string;
  productPrice?: string;
  parameters: { headless?: boolean; timeout?: number; workers?: number } = {};
  baseURL = 'https://www.saucedemo.com';
  private contextId: string;
  private workerId: number;
  private allure: AllureRuntime;

  constructor(options: any) {
    super(options);
    this.contextId = `world-${Math.random().toString(36).substr(2, 9)}`;
    this.workerId = parseInt(process.env.CUCUMBER_WORKER_ID || '0', 10);
    this.allure = new AllureRuntime({ resultsDir: './allure-results' });
  }

  async openBrowser() {
    try {
      const headless = this.parameters.headless ?? true;
      const timeout = this.parameters.timeout ?? 30000;

      this.browser = await chromium.launch({ 
        headless,
        timeout,
      });
      const context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 }
      });
      this.page = await context.newPage();
      
      context.setDefaultTimeout(timeout);
      context.setDefaultNavigationTimeout(timeout);
      
      await this.page.evaluate((contextId) => {
        window.name = contextId;
      }, this.contextId);
      
    } catch (error) {
      console.error(`Failed to open browser for worker ${this.workerId}, context ${this.contextId}:`, error);
      throw error;
    }
  }

  async closeBrowser() {
    try {
      if (this.browser) {
        await this.browser.close();
      }
    } catch (error) {
      console.error(`Failed to close browser for worker ${this.workerId}, context ${this.contextId}:`, error);
      throw error;
    }
  }

  getContextId() {
    return this.contextId;
  }

  getWorkerId() {
    return this.workerId;
  }

  async attachScreenshot(name: string) {
    const screenshot = await this.page.screenshot();
    this.allure.addAttachment(name, Buffer.from(screenshot), 'image/png');
  }

  logStep(message: string) {
    this.allure.startStep(message);
    this.allure.endStep();
  }
}

setWorldConstructor(World);
