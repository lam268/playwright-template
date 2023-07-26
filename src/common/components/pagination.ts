import { Textbox } from './textbox';
import { Loading } from './loading';
import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { TIME_OUT } from '../constants';
import { Page } from 'playwright';
import * as expect from 'expect';

const textbox = new Textbox();
const loading = new Loading();

export class Pagination {
  async checkPaginationHidden(page: Page) {
    await page.waitForTimeout(TIME_OUT);
    await page.isHidden(DYNAMIC_ELEMENT.PAGINATION);
  }

  async checkPageMoreHidden(page: Page, character: string) {
    await page.waitForTimeout(TIME_OUT);
    await page.isHidden(DYNAMIC_ELEMENT.PAGE_MORE(character));
  }

  async checkPageMoreEnable(page: Page, character: string) {
    await page.waitForTimeout(TIME_OUT);
    await page.isEnabled(DYNAMIC_ELEMENT.PAGE_MORE(character));
  }

  async checkPageGoButtonHidden(page: Page) {
    await page.waitForTimeout(TIME_OUT);
    await page.isHidden(DYNAMIC_ELEMENT.PAGE_GO_BUTTON);
  }

  async checkPageGoButtonEnable(page: Page) {
    await page.waitForTimeout(TIME_OUT);
    await page.isEnabled(DYNAMIC_ELEMENT.PAGE_GO_BUTTON);
  }

  async checkPageGoInputHidden(page: Page) {
    await page.waitForTimeout(TIME_OUT);
    await page.isHidden(DYNAMIC_ELEMENT.PAGE_GO_INPUT);
  }

  async checkPageGoInputEnable(page: Page) {
    await page.waitForTimeout(TIME_OUT);
    await page.isEnabled(DYNAMIC_ELEMENT.PAGE_GO_INPUT);
  }

  async checkPageNumberGoInput(page: Page, pageNumber: string) {
    const inputValue = await page.inputValue(DYNAMIC_ELEMENT.PAGE_GO_INPUT);
    expect(inputValue).toEqual(pageNumber);
  }

  async clickPageGoButton(page: Page) {
    await page.click(DYNAMIC_ELEMENT.PAGE_GO_BUTTON);
    await page.waitForLoadState();
    await loading.waitLoadingHidden(page);
  }

  async sendKeysPageGoInput(page: Page, pageNumber: string) {
    await textbox.sendKeysToDynamicElementTextbox(page, DYNAMIC_ELEMENT.PAGE_GO_INPUT, pageNumber);
  }

  async checkPaginationIconEnableByIconClass(page: Page, iconClass: string) {
    await page.isEnabled(DYNAMIC_ELEMENT.ICON_CLASS(iconClass, DYNAMIC_ELEMENT.PAGINATION));
  }

  async checkPageNumberActive(page: Page, pageNumber: string) {
    await page.waitForSelector(DYNAMIC_ELEMENT.PAGE_NUMBER_ACTIVE(pageNumber));
  }

  async checkPageNumber(page: Page, pageNumber: string) {
    await page.waitForSelector(DYNAMIC_ELEMENT.PAGE_NUMBER(pageNumber));
  }

  async clickPageNumber(page: Page, pageNumber: string) {
    await page.click(DYNAMIC_ELEMENT.PAGE_NUMBER(pageNumber));
    await page.waitForLoadState();
    await loading.waitLoadingHidden(page);
  }

  async clickButtonBackPage(page: Page) {
    await page.click(DYNAMIC_ELEMENT.PAGE_BUTTON_BACK());
    await page.waitForLoadState();
  }

  async checkButtonBackPageEnabled(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.PAGE_BUTTON_BACK());
  }

  async checkButtonBackPageDisabled(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.PAGE_BUTTON_BACK_DISABLED());
  }

  async clickButtonNextPage(page: Page) {
    await page.click(DYNAMIC_ELEMENT.PAGE_BUTTON_NEXT());
    await page.waitForLoadState();
  }

  async checkButtonNextPageEnabled(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.PAGE_BUTTON_NEXT());
  }

  async checkButtonNextPageDisabled(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.PAGE_BUTTON_NEXT_DISABLED());
  }

  async clickLastPageNumber(page: Page) {
    await page.click(DYNAMIC_ELEMENT.PAGE_LAST_NUMBER());
    await page.waitForLoadState();
    await loading.waitLoadingHidden(page);
  }

  async getLastPageNumber(page: Page) {
    const lastPageNumber = await page.innerText(DYNAMIC_ELEMENT.PAGE_LAST_NUMBER());
    return lastPageNumber;
  }
}
