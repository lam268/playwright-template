import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { Page } from 'playwright';

export class Icon {
  async clickIconByClass(page: Page, iconClass: string, prefix = '') {
    await page.click(DYNAMIC_ELEMENT.ICON_CLASS(iconClass, prefix));
    await page.waitForLoadState();
  }
  async hoverIconByClassAndCheckToolTip(
    page: Page,
    tooltip: string,
    iconClass: string,
    prefix = '',
  ) {
    await page.hover(DYNAMIC_ELEMENT.ICON_CLASS(iconClass, prefix));
    // tooltip is displayed
    await page.isEnabled(DYNAMIC_ELEMENT.TOOLTIP(tooltip));
  }
}
