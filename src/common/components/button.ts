import { Loading } from './loading';
import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { Page } from 'playwright';
import * as expect from 'expect';

const loading = new Loading();

export class Button {
  async clickButtonByName(page: Page, buttonName: string, prefix = '') {
    await page.click(DYNAMIC_ELEMENT.BUTTON_NAME(buttonName, prefix));
    await page.waitForLoadState();
    await loading.waitLoadingHidden(page);
  }
  async clickButtonByTitle(page: Page, buttonTitle: string, prefix = '') {
    await page.click(DYNAMIC_ELEMENT.BUTTON_TITLE(buttonTitle, prefix));
    await page.waitForLoadState();
    await loading.waitLoadingHidden(page);
  }

  async checkButtonDisableByTitle(page: Page, buttonTitle: string, prefix = '') {
    await page.isDisabled(DYNAMIC_ELEMENT.BUTTON_TITLE(buttonTitle, prefix));
  }

  async checkButtonHiddenByTitle(page: Page, buttonTitle: string, prefix = '') {
    const isButtonHidden = await page.isHidden(DYNAMIC_ELEMENT.BUTTON_TITLE(buttonTitle, prefix));
    expect(isButtonHidden).toEqual(true);
  }

  async checkButtonEnableByTitle(page: Page, buttonTitle: string, prefix = '') {
    await page.isEnabled(DYNAMIC_ELEMENT.BUTTON_TITLE(buttonTitle, prefix));
  }
}
