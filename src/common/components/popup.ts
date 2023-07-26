import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { TIME_OUT } from '../constants';
import * as expect from 'expect';
import { Page } from 'playwright';

export class Popup {
  async checkDisplayedPopupByTitle(page: Page, title) {
    await page.isEnabled(DYNAMIC_ELEMENT.POPUP_TITLE(title));
  }
  async checkHiddenPopupByTitle(page: Page, title) {
    await page.isHidden(DYNAMIC_ELEMENT.POPUP_TITLE(title));
  }
  async checkPopupMessage(page: Page, message: string) {
    const popupMessage = await page.innerText(DYNAMIC_ELEMENT.POPUP_MESSAGE_ERROR);
    expect(popupMessage.trim()).toEqual(message);
  }

  async checkPopupAlertMessage(page: Page, message: string) {
    await page.waitForTimeout(TIME_OUT);
    await page.waitForSelector(DYNAMIC_ELEMENT.POPUP_ALERT);
    const popupAlertMessage = await page.innerText(DYNAMIC_ELEMENT.POPUP_ALERT);
    expect(popupAlertMessage.trim()).toEqual(message);
  }

  async checkDisplayedTitle(page: Page, title) {
    await page.isEnabled(DYNAMIC_ELEMENT.HOTEL_NAME(title));
  }
}
