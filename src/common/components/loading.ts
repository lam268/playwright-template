import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { Page } from 'playwright';

export class Loading {
  async waitLoadingHidden(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.LOADING, { state: 'hidden' });
  }

  async waitLoadingEnable(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.LOADING);
  }
}
