import { Before, After } from '@cucumber/cucumber';
import { World } from './world';

Before(async function (this: World) {
  await this.openBrowser();
});

After(async function (this: World) {
  await this.closeBrowser();
});
