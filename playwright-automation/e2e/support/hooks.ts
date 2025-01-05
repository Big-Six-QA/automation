import { Before, After, Status } from '@cucumber/cucumber';
import { World } from './world';

Before(async function(this: World) {
  try {
    await this.openBrowser();
    console.log(`Worker ${this.getWorkerId()} starting scenario in context: ${this.getContextId()}`);
    
    this.logStep(`Starting browser for worker ${this.getWorkerId()}`);
    
    await this.page.goto('https://www.saucedemo.com/', {
      waitUntil: 'networkidle',
      timeout: this.parameters.timeout ?? 30000
    });
  } catch (error) {
    console.error(`Worker ${this.getWorkerId()} setup failed for context ${this.getContextId()}:`, error);
    await this.attachScreenshot('Error Screenshot');
    throw error;
  }
});

After(async function(this: World, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED) {
      await this.attachScreenshot('Failure Screenshot');
    }
    
    console.log(`Worker ${this.getWorkerId()} completing scenario in context: ${this.getContextId()}`);
    this.logStep(`Closing browser for worker ${this.getWorkerId()}`);
    
    await this.closeBrowser();
  } catch (error) {
    console.error(`Worker ${this.getWorkerId()} teardown failed for context ${this.getContextId()}:`, error);
    throw error;
  }
});
