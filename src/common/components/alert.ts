import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { Page } from 'playwright';

export class Alert {
  async clickButtonConfirm(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.ALERT_BUTTON_CONFIRM);
    await page.click(DYNAMIC_ELEMENT.ALERT_BUTTON_CONFIRM);
    await page.waitForLoadState();
  }
}
